"""
agents/scriptwriter.py — Agent 5: Video Scriptwriter
"""
from __future__ import annotations
import json
import re
from services.llm import llm_complete
from services.cache import publish_stage_update

SCRIPT_SYSTEM = """You are a viral finance video scriptwriter for Economic Times Digital.
Write a 60-second video script. Return ONLY valid JSON, no markdown, no extra text:
{
  "hook": "Opening 5-second explosive sentence",
  "segments": [
    "Segment 1 (0:05-0:15): context setup here",
    "Segment 2 (0:15-0:25): the core development here",
    "Segment 3 (0:25-0:35): why it matters here",
    "Segment 4 (0:35-0:45): expert angle and data here",
    "Segment 5 (0:45-0:55): what to watch next here",
    "Segment 6 (0:55-1:00): call to action here"
  ],
  "visual_cues": [
    {"timestamp": "0:00", "description": "Dramatic zoom on stock ticker"},
    {"timestamp": "0:15", "description": "Animated chart appearing"},
    {"timestamp": "0:35", "description": "Expert talking head B-roll"},
    {"timestamp": "0:55", "description": "ET logo with subscribe prompt"}
  ],
  "call_to_action": "Read the full story on Economic Times"
}"""


def _clean(text: str) -> str:
    text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]', '', text)
    return re.sub(r'\s+', ' ', text).strip()


async def scriptwriter_node(state: dict) -> dict:
    job_id = state["job_id"]
    await publish_stage_update(job_id, "scriptwriter_started")

    try:
        headline = state.get("headline", "")
        briefing = state.get("deep_briefing") or ""
        impact_cards = state.get("impact_cards") or []
        themes = state.get("key_themes") or []

        # Get top impact headline safely
        top_impact = ""
        if impact_cards:
            card = impact_cards[0]
            if isinstance(card, dict):
                top_impact = card.get("headline", "")
            else:
                top_impact = getattr(card, "headline", "")

        # Build prompt
        safe_briefing = _clean(briefing[:600])
        safe_headline = _clean(headline)

        prompt = f"""Write a 60-second video script for this Indian financial news story:

Headline: {safe_headline}
Key themes: {', '.join(str(t) for t in themes[:3])}
Top impact: {top_impact}
Briefing summary: {safe_briefing[:400]}

Return ONLY the JSON object."""

        raw = await llm_complete(SCRIPT_SYSTEM, prompt, max_tokens=900)
        cleaned = _clean(raw.strip())

        # Strip markdown fences
        if "```" in cleaned:
            lines = [l for l in cleaned.split("\n") if not l.strip().startswith("```")]
            cleaned = "\n".join(lines).strip()

        # Find JSON boundaries
        start = cleaned.find("{")
        end = cleaned.rfind("}") + 1
        if start >= 0 and end > start:
            cleaned = cleaned[start:end]

        script_raw = json.loads(cleaned)

        script = {
            "hook": script_raw.get("hook", f"Breaking: {safe_headline}"),
            "segments": script_raw.get("segments", []),
            "visual_cues": script_raw.get("visual_cues", []),
            "call_to_action": script_raw.get("call_to_action", "Read the full story on Economic Times"),
        }

        # Validate segments is a list of strings
        if not isinstance(script["segments"], list):
            script["segments"] = []
        script["segments"] = [str(s) for s in script["segments"]]

        print(f"[{job_id}] Script generated: {len(script['segments'])} segments")
        await publish_stage_update(job_id, "scriptwriter_done")
        return {
            "video_script": script,
            "completed_stages": state.get("completed_stages", []) + ["scriptwriter"],
            "current_stage": "hitl_gate",
            "scriptwriter_error": None,
        }

    except Exception as exc:
        import traceback
        traceback.print_exc()
        print(f"Scriptwriter error: {exc}")

        headline = state.get("headline", "Breaking market news")
        fallback = _make_fallback_script(headline)

        await publish_stage_update(job_id, "scriptwriter_done")
        return {
            "video_script": fallback,
            "completed_stages": state.get("completed_stages", []) + ["scriptwriter"],
            "current_stage": "hitl_gate",
            "scriptwriter_error": str(exc),
        }


def _make_fallback_script(headline: str) -> dict:
    h = headline[:80] if headline else "Indian market developments"
    return {
        "hook": f"This just in — {h}. Here's everything you need to know in 60 seconds.",
        "segments": [
            f"Segment 1 (0:05-0:15): {h} is making headlines across Indian financial markets today.",
            "Segment 2 (0:15-0:25): Here is the core development and what triggered this story right now.",
            "Segment 3 (0:25-0:35): Why does this matter? Three key reasons analysts are watching closely.",
            "Segment 4 (0:35-0:45): The numbers tell a dramatic story — here are the data points you need.",
            "Segment 5 (0:45-0:55): What to watch in the next 48 hours and the key indicator to track.",
            "Segment 6 (0:55-1:00): Stay informed — read the full deep briefing on Economic Times now.",
        ],
        "visual_cues": [
            {"timestamp": "0:00", "description": "Dramatic zoom on stock ticker board"},
            {"timestamp": "0:15", "description": "Animated chart with key data points appearing"},
            {"timestamp": "0:35", "description": "Expert analyst talking head B-roll footage"},
            {"timestamp": "0:55", "description": "ET NewsFlow logo with subscribe call to action"},
        ],
        "call_to_action": "Read the full AI-powered deep briefing on Economic Times. Subscribe for daily intelligence.",
    }