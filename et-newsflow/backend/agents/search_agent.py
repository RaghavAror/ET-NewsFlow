"""
agents/search_agent.py — Agentic search using knowledge base + LLM
"""
from __future__ import annotations
import re
from services.llm import llm_complete

SEARCH_SYSTEM = """You are an expert Indian financial news analyst.
Answer the user's question using your knowledge of Indian markets, economy and policy.
Be specific, cite relevant data points, and keep the answer under 100 words.
If the question mentions a portfolio or personal context, tailor your answer accordingly."""


def _clean(text: str) -> str:
    return re.sub(r'\s+', ' ', re.sub(r'[\x00-\x1f]', '', text)).strip()


async def answer_search_query(query: str, profile: dict | None = None) -> str:
    """Answer a free-form search query with profile context."""
    context = ""
    if profile:
        context = f"User profile: {profile.get('role','reader')}, age {profile.get('age','')}, interests: {', '.join(profile.get('interests',[]))[:80]}. "

    prompt = f"{context}Question: {_clean(query)}"

    try:
        answer = await llm_complete(SEARCH_SYSTEM, prompt, max_tokens=200)
        return _clean(answer)
    except Exception as e:
        return f"Search unavailable: {str(e)[:80]}"