"""
workflow/state.py — Enhanced NewsFlowState with all 5 new features
"""
from __future__ import annotations
from typing import TypedDict, Optional, Literal


class NewsFlowState(TypedDict):
    # ── Core input ──────────────────────────────────────────
    source_url: str
    job_id: str
    headline: str
    context: str

    # ── Agent 1: Researcher ──────────────────────────────────
    primary_article: Optional[dict]
    related_articles: list[dict]
    researcher_error: Optional[str]
    knowledge_base: str          # Full concatenated text for Q&A

    # ── Agent 2: Synthesizer ────────────────────────────────
    deep_briefing: Optional[str]
    key_themes: list[str]
    synthesizer_error: Optional[str]

    # ── Agent 3: Story-Arc Detective (Enhanced) ─────────────
    timeline_events: list[dict]  # Now includes sentiment_score + entities_involved
    entities: list[str]
    story_arc_error: Optional[str]

    # ── Agent 4: Impact Analyst (Portfolio-Aware) ───────────
    impact_cards: list[dict]
    portfolio_signal: Optional[dict]   # NEW: Personalized alpha signal
    user_portfolio: list[str]          # NEW: e.g. ["Reliance", "Nifty 50"]
    impact_analyst_error: Optional[str]

    # ── Agent 5: Scriptwriter ────────────────────────────────
    video_script: Optional[dict]
    scriptwriter_error: Optional[str]

    # ── Feature 1: Navigator Q&A ─────────────────────────────
    qa_history: list[dict]             # [{question, answer, timestamp}]

    # ── Feature 2: Localization ──────────────────────────────
    localized_briefings: dict          # {hindi: str, tamil: str, telugu: str}

    # ── Feature 5: Agent Reasoning Log ──────────────────────
    agent_logs: list[dict]             # [{agent, message, timestamp, type}]

    # ── Pipeline control ─────────────────────────────────────
    hitl_status: Literal["pending", "approved", "rejected"]
    hitl_feedback: Optional[str]
    current_stage: str
    completed_stages: list[str]
    pipeline_error: Optional[str]