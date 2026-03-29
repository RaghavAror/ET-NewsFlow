"""
agents/localization.py — Feature 2: Vernacular Business Engine
Translates Deep Briefing with contextual explanations of financial terms.
"""
from __future__ import annotations
import re
from services.llm import llm_complete

LOCALIZATION_PROMPTS = {
    "hindi": """You are an expert financial translator specializing in Hindi business journalism.
Translate the following Deep Briefing into Hindi (Devanagari script).

CRITICAL RULES:
1. When you encounter complex financial/economic terms, translate them AND add a brief parenthetical explanation in Hindi.
   Example: "Repo Rate (रेपो रेट - वह ब्याज दर जिस पर RBI बैंकों को उधार देता है)"
   Example: "Fiscal Deficit (राजकोषीय घाटा - सरकार की आय से अधिक व्यय)"
   Example: "FII (विदेशी संस्थागत निवेशक - विदेशी कंपनियां जो भारतीय बाजार में निवेश करती हैं)"
2. Keep company names, numbers, and percentages in English/numerals
3. Maintain the ## section headers but translate the heading text
4. Make it readable for a Hindi-speaking retail investor
5. Output ONLY the translated text, no preamble""",

    "tamil": """You are an expert financial translator specializing in Tamil business journalism.
Translate the following Deep Briefing into Tamil script.

CRITICAL RULES:
1. For complex financial terms, translate AND add parenthetical explanation in Tamil.
   Example: "வட்டி விகிதம் (Repo Rate - RBI வங்கிகளுக்கு கடன் தரும் வட்டி விகிதம்)"
   Example: "நிதி பற்றாக்குறை (Fiscal Deficit - அரசின் வருவாயை விட செலவு அதிகமாக இருப்பது)"
2. Keep company names, numbers, and percentages in English/numerals
3. Maintain ## section structure with Tamil headings
4. Make it accessible for Tamil-speaking investors
5. Output ONLY the translated text""",

    "telugu": """You are an expert financial translator specializing in Telugu business journalism.
Translate the following Deep Briefing into Telugu script.

CRITICAL RULES:
1. For complex financial terms, translate AND add parenthetical Telugu explanation.
   Example: "వడ్డీ రేటు (Repo Rate - RBI బ్యాంకులకు అప్పు ఇచ్చే వడ్డీ రేటు)"
   Example: "ద్రవ్యలోటు (Fiscal Deficit - ప్రభుత్వ ఆదాయం కంటే ఖర్చు ఎక్కువగా ఉండటం)"
2. Keep company names, numbers, and percentages in English/numerals
3. Maintain ## section headers with Telugu headings
4. Accessible for Telugu-speaking retail investors
5. Output ONLY the translated text""",
}


def _clean(text: str) -> str:
    text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]', '', text)
    return re.sub(r'\s+', ' ', text).strip()


async def localize_briefing(briefing: str, language: str) -> dict:
    """
    Translate and localize a briefing to the target language.
    Called from /localize endpoint on demand.
    """
    if language not in LOCALIZATION_PROMPTS:
        return {"error": f"Language '{language}' not supported", "text": briefing}

    system = LOCALIZATION_PROMPTS[language]
    safe_briefing = _clean(briefing[:2000])

    try:
        translated = await llm_complete(system, safe_briefing, max_tokens=1500)
        return {
            "language": language,
            "text": _clean(translated.strip()),
            "success": True,
        }
    except Exception as e:
        return {
            "language": language,
            "text": "",
            "success": False,
            "error": str(e),
        }