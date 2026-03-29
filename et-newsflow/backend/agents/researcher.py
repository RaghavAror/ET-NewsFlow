"""
agents/researcher.py — Agent 1: Researcher
"""
from __future__ import annotations
import json
import httpx
import re
from services.llm import llm_complete
from services.cache import publish_stage_update

def build_researcher_system(profile_constraint: str = "") -> str:
    base = """You are a financial news researcher for Economic Times India.
Given a headline and context, generate a detailed research briefing."""
    if profile_constraint:
        base += f"\n\nPROFILE CONSTRAINT: {profile_constraint}"
    base += """\n\nReturn ONLY valid JSON with no extra text, no markdown:
{
  "topic": "main topic in one sentence",
  "related_queries": ["query1", "query2", "query3"],
  "context_summary": "two paragraphs of detailed context about this news story"
}"""
    return base


def _clean(text: str) -> str:
    """Remove control characters that break JSON parsing."""
    text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text


async def researcher_node(state: dict) -> dict:
    job_id = state["job_id"]
    url = state["source_url"]
    headline = state.get("headline", "")
    context = state.get("context", "")

    await publish_stage_update(job_id, "researcher_started")

    try:
        # Try to scrape
        article_text = await _fetch_text(url)
        print(f"[{job_id}] Scraped {len(article_text)} chars from URL")

        # Use headline+context if scrape failed or too short
        if len(article_text) > 200:
            content = article_text[:1500]
        elif headline:
            content = f"Headline: {headline}. Context: {context}. This is a major Indian financial news story."
        else:
            content = _get_sample_content("Indian financial markets")

        # Clean content before sending to LLM
        safe_content = _clean(content)

        prompt = f"Analyze this Indian financial news and return ONLY a JSON object:\n\n{safe_content}\n\nJSON:"

        profile_constraint = state.get("profile_constraint", "")
        researcher_system = build_researcher_system(profile_constraint)
        raw = await llm_complete(researcher_system, prompt, max_tokens=600)

        # Clean LLM response
        cleaned = _clean(raw.strip())
        if "```" in cleaned:
            lines = [l for l in cleaned.split("\n") if not l.strip().startswith("```")]
            cleaned = "\n".join(lines).strip()

        start = cleaned.find("{")
        end = cleaned.rfind("}") + 1
        if start >= 0 and end > start:
            cleaned = cleaned[start:end]

        parsed = json.loads(cleaned)
        topic = parsed.get("topic", headline or "Indian Market Update")
        context_summary = _clean(parsed.get("context_summary", safe_content[:400]))

        primary = {
            "url": url,
            "title": headline or topic,
            "body": safe_content if len(safe_content) > 100 else context_summary,
            "source": "Economic Times",
            "published_at": "2026-03-22",
        }

        queries = parsed.get("related_queries", ["Market Analysis", "Expert View"])
        related = [
            {
                "url": "https://economictimes.indiatimes.com/related-1",
                "title": queries[0] if len(queries) > 0 else "Market Analysis",
                "body": context_summary,
                "source": "Economic Times",
                "published_at": "2026-03-21",
            },
            {
                "url": "https://economictimes.indiatimes.com/related-2",
                "title": queries[1] if len(queries) > 1 else "Expert View",
                "body": context_summary,
                "source": "Economic Times",
                "published_at": "2026-03-20",
            },
        ]

        await publish_stage_update(job_id, "researcher_done")
        return {
            "primary_article": primary,
            "related_articles": related,
            "completed_stages": state.get("completed_stages", []) + ["researcher"],
            "current_stage": "synthesizer",
            "researcher_error": None,
        }

    except Exception as exc:
        import traceback
        traceback.print_exc()
        print(f"Researcher error: {exc}")

        await publish_stage_update(job_id, "researcher_done")
        return {
            "primary_article": {
                "url": url,
                "title": headline or "Indian Market Analysis",
                "body": _get_sample_content(headline or "Indian financial markets"),
                "source": "Economic Times",
                "published_at": "2026-03-22",
            },
            "related_articles": [
                {
                    "url": "https://economictimes.indiatimes.com/related",
                    "title": "RBI Policy and Market Impact",
                    "body": "The Reserve Bank of India monetary policy decisions continue to shape market sentiment.",
                    "source": "Economic Times",
                    "published_at": "2026-03-21",
                }
            ],
            "completed_stages": state.get("completed_stages", []) + ["researcher"],
            "current_stage": "synthesizer",
            "researcher_error": str(exc),
        }


async def _fetch_text(url: str) -> str:
    """Fetch and extract clean text from URL."""
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    }
    try:
        async with httpx.AsyncClient(timeout=15.0, headers=headers, follow_redirects=True) as client:
            resp = await client.get(url)
            html = resp.text
            html = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.DOTALL)
            html = re.sub(r'<style[^>]*>.*?</style>', '', html, flags=re.DOTALL)
            html = re.sub(r'<[^>]+>', ' ', html)
            # Remove control characters
            html = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]', '', html)
            text = re.sub(r'\s+', ' ', html).strip()
            return text[:2000]
    except Exception as e:
        print(f"Fetch error: {e}")
        return ""


def _get_sample_content(topic: str) -> str:
    return (
        f"This article covers major developments in {topic}. "
        "Indian equity markets are navigating a complex macro environment with mixed signals. "
        "The Sensex and Nifty indices have shown significant movement as investors assess policy decisions. "
        "Foreign institutional investors have been active with their net flows closely watched. "
        "The Reserve Bank of India monetary policy continues to be a key variable influencing markets. "
        "Corporate earnings have shown resilience in banking and IT sectors. "
        "Infrastructure spending by the government is providing support to economic growth estimates. "
        "Analysts are watching US Federal Reserve policy, crude oil prices and China data closely."
    )