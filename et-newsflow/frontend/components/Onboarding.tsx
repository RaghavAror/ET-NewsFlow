"use client";

import { useState } from "react";

export interface UserProfile {
  role: string;
  age: string;
  interests: string[];
  portfolio: string[];
}

const ROLES = [
  { id: "investor",  label: "Investor",     icon: "📈", desc: "Portfolio & market alpha" },
  { id: "founder",   label: "Founder",      icon: "🚀", desc: "Funding & competitor moves" },
  { id: "student",   label: "Student",      icon: "🎓", desc: "Explainers & background" },
  { id: "executive", label: "Executive",    icon: "🏢", desc: "Strategy & policy impact" },
  { id: "journalist",label: "Journalist",   icon: "📰", desc: "Sources & fact context" },
  { id: "policy",    label: "Policy Maker", icon: "🏛", desc: "Regulation & macro" },
];

const INTERESTS = [
  "Equity Markets", "Crypto & Web3", "Startups & VC", "Monetary Policy",
  "Real Estate", "Technology", "Energy & ESG", "Global Trade",
  "Banking & Finance", "Healthcare", "Infrastructure", "Geopolitics",
];

const AGE_GROUPS = [
  { id: "18-24", label: "18–24" },
  { id: "25-34", label: "25–34" },
  { id: "35-49", label: "35–49" },
  { id: "50+",   label: "50+" },
];

interface Props {
  onComplete: (profile: UserProfile) => void;
}

export function Onboarding({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState("");
  const [age, setAge] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [portfolio, setPortfolio] = useState("Reliance Industries, Nifty 50, Infosys");

  const toggleInterest = (i: string) => {
    setInterests(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : prev.length < 5 ? [...prev, i] : prev
    );
  };

  const handleFinish = () => {
    onComplete({
      role,
      age,
      interests,
      portfolio: portfolio.split(",").map(s => s.trim()).filter(Boolean),
    });
  };

  return (
    <div style={{
      minHeight: "100vh", background: "var(--bg-primary)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "2rem",
    }}>
      <div style={{ width: "100%", maxWidth: 560 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem",
                      fontWeight: 700, color: "var(--text-primary)" }}>
            ET News<span style={{ color: "var(--accent)" }}>Flow</span>
          </p>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.9rem",
                      color: "var(--text-muted)", marginTop: 6 }}>
            Personalise your intelligence feed
          </p>
        </div>

        {/* Progress */}
        <div style={{ display: "flex", gap: 4, marginBottom: "2rem" }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{
              flex: 1, height: 3, borderRadius: 2,
              background: i <= step ? "var(--accent)" : "var(--border-strong)",
              transition: "background 0.3s",
            }} />
          ))}
        </div>

        {/* Step 0: Role */}
        {step === 0 && (
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem",
                          fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>
              What best describes you?
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem",
                        color: "var(--text-muted)", marginBottom: "1.5rem" }}>
              We'll tailor every briefing to your perspective.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {ROLES.map(r => (
                <button key={r.id} onClick={() => setRole(r.id)}
                        style={{
                          padding: "1rem", borderRadius: 12, cursor: "pointer",
                          background: role === r.id ? "var(--accent-dim)" : "var(--bg-secondary)",
                          border: role === r.id ? "1px solid var(--accent)" : "1px solid var(--border-strong)",
                          textAlign: "left", transition: "all 0.15s",
                        }}>
                  <div style={{ fontSize: "1.4rem", marginBottom: 6 }}>{r.icon}</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem",
                                fontWeight: 600, color: role === r.id ? "var(--accent)" : "var(--text-primary)" }}>
                    {r.label}
                  </div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem",
                                color: "var(--text-muted)", marginTop: 2 }}>
                    {r.desc}
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(1)} disabled={!role}
                    style={nextBtnStyle(!role)}>
              Continue →
            </button>
          </div>
        )}

        {/* Step 1: Age */}
        {step === 1 && (
          <div>
            <h2 style={headingStyle}>How old are you?</h2>
            <p style={subStyle}>Helps us calibrate complexity and context depth.</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: "2rem" }}>
              {AGE_GROUPS.map(a => (
                <button key={a.id} onClick={() => setAge(a.id)}
                        style={{
                          padding: "0.65rem 1.5rem", borderRadius: 24, cursor: "pointer",
                          background: age === a.id ? "var(--accent)" : "var(--bg-secondary)",
                          border: age === a.id ? "1px solid var(--accent)" : "1px solid var(--border-strong)",
                          color: age === a.id ? "white" : "var(--text-secondary)",
                          fontFamily: "var(--font-sans)", fontSize: "0.85rem", fontWeight: 500,
                          transition: "all 0.15s",
                        }}>
                  {a.label}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setStep(0)} style={backBtnStyle}>← Back</button>
              <button onClick={() => setStep(2)} disabled={!age} style={nextBtnStyle(!age)}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Interests */}
        {step === 2 && (
          <div>
            <h2 style={headingStyle}>Pick up to 5 topics</h2>
            <p style={subStyle}>Your feed will prioritise these areas.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: "2rem" }}>
              {INTERESTS.map(i => {
                const sel = interests.includes(i);
                return (
                  <button key={i} onClick={() => toggleInterest(i)}
                          style={{
                            padding: "0.45rem 1rem", borderRadius: 20, cursor: "pointer",
                            background: sel ? "var(--accent-dim)" : "transparent",
                            border: sel ? "1px solid var(--accent)" : "1px solid var(--border-strong)",
                            color: sel ? "var(--accent)" : "var(--text-muted)",
                            fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 500,
                            transition: "all 0.15s",
                          }}>
                    {i}
                  </button>
                );
              })}
            </div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem",
                        color: "var(--text-muted)", marginBottom: "1rem" }}>
              {interests.length}/5 selected
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setStep(1)} style={backBtnStyle}>← Back</button>
              <button onClick={() => setStep(3)} disabled={interests.length === 0}
                      style={nextBtnStyle(interests.length === 0)}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Portfolio */}
        {step === 3 && (
          <div>
            <h2 style={headingStyle}>Your portfolio holdings</h2>
            <p style={subStyle}>
              We'll generate personalised alpha signals for these. Separate by comma.
            </p>
            <textarea
              value={portfolio}
              onChange={e => setPortfolio(e.target.value)}
              rows={3}
              placeholder="e.g. Reliance Industries, Nifty 50, HDFC Bank, Infosys"
              style={{
                width: "100%", padding: "0.85rem 1rem", borderRadius: 10,
                background: "var(--bg-secondary)", border: "1px solid var(--border-strong)",
                color: "var(--text-primary)", fontFamily: "var(--font-sans)", fontSize: "0.85rem",
                resize: "none", outline: "none", marginBottom: "0.75rem",
                lineHeight: 1.6,
              }}
            />
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem",
                        color: "var(--text-muted)", marginBottom: "1.5rem" }}>
              Leave blank if not applicable — you can edit this later.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setStep(2)} style={backBtnStyle}>← Back</button>
              <button onClick={handleFinish} style={nextBtnStyle(false)}>
                Start My Feed →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const headingStyle: React.CSSProperties = {
  fontFamily: "var(--font-display)", fontSize: "1.3rem",
  fontWeight: 600, color: "var(--text-primary)", marginBottom: 6,
};
const subStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)", fontSize: "0.82rem",
  color: "var(--text-muted)", marginBottom: "1.5rem",
};
const nextBtnStyle = (disabled: boolean): React.CSSProperties => ({
  flex: 1, padding: "0.75rem 1.5rem", borderRadius: 10, cursor: disabled ? "not-allowed" : "pointer",
  background: disabled ? "var(--bg-tertiary)" : "var(--accent)",
  border: "none", color: disabled ? "var(--text-muted)" : "white",
  fontFamily: "var(--font-sans)", fontSize: "0.85rem", fontWeight: 600,
  transition: "all 0.15s", opacity: disabled ? 0.5 : 1, marginTop: "0.5rem",
});
const backBtnStyle: React.CSSProperties = {
  padding: "0.75rem 1.25rem", borderRadius: 10, cursor: "pointer",
  background: "transparent", border: "1px solid var(--border-strong)",
  color: "var(--text-muted)", fontFamily: "var(--font-sans)",
  fontSize: "0.85rem", fontWeight: 500, transition: "all 0.15s",
};