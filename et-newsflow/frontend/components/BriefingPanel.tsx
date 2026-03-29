"use client";

import { useState } from "react";
import { ScriptViewer } from "./ScriptViewer";
import { ChatNavigator } from "./ChatNavigator";
import { LanguageToggle } from "./LanguageToggle";;

interface Props {
  briefing?: string;
  themes?: string[];
  primaryArticle?: any;
  relatedArticles?: any[];
  videoScript?: any;
  jobId: string;
}

export function BriefingPanel({
  briefing, themes, primaryArticle, relatedArticles, videoScript, jobId,
}: Props) {
  console.log("BriefingPanel jobId:", jobId);
  const [activeTab, setActiveTab] = useState<"briefing" | "script" | "sources">("briefing");
  const [displayBriefing, setDisplayBriefing] = useState(briefing ?? "");
  const [currentLang, setCurrentLang] = useState("english");

  const handleBriefingChange = (text: string, lang: string) => {
    setDisplayBriefing(text);
    setCurrentLang(lang);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Article header */}
      {primaryArticle && (
        <div className="p-5 border-b border-zinc-800">
          <p className="text-xs text-orange-500 font-medium uppercase tracking-wider mb-1">
            {primaryArticle.source} · {primaryArticle.published_at}
          </p>
          <h1 className="text-xl font-bold text-white leading-snug">
            {primaryArticle.title}
          </h1>
          {themes && themes.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {themes.map((t: string) => (
                <span key={t} className="text-xs bg-zinc-800 text-zinc-400 px-2.5 py-1 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tabs + Language toggle */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-1">
        <div className="flex">
          {[
            { id: "briefing", label: "Deep Briefing" },
            { id: "script",   label: "Video Script" },
            { id: "sources",  label: `Sources (${(relatedArticles?.length ?? 0) + 1})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 text-xs font-medium transition-colors border-b-2
                ${activeTab === tab.id
                  ? "border-orange-500 text-orange-400"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === "briefing" && briefing && jobId && (
          <div className="pr-3">
            <LanguageToggle
              jobId={jobId}
              originalBriefing={briefing}
              onBriefingChange={handleBriefingChange}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "briefing" && (
          <div className="p-5">
            {currentLang !== "english" && (
              <div className="mb-3 flex items-center gap-2 text-xs text-amber-400 bg-amber-900/20 border border-amber-900/40 rounded-lg px-3 py-2">
                <span>🌐</span>
                <span>Viewing in {currentLang.charAt(0).toUpperCase() + currentLang.slice(1)} — complex terms include contextual explanations</span>
              </div>
            )}
            <MarkdownRenderer content={displayBriefing} />
          </div>
        )}
        {activeTab === "script" && (
          <div className="p-5">
            <ScriptViewer script={videoScript} />
          </div>
        )}
        {activeTab === "sources" && (
          <div className="p-5">
            <SourcesList primary={primaryArticle} related={relatedArticles ?? []} />
          </div>
        )}
      </div>

      {/* Chat Navigator — always at bottom of briefing */}
      {jobId && <ChatNavigator jobId={jobId} />}
    </div>
  );
}

function MarkdownRenderer({ content }: { content: string }) {
  if (!content) return <p className="text-zinc-600 text-sm">No briefing available.</p>;

  const sections = content.split(/(?=## )/g).filter(Boolean);

  if (sections.length <= 1) {
    return (
      <div className="space-y-3">
        {content.split(/\n+/).filter(Boolean).map((p, i) => (
          <p key={i} className="text-sm text-zinc-300 leading-relaxed">
            {p.replace(/^#+\s*/, "")}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sections.map((section, i) => {
        const lines = section.split("\n");
        const heading = lines[0].replace(/^#+\s*/, "").trim();
        const body = lines.slice(1).join("\n").trim();
        return (
          <div key={i}>
            <h3 className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-2">
              {heading}
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">{body}</p>
          </div>
        );
      })}
    </div>
  );
}

function SourcesList({ primary, related }: { primary: any; related: any[] }) {
  return (
    <div className="space-y-3">
      {[primary, ...related].filter(Boolean).map((a, i) => (
        <a key={i} href={a?.url} target="_blank" rel="noopener noreferrer"
           className="block bg-zinc-900 hover:bg-zinc-800 rounded-lg p-3 transition-colors">
          <p className="text-xs text-orange-500 mb-1">
            {i === 0 ? "PRIMARY" : `CONTEXT ${i}`} · {a?.source}
          </p>
          <p className="text-sm text-zinc-200 font-medium">{a?.title}</p>
          <p className="text-xs text-zinc-500 mt-1">{a?.published_at}</p>
        </a>
      ))}
    </div>
  );
}