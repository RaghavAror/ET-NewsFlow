"use client";

interface ImpactCard {
  persona: string;
  headline: string;
  body: string;
  action_item: string;
}

interface Props {
  cards: ImpactCard[];
}

const PERSONA_CONFIG: Record<string, { icon: string; accent: string }> = {
  "Retail Investor": { icon: "📈", accent: "border-green-800 bg-green-950/20" },
  "Corporate Exec":  { icon: "🏢", accent: "border-blue-800 bg-blue-950/20" },
  "Student":         { icon: "🎓", accent: "border-purple-800 bg-purple-950/20" },
};

export function ImpactCards({ cards }: Props) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-4 border-b border-zinc-800">
        <h2 className="text-sm font-semibold text-zinc-300">Impact Analysis</h2>
        <p className="text-xs text-zinc-600 mt-0.5">So what does this mean for you?</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {cards.map((card) => {
          const cfg = PERSONA_CONFIG[card.persona] ?? {
            icon: "👤",
            accent: "border-zinc-700 bg-zinc-900",
          };
          return (
            <div
              key={card.persona}
              className={`rounded-xl border p-4 space-y-2 ${cfg.accent}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{cfg.icon}</span>
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  {card.persona}
                </span>
              </div>

              <p className="text-sm font-bold text-white leading-snug">
                {card.headline}
              </p>

              <p className="text-xs text-zinc-400 leading-relaxed">
                {card.body}
              </p>

              <div className="flex items-start gap-2 pt-1 border-t border-zinc-800/60">
                <span className="text-orange-500 text-xs mt-0.5">→</span>
                <p className="text-xs text-orange-300 leading-relaxed">
                  {card.action_item}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
