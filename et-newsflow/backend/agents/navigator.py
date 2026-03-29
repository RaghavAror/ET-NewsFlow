"""
agents/navigator.py — Feature 1: News Navigator Q&A Agent
Answers user questions using the article as a mini knowledge base.
"""
from __future__ import annotations
import re
from datetime import datetime
from services.llm import llm_complete
import uuid, json
from services.cache import redis_client

NAVIGATOR_SYSTEM = """You are an expert financial analyst assistant for Economic Times.
You have been given a news article and briefing as your ONLY knowledge source.
Answer the user's question STRICTLY based on this knowledge base.

Rules:
- Only use information from the provided knowledge base
- If the answer is not in the knowledge base, say "This specific detail isn't covered in the article, but based on the context..."
- Keep answers concise (2-4 sentences max)
- Use specific numbers and facts when available
- Always relate back to the Indian financial market context
- Never make up statistics or quotes"""


def _clean(text: str) -> str:
    text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]', '', text)
    return re.sub(r'\s+', ' ', text).strip()


async def navigator_answer(
    question: str,
    knowledge_base: str,
    briefing: str,
    qa_history: list[dict],
) -> dict:
    """
    Answer a single user question using the article knowledge base.
    Called directly from the /chat endpoint, not part of main pipeline.
    """
    # Build conversation context from history (last 3 exchanges)
    history_text = ""
    for qa in qa_history[-3:]:
        history_text += f"Q: {qa.get('question', '')}\nA: {qa.get('answer', '')}\n\n"

    kb = _clean(knowledge_base[:2000])
    brief = _clean(briefing[:800])
    q = _clean(question)

    prompt = f"""KNOWLEDGE BASE (article content):
{kb}

DEEP BRIEFING SUMMARY:
{brief}

PREVIOUS CONVERSATION:
{history_text}

USER QUESTION: {q}

Answer concisely based only on the knowledge base above:"""

    try:
        raw = await llm_complete(NAVIGATOR_SYSTEM, prompt, max_tokens=300)
        answer = _clean(raw.strip())
        
        return {
            "question": question,
            "answer": answer,
            "timestamp": datetime.now().isoformat(),
            "success": True,
        }
    except Exception as e:
        return {
            "question": question,
            "answer": f"I encountered an error processing your question. Please try again.",
            "timestamp": datetime.now().isoformat(),
            "success": False,
            "error": str(e),
        }