"""
services/cache.py — Redis-backed state store + SSE publisher
"""

from __future__ import annotations
import json
import asyncio
from typing import AsyncGenerator
from dataclasses import asdict, is_dataclass

import redis.asyncio as aioredis

redis_client = aioredis.from_url(
    "redis://localhost:6379",
    encoding="utf-8",
    decode_responses=True,
)

JOB_PREFIX    = "newsflow:job:"
PUBSUB_PREFIX = "newsflow:updates:"
JOB_TTL       = 60 * 60 * 4  # 4 hours


def _deep_serialize(obj):
    """Recursively convert dataclasses and objects to plain dicts/lists."""
    if is_dataclass(obj):
        return asdict(obj)
    if isinstance(obj, list):
        return [_deep_serialize(i) for i in obj]
    if isinstance(obj, dict):
        return {k: _deep_serialize(v) for k, v in obj.items()}
    if hasattr(obj, '__dict__'):
        return _deep_serialize(obj.__dict__)
    return obj


def _serialize(obj) -> str:
    """JSON serialize any object including dataclasses."""
    return json.dumps(_deep_serialize(obj))


async def publish_stage_update(job_id: str, stage: str, extra: dict | None = None) -> None:
    """Publish a stage-change event and optionally save full state."""
    payload = {"job_id": job_id, "stage": stage}

    # Agent logs are ephemeral — just publish, don't persist to Redis hash
    if stage == "agent_log":
        if extra and "log" in extra:
            payload["log"] = extra["log"]
        await redis_client.publish(
            f"{PUBSUB_PREFIX}{job_id}",
            _serialize(payload)
        )
        return   # ← Early return, skip Redis hash save

    if extra and "state" in extra:
        full_state = extra["state"]
        # Save full state to Redis for HITL retrieval
        await redis_client.set(
            f"{JOB_PREFIX}{job_id}:fullstate",
            _serialize(full_state),
            ex=JOB_TTL
        )
        payload["result"] = full_state

    # Merge any other extra keys
    if extra:
        for k, v in extra.items():
            if k != "state":
                payload[k] = v

    # Publish to SSE channel
    await redis_client.publish(
        f"{PUBSUB_PREFIX}{job_id}",
        _serialize(payload)
    )

    # Save current stage
    await redis_client.hset(f"{JOB_PREFIX}{job_id}", "current_stage", stage)
    await redis_client.expire(f"{JOB_PREFIX}{job_id}", JOB_TTL)


async def publish_final_result(job_id: str, state: dict) -> None:
    """Store approved result and publish final published event."""
    serialized = _serialize(state)
    await redis_client.set(f"{JOB_PREFIX}{job_id}:result", serialized, ex=JOB_TTL)
    payload = {"job_id": job_id, "stage": "published", "result": state}
    await redis_client.publish(
        f"{PUBSUB_PREFIX}{job_id}",
        _serialize(payload)
    )


async def get_job_state(job_id: str) -> dict | None:
    # Check final published result first
    raw = await redis_client.get(f"{JOB_PREFIX}{job_id}:result")
    if raw:
        return json.loads(raw)

    # Check full state (pre-approval)
    raw = await redis_client.get(f"{JOB_PREFIX}{job_id}:fullstate")
    if raw:
        data = json.loads(raw)
        data["stage"] = data.get("current_stage", "pending")
        return data

    # Just return stage
    stage = await redis_client.hget(f"{JOB_PREFIX}{job_id}", "current_stage")
    if stage:
        return {"job_id": job_id, "stage": stage}

    return None


async def subscribe_to_job(job_id: str) -> AsyncGenerator[str, None]:
    """Async generator yielding SSE messages from Redis Pub/Sub."""
    pubsub = redis_client.pubsub()
    await pubsub.subscribe(f"{PUBSUB_PREFIX}{job_id}")
    try:
        async for message in pubsub.listen():
            if message["type"] == "message":
                yield message["data"]
    finally:
        await pubsub.unsubscribe()
        await pubsub.aclose()