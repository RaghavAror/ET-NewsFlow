// ═══════════════════════════════════════════════════════════
// components/StatusStream.tsx — Pipeline progress bar
// ═══════════════════════════════════════════════════════════
"use client";

const STAGES = [
  { key: "researcher", label: "Research" },
  { key: "synthesizer", label: "Synthesis" },
  { key: "story_arc", label: "Timeline" },
  { key: "impact_analyst", label: "Impact" },
  { key: "scriptwriter", label: "Script" },
];

interface Props {
  stage: string;
  completedStages: string[];
}

export function StatusStream({ stage, completedStages }: Props) {
  return (
    <div className="flex items-center gap-1">
      {STAGES.map((s, i) => {
        const done = completedStages.includes(s.key);
        const active = stage.startsWith(s.key);
        return (
          <div key={s.key} className="flex items-center gap-1">
            <div
              className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium
                transition-all duration-300
                ${done ? "bg-green-900/50 text-green-400" :
                  active ? "bg-orange-900/50 text-orange-400" :
                  "bg-zinc-900 text-zinc-600"}`}
            >
              {done ? "✓" : active ? "⟳" : `${i + 1}`}
              <span className="hidden sm:inline">{s.label}</span>
            </div>
            {i < STAGES.length - 1 && (
              <div className={`w-4 h-px ${done ? "bg-green-700" : "bg-zinc-800"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
