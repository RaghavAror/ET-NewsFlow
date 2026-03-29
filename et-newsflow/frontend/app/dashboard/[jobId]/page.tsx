"use client";

import { useState, useEffect, useRef } from "react";
import { useNewsFlow } from "@/hooks/useNewsFlow";
import { StatusStream } from "@/components/StatusStream";
import { VideoStudio } from "@/components/VideoStudio";
import { ChatNavigator } from "@/components/ChatNavigator";
import { LanguageToggle } from "@/components/LanguageToggle";

// ── Types ────────────────────────────────────────────────────
interface Props { params: { jobId: string }; }

// ── Hardcoded article ─────────────────────────────────────────
const HARDCODED_JOB_ID = "hardcoded-west-asia-chip-001";

const HARDCODED_BRIEFING = `## Key Development
The ongoing conflict in West Asia is casting a shadow on India's semiconductor ambitions, with rising crude-linked costs and supply chain disruptions expected to have a significant impact on the industry. This is particularly concerning for outsourced semiconductor assembly and test (OSAT) players, who are likely to face increased costs and logistical challenges. The Indian government's plans to promote the domestic semiconductor industry may be hindered by these external factors.

## Why It Matters Now
The current geopolitical tensions in West Asia are exacerbating the already fragile global semiconductor supply chain, making it challenging for India to achieve its semiconductor goals. The rising costs and logistical challenges may deter investors and hinder the growth of the domestic industry, which is crucial for India's economic development. The Indian government needs to reassess its strategies to mitigate the impact of the conflict on the semiconductor industry.

## The Bigger Trend
The global semiconductor industry is facing significant challenges, including supply chain disruptions, rising costs, and geopolitical tensions. The ongoing conflict in West Asia is further complicating the situation, highlighting the need for India to diversify its supply chain and reduce its dependence on imported components. The Indian government's efforts to promote the domestic semiconductor industry are part of a larger trend of countries seeking to develop their own semiconductor capabilities.

## Contrarian View
Some experts argue that the current conflict in West Asia may actually create opportunities for India's semiconductor industry, as companies look to diversify their supply chains and reduce their dependence on traditional manufacturing hubs. Additionally, the Indian government's incentives and support for the domestic industry may help to attract investment and talent, enabling the country to develop a competitive semiconductor sector. However, this view is not universally held, and the risks and challenges posed by the conflict cannot be ignored.

## Data Points
The Indian semiconductor industry is expected to grow to $63 billion by 2026, with the government aiming to attract $20 billion in investments. However, the ongoing conflict in West Asia may increase the cost of setting up semiconductor manufacturing facilities in India by 10-15%. The Indian government has already approved several semiconductor manufacturing projects, including a $10 billion facility by Vedanta-Foxconn.`;

const HARDCODED_STATE = {
  job_id: HARDCODED_JOB_ID,
  headline: "West Asia conflict casts shadow on India's chip goals",
  primary_article: {
    title: "West Asia conflict casts shadow on India's chip goals",
    published_at: "2026-03-29",
  },
  deep_briefing: HARDCODED_BRIEFING,
  key_themes: ["Technology", "Global Trade", "Geopolitics"],
  timeline_events: [],
  impact_cards: [],
  portfolio_signal: null,
  knowledge_base: HARDCODED_BRIEFING,
  qa_history: [],
  hitl_status: "approved" as const,
  current_stage: "published",
  completed_stages: ["researcher","synthesizer","story_arc","impact_analyst","scriptwriter"],
  video_script: {
    hook: "India's chip dreams face a new threat — rising costs from West Asia conflict are shaking OSAT players.",
    segments: [
      "The West Asia conflict is pushing up crude-linked costs, hitting India's semiconductor supply chain hard.",
      "OSAT players face increased logistics costs and sourcing delays just as India scales its chip ambitions.",
      "The government's $20 billion semiconductor target may need a rethink as geopolitical risks mount.",
      "Experts are divided — some see opportunity as global firms diversify away from traditional hubs.",
    ],
    call_to_action: "Follow ET NewsFlow for daily semiconductor and tech sector updates.",
  },
};

// ── Hardcoded dashboard component ────────────────────────────
function HardcodedDashboard() {
  const [activePersona, setActivePersona] = useState("all");
  const [activeTab, setActiveTab]         = useState<"briefing" | "video" | "chat">("briefing");
  const [published, setPublished]         = useState(false);
  const [submitting, setSubmitting]       = useState(false);

  const showDraft = !published;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* DRAFT watermark */}
      {showDraft && <div className="draft-watermark">DRAFT</div>}

      {/* Header */}
      <header style={{
        position: "sticky", top: 0, zIndex: 30,
        background: "rgba(15,17,21,0.92)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0.75rem 1.5rem",
                      display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem",
                                fontWeight: 700, color: "var(--text-primary)", textDecoration: "none" }}>
            ET News<span style={{ color: "var(--accent)" }}>Flow</span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {HARDCODED_STATE.completed_stages.map((s) => (
              <span key={s} style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem",
                                      color: "var(--green)", display: "flex", alignItems: "center", gap: 4 }}>
                ✓ {s.charAt(0).toUpperCase() + s.slice(1)}
              </span>
            ))}
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 800, margin: "0 auto", padding: "2.5rem 1.5rem",
                     paddingBottom: showDraft ? "6rem" : "3rem" }}>
        {/* Meta */}
        <div style={{ marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", fontWeight: 700,
                          letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)" }}>
            Economic Times
          </span>
          <span style={{ color: "var(--border-strong)" }}>·</span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", color: "var(--text-muted)" }}>
            {HARDCODED_STATE.primary_article.published_at}
          </span>
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem,3.5vw,2.2rem)",
                      fontWeight: 700, lineHeight: 1.2, color: "var(--text-primary)",
                      marginBottom: "1.25rem", letterSpacing: "-0.01em" }}>
          {HARDCODED_STATE.headline}
        </h1>

        {/* Persona chips + theme tags */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: "1.75rem" }}>
          {PERSONAS.map((p) => (
            <button key={p.id} onClick={() => setActivePersona(p.id)}
                    style={{
                      padding: "0.3rem 0.9rem", borderRadius: 20,
                      background: activePersona === p.id ? "var(--accent)" : "transparent",
                      border: activePersona === p.id ? "1px solid var(--accent)" : "1px solid var(--border-strong)",
                      color: activePersona === p.id ? "white" : "var(--text-muted)",
                      fontFamily: "var(--font-sans)", fontSize: "0.73rem", fontWeight: 500,
                      cursor: "pointer", transition: "all 0.15s",
                    }}>
              {p.label}
            </button>
          ))}
          {HARDCODED_STATE.key_themes.map((t) => (
            <span key={t} style={{ padding: "0.25rem 0.75rem", borderRadius: 20,
                                    background: "var(--bg-tertiary)", border: "1px solid var(--border)",
                                    color: "var(--text-muted)", fontFamily: "var(--font-sans)", fontSize: "0.7rem" }}>
              {t}
            </span>
          ))}
        </div>

        <div style={{ height: 1, background: "var(--border)", marginBottom: "2rem" }} />

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid var(--border)", marginBottom: "2rem" }}>
          {[
            { id: "briefing", label: "Deep Briefing" },
            { id: "video",    label: "🎬 Video Studio" },
            { id: "chat",     label: "💬 Chat" },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                    style={{
                      padding: "0.65rem 1rem", border: "none", background: "none",
                      borderBottom: activeTab === tab.id ? "2px solid var(--accent)" : "2px solid transparent",
                      color: activeTab === tab.id ? "var(--accent)" : "var(--text-muted)",
                      fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 500,
                      cursor: "pointer", transition: "all 0.15s", marginBottom: -1,
                    }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "briefing" && <DeepBriefing content={HARDCODED_BRIEFING} />}
        {activeTab === "video"    && <VideoStudio jobId={HARDCODED_JOB_ID} script={HARDCODED_STATE.video_script} />}
        {activeTab === "chat"     && <ChatNavigator jobId={HARDCODED_JOB_ID} />}
      </main>

      {/* ── Floating Action Bar (HITL) ── only before publish ── */}
      {showDraft && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 60,
          padding: "1rem 1.5rem",
          background: "rgba(15,17,21,0.92)", backdropFilter: "blur(16px)",
          borderTop: "1px solid var(--border-strong)",
        }}>
          <div style={{ maxWidth: 800, margin: "0 auto",
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        gap: "1rem", flexWrap: "wrap" }}>
            <div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem",
                           fontWeight: 600, color: "var(--text-primary)" }}>
                Ready to publish?
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem",
                           color: "var(--text-muted)", marginTop: 2 }}>
                Review the briefing above — this is a draft preview
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={() => window.location.href = "/"}
                style={{
                  padding: "0.6rem 1.25rem", borderRadius: 8, cursor: "pointer",
                  background: "transparent", border: "1px solid var(--border-strong)",
                  color: "var(--text-secondary)", fontFamily: "var(--font-sans)",
                  fontSize: "0.82rem", fontWeight: 500,
                }}
              >
                ↩ Regenerate
              </button>
              <button
                disabled={submitting}
                onClick={() => {
                  setSubmitting(true);
                  setTimeout(() => { setPublished(true); setSubmitting(false); }, 1000);
                }}
                style={{
                  padding: "0.6rem 1.5rem", borderRadius: 8, cursor: "pointer",
                  background: "var(--accent)", border: "none",
                  color: "white", fontFamily: "var(--font-sans)",
                  fontSize: "0.82rem", fontWeight: 600,
                  display: "flex", alignItems: "center", gap: 8,
                  opacity: submitting ? 0.6 : 1, transition: "opacity 0.15s",
                }}
              >
                {submitting
                  ? <><span style={{ width: 14, height: 14, border: "2px solid white",
                                      borderTopColor: "transparent", borderRadius: "50%",
                                      display: "inline-block", animation: "spin 0.8s linear infinite" }} />
                      Publishing...</>
                  : "Publish to Live →"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const PERSONAS = [
  { id: "all",      label: "General" },
  { id: "investor", label: "Investor" },
  { id: "techie",   label: "Techie" },
  { id: "policy",   label: "Policy Maker" },
  { id: "student",  label: "Student" },
];

// ── Sentiment helpers ────────────────────────────────────────
function sentimentClass(score?: number): string {
  if (score === undefined || score === null) return "sentiment-neutral";
  if (score >= 0.25) return "sentiment-positive";
  if (score <= -0.25) return "sentiment-negative";
  return "sentiment-neutral";
}

function sentimentDot(score?: number): string {
  if (score === undefined || score === null) return "bg-white/20";
  if (score >= 0.25) return "bg-green-500";
  if (score <= -0.25) return "bg-red-500";
  return "bg-blue-400";
}

// ── Deep Briefing renderer ───────────────────────────────────
function DeepBriefing({ content }: { content: string }) {
  if (!content) return (
    <p style={{ color: "var(--text-muted)", fontFamily: "var(--font-serif)" }}>
      No briefing available.
    </p>
  );

  const sections = content.split(/(?=## )/g).filter(Boolean);

  if (sections.length <= 1) {
    return (
      <div className="prose-et">
        {content.split(/\n+/).filter(Boolean).map((p, i) => (
          <p key={i}>{p.replace(/^#+\s*/, "")}</p>
        ))}
      </div>
    );
  }

  return (
    <div className="prose-et">
      {sections.map((section, i) => {
        const lines = section.split("\n");
        const heading = lines[0].replace(/^#+\s*/, "").trim();
        const body = lines.slice(1).join("\n").trim();
        return (
          <div key={i}>
            <h3>{heading}</h3>
            <p>{body}</p>
          </div>
        );
      })}
    </div>
  );
}

// ── Timeline item ────────────────────────────────────────────
function TimelineItem({ event, index }: { event: any; index: number }) {
  const score = event.sentiment_score;
  return (
    <div className="flex gap-4 group" style={{ animationDelay: `${index * 60}ms` }}>
      {/* Spine */}
      <div className="flex flex-col items-center flex-shrink-0 w-4">
        <div className={`w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 ${sentimentDot(score)}`} />
        <div style={{ width: 1, flex: 1, background: "var(--border)", marginTop: 4 }} />
      </div>
      {/* Content */}
      <div className="pb-5 flex-1 min-w-0">
        <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontFamily: "var(--font-sans)",
                    letterSpacing: "0.05em", marginBottom: 3 }}>
          {event.date} · <span style={{ color: "var(--accent)" }}>{event.entity}</span>
        </p>
        <p style={{ fontSize: "0.85rem", lineHeight: 1.55, color: "var(--text-primary)",
                    fontFamily: "var(--font-serif)" }}>
          {event.event}
        </p>
        {event.entities_involved?.length > 1 && (
          <div className="flex gap-1 mt-2 flex-wrap">
            {event.entities_involved.slice(0, 3).map((e: string) => (
              <span key={e} style={{
                fontSize: "0.65rem", padding: "1px 8px",
                background: "rgba(255,255,255,0.05)", borderRadius: 20,
                color: "var(--text-muted)", border: "1px solid var(--border)"
              }}>{e}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Impact card ──────────────────────────────────────────────
function ImpactCard({ card, persona }: { card: any; index: number; persona: string }) {
  const PERSONA_ICONS: Record<string, string> = {
    "Retail Investor": "📈", "Corporate Exec": "🏢", "Student": "🎓",
  };

  const getSentimentFromBody = (body: string): number => {
    const positive = /growth|opportunity|gain|positive|bullish|strong|surge/gi;
    const negative = /risk|decline|loss|negative|bearish|weak|fall|concern/gi;
    const pos = (body.match(positive) || []).length;
    const neg = (body.match(negative) || []).length;
    return pos > neg ? 0.5 : neg > pos ? -0.5 : 0;
  };

  const score = getSentimentFromBody(card.body || "");

  return (
    <div className={`rounded-xl p-4 space-y-2.5 ${sentimentClass(score)}`}
         style={{ background: "var(--bg-tertiary)", borderRadius: 12,
                  paddingLeft: "calc(1rem + 3px)" }}>
      <div className="flex items-center gap-2">
        <span style={{ fontSize: "1rem" }}>
          {PERSONA_ICONS[card.persona] || "👤"}
        </span>
        <span style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em",
                       textTransform: "uppercase", color: "var(--text-muted)",
                       fontFamily: "var(--font-sans)" }}>
          {card.persona}
        </span>
      </div>
      <p style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem",
                  fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.3 }}>
        {card.headline}
      </p>
      <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.82rem",
                  lineHeight: 1.65, color: "var(--text-secondary)" }}>
        {card.body}
      </p>
      <div style={{ paddingTop: 8, borderTop: "1px solid var(--border)" }}
           className="flex items-start gap-2">
        <span style={{ color: "var(--accent)", fontSize: "0.75rem", marginTop: 1 }}>→</span>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem",
                    color: "var(--accent)", lineHeight: 1.5 }}>
          {card.action_item}
        </p>
      </div>
    </div>
  );
}

// ── Portfolio signal ─────────────────────────────────────────
function PortfolioCard({ signal }: { signal: any }) {
  if (!signal) return null;
  const colors: Record<string, string> = {
    BUY: "#22c55e", SELL: "#ef4444", HOLD: "#60a5fa", WATCH: "#f59e0b"
  };
  const color = colors[signal.signal_type] || "#94a3b8";

  return (
    <div style={{ background: "var(--bg-tertiary)", borderRadius: 12, padding: "1rem",
                  borderLeft: `3px solid ${color}`, paddingLeft: "calc(1rem + 3px)" }}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p style={{ fontSize: "0.65rem", fontFamily: "var(--font-sans)", fontWeight: 600,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      color: "var(--text-muted)", marginBottom: 4 }}>
            ⚡ Portfolio Signal
          </p>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem",
                      fontWeight: 600, color: "var(--text-primary)" }}>
            {signal.headline}
          </p>
        </div>
        <span style={{ fontSize: "1.25rem", fontWeight: 800, color, flexShrink: 0 }}>
          {signal.signal_type}
        </span>
      </div>
      <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.82rem",
                  lineHeight: 1.65, color: "var(--text-secondary)", marginTop: 8 }}>
        {signal.analysis}
      </p>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color,
                  marginTop: 8, paddingTop: 8, borderTop: "1px solid var(--border)" }}>
        → {signal.recommended_action}
      </p>
    </div>
  );
}

// ── Insights Drawer ──────────────────────────────────────────
function InsightsDrawer({ open, onClose, state, activePersona }: {
  open: boolean; onClose: () => void; state: any; activePersona: string;
}) {
  const [tab, setTab] = useState<"timeline" | "impact" | "portfolio">("impact");

  const filteredCards = (state?.impact_cards || []).filter((card: any) => {
    if (activePersona === "all") return true;
    const map: Record<string, string[]> = {
      investor: ["Retail Investor"],
      techie:   ["Corporate Exec"],
      policy:   ["Corporate Exec"],
      student:  ["Student"],
    };
    return map[activePersona]?.includes(card.persona) ?? true;
  });

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={onClose}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
                   zIndex: 40, backdropFilter: "blur(2px)" }}
        />
      )}

      {/* Drawer panel */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: "min(480px, 92vw)",
        background: "var(--bg-secondary)", borderLeft: "1px solid var(--border-strong)",
        zIndex: 50, display: "flex", flexDirection: "column",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(0.32,0.72,0,1)",
        overflowY: "hidden",
      }}>
        {/* Drawer header */}
        <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border)",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      flexShrink: 0 }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem",
                         fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
                         color: "var(--text-muted)" }}>
            Insights
          </span>
          <button onClick={onClose}
                  style={{ color: "var(--text-muted)", fontSize: "1.1rem",
                           cursor: "pointer", background: "none", border: "none",
                           padding: "4px 8px", borderRadius: 6 }}
                  onMouseOver={e => (e.currentTarget.style.color = "var(--text-primary)")}
                  onMouseOut={e  => (e.currentTarget.style.color = "var(--text-muted)")}>
            ✕
          </button>
        </div>

        {/* Drawer tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
          {[
            { id: "impact",    label: "Impact" },
            { id: "timeline",  label: "Timeline" },
            { id: "portfolio", label: "Portfolio" },
          ].map((t) => (
            <button key={t.id} onClick={() => setTab(t.id as any)}
                    style={{
                      flex: 1, padding: "0.75rem", fontSize: "0.75rem", fontWeight: 500,
                      fontFamily: "var(--font-sans)", cursor: "pointer", border: "none",
                      background: "none", borderBottom: tab === t.id ? "2px solid var(--accent)" : "2px solid transparent",
                      color: tab === t.id ? "var(--accent)" : "var(--text-muted)",
                      transition: "all 0.15s",
                    }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Drawer content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem 1.5rem" }}>
          {tab === "impact" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {filteredCards.length > 0
                ? filteredCards.map((card: any, i: number) => (
                    <ImpactCard key={i} card={card} index={i} persona={activePersona} />
                  ))
                : (state?.impact_cards || []).map((card: any, i: number) => (
                    <ImpactCard key={i} card={card} index={i} persona={activePersona} />
                  ))
              }
            </div>
          )}

          {tab === "timeline" && (
            <div>
              {(state?.timeline_events || []).length === 0 ? (
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem",
                            fontFamily: "var(--font-serif)" }}>
                  No timeline events extracted.
                </p>
              ) : (
                (state?.timeline_events || []).map((event: any, i: number) => (
                  <TimelineItem key={i} event={event} index={i} />
                ))
              )}
            </div>
          )}

          {tab === "portfolio" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <PortfolioCard signal={state?.portfolio_signal} />
              {state?.user_portfolio?.length > 0 && (
                <div style={{ background: "var(--bg-tertiary)", borderRadius: 12, padding: "1rem" }}>
                  <p style={{ fontSize: "0.65rem", fontFamily: "var(--font-sans)", fontWeight: 600,
                               letterSpacing: "0.1em", textTransform: "uppercase",
                               color: "var(--text-muted)", marginBottom: 10 }}>
                    Your Portfolio
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {state.user_portfolio.map((h: string) => (
                      <span key={h} style={{
                        fontSize: "0.75rem", padding: "3px 10px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid var(--border-strong)",
                        borderRadius: 20, color: "var(--text-secondary)",
                        fontFamily: "var(--font-sans)"
                      }}>{h}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ── Floating Action Bar (HITL approve/reject) ────────────────
function FloatingActionBar({ onApprove, onReject, state }: {
  onApprove: () => void; onReject: () => void; state: any;
}) {
  const [submitting, setSubmitting] = useState(false);

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 60,
      padding: "1rem 1.5rem", background: "rgba(15,17,21,0.92)",
      backdropFilter: "blur(16px)", borderTop: "1px solid var(--border-strong)",
    }}>
      <div style={{ maxWidth: 800, margin: "0 auto",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem",
                      fontWeight: 600, color: "var(--text-primary)" }}>
            Ready to publish?
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem",
                      color: "var(--text-muted)", marginTop: 2 }}>
            Review the briefing above — this is a draft preview
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            onClick={async () => { setSubmitting(true); await onReject(); setSubmitting(false); }}
            disabled={submitting}
            style={{
              padding: "0.6rem 1.25rem", borderRadius: 8, cursor: "pointer",
              background: "transparent", border: "1px solid var(--border-strong)",
              color: "var(--text-secondary)", fontFamily: "var(--font-sans)",
              fontSize: "0.82rem", fontWeight: 500, transition: "all 0.15s",
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = "var(--border-strong)"; e.currentTarget.style.color = "var(--text-primary)"; }}
            onMouseOut={e => { e.currentTarget.style.color = "var(--text-secondary)"; }}
          >
            ↩ Regenerate
          </button>
          <button
            onClick={async () => { setSubmitting(true); await onApprove(); }}
            disabled={submitting}
            style={{
              padding: "0.6rem 1.5rem", borderRadius: 8, cursor: "pointer",
              background: "var(--accent)", border: "none",
              color: "white", fontFamily: "var(--font-sans)",
              fontSize: "0.82rem", fontWeight: 600, transition: "all 0.15s",
              display: "flex", alignItems: "center", gap: 8,
              opacity: submitting ? 0.6 : 1,
            }}
          >
            {submitting
              ? <><span style={{ width: 14, height: 14, border: "2px solid white",
                                  borderTopColor: "transparent", borderRadius: "50%",
                                  display: "inline-block", animation: "spin 0.8s linear infinite" }} />
                  Publishing...</>
              : "Publish to Live →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main dashboard ───────────────────────────────────────────
export default function DashboardPage({ params }: Props) {
  const { jobId } = params;
  if (jobId === HARDCODED_JOB_ID) return <HardcodedDashboard />;
  const { state, stage, isPublished, approve, reject, agentLogs } = useNewsFlow(jobId);
  const [activePersona, setActivePersona] = useState("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"briefing" | "video" | "chat">("briefing");
  const [displayBriefing, setDisplayBriefing] = useState("");
  const [currentLang, setCurrentLang] = useState("english");
  const isRunning = !isPublished && stage !== "awaiting_approval" && stage !== "error";

  useEffect(() => {
    if (state?.deep_briefing && !displayBriefing) {
      setDisplayBriefing(state.deep_briefing);
    }
  }, [state?.deep_briefing]);

  // ── Loading / pipeline running ────────────────────────────
  if (!isPublished && stage !== "awaiting_approval") {
    const STAGE_MSGS: Record<string, string> = {
      starting:              "Initializing…",
      researcher_started:    "Researching article context…",
      researcher_done:       "Research complete",
      synthesizer_started:   "Writing Deep Briefing…",
      synthesizer_done:      "Briefing ready",
      story_arc_started:     "Building story timeline…",
      story_arc_done:        "Timeline ready",
      impact_analyst_started:"Analysing portfolio impact…",
      impact_analyst_done:   "Impact analysis done",
      scriptwriter_started:  "Writing broadcast script…",
      scriptwriter_done:     "Script ready",
    };

    return (
      <div style={{ minHeight: "100vh", background: "var(--bg-primary)",
                    display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", maxWidth: 360 }}>
          {/* Animated loader */}
          <div style={{ width: 48, height: 48, margin: "0 auto 1.5rem",
                        border: "2px solid rgba(249,115,22,0.2)",
                        borderTopColor: "var(--accent)", borderRadius: "50%",
                        animation: "spin 1s linear infinite" }} />
          <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem",
                      color: "var(--text-primary)", marginBottom: 8 }}>
            {STAGE_MSGS[stage] ?? "Processing…"}
          </p>
          {/* Mini agent log */}
          {agentLogs.length > 0 && (
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem",
                        color: "var(--text-muted)", lineHeight: 1.6 }}>
              [{agentLogs[agentLogs.length - 1]?.agent}] {agentLogs[agentLogs.length - 1]?.message}
            </p>
          )}
          {/* Progress dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 20 }}>
            {["researcher","synthesizer","story_arc","impact_analyst","scriptwriter"].map((s) => {
              const done = agentLogs.some(l => l.agent.toLowerCase().includes(s.split("_")[0]) && l.type === "success");
              return (
                <div key={s} style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: done ? "var(--green)" : "rgba(255,255,255,0.1)",
                  transition: "background 0.3s",
                }} />
              );
            })}
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const showDraft = stage === "awaiting_approval" && !isPublished;
  const article = state?.primary_article;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* Draft watermark */}
      {showDraft && <div className="draft-watermark">DRAFT</div>}

      {/* ── Header ──────────────────────────────────────────── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 30,
        background: "rgba(15,17,21,0.92)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}>
        {/* Agent status bar */}
        {(isRunning || agentLogs.length > 0) && (
          <div style={{
            height: 28, background: "var(--bg-tertiary)",
            display: "flex", alignItems: "center", paddingInline: "1.5rem", gap: 10,
            borderBottom: "1px solid var(--border)",
          }}>
            {isRunning && (
              <div style={{ width: 6, height: 6, borderRadius: "50%",
                             background: "var(--accent)", animation: "pulse 1.5s infinite" }} />
            )}
            {agentLogs.length > 0 && (
              <>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.68rem",
                                color: "var(--accent)", fontWeight: 600 }}>
                  [{agentLogs[agentLogs.length-1]?.agent}]
                </span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.68rem",
                                color: "var(--text-muted)", flex: 1, overflow: "hidden",
                                textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {agentLogs[agentLogs.length-1]?.message}
                </span>
              </>
            )}
            <div style={{ display: "flex", gap: 4, marginLeft: "auto" }}>
              {["researcher","synthesizer","story_arc","impact_analyst","scriptwriter"].map((s) => {
                const done = agentLogs.some(l => l.agent.toLowerCase().includes(s.split("_")[0]) && l.type === "success");
                return <div key={s} style={{ width: 5, height: 5, borderRadius: "50%",
                                              background: done ? "var(--green)" : "rgba(255,255,255,0.1)" }} />;
              })}
            </div>
          </div>
        )}

        {/* Main nav */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0.75rem 1.5rem",
                      display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem",
                                fontWeight: 700, color: "var(--text-primary)",
                                textDecoration: "none" }}>
            ET News<span style={{ color: "var(--accent)" }}>Flow</span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <StatusStream stage={stage} completedStages={state?.completed_stages ?? []} />
            {state?.deep_briefing && (
              <LanguageToggle
                jobId={jobId}
                originalBriefing={state.deep_briefing}
                onBriefingChange={(text, lang) => {
                  setDisplayBriefing(text);
                  setCurrentLang(lang);
                }}
              />
            )}
            {isPublished && (
              <button
                onClick={() => setDrawerOpen(true)}
                style={{
                  padding: "0.4rem 1rem", borderRadius: 20,
                  background: drawerOpen ? "var(--accent)" : "var(--bg-tertiary)",
                  border: "1px solid var(--border-strong)",
                  color: drawerOpen ? "white" : "var(--text-primary)",
                  fontFamily: "var(--font-sans)", fontSize: "0.78rem",
                  fontWeight: 500, cursor: "pointer", transition: "all 0.15s",
                  display: "flex", alignItems: "center", gap: 6,
                }}
              >
                <span style={{ fontSize: "0.8rem" }}>◧</span> Insights
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── Article area ─────────────────────────────────────── */}
      <main style={{ maxWidth: 800, margin: "0 auto", padding: "2.5rem 1.5rem",
                     paddingBottom: showDraft ? "6rem" : "3rem" }}>

        {/* Publication label */}
        <div className="fade-up fade-up-1" style={{ marginBottom: "1.25rem",
             display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem",
                          fontWeight: 700, letterSpacing: "0.15em",
                          textTransform: "uppercase", color: "var(--accent)" }}>
            Economic Times
          </span>
          <span style={{ color: "var(--border-strong)" }}>·</span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem",
                          color: "var(--text-muted)" }}>
            {article?.published_at ?? new Date().toLocaleDateString("en-IN")}
          </span>
          {currentLang !== "english" && (
            <>
              <span style={{ color: "var(--border-strong)" }}>·</span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem",
                              color: "var(--text-muted)" }}>
                🌐 {currentLang.charAt(0).toUpperCase() + currentLang.slice(1)}
              </span>
            </>
          )}
        </div>

        {/* Headline */}
        <h1 className="fade-up fade-up-2"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem,3.5vw,2.2rem)",
                      fontWeight: 700, lineHeight: 1.2, color: "var(--text-primary)",
                      marginBottom: "1.25rem", letterSpacing: "-0.01em" }}>
          {article?.title ?? state?.headline ?? "Loading…"}
        </h1>

        {/* Persona chips + tags */}
        <div className="fade-up fade-up-3"
             style={{ display: "flex", flexWrap: "wrap", alignItems: "center",
                       gap: 8, marginBottom: "1.75rem" }}>
          {/* Persona chips */}
          {PERSONAS.map((p) => (
            <button key={p.id} onClick={() => setActivePersona(p.id)}
                    style={{
                      padding: "0.3rem 0.9rem", borderRadius: 20,
                      background: activePersona === p.id ? "var(--accent)" : "transparent",
                      border: activePersona === p.id
                        ? "1px solid var(--accent)"
                        : "1px solid var(--border-strong)",
                      color: activePersona === p.id ? "white" : "var(--text-muted)",
                      fontFamily: "var(--font-sans)", fontSize: "0.73rem", fontWeight: 500,
                      cursor: "pointer", transition: "all 0.15s",
                    }}>
              {p.label}
            </button>
          ))}

          {/* Theme tags */}
          {(state?.key_themes || []).slice(0, 3).map((t: string) => (
            <span key={t} style={{
              padding: "0.25rem 0.75rem", borderRadius: 20,
              background: "var(--bg-tertiary)", border: "1px solid var(--border)",
              color: "var(--text-muted)", fontFamily: "var(--font-sans)", fontSize: "0.7rem",
            }}>{t}</span>
          ))}
        </div>

        {/* Divider */}
        <div className="fade-up fade-up-4"
             style={{ height: 1, background: "var(--border)", marginBottom: "2rem" }} />

        {/* Content tabs */}
        <div className="fade-up fade-up-4"
             style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--border)",
                       marginBottom: "2rem" }}>
          {[
            { id: "briefing", label: "Deep Briefing" },
            { id: "video",    label: "🎬 Video Studio" },
            { id: "chat",     label: "💬 Chat" },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                    style={{
                      padding: "0.65rem 1rem", border: "none", background: "none",
                      borderBottom: activeTab === tab.id
                        ? "2px solid var(--accent)" : "2px solid transparent",
                      color: activeTab === tab.id ? "var(--accent)" : "var(--text-muted)",
                      fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 500,
                      cursor: "pointer", transition: "all 0.15s", marginBottom: -1,
                    }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "briefing" && (
          <DeepBriefing content={displayBriefing || state?.deep_briefing || ""} />
        )}
        {activeTab === "video" && (
          <VideoStudio jobId={jobId} script={state?.video_script} />
        )}
        {activeTab === "chat" && (
          <ChatNavigator jobId={jobId} />
        )}
      </main>

      {/* ── Insights Drawer ─────────────────────────────────── */}
      <InsightsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        state={state}
        activePersona={activePersona}
      />

      {/* ── Floating Action Bar (HITL) ───────────────────────── */}
      {showDraft && (
        <FloatingActionBar
          onApprove={approve}
          onReject={reject}
          state={state}
        />
      )}
    </div>
  );
}