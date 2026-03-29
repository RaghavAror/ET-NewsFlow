"""
services/scraper.py — Async HTTP article scraper
Uses trafilatura for content extraction + BeautifulSoup for metadata.
"""

from __future__ import annotations
import httpx
import trafilatura
from datetime import datetime, timezone
from workflow.state import Article


_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (compatible; ETNewsFlow/1.0; +https://et-newsflow.ai)"
    )
}


async def fetch_article(url: str) -> Article:
    """
    Fetches and parses an article URL.
    Falls back to a stub if the URL is a search page (for related articles).
    """
    async with httpx.AsyncClient(timeout=20.0, headers=_HEADERS, follow_redirects=True) as client:
        try:
            resp = await client.get(url)
            resp.raise_for_status()
            html = resp.text
        except Exception:
            # Return a stub for unreachable related URLs (demo mode)
            return _stub_article(url)

    extracted = trafilatura.extract(
        html,
        include_comments=False,
        include_tables=True,
        output_format="txt",
    )
    metadata = trafilatura.extract_metadata(html)

    return Article(
        url=url,
        title=getattr(metadata, "title", "Unknown Title") or "Unknown Title",
        body=extracted or "",
        source=getattr(metadata, "sitename", "Economic Times") or "Economic Times",
        published_at=(
            getattr(metadata, "date", None)
            or datetime.now(timezone.utc).strftime("%Y-%m-%d")
        ),
    )


def _stub_article(url: str) -> Article:
    """Demo stub for when scraping fails in hackathon environment."""
    return Article(
        url=url,
        title="Related Context Article",
        body=(
            "This article provides context about recent developments in Indian "
            "financial markets including policy changes, corporate actions, and "
            "macroeconomic indicators relevant to the primary story."
        ),
        source="Economic Times",
        published_at=datetime.now(timezone.utc).strftime("%Y-%m-%d"),
    )

