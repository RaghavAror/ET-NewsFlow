"""
workflow/graph.py — LangGraph StateGraph definition
Wires all five agents + HITL gate into a directed graph.
"""

from __future__ import annotations
import asyncio
import uuid
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver

from workflow.state import NewsFlowState
from agents.researcher import researcher_node
from agents.synthesizer import synthesizer_node
from agents.story_arc import story_arc_node
from agents.impact_analyst import impact_analyst_node
from agents.scriptwriter import scriptwriter_node
from services.cache import publish_stage_update


# ──────────────────────────────────────────────
# HITL Gate Node
# ──────────────────────────────────────────────

async def hitl_gate_node(state: NewsFlowState) -> dict:
    """
    Interrupt point — the graph pauses here.
    The frontend polls /jobs/{job_id}/status until hitl_status changes.
    The user triggers PATCH /jobs/{job_id}/approve or /reject.
    LangGraph resumes via graph.update_state() + graph.invoke().
    """
    await publish_stage_update(state["job_id"], "awaiting_approval")
    # State is frozen here; LangGraph persists it via MemorySaver.
    # No mutation — just signal the waiting state.
    return {"current_stage": "hitl_gate", "hitl_status": "pending"}


def hitl_router(state: NewsFlowState) -> str:
    """Conditional edge: route after HITL decision."""
    status = state.get("hitl_status", "pending")
    if status == "approved":
        return "publish"
    if status == "rejected":
        return "researcher"   # restart pipeline on rejection
    return END                # stay frozen if still pending


async def publish_node(state: NewsFlowState) -> dict:
    """Final node: push completed payload to Redis for SSE delivery."""
    from services.cache import publish_final_result
    await publish_final_result(state["job_id"], state)
    return {"current_stage": "published"}


# ──────────────────────────────────────────────
# Graph Assembly
# ──────────────────────────────────────────────

def build_graph() -> StateGraph:
    builder = StateGraph(NewsFlowState)

    # Register nodes
    builder.add_node("researcher", researcher_node)
    builder.add_node("synthesizer", synthesizer_node)
    builder.add_node("story_arc", story_arc_node)
    builder.add_node("impact_analyst", impact_analyst_node)
    builder.add_node("scriptwriter", scriptwriter_node)
    builder.add_node("hitl_gate", hitl_gate_node)
    builder.add_node("publish", publish_node)

    # Linear pipeline edges
    builder.set_entry_point("researcher")
    builder.add_edge("researcher", "synthesizer")
    builder.add_edge("synthesizer", "story_arc")

    # story_arc and impact_analyst run concurrently (fan-out)
    builder.add_edge("story_arc", "impact_analyst")
    builder.add_edge("impact_analyst", "scriptwriter")

    # Converge at HITL gate
    builder.add_edge("scriptwriter", "hitl_gate")

    # HITL conditional routing
    builder.add_conditional_edges(
        "hitl_gate",
        hitl_router,
        {
            "publish": "publish",
            "researcher": "researcher",   # retry on rejection
            END: END,
        }
    )

    builder.add_edge("publish", END)

    # MemorySaver enables graph persistence across the HITL interrupt
    memory = MemorySaver()
    return builder.compile(
        checkpointer=memory,
        interrupt_before=["hitl_gate"],   # <-- LangGraph HITL interrupt
    )


# Singleton graph instance
news_flow_graph = build_graph()


# ──────────────────────────────────────────────
# Helper: start a new job
# ──────────────────────────────────────────────

async def start_news_flow(url: str) -> str:
    job_id = str(uuid.uuid4())
    initial_state: NewsFlowState = {
        "source_url": url,
        "job_id": job_id,
        "primary_article": None,
        "related_articles": [],
        "researcher_error": None,
        "deep_briefing": None,
        "key_themes": [],
        "synthesizer_error": None,
        "timeline_events": [],
        "entities": [],
        "story_arc_error": None,
        "impact_cards": [],
        "impact_analyst_error": None,
        "video_script": None,
        "scriptwriter_error": None,
        "hitl_status": "pending",
        "hitl_feedback": None,
        "current_stage": "starting",
        "completed_stages": [],
        "pipeline_error": None,
    }

    config = {"configurable": {"thread_id": job_id}}
    # Fire-and-forget; FastAPI background task handles this
    asyncio.create_task(
        news_flow_graph.ainvoke(initial_state, config=config)
    )
    return job_id


async def resume_after_hitl(job_id: str, approved: bool, feedback: str = "") -> None:
    """Called by PATCH /jobs/{job_id}/approve or /reject."""
    config = {"configurable": {"thread_id": job_id}}
    update = {
        "hitl_status": "approved" if approved else "rejected",
        "hitl_feedback": feedback,
    }
    news_flow_graph.update_state(config, update)
    await news_flow_graph.ainvoke(None, config=config)
