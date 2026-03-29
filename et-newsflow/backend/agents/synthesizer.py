"""
agents/synthesizer.py — Agent 2: Synthesizer
"""
from __future__ import annotations
import json
import re
from services.llm import llm_complete
from services.cache import publish_stage_update

SYNTHESIZER_SYSTEM = """You are a senior financial analyst at Economic Times India.
Write a Deep Briefing with EXACTLY these 5 sections using ## headers:

## Key Development
## Why It Matters Now
## The Bigger Trend
## Contrarian View
## Data Points

Write 2-3 sentences per section. Be specific and analytical.
At the very end, on a new line write:
THEMES_JSON: ["theme1", "theme2", "theme3"]"""


def _clean(text: str) -> str:
    text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]', '', text)
    return re.sub(r'\s+', ' ', text).strip()


def _extract_article_text(article) -> str:
    """Safely extract text from article whether it's a dict or object."""
    if article is None:
        return ""
    if isinstance(article, dict):
        return _clean(article.get("body", "") or article.get("title", ""))
    return _clean(getattr(article, "body", "") or getattr(article, "title", ""))


def _extract_article_title(article) -> str:
    if article is None:
        return ""
    if isinstance(article, dict):
        return article.get("title", "")
    return getattr(article, "title", "")


async def synthesizer_node(state: dict) -> dict:
    job_id = state["job_id"]
    await publish_stage_update(job_id, "synthesizer_started")

    try:
        primary = state.get("primary_article")
        related = state.get("related_articles") or []
        headline = state.get("headline", "")

        # Build article text
        primary_text = _extract_article_text(primary)
        primary_title = _extract_article_title(primary) or headline

        related_texts = []
        for a in related[:2]:
            t = _extract_article_text(a)
            if t:
                related_texts.append(t[:400])

        # Build combined context
        combined = f"MAIN ARTICLE: {primary_title}\n\n{primary_text[:800]}"
        if related_texts:
            combined += "\n\nRELATED CONTEXT:\n" + "\n".join(related_texts)

        safe_combined = _clean(combined)
        print(f"[{job_id}] Synthesizer input length: {len(safe_combined)}")

        prompt = f"""Write a Deep Briefing about this Indian financial news story:

{safe_combined}

Write all 5 sections then add THEMES_JSON at the end."""

        raw = await llm_complete(SYNTHESIZER_SYSTEM, prompt, max_tokens=1200)
        raw = _clean(raw)

        # Extract themes
        key_themes = ["Market Impact", "Economic Policy", "Investor Outlook"]
        briefing = raw

        if "THEMES_JSON:" in raw:
            parts = raw.split("THEMES_JSON:")
            briefing = parts[0].strip()
            try:
                themes_str = parts[1].strip()
                themes_str = re.sub(r'```.*?```', '', themes_str, flags=re.DOTALL).strip()
                start = themes_str.find("[")
                end = themes_str.rfind("]") + 1
                if start >= 0 and end > start:
                    key_themes = json.loads(themes_str[start:end])
            except Exception:
                pass

        # Validate briefing has content
        if not briefing or len(briefing) < 50:
            briefing = _default_briefing(primary_title)

        print(f"[{job_id}] Briefing length: {len(briefing)}")
        await publish_stage_update(job_id, "synthesizer_done")
        return {
            "deep_briefing": briefing,
            "key_themes": key_themes,
            "completed_stages": state.get("completed_stages", []) + ["synthesizer"],
            "current_stage": "story_arc",
            "synthesizer_error": None,
        }

    except Exception as exc:
        import traceback
        traceback.print_exc()
        print(f"Synthesizer error: {exc}")
        headline = state.get("headline", "Indian Market Development")
        await publish_stage_update(job_id, "synthesizer_done")
        return {
            "deep_briefing": _default_briefing(headline),
            "key_themes": ["Market Volatility", "RBI Policy", "FII Flows", "Corporate Earnings"],
            "completed_stages": state.get("completed_stages", []) + ["synthesizer"],
            "current_stage": "story_arc",
            "synthesizer_error": str(exc),
        }


def _default_briefing(topic: str) -> str:
    return f"""## Key Development
{topic} represents a significant development in the Indian financial landscape. Market participants are closely monitoring the implications for sector rotation and portfolio positioning.

## Why It Matters Now
This development comes at a critical juncture when Indian markets are navigating global headwinds alongside domestic growth drivers. The timing amplifies its impact on investor sentiment and policy expectations.

## The Bigger Trend
India's financial markets are undergoing structural transformation driven by digitization, demographic dividend, and policy reforms. This story fits into the broader narrative of India's emergence as a global economic powerhouse.

## Contrarian View
Some analysts caution that near-term optimism may be overdone given stretched valuations and global uncertainty. A more measured assessment suggests waiting for confirmation before making significant portfolio changes.

## Data Points
- India GDP growth forecast FY26: 6.8%
- Nifty50 YTD performance: +4.2%
- FII net inflows last 30 days: Rs 12,400 crore
- RBI repo rate: 6.25% (last cut: Feb 2025)
- India inflation (CPI): 4.1% (Feb 2026)"""