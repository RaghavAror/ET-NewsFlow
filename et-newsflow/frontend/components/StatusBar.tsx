"use client";

interface AgentLog {
  agent: string;
  message: string;
  type: string;
  timestamp: string;
}

interface Props {
  logs: AgentLog[];
  isRunning: boolean;
  stage: string;
}

const STAGE_LABELS: Record<string, string> = {
  starting:              "Initializing pipeline...",
  researcher_started:    "Researcher Agent scraping articles...",
  researcher_done:       "Research complete",
  synthesizer_started:   "Synthesizer building deep briefing...",
  synthesizer_done:      "Synthesis complete",
  story_arc_started:     "Story-Arc Detective extracting timeline...",
  story_arc_done:        "Timeline ready",
  impact_analyst_started:"Impact Analyst scanning portfolio...",
  impact_analyst_done:   "Impact analysis done",
  scriptwriter_started:  "Scriptwriter generating broadcast...",
  scriptwriter_done:     "Script ready",
  awaiting_approval:     "All agents complete — awaiting approval",
  published:             "Published",
  error:                 "Pipeline error",
};

export function StatusBar({ logs, isRunning, stage }: Props) {
  const latest = logs[logs.length - 1];
  const label = STAGE_LABELS[stage] ?? stage;

  return (
    <div className="h-8 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 gap-3 overflow-hidden">
      {isRunning && (
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
          <span className="text-xs text-orange-400 font-medium font-mono">LIVE</span>
        </div>
      )}
      {!isRunning && stage === "published" && (
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
          <span className="text-xs text-green-400 font-medium font-mono">PUBLISHED</span>
        </div>
      )}

      <div className="flex items-center gap-2 overflow-hidden flex-1 min-w-0">
        {latest ? (
          <>
            <span className="text-xs text-zinc-600 font-mono flex-shrink-0">
              [{latest.agent}]
            </span>
            <span className="text-xs text-zinc-400 truncate">{latest.message}</span>
          </>
        ) : (
          <span className="text-xs text-zinc-600">{label}</span>
        )}
      </div>

      {/* Stage progress dots */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {["researcher", "synthesizer", "story_arc", "impact_analyst", "scriptwriter"].map((s) => {
          const done = logs.some((l) => l.agent.toLowerCase().includes(s.split("_")[0]) && l.type === "success");
          return (
            <div key={s}
                 className={`w-1.5 h-1.5 rounded-full transition-colors
                   ${done ? "bg-green-400" : "bg-zinc-700"}`}
            />
          );
        })}
      </div>
    </div>
  );
}