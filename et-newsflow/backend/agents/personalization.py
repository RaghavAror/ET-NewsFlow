"""
Personalization — maps user profile to search query constraints
"""

ROLE_QUERIES = {
    "investor":  "stock market portfolio returns equity mutual funds NSE BSE Nifty",
    "founder":   "startup funding venture capital M&A competitor moves product launch",
    "student":   "business explainers career news economics education India jobs",
    "executive": "corporate strategy supply chain regulation mergers leadership",
    "journalist":"facts sources data policy government official statement",
    "policy":    "RBI SEBI government regulation budget fiscal monetary macro",
}

AGE_MODIFIERS = {
    "18-24": "entry level beginner explainer simple context background",
    "25-34": "career growth investment opportunity emerging trends",
    "35-49": "wealth management business expansion industry analysis",
    "50+":   "retirement portfolio dividend blue chip stable returns",
}

INTEREST_MAP = {
    "Equity Markets":   "stocks NSE BSE equity shares Sensex Nifty",
    "Crypto & Web3":    "cryptocurrency bitcoin blockchain web3 defi",
    "Startups & VC":    "startup funding seed series venture capital unicorn",
    "Monetary Policy":  "RBI repo rate inflation CPI monetary policy",
    "Real Estate":      "property housing real estate realty construction",
    "Technology":       "tech AI software SaaS digital transformation",
    "Energy & ESG":     "renewable energy solar ESG green sustainability",
    "Banking & Finance":"banking NBFC loan credit NPA financial sector",
    "Global Trade":     "exports imports trade tariff WTO geopolitics",
    "Healthcare":       "pharma healthcare hospital medical biotech",
    "Infrastructure":   "roads highways railways ports infrastructure capex",
    "Geopolitics":      "India China US foreign policy sanctions geopolitical",
}


def get_personalized_query(profile: dict | None) -> str:
    """Return keyword string for profile-aware article fetching."""
    if not profile:
        return "Indian economy business markets top news"

    role    = profile.get("role", "investor")
    age     = profile.get("age", "25-34")
    interests = profile.get("interests", [])

    parts = [ROLE_QUERIES.get(role, "Indian business news")]
    parts.append(AGE_MODIFIERS.get(age, ""))

    for interest in interests[:3]:
        kw = INTEREST_MAP.get(interest, "")
        if kw:
            parts.append(kw)

    return " ".join(filter(None, parts))[:300]


def get_researcher_constraint(profile: dict | None) -> str:
    """System prompt constraint for researcher agent."""
    if not profile:
        return ""

    role = profile.get("role", "investor")
    age  = profile.get("age", "25-34")
    interests = profile.get("interests", [])

    INSTRUCTIONS = {
        "investor":  "PRIORITISE: market impact, stock movements, earnings, portfolio risk signals. Include analyst price targets where possible.",
        "founder":   "PRIORITISE: funding rounds, competitor moves, regulatory changes affecting startups, M&A signals, hiring trends.",
        "student":   "PRIORITISE: explainers, background context, historical parallels, simplified jargon, career implications.",
        "executive": "PRIORITISE: strategic business impact, regulatory compliance, competitive landscape, supply chain effects.",
        "journalist":"PRIORITISE: primary sources, verifiable facts, conflicting viewpoints, attribution, data points.",
        "policy":    "PRIORITISE: regulatory changes, government policy, macroeconomic indicators, governance implications.",
    }

    interest_str = ""
    if interests:
        interest_str = f" Focus especially on: {', '.join(interests[:4])}."

    age_note = ""
    if age == "18-24":
        age_note = " Explain jargon clearly. Add educational context."
    elif age == "50+":
        age_note = " Emphasise stability, dividends, and long-term implications."

    return INSTRUCTIONS.get(role, "") + interest_str + age_note