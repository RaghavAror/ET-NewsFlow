"""
agents/story_arc.py — Feature 3: Enhanced Story Arc with Sentiment + Players
"""
from __future__ import annotations
import json
import re
from services.llm import llm_complete
from services.cache import publish_stage_update

STORY_ARC_SYSTEM = """You are a financial investigative journalist building a historical timeline.
Extract 6-8 datable events related to this news story.
Return ONLY a valid JSON array, no markdown, no extra text:
[
  {
    "date": "2024-01-15",
    "entity": "Primary organization or person involved",
    "event": "One sentence description of what happened",
    "significance": "high",
    "sentiment_score": 0.7,
    "entities_involved": ["Entity1", "Entity2"],
    "event_type": "policy"
  }
]

Rules:
- date: YYYY-MM-DD format only
- significance: "high", "medium", or "low"
- sentiment_score: float from -1.0 (very negative) to 1.0 (very positive)
  * Positive events (growth, profits, policy support): 0.3 to 1.0
  * Neutral events (announcements, appointments): -0.2 to 0.2
  * Negative events (losses, layoffs, crises): -1.0 to -0.3
- entities_involved: array of 1-3 key organizations/people/indices involved
- event_type: one of "policy", "market", "corporate", "regulatory", "macro", "geopolitical"
Sort events by date ascending."""


def _clean(text: str) -> str:
    text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]', '', text)
    return re.sub(r'\s+', ' ', text).strip()


async def story_arc_node(state: dict) -> dict:
    job_id = state["job_id"]
    await publish_stage_update(job_id, "story_arc_started")

    # Log to agent console
    await publish_stage_update(job_id, "agent_log", {
        "agent": "Story-Arc Detective",
        "message": "Extracting entities, dates, and sentiment scores from article...",
        "type": "info",
    })

    try:
        headline = state.get("headline", "")
        briefing = state.get("deep_briefing") or ""
        primary = state.get("primary_article") or {}
        title = primary.get("title", "") if isinstance(primary, dict) else ""
        body = primary.get("body", "") if isinstance(primary, dict) else ""

        combined = _clean(f"Headline: {headline or title}\n\nBriefing: {briefing[:600]}\n\nArticle: {body[:400]}")

        raw = await llm_complete(STORY_ARC_SYSTEM, combined, max_tokens=1000)
        cleaned = _clean(raw.strip())

        if "```" in cleaned:
            lines = [l for l in cleaned.split("\n") if not l.strip().startswith("```")]
            cleaned = "\n".join(lines).strip()

        start = cleaned.find("[")
        end = cleaned.rfind("]") + 1
        if start >= 0 and end > start:
            cleaned = cleaned[start:end]

        events_raw = json.loads(cleaned)
        events = []
        for e in events_raw:
            # Validate and clamp sentiment score
            sentiment = float(e.get("sentiment_score", 0.0))
            sentiment = max(-1.0, min(1.0, sentiment))

            events.append({
                "date": e.get("date", "2026-01-01"),
                "entity": e.get("entity", "Market"),
                "event": _clean(e.get("event", "Significant market event")),
                "significance": e.get("significance", "medium"),
                "sentiment_score": round(sentiment, 2),
                "entities_involved": e.get("entities_involved", [e.get("entity", "Market")]),
                "event_type": e.get("event_type", "market"),
            })

        entities = list({e["entity"] for e in events})
        # Also collect all entities_involved
        for event in events:
            for ent in event.get("entities_involved", []):
                if ent not in entities:
                    entities.append(ent)

        await publish_stage_update(job_id, "story_arc_done")
        await publish_stage_update(job_id, "agent_log", {
            "agent": "Story-Arc Detective",
            "message": f"Extracted {len(events)} timeline events with sentiment scores. Key entities: {', '.join(entities[:3])}",
            "type": "success",
        })

        return {
            "timeline_events": events,
            "entities": entities,
            "completed_stages": state.get("completed_stages", []) + ["story_arc"],
            "current_stage": "impact_analyst",
            "story_arc_error": None,
        }

    except Exception as exc:
        import traceback
        traceback.print_exc()
        headline = state.get("headline", "Indian Market")
        await publish_stage_update(job_id, "story_arc_done")
        return {
            "timeline_events": _fallback_timeline(headline),
            "entities": ["Reserve Bank of India", "Nifty50", "Government of India", "SEBI"],
            "completed_stages": state.get("completed_stages", []) + ["story_arc"],
            "current_stage": "impact_analyst",
            "story_arc_error": str(exc),
        }


def _fallback_timeline(headline: str) -> list[dict]:
    return [
        {"date": "2023-06-01", "entity": "Reserve Bank of India", "event": "RBI begins rate hike cycle to combat rising inflation", "significance": "high", "sentiment_score": -0.3, "entities_involved": ["RBI", "Banking Sector"], "event_type": "policy"},
        {"date": "2023-12-15", "entity": "Nifty50", "event": "Index crosses 21,000 milestone for first time in history", "significance": "high", "sentiment_score": 0.9, "entities_involved": ["NSE", "Nifty50", "FII"], "event_type": "market"},
        {"date": "2024-02-01", "entity": "Government of India", "event": "Union Budget announces record Rs 11.1 lakh crore capital expenditure", "significance": "high", "sentiment_score": 0.7, "entities_involved": ["Finance Ministry", "Infrastructure Sector"], "event_type": "policy"},
        {"date": "2024-06-04", "entity": "Indian Markets", "event": "Markets experience sharp volatility post election results before strong recovery", "significance": "medium", "sentiment_score": -0.2, "entities_involved": ["BSE", "NSE", "FII"], "event_type": "market"},
        {"date": "2024-10-01", "entity": "Foreign Institutional Investors", "event": "FIIs record largest monthly outflow of Rs 94,000 crore from Indian equities", "significance": "high", "sentiment_score": -0.8, "entities_involved": ["FII", "Nifty50", "Rupee"], "event_type": "market"},
        {"date": "2025-02-07", "entity": "Reserve Bank of India", "event": "RBI cuts repo rate by 25bps marking long-awaited monetary policy pivot", "significance": "high", "sentiment_score": 0.8, "entities_involved": ["RBI", "Banking Sector", "Bond Market"], "event_type": "policy"},
        {"date": "2026-03-22", "entity": headline.split()[0] if headline else "Market", "event": f"Latest development: {headline[:80]}", "significance": "high", "sentiment_score": 0.3, "entities_involved": ["Indian Markets"], "event_type": "corporate"},
    ]