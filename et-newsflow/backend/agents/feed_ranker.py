from typing import List, Dict

def rank_news(headlines: List[Dict], profile: dict) -> List[Dict]:
    """Simple rule-based ranking (fast + reliable baseline)."""

    role = profile.get("role", "investor")
    interests = [i.lower() for i in profile.get("interests", [])]

    scored = []

    for h in headlines:
        score = 0
        text = (h.get("headline") or "").lower()

        # 🔥 Role-based scoring
        if role == "investor":
            if any(k in text for k in ["market", "stock", "nse", "bse", "earnings"]):
                score += 3

        elif role == "student":
            if any(k in text for k in ["explained", "what is", "why", "how"]):
                score += 3

        elif role == "policy":
            if any(k in text for k in ["rbi", "inflation", "policy", "government"]):
                score += 3

        elif role == "executive":
            if any(k in text for k in ["strategy", "merger", "acquisition", "growth"]):
                score += 3

        elif role == "founder":
            if any(k in text for k in ["startup", "funding", "vc", "series"]):
                score += 3

        # 🔥 Interest-based scoring
        for interest in interests:
            keyword = interest.split()[0]
            if keyword in text:
                score += 2

        scored.append((score, h))

    # 🔥 Sort by score (highest first)
    scored.sort(key=lambda x: x[0], reverse=True)

    # Return only headlines
    return [h for _, h in scored]