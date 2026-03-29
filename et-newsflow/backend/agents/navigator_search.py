"""
navigator_search.py — Multi-article synthesis engine for News Navigator
Gathers related headlines, synthesizes into Master Briefing, generates follow-ups.
Now saves result to Redis with a job_id so the full dashboard can render it.
"""
from __future__ import annotations
import re
import asyncio
import uuid
import json
from services.llm import llm_complete
from services.cache import redis_client
from agents.news_fetcher import fetch_trending_headlines

GATHER_SYSTEM = """You are a financial research synthesizer for Economic Times India.
Given a search query, identify 3-5 key sub-topics to research.
Return ONLY a JSON array of search angles:
["angle1", "angle2", "angle3"]"""

SYNTHESIZE_SYSTEM = """You are a senior analyst at Economic Times India.
Synthesize multiple news angles into one "Master Briefing" with EXACTLY these sections:

## The Core Facts
## Expert Disagreements  
## Future Outlook
## What This Means For You

Be specific. Use numbers. Keep each section 2-3 sentences. Total under 250 words.
At the end add:
FOLLOWUPS: ["question1?", "question2?", "question3?"]"""


def _clean(text: str) -> str:
    return re.sub(r'\s+', ' ', re.sub(r'[\x00-\x1f]', '', str(text))).strip()


async def navigator_search(query: str, profile: dict | None = None) -> dict:
    clean_query = _clean(query)[:200]

    # Step 1: Get research angles
    try:
        raw_angles = await llm_complete(GATHER_SYSTEM, f"Query: {clean_query}", max_tokens=200)
        raw_angles = _clean(raw_angles)
        start = raw_angles.find("[")
        end = raw_angles.rfind("]") + 1
        if start >= 0 and end > start:
            angles = json.loads(raw_angles[start:end])[:4]
        else:
            angles = [clean_query, f"{clean_query} impact India", f"{clean_query} market reaction"]
    except Exception:
        angles = [clean_query, f"{clean_query} India economy", f"{clean_query} investors"]

    # Step 2: Fetch headlines for context
    headlines = await fetch_trending_headlines(limit=5)
    relevant = [h for h in headlines if any(
        word.lower() in h["headline"].lower()
        for word in clean_query.split()[:4]
        if len(word) > 3
    )]
    all_headlines = relevant or headlines[:3]

    # Step 3: Build context
    headlines_text = "\n".join([f"- {h['headline']}" for h in all_headlines[:5]])
    profile_context = ""
    if profile:
        profile_context = f"\nUser profile: {profile.get('role','reader')}, interests: {', '.join(profile.get('interests',[])[:3])}"

    prompt = f"""Search query: "{clean_query}"{profile_context}

Research angles: {', '.join(angles)}

Related live headlines:
{headlines_text}

Synthesize a Master Briefing addressing this query from all angles."""

    # Step 4: Synthesize
    try:
        raw = await llm_complete(SYNTHESIZE_SYSTEM, prompt, max_tokens=600)
        raw = _clean(raw)

        followups = []
        briefing = raw
        if "FOLLOWUPS:" in raw:
            parts = raw.split("FOLLOWUPS:")
            briefing = parts[0].strip()
            try:
                fq_raw = parts[1].strip()
                s = fq_raw.find("["); e = fq_raw.rfind("]") + 1
                if s >= 0 and e > s:
                    followups = json.loads(fq_raw[s:e])[:3]
            except Exception:
                followups = []

        if not followups:
            followups = [
                f"How does {clean_query} affect retail investors?",
                f"What is the RBI's stance on {clean_query}?",
                f"Which sectors benefit most from {clean_query}?",
            ]

        job_id = str(uuid.uuid4())

        result = {
            # Navigator-specific fields
            "query": clean_query,
            "master_briefing": briefing,
            "followup_questions": followups,
            "angles_researched": angles,
            "headlines_used": [h["headline"] for h in all_headlines[:4]],
            "status": "ready",
            "job_id": job_id,
            # Fields the dashboard page expects
            "deep_briefing": briefing,
            "headline": clean_query,
            "key_themes": angles[:3],
            "primary_article": {"title": clean_query, "published_at": ""},
            "knowledge_base": briefing,
            "timeline_events": [],
            "impact_cards": [],
            "portfolio_signal": None,
            "qa_history": [],
            "localized_briefings": {},
            # Pre-approved — skip HITL flow
            "hitl_status": "approved",
            "current_stage": "published",
        }

        # Save under both keys the dashboard checks
        payload = json.dumps(result, default=str)
        await redis_client.set(f"newsflow:job:{job_id}:result",    payload, ex=60*60*4)
        await redis_client.set(f"newsflow:job:{job_id}:fullstate", payload, ex=60*60*4)

        return result

    except Exception as e:
        return {
            "query": clean_query,
            "master_briefing": f"Search synthesis failed: {str(e)[:100]}",
            "followup_questions": [],
            "angles_researched": angles,
            "headlines_used": [],
            "status": "error",
        }