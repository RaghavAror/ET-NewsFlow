"use client";

import { useState, useRef } from "react";

interface Props {
  jobId: string;
  language?: string;
  briefing?: string;
}

const LANG_LABELS: Record<string, string> = {
  english: "EN", hindi: "HI", tamil: "TA", telugu: "TE",
};

export function ListenButton({ jobId, language = "english", briefing }: Props) {
  const [status, setStatus] = useState<"idle"|"loading"|"playing"|"paused">("idle");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [activeLang, setActiveLang] = useState(language);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleListen = async (lang: string) => {
    setActiveLang(lang);

    // If already loaded this lang, toggle play/pause
    if (audioUrl && lang === activeLang) {
      if (status === "playing") {
        audioRef.current?.pause();
        setStatus("paused");
      } else {
        audioRef.current?.play();
        setStatus("playing");
      }
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("http://localhost:8000/audio/listen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_id: jobId, language: lang }),
      });
      if (!res.ok) throw new Error("Audio generation failed");
      const data = await res.json();

      if (data.audio_url) {
        setAudioUrl(data.audio_url);
        setStatus("playing");
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.src = data.audio_url;
            audioRef.current.play().catch(console.error);
          }
        }, 100);
      }
    } catch (e) {
      console.error("Listen error:", e);
      setStatus("idle");
    }
  };

  const langs = ["english", "hindi", "tamil"];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {/* Main listen button */}
      <button
        onClick={() => handleListen(activeLang)}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "0.4rem 0.9rem", borderRadius: 20, cursor: "pointer",
          background: status === "playing" ? "var(--accent-dim)" : "var(--bg-tertiary)",
          border: status === "playing" ? "1px solid var(--accent)" : "1px solid var(--border-strong)",
          color: status === "playing" ? "var(--accent)" : "var(--text-muted)",
          fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 500,
          transition: "all 0.15s",
        }}
      >
        {status === "loading" ? (
          <span style={{ width: 10, height: 10, border: "1.5px solid var(--accent)",
                         borderTopColor: "transparent", borderRadius: "50%",
                         display: "inline-block", animation: "spin 0.8s linear infinite" }} />
        ) : status === "playing" ? "⏸" : "▶"}
        <span>
          {status === "loading" ? "Generating…"
           : status === "playing" ? "Pause"
           : `Listen (${LANG_LABELS[activeLang]})`}
        </span>
      </button>

      {/* Language selector pills */}
      {langs.filter(l => l !== "english").map(l => (
        <button key={l}
                onClick={() => handleListen(l)}
                style={{
                  padding: "0.3rem 0.65rem", borderRadius: 20, cursor: "pointer",
                  background: activeLang === l && status !== "idle"
                    ? "var(--accent-dim)" : "transparent",
                  border: activeLang === l && status !== "idle"
                    ? "1px solid var(--accent)" : "1px solid var(--border)",
                  color: activeLang === l && status !== "idle"
                    ? "var(--accent)" : "var(--text-muted)",
                  fontFamily: "var(--font-sans)", fontSize: "0.68rem", fontWeight: 600,
                  transition: "all 0.15s",
                }}>
          {LANG_LABELS[l]}
        </button>
      ))}

      {/* Hidden audio */}
      <audio
        ref={audioRef}
        onEnded={() => setStatus("idle")}
        onPause={() => { if (status === "playing") setStatus("paused"); }}
        style={{ display: "none" }}
      />
    </div>
  );
}