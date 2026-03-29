"""
main.py — ET NewsFlow FastAPI v3 — Full personalization + search + multilingual audio
"""
from __future__ import annotations

from dotenv import load_dotenv
load_dotenv()

import asyncio
import json
import uuid
import traceback
from contextlib import asynccontextmanager
from typing import AsyncGenerator, Optional

from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from dataclasses import asdict, is_dataclass

from services.cache import (
    get_job_state, subscribe_to_job, redis_client,
    publish_stage_update, publish_final_result,
)
from agents.researcher   import researcher_node
from agents.synthesizer  import synthesizer_node
from agents.story_arc    import story_arc_node
from agents.impact_analyst import impact_analyst_node
from agents.scriptwriter import scriptwriter_node
from agents.navigator    import navigator_answer
from agents.localization import localize_briefing
from agents.news_fetcher import fetch_trending_headlines
from agents.video_studio import run_video_studio, poll_video_status as _poll_video
from agents.search_agent import answer_search_query
from agents.navigator_search import navigator_search
from agents.personalization import get_personalized_query, get_researcher_constraint
from agents.audio_agent  import generate_audio


# ── App ──────────────────────────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI):
    await redis_client.ping()
    print("✅ Redis connected")
    yield
    await redis_client.aclose()

app = FastAPI(title="ET NewsFlow API v3", version="3.0.0", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True, allow_methods=["*"], allow_headers=["*"],
)


# ── Models ───────────────────────────────────────────────────

class UserProfileModel(BaseModel):
    role: str = "investor"
    age: str = "25-34"
    interests: list[str] = []

class AnalyzeRequest(BaseModel):
    url: str
    headline: str = ""
    context: str = ""
    user_portfolio: list[str] = ["Reliance Industries","Tata Motors","Infosys","Nifty 50","HDFC Bank"]
    user_profile: Optional[UserProfileModel] = None

class HITLDecision(BaseModel):
    feedback: str = ""

class ChatRequest(BaseModel):
    job_id: str
    question: str

class LocalizeRequest(BaseModel):
    job_id: str
    language: str

class VideoGenerateRequest(BaseModel):
    job_id: str

class SearchRequest(BaseModel):
    query: str
    profile: Optional[dict] = None

class AudioRequest(BaseModel):
    job_id: str
    language: str = "english"


# ── Helpers ──────────────────────────────────────────────────

def deep_serialize(obj):
    if is_dataclass(obj): return asdict(obj)
    if isinstance(obj, list): return [deep_serialize(i) for i in obj]
    if isinstance(obj, dict): return {k: deep_serialize(v) for k, v in obj.items()}
    return obj

async def _log(job_id: str, agent: str, message: str, log_type: str = "info"):
    from datetime import datetime
    await publish_stage_update(job_id, "agent_log", {
        "log": {"agent": agent, "message": message, "type": log_type,
                "timestamp": datetime.now().strftime("%H:%M:%S")}
    })

def _build_profile_constraint(profile: Optional[UserProfileModel]) -> str:
    """Convert user profile to a researcher system prompt constraint."""
    if not profile:
        return ""
    constraints = {
        "investor":  "Focus on market impact, stock movements, earnings data, and portfolio implications. Prioritise financial metrics and analyst opinions.",
        "founder":   "Look specifically for funding rounds, competitor moves, regulatory changes affecting startups, and M&A activity.",
        "student":   "Fetch background context, explainers, and historical precedents. Simplify jargon and add educational framing.",
        "executive": "Focus on strategic business impact, supply chain effects, regulatory compliance, and competitive landscape shifts.",
        "journalist":"Surface key facts, primary sources, conflicting viewpoints, and verifiable data points.",
        "policy":    "Emphasise regulatory implications, government policy responses, macroeconomic indicators, and governance aspects.",
    }
    interest_str = f" User interests: {', '.join(profile.interests[:4])}." if profile.interests else ""
    age_str = f" Target age group: {profile.age}." if profile.age else ""
    return constraints.get(profile.role, "") + interest_str + age_str


# ── Pipeline ─────────────────────────────────────────────────

async def run_pipeline(
    job_id: str, url: str, headline: str = "", context: str = "",
    user_portfolio: list[str] = None, user_profile: Optional[UserProfileModel] = None,
):
    if user_portfolio is None:
        user_portfolio = ["Reliance Industries","Tata Motors","Infosys","Nifty 50","HDFC Bank"]

    from agents.personalization import get_researcher_constraint
    profile_constraint = get_researcher_constraint(user_profile.dict() if user_profile else None)

    state = {
        "source_url": url, "job_id": job_id, "headline": headline,
        "context": context, "user_portfolio": user_portfolio,
        "profile_constraint": profile_constraint,
        "user_profile": user_profile.dict() if user_profile else {},
        "primary_article": None, "related_articles": [], "researcher_error": None,
        "knowledge_base": "", "deep_briefing": None, "key_themes": [],
        "synthesizer_error": None, "timeline_events": [], "entities": [],
        "story_arc_error": None, "impact_cards": [], "portfolio_signal": None,
        "impact_analyst_error": None, "video_script": None, "scriptwriter_error": None,
        "qa_history": [], "localized_briefings": {}, "agent_logs": [],
        "hitl_status": "pending", "hitl_feedback": None,
        "current_stage": "starting", "completed_stages": [], "pipeline_error": None,
    }

    role_label = user_profile.role if user_profile else "general"
    await _log(job_id, "Orchestrator", f"Pipeline started for {role_label} profile — 5 agents queued", "info")

    try:
        await _log(job_id, "Researcher", f"Scraping + applying {role_label} profile constraint...", "info")
        result = await researcher_node(state)
        state.update(result)
        kb_parts = []
        if state.get("primary_article"):
            pa = state["primary_article"]
            kb_parts.append(f"MAIN: {pa.get('title','')} — {pa.get('body','')[:800]}")
        for ra in (state.get("related_articles") or []):
            kb_parts.append(f"RELATED: {ra.get('title','')} — {ra.get('body','')[:300]}")
        state["knowledge_base"] = "\n\n".join(kb_parts)
        await _log(job_id, "Researcher", f"{len(kb_parts)} articles fetched", "success")

        await _log(job_id, "Synthesizer", "Writing Deep Briefing...", "info")
        result = await synthesizer_node(state)
        state.update(result)
        await _log(job_id, "Synthesizer", f"Themes: {', '.join(state.get('key_themes',[])[:3])}", "success")

        await _log(job_id, "Story-Arc Detective", "Extracting timeline with sentiment...", "info")
        result = await story_arc_node(state)
        state.update(result)
        await _log(job_id, "Story-Arc Detective", f"{len(state.get('timeline_events',[]))} events", "success")

        await _log(job_id, "Impact Analyst", f"Scanning portfolio & {role_label} impact...", "info")
        result = await impact_analyst_node(state)
        state.update(result)
        sig = state.get("portfolio_signal") or {}
        await _log(job_id, "Impact Analyst", f"Signal: {sig.get('signal_type','WATCH')}", "success")

        await _log(job_id, "Scriptwriter", "Writing broadcast script...", "info")
        result = await scriptwriter_node(state)
        state.update(result)
        await _log(job_id, "Scriptwriter", "Script ready", "success")

        await _log(job_id, "Orchestrator", "All 5 agents complete — awaiting approval", "warning")

        state["current_stage"] = "awaiting_approval"
        state["hitl_status"] = "pending"
        clean_state = deep_serialize(state)

        await redis_client.set(
            f"newsflow:job:{job_id}:fullstate",
            json.dumps(clean_state, default=str), ex=60*60*4,
        )
        await publish_stage_update(job_id, "awaiting_approval", {"state": clean_state})
        print(f"[{job_id}] ✅ Done")

    except Exception as e:
        print(f"[{job_id}] ❌ {e}")
        traceback.print_exc()
        await _log(job_id, "Orchestrator", f"Error: {str(e)[:80]}", "error")
        await publish_stage_update(job_id, "error", {"error": str(e)})


# ── Core routes ──────────────────────────────────────────────

@app.post("/analyze", status_code=202)
async def analyze_article(req: AnalyzeRequest, background_tasks: BackgroundTasks):
    job_id = str(uuid.uuid4())
    print(f"🚀 {job_id}: {req.headline[:50] or req.url[:50]}")
    background_tasks.add_task(
        run_pipeline, job_id, req.url, req.headline, req.context,
        req.user_portfolio, req.user_profile,
    )
    return {"job_id": job_id, "status": "started"}

@app.get("/jobs/{job_id}/stream")
async def job_stream(job_id: str):
    async def gen() -> AsyncGenerator[str, None]:
        current = await get_job_state(job_id)
        if current: yield f"data: {json.dumps(current, default=str)}\n\n"
        async for msg in subscribe_to_job(job_id):
            yield f"data: {msg}\n\n"
            try:
                p = json.loads(msg)
                if p.get("stage") in ("published","error") and p.get("stage") != "agent_log":
                    break
            except: pass
    return StreamingResponse(gen(), media_type="text/event-stream",
                             headers={"Cache-Control":"no-cache","X-Accel-Buffering":"no"})

@app.get("/jobs/{job_id}/status")
async def job_status(job_id: str):
    s = await get_job_state(job_id)
    if not s: raise HTTPException(404, "Job not found")
    return s

@app.patch("/jobs/{job_id}/approve")
async def approve_job(job_id: str, decision: HITLDecision):
    raw = await redis_client.get(f"newsflow:job:{job_id}:fullstate")
    if not raw: raise HTTPException(404, "Job state not found")
    state = json.loads(raw)
    state["hitl_status"] = "approved"
    await publish_final_result(job_id, state)
    return {"status": "approved", "job_id": job_id}

@app.patch("/jobs/{job_id}/reject")
async def reject_job(job_id: str, decision: HITLDecision):
    raw = await redis_client.get(f"newsflow:job:{job_id}:fullstate")
    if not raw: raise HTTPException(404, "Job state not found")
    await publish_stage_update(job_id, "rejected")
    return {"status": "rejected", "job_id": job_id}

# ── Chat ─────────────────────────────────────────────────────
@app.post("/chat")
async def chat(req: ChatRequest):
    raw = await redis_client.get(f"newsflow:job:{req.job_id}:result") or \
          await redis_client.get(f"newsflow:job:{req.job_id}:fullstate")
    if not raw: raise HTTPException(404, "Story not found")
    state = json.loads(raw)
    result = await navigator_answer(req.question, state.get("knowledge_base",""),
                                    state.get("deep_briefing",""), state.get("qa_history",[]))
    state["qa_history"] = (state.get("qa_history",[]) + [result])[-20:]
    await redis_client.set(f"newsflow:job:{req.job_id}:fullstate",
                           json.dumps(state, default=str), ex=60*60*4)
    return result

# ── Localize ─────────────────────────────────────────────────
@app.post("/localize")
async def localize(req: LocalizeRequest):
    ck = f"newsflow:job:{req.job_id}:localized:{req.language}"
    cached = await redis_client.get(ck)
    if cached: return json.loads(cached)
    raw = await redis_client.get(f"newsflow:job:{req.job_id}:result") or \
          await redis_client.get(f"newsflow:job:{req.job_id}:fullstate")
    if not raw: raise HTTPException(404, f"Story {req.job_id} not found")
    state = json.loads(raw)
    briefing = state.get("deep_briefing","")
    if not briefing: raise HTTPException(400, "No briefing available")
    result = await localize_briefing(briefing, req.language)
    if result.get("success"): await redis_client.set(ck, json.dumps(result), ex=3600)
    return result

# ── Search ───────────────────────────────────────────────────
@app.post("/search")
async def search(req: SearchRequest):
    answer = await answer_search_query(req.query, req.profile)
    return {"answer": answer, "query": req.query}

# ── Multilingual Audio ────────────────────────────────────────
@app.post("/audio/listen")
async def audio_listen(req: AudioRequest):
    """Generate TTS audio for a story in the specified language."""
    ck = f"newsflow:job:{req.job_id}:audio:{req.language}"
    cached = await redis_client.get(ck)
    if cached: return json.loads(cached)

    raw = await redis_client.get(f"newsflow:job:{req.job_id}:result") or \
          await redis_client.get(f"newsflow:job:{req.job_id}:fullstate")
    if not raw: raise HTTPException(404, "Story not found")

    state = json.loads(raw)
    briefing = state.get("deep_briefing","")
    if not briefing: raise HTTPException(400, "No briefing to narrate")

    cached_translations = state.get("localized_briefings", {})
    result = await generate_audio(briefing, req.language, req.job_id, cached_translations)

    if result.get("status") == "ready":
        await redis_client.set(ck, json.dumps(result), ex=3600)
    return result

# ── Video ─────────────────────────────────────────────────────
@app.post("/video/generate")
async def generate_video(req: VideoGenerateRequest):
    raw = await redis_client.get(f"newsflow:job:{req.job_id}:result") or \
          await redis_client.get(f"newsflow:job:{req.job_id}:fullstate")
    if not raw: raise HTTPException(404, "Story not found")
    state = json.loads(raw)
    headline = state.get("headline") or (state.get("primary_article") or {}).get("title","Breaking News")
    script = state.get("video_script") or {}
    result = await run_video_studio(headline, script, req.job_id)
    await redis_client.set(f"newsflow:job:{req.job_id}:video_studio",
                           json.dumps(result, default=str), ex=3600)
    return result

@app.get("/video/poll/{request_id}")
async def poll_video(request_id: str):
    return await _poll_video(request_id)

@app.get("/video/studio/{job_id}")
async def get_video_studio(job_id: str):
    cached = await redis_client.get(f"newsflow:job:{job_id}:video_studio")
    if cached: return json.loads(cached)
    raise HTTPException(404, "No video studio data")

# ── Trending ──────────────────────────────────────────────────
class TrendingRequest(BaseModel):
    profile: Optional[dict] = None
    limit: int = 5

@app.post("/trending")
async def get_trending(req: TrendingRequest = None):
    """Profile-aware trending headlines — POST with profile for personalization."""
    profile = req.profile if req else None
    headlines = await fetch_trending_headlines(limit=req.limit if req else 5, profile=profile)
    return {"headlines": headlines}

@app.get("/trending")
async def get_trending_get():
    """GET fallback — no profile personalization."""
    return {"headlines": await fetch_trending_headlines(limit=5)}


# ── News Navigator Search ─────────────────────────────────────
class NavigatorRequest(BaseModel):
    query: str
    profile: Optional[dict] = None

@app.post("/navigator/search")
async def navigator_search_endpoint(req: NavigatorRequest):
    """Multi-article synthesis engine for News Navigator."""
    result = await navigator_search(req.query, req.profile)
    return result

# ── Health ────────────────────────────────────────────────────
@app.get("/health")
async def health():
    return {"status": "ok", "version": "3.0.0"}