"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface NavigatorResult {
  query: string;
  master_briefing: string;
  followup_questions: string[];
  angles_researched: string[];
  headlines_used: string[];
  status: string;
}

interface Props {
  profile: any;
  onFollowup?: (q: string) => void;
}

function MasterBriefing({ content }: { content: string }) {
  const sections = content.split(/(?=## )/g).filter(Boolean);
  if (sections.length <= 1) {
    return (
      <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.85rem",
                  lineHeight: 1.75, color: "var(--text-secondary)" }}>
        {content.replace(/^#+\s*/gm, "")}
      </p>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {sections.map((s, i) => {
        const lines = s.split("\n");
        const heading = lines[0].replace(/^#+\s*/, "").trim();
        const body = lines.slice(1).join("\n").trim();
        return (
          <div key={i} style={{ borderLeft: "2px solid var(--accent)",
                                  paddingLeft: "0.85rem" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem",
                         fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                         color: "var(--accent)", marginBottom: 5 }}>
              {heading}
            </p>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.85rem",
                         lineHeight: 1.75, color: "var(--text-secondary)" }}>
              {body}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export function NewsNavigator({ profile, onFollowup }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<NavigatorResult | null>(null);
  const [loading, setLoading] = useState(false);

  const search = async (q: string) => {
    

    if (!q.trim() || loading) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("http://localhost:8000/navigator/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, profile }),
      });
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      
      // ✅ If we got a job_id, go to the full dashboard
      if (data.job_id) {
        router.push(`/dashboard/${data.job_id}`);
        return;
      }
      // Fallback: render inline if no job_id
      setResult(data);
    } catch (e) {
      setResult({
        query: q, status: "error",
        master_briefing: "Search unavailable. Please try generating a briefing instead.",
        followup_questions: [], angles_researched: [], headlines_used: [],
      });
    } finally {
      setLoading(false);
    }
  };

  

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") { search(query); setQuery(""); }
  };

  const handleFollowup = (q: string) => {
    setQuery(q);
    search(q);
    onFollowup?.(q);
  };

  const placeholder = profile
    ? `Ask anything, ${profile.role}... e.g. "How does Iran crisis affect my portfolio?"`
    : `Search or ask anything...`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* Search input */}
      <div style={{ position: "relative" }}>
        <span style={{ position: "absolute", left: 11, top: "50%",
                        transform: "translateY(-50%)", fontSize: "0.8rem",
                        color: "var(--text-muted)", pointerEvents: "none" }}>🔍</span>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          style={{
            width: "100%", padding: "0.65rem 0.9rem 0.65rem 2rem",
            background: "var(--bg-secondary)", border: "1px solid var(--border-strong)",
            borderRadius: 10, color: "var(--text-primary)", fontFamily: "var(--font-sans)",
            fontSize: "0.78rem", outline: "none", transition: "border-color 0.15s",
          }}
          onFocus={e => e.target.style.borderColor = "var(--accent)"}
          onBlur={e  => e.target.style.borderColor = "var(--border-strong)"}
        />
        {loading && (
          <span style={{
            position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
            width: 12, height: 12, border: "1.5px solid var(--accent)",
            borderTopColor: "transparent", borderRadius: "50%", display: "inline-block",
            animation: "spin 0.8s linear infinite",
          }} />
        )}
      </div>

      {/* Loading state */}
      {loading && (
        <div style={{ padding: "0.75rem 1rem", background: "var(--bg-secondary)",
                       borderRadius: 10, border: "1px solid var(--border)" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem",
                       color: "var(--text-muted)" }}>
            Gathering angles · Synthesizing Master Briefing…
          </p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div style={{ background: "var(--bg-secondary)", borderRadius: 12,
                       border: "1px solid var(--border-strong)", overflow: "hidden" }}>
          {/* Query header */}
          <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border)",
                         background: "var(--bg-tertiary)" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", fontWeight: 700,
                         letterSpacing: "0.1em", textTransform: "uppercase",
                         color: "var(--accent)", marginBottom: 3 }}>
              Master Briefing
            </p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem",
                         color: "var(--text-primary)", fontWeight: 600 }}>
              {result.query}
            </p>
            {result.angles_researched?.length > 0 && (
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.68rem",
                           color: "var(--text-muted)", marginTop: 4 }}>
                Researched: {result.angles_researched.slice(0, 3).join(" · ")}
              </p>
            )}
          </div>

          {/* Briefing content */}
          <div style={{ padding: "1rem" }}>
            <MasterBriefing content={result.master_briefing} />
          </div>

          {/* Follow-up buttons */}
          {result.followup_questions?.length > 0 && (
            <div style={{ padding: "0.75rem 1rem", borderTop: "1px solid var(--border)",
                           display: "flex", flexDirection: "column", gap: 6 }}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem",
                           color: "var(--text-muted)", fontWeight: 600,
                           letterSpacing: "0.08em", textTransform: "uppercase",
                           marginBottom: 2 }}>
                Dig Deeper
              </p>
              {result.followup_questions.map((q, i) => (
                <button key={i} onClick={() => handleFollowup(q)}
                        style={{
                          textAlign: "left", padding: "0.5rem 0.75rem", borderRadius: 8,
                          background: "var(--bg-tertiary)", border: "1px solid var(--border)",
                          color: "var(--text-secondary)", fontFamily: "var(--font-sans)",
                          fontSize: "0.75rem", cursor: "pointer", transition: "all 0.15s",
                          lineHeight: 1.4,
                        }}
                        onMouseOver={e => {
                          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)";
                          (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)";
                        }}
                        onMouseOut={e => {
                          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                          (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
                        }}>
                  → {q}
                </button>
              ))}
            </div>
          )}

          {/* Clear */}
          <div style={{ padding: "0.5rem 1rem", borderTop: "1px solid var(--border)",
                         display: "flex", justifyContent: "flex-end" }}>
            <button onClick={() => setResult(null)}
                    style={{ background: "none", border: "none", cursor: "pointer",
                              color: "var(--text-muted)", fontFamily: "var(--font-sans)",
                              fontSize: "0.7rem" }}>
              Clear ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}