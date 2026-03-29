"""
services/llm.py — Async LLM client using Groq (OpenAI-compatible)
"""
import os
import httpx

LLM_API_BASE = os.getenv("LLM_API_BASE", "https://api.groq.com/openai/v1")
LLM_API_KEY  = os.getenv("LLM_API_KEY", "")
LLM_MODEL    = os.getenv("LLM_MODEL", "llama-3.3-70b-versatile")


async def llm_complete(system: str, user: str, max_tokens: int = 800) -> str:
    """
    Single async LLM call. Creates a fresh client each time to avoid
    LocalProtocolError from reusing closed connections.
    """
    for attempt in range(3):
        try:
            async with httpx.AsyncClient(timeout=60.0) as client:
                resp = await client.post(
                    f"{LLM_API_BASE}/chat/completions",
                    headers={
                        "Authorization": f"Bearer {LLM_API_KEY}",
                        "Content-Type": "application/json",
                    },
                    json={
                        "model": LLM_MODEL,
                        "messages": [
                            {"role": "system", "content": system},
                            {"role": "user", "content": user},
                        ],
                        "max_tokens": max_tokens,
                        "temperature": 0.3,
                    },
                )
                resp.raise_for_status()
                data = resp.json()
                return data["choices"][0]["message"]["content"]
        except Exception as e:
            print(f"LLM attempt {attempt + 1} failed: {e}")
            if attempt == 2:
                raise
            import asyncio
            await asyncio.sleep(2 ** attempt)

    raise RuntimeError("LLM call failed after 3 attempts")