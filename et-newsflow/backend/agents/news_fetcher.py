"""
news_fetcher.py — Profile-aware ET headline fetcher
Strategy: Scrape ET broadly, then score + rerank by profile keywords.
"""
from __future__ import annotations
import httpx
import re
from typing import List, Dict

# Profile → scoring keywords
PROFILE_KEYWORDS: Dict[str, List[str]] = {
    "investor":  ["stock","equity","market","nse","bse","nifty","sensex","returns","dividend","mutual fund","portfolio","earnings","FII","rally","bull","bear"],
    "founder":   ["startup","funding","venture","series","seed","unicorn","acquisition","merger","IPO","valuation","entrepreneur","SaaS","product","launch"],
    "student":   ["education","career","job","explainer","simple","basic","youth","college","skill","learning","entry","fresher","campus","intern"],
    "executive": ["strategy","corporate","supply chain","merger","regulation","leadership","board","revenue","expansion","compliance","enterprise"],
    "journalist":["government","official","statement","data","report","survey","policy","ministry","court","verdict","investigation","source"],
    "policy":    ["rbi","sebi","government","regulation","budget","fiscal","monetary","inflation","gdp","tax","parliament","minister","policy","law","reform"],
}

INTEREST_KEYWORDS: Dict[str, List[str]] = {
    "Equity Markets":   ["stock","equity","nse","bse","nifty","sensex","shares","market"],
    "Crypto & Web3":    ["crypto","bitcoin","blockchain","web3","defi","ethereum","token"],
    "Startups & VC":    ["startup","VC","funding","series","unicorn","founder","seed"],
    "Monetary Policy":  ["rbi","repo","rate","inflation","monetary","CPI","interest"],
    "Real Estate":      ["property","real estate","housing","realty","construction","RERA"],
    "Technology":       ["tech","AI","software","digital","app","SaaS","cloud","data"],
    "Energy & ESG":     ["energy","solar","renewable","ESG","green","climate","wind"],
    "Banking & Finance":["bank","NBFC","loan","credit","NPA","finance","lending"],
    "Global Trade":     ["export","import","trade","tariff","WTO","geopolit","sanction"],
    "Healthcare":       ["pharma","health","hospital","medical","biotech","drug"],
    "Infrastructure":   ["road","highway","railway","port","infra","capex","construction"],
    "Geopolitics":      ["china","US","russia","iran","geopolit","sanction","border","war"],
}

AGE_KEYWORDS: Dict[str, List[str]] = {
    "18-24": ["youth","student","career","job","fresher","college","skill","startup","entry"],
    "25-34": ["career","growth","invest","opportunity","startup","tech","emerging"],
    "35-49": ["wealth","management","expansion","industry","corporate","senior","business"],
    "50+":   ["dividend","stable","blue chip","retirement","safe","conservative","gold"],
}


def _score_headline(headline: str, url: str, role: str, age: str, interests: List[str]) -> int:
    """Score a headline by profile relevance. Higher = more relevant."""
    text = (headline + " " + url).lower()
    score = 0

    # Role keywords
    for kw in PROFILE_KEYWORDS.get(role, []):
        if kw.lower() in text:
            score += 3

    # Age keywords
    for kw in AGE_KEYWORDS.get(age, []):
        if kw.lower() in text:
            score += 2

    # Interest keywords
    for interest in interests:
        for kw in INTEREST_KEYWORDS.get(interest, []):
            if kw.lower() in text:
                score += 4  # Interest match = highest weight

    return score


async def fetch_trending_headlines(
    limit: int = 5,
    query: str = None,
    profile: Dict | None = None,
) -> List[Dict]:
    """Scrape ET broadly then rerank by profile."""

    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
    }

    # Extract profile fields
    role      = (profile or {}).get("role", "")
    age       = (profile or {}).get("age", "")
    interests = (profile or {}).get("interests", [])

    # Scrape ET homepage broadly (get many headlines to rerank)
    raw_headlines = []
    try:
        async with httpx.AsyncClient(timeout=15.0, headers=headers, follow_redirects=True) as client:
            resp = await client.get("https://economictimes.indiatimes.com/")
            html = resp.text

        pattern = r'href="(https?://economictimes\.indiatimes\.com/[^"]+\.cms)"[^>]*>([^<]{20,150})</a>'
        matches = re.findall(pattern, html)
        seen = set()

        for url, title in matches:
            title = title.strip()
            if (
                len(title) > 20
                and title not in seen
                and not any(s in title.lower() for s in [
                    "click here","read more","view all","subscribe","login","sign in","newsletter"
                ])
            ):
                seen.add(title)
                category = _detect_category(url)
                raw_headlines.append({
                    "headline": title,
                    "url": url,
                    "category": category,
                    "time": "Live",
                })

        print(f"ET scrape: {len(raw_headlines)} raw headlines")
    except Exception as e:
        print(f"ET scrape failed: {e}")

    # If scrape succeeded and we have a profile — score and rerank
    if raw_headlines and profile:
        for h in raw_headlines:
            h["_score"] = _score_headline(h["headline"], h["url"], role, age, interests)

        # Sort by score descending
        raw_headlines.sort(key=lambda x: x["_score"], reverse=True)

        # Log top scores for debugging
        top = raw_headlines[:3]
        print(f"Top scored headlines for {role}/{age}: " +
              " | ".join([f"'{h['headline'][:40]}' ({h['_score']})" for h in top]))

    elif raw_headlines:
        # No profile — shuffle slightly for variety
        import random
        random.shuffle(raw_headlines)

    # Build final list
    result = []
    for i, h in enumerate(raw_headlines[:limit]):
        result.append({
            "id": i + 1,
            "headline": h["headline"],
            "url": h["url"],
            "category": h["category"],
            "time": "Live",
            "trending": i == 0,
        })

    if result:
        return result

    print("Falling back to mock headlines")
    return _get_fallback_headlines()


def _detect_category(url: str) -> str:
    url = url.lower()
    if any(c in url for c in ["tech","technology","infotech"]): return "Technology"
    if any(c in url for c in ["industry","pharma","energy","auto"]): return "Industry"
    if any(c in url for c in ["economy","gdp","rbi","policy"]): return "Economy"
    if any(c in url for c in ["banking","finance","insurance"]): return "Finance"
    if any(c in url for c in ["market","stocks","equity","nse","bse"]): return "Markets"
    if any(c in url for c in ["startup","entrepreneur"]): return "Startups"
    if any(c in url for c in ["international","world","global"]): return "Global"
    return "Business"


def _get_fallback_headlines() -> List[Dict]:
    return [
        {"id":1,"headline":"RBI Cuts Repo Rate by 25bps to 6.0% — First Reduction in 5 Years","category":"Monetary Policy","time":"2 min ago","url":"https://economictimes.indiatimes.com/markets/rbi-rate-cut/articleshow/1.cms","trending":True},
        {"id":2,"headline":"Reliance Jio Launches AI-Powered 6G Trial in Mumbai, Delhi","category":"Technology","time":"15 min ago","url":"https://economictimes.indiatimes.com/tech/jio-6g-trial/articleshow/2.cms","trending":False},
        {"id":3,"headline":"Adani Group Wins Rs 2.4 Lakh Crore Green Energy Contract from Government","category":"Energy","time":"32 min ago","url":"https://economictimes.indiatimes.com/industry/adani-green/articleshow/3.cms","trending":False},
        {"id":4,"headline":"IT Sector Layoffs: TCS, Infosys Cut 40,000 Jobs as AI Automates Testing Roles","category":"IT & Jobs","time":"1 hr ago","url":"https://economictimes.indiatimes.com/tech/it-layoffs/articleshow/4.cms","trending":False},
        {"id":5,"headline":"SEBI Proposes New Rules for F&O Trading — Retail Participation to Be Curbed","category":"Regulation","time":"2 hr ago","url":"https://economictimes.indiatimes.com/markets/sebi-fno/articleshow/5.cms","trending":False},
    ]