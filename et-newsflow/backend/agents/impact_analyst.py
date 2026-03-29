"""
agents/impact_analyst.py — Feature 4: Portfolio-Aware Impact Analyst
"""
from __future__ import annotations
import json
import re
from services.llm import llm_complete
from services.cache import publish_stage_update

# Default mock portfolio — in production this comes from user profile
DEFAULT_PORTFOLIO = ["Reliance Industries", "Tata Motors", "Infosys", "Nifty 50", "HDFC Bank"]

IMPACT_SYSTEM = """You are an economic impact analyst for Economic Times India.
Analyze the news for THREE specific investor personas.
Return ONLY valid JSON array, no markdown:
[
  {
    "persona": "Retail Investor",
    "headline": "punchy headline under 8 words",
    "body": "2-3 sentence analysis of direct impact",
    "action_item": "One specific actionable step for TODAY"
  },
  {
    "persona": "Corporate Exec",
    "headline": "punchy headline under 8 words",
    "body": "2-3 sentence analysis of direct impact",
    "action_item": "One specific actionable step for TODAY"
  },
  {
    "persona": "Student",
    "headline": "punchy headline under 8 words",
    "body": "2-3 sentence analysis of direct impact",
    "action_item": "One specific actionable step for TODAY"
  }
]"""

PORTFOLIO_SYSTEM = """You are a personalized portfolio analyst for Economic Times India.
Given a user's stock portfolio and a news story, generate a "Personalized Alpha Signal".
Return ONLY valid JSON, no markdown:
{
  "signal_type": "BUY" or "SELL" or "HOLD" or "WATCH",
  "affected_holdings": ["Stock1", "Stock2"],
  "unaffected_holdings": ["Stock3"],
  "headline": "Direct portfolio impact in under 10 words",
  "analysis": "2-3 sentences on exactly how this news affects their specific holdings",
  "recommended_action": "Specific action for this portfolio",
  "confidence": "high" or "medium" or "low",
  "time_horizon": "immediate" or "short-term" or "long-term"
}"""


def _clean(text: str) -> str:
    text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]', '', text)
    return re.sub(r'\s+', ' ', text).strip()


def _parse_json_safe(raw: str, default):
    cleaned = _clean(raw.strip())
    if "```" in cleaned:
        lines = [l for l in cleaned.split("\n") if not l.strip().startswith("```")]
        cleaned = "\n".join(lines).strip()
    # Find JSON boundaries
    if isinstance(default, list):
        start, end = cleaned.find("["), cleaned.rfind("]") + 1
    else:
        start, end = cleaned.find("{"), cleaned.rfind("}") + 1
    if start >= 0 and end > start:
        cleaned = cleaned[start:end]
    return json.loads(cleaned)


async def impact_analyst_node(state: dict) -> dict:
    job_id = state["job_id"]
    await publish_stage_update(job_id, "impact_analyst_started")
    await publish_stage_update(job_id, "agent_log", {
        "agent": "Impact Analyst",
        "message": "Analyzing impact for 3 personas + scanning portfolio holdings...",
        "type": "info",
    })

    briefing = state.get("deep_briefing") or ""
    themes = state.get("key_themes") or []
    headline = state.get("headline", "")
    entities = state.get("entities", [])
    user_portfolio = state.get("user_portfolio") or DEFAULT_PORTFOLIO

    # ── Standard impact cards ───────────────────────────────
    cards = []
    try:
        prompt = f"""Analyze impact of this news for 3 investor personas:

Headline: {headline}
Key Themes: {', '.join(str(t) for t in themes)}
Briefing: {_clean(briefing[:600])}

Return the JSON array."""

        raw = await llm_complete(IMPACT_SYSTEM, prompt, max_tokens=900)
        cards_raw = _parse_json_safe(raw, [])
        cards = [
            {
                "persona": c.get("persona", "Investor"),
                "headline": c.get("headline", "Market impact ahead"),
                "body": c.get("body", "Monitor market developments closely."),
                "action_item": c.get("action_item", "Review your portfolio today."),
            }
            for c in cards_raw
        ]
    except Exception as e:
        print(f"Impact cards error: {e}")
        cards = _fallback_cards(headline)

    # ── Portfolio alpha signal ──────────────────────────────
    portfolio_signal = None
    try:
        # Find overlap between news entities and user portfolio
        news_text = f"{headline} {briefing[:400]} {' '.join(entities)}"
        affected = []
        for holding in user_portfolio:
            # Check if holding name appears in news
            holding_base = holding.split()[0].lower()  # "Reliance Industries" -> "reliance"
            if holding_base in news_text.lower() or holding.lower() in news_text.lower():
                affected.append(holding)

        portfolio_str = ", ".join(user_portfolio)
        affected_str = ", ".join(affected) if affected else "None directly mentioned"

        portfolio_prompt = f"""News: {headline}
Briefing: {_clean(briefing[:500])}
News entities: {', '.join(entities[:8])}

User portfolio: {portfolio_str}
Potentially affected holdings: {affected_str}

Generate a personalized alpha signal for this portfolio. Return ONLY the JSON object."""

        raw2 = await llm_complete(PORTFOLIO_SYSTEM, portfolio_prompt, max_tokens=500)
        signal_raw = _parse_json_safe(raw2, {})

        portfolio_signal = {
            "signal_type": signal_raw.get("signal_type", "WATCH"),
            "affected_holdings": signal_raw.get("affected_holdings", affected),
            "unaffected_holdings": signal_raw.get("unaffected_holdings", []),
            "headline": signal_raw.get("headline", "Monitor portfolio for developments"),
            "analysis": signal_raw.get("analysis", "This news may have indirect effects on your holdings."),
            "recommended_action": signal_raw.get("recommended_action", "Review positions and set alerts."),
            "confidence": signal_raw.get("confidence", "medium"),
            "time_horizon": signal_raw.get("time_horizon", "short-term"),
            "user_portfolio": user_portfolio,
        }

        await publish_stage_update(job_id, "agent_log", {
            "agent": "Impact Analyst",
            "message": f"Portfolio signal: {portfolio_signal['signal_type']} — {len(affected)} holdings potentially affected",
            "type": "success" if portfolio_signal["signal_type"] in ["BUY"] else "warning",
        })

    except Exception as e:
        print(f"Portfolio signal error: {e}")
        portfolio_signal = _fallback_portfolio_signal(user_portfolio, headline)

    await publish_stage_update(job_id, "impact_analyst_done")
    return {
        "impact_cards": cards,
        "portfolio_signal": portfolio_signal,
        "user_portfolio": user_portfolio,
        "completed_stages": state.get("completed_stages", []) + ["impact_analyst"],
        "current_stage": "scriptwriter",
        "impact_analyst_error": None,
    }


def _fallback_cards(headline: str) -> list[dict]:
    return [
        {"persona": "Retail Investor", "headline": "Monitor portfolio for opportunities", "body": "This development warrants close attention from retail investors. Stay informed about sector-specific implications and adjust stop-losses accordingly.", "action_item": "Set price alerts for affected stocks in your watchlist today."},
        {"persona": "Corporate Exec", "headline": "Assess strategic business implications", "body": "Business leaders should evaluate supply chain, regulatory, and competitive implications of this development for their sector.", "action_item": "Schedule an emergency review with your strategy and finance teams."},
        {"persona": "Student", "headline": "Key current affairs case study", "body": "This event is an excellent real-world example of market dynamics in action, relevant for economics, finance, and MBA entrance exams.", "action_item": "Add this to your current affairs notes and research the historical context."},
    ]


def _fallback_portfolio_signal(portfolio: list[str], headline: str) -> dict:
    return {
        "signal_type": "WATCH",
        "affected_holdings": [],
        "unaffected_holdings": portfolio,
        "headline": "No direct portfolio impact detected",
        "analysis": f"Based on '{headline[:60]}...', no holdings in your portfolio appear directly exposed. Indirect macro effects possible.",
        "recommended_action": "No immediate action required. Continue monitoring for secondary effects.",
        "confidence": "low",
        "time_horizon": "long-term",
        "user_portfolio": portfolio,
    }