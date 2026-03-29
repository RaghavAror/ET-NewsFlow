"use client";

import { useState } from "react";

const LANGUAGES = [
  { id: "english", label: "EN", name: "English" },
  { id: "hindi",   label: "हि", name: "Hindi"   },
  { id: "tamil",   label: "த",  name: "Tamil"   },
  { id: "telugu",  label: "తె", name: "Telugu"  },
];

interface Props {
  jobId: string;
  originalBriefing: string;
  onBriefingChange: (text: string, lang: string) => void;
}

export function LanguageToggle({ jobId, originalBriefing, onBriefingChange }: Props) {
  const [activeLang, setActiveLang] = useState("english");
  const [loading, setLoading] = useState(false);
  const [cache, setCache] = useState<Record<string, string>>({
    english: originalBriefing,
  });

  const switchLanguage = async (langId: string) => {
    if (langId === activeLang || loading) return;
    setActiveLang(langId);

    if (langId === "english") {
      onBriefingChange(originalBriefing, "english");
      return;
    }

    // Return from cache if available
    if (cache[langId]) {
      onBriefingChange(cache[langId], langId);
      return;
    }

    if (!jobId) {
      console.error("LanguageToggle: jobId is missing");
      return;
    }

    setLoading(true);
    try {
      const body = { job_id: jobId, language: langId };
      console.log("Localize request:", body);

      const res = await fetch("http://localhost:8000/localize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log("Localize status:", res.status);

      if (!res.ok) {
        const err = await res.text();
        console.error("Localize error:", err);
        setActiveLang("english");
        return;
      }

      const data = await res.json();
      console.log("Localize response:", data);

      if (data.success && data.text) {
        setCache((prev) => ({ ...prev, [langId]: data.text }));
        onBriefingChange(data.text, langId);
      } else {
        console.error("Localization failed:", data.error);
        setActiveLang("english");
      }
    } catch (e) {
      console.error("Localize fetch error:", e);
      setActiveLang("english");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      {loading && (
        <div className="w-3 h-3 border border-orange-500 border-t-transparent rounded-full animate-spin" />
      )}
      {LANGUAGES.map((lang) => (
        <button
          key={lang.id}
          onClick={() => switchLanguage(lang.id)}
          disabled={loading}
          title={lang.name}
          className={`w-7 h-7 rounded-md text-xs font-bold transition-all border
            ${activeLang === lang.id
              ? "bg-orange-500 text-white border-orange-400"
              : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-zinc-500 hover:text-zinc-200"
            } disabled:opacity-50 cursor-pointer`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}