"""
agents/audio_agent.py — Multilingual TTS
Generates audio in English, Hindi, Tamil using gTTS with correct language codes.
"""
from __future__ import annotations
import re
import io
import base64
from services.llm import llm_complete
from agents.localization import localize_briefing

LANG_CODES = {
    "english": "en",
    "hindi":   "hi",
    "tamil":   "ta",
    "telugu":  "te",
}

LANG_NAMES = {
    "english": "English",
    "hindi":   "Hindi",
    "tamil":   "Tamil",
    "telugu":  "Telugu",
}


def _clean(text: str) -> str:
    return re.sub(r'\s+', ' ', re.sub(r'[\x00-\x1f]', '', str(text))).strip()


async def generate_audio(
    briefing: str,
    language: str = "english",
    job_id: str = "",
    cached_translations: dict | None = None,
) -> dict:
    """
    Generate TTS audio for a briefing in the specified language.
    Returns {audio_url, language, status}
    """
    lang_code = LANG_CODES.get(language, "en")

    # Get text in target language
    if language == "english":
        text = briefing
    elif cached_translations and language in cached_translations:
        text = cached_translations[language]
    else:
        # Translate first
        result = await localize_briefing(briefing, language)
        text = result.get("text", briefing) if result.get("success") else briefing

    # Trim to ~400 chars for TTS (first 2 sections of briefing)
    clean_text = _clean(text)
    # Extract first 2 meaningful paragraphs
    lines = [l.strip() for l in clean_text.split(".") if len(l.strip()) > 20][:4]
    tts_text = ". ".join(lines)[:450]

    try:
        from gtts import gTTS
        tts = gTTS(text=tts_text, lang=lang_code, slow=False)
        buf = io.BytesIO()
        tts.write_to_fp(buf)
        buf.seek(0)
        b64 = base64.b64encode(buf.read()).decode()
        audio_url = f"data:audio/mp3;base64,{b64}"

        return {
            "audio_url": audio_url,
            "language": language,
            "lang_label": LANG_NAMES.get(language, language),
            "duration_estimate": len(tts_text) / 12,
            "status": "ready",
            "source": "gtts",
        }
    except ImportError:
        return {
            "audio_url": "",
            "language": language,
            "status": "error",
            "error": "Run: pip install gtts",
        }
    except Exception as e:
        return {
            "audio_url": "",
            "language": language,
            "status": "error",
            "error": str(e),
        }