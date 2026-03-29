"use client";

const PERSONAS = [
  { id: "investor", icon: "📈", label: "Investor",      color: "text-emerald-400", bg: "bg-emerald-500/15 border-emerald-500/40" },
  { id: "student",  icon: "🎓", label: "Student",       color: "text-violet-400",  bg: "bg-violet-500/15 border-violet-500/40" },
  { id: "techie",   icon: "⚡", label: "Techie",        color: "text-cyan-400",    bg: "bg-cyan-500/15 border-cyan-500/40" },
  { id: "policy",   icon: "🏛", label: "Policy Maker",  color: "text-amber-400",   bg: "bg-amber-500/15 border-amber-500/40" },
];

interface Props {
  active: string;
  onChange: (id: string) => void;
}

export function PersonaSwitcher({ active, onChange }: Props) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-4 border-b border-zinc-800">
        <p className="text-xs text-zinc-600 uppercase tracking-widest font-medium">Persona</p>
      </div>
      <div className="flex flex-col gap-2 p-3 flex-1">
        {PERSONAS.map((p) => (
          <button
            key={p.id}
            onClick={() => onChange(p.id)}
            className={`w-full rounded-xl p-3 text-left transition-all border
              ${active === p.id
                ? `${p.bg} ${p.color}`
                : "border-zinc-800 bg-zinc-900 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
              }`}
          >
            <div className="text-xl mb-1">{p.icon}</div>
            <div className="text-xs font-semibold leading-tight">{p.label}</div>
          </button>
        ))}
      </div>

      {/* Mini legend */}
      <div className="p-3 border-t border-zinc-800 space-y-2">
        <p className="text-xs text-zinc-700 uppercase tracking-wider">Sentiment</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-xs text-zinc-600">Positive</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <span className="text-xs text-zinc-600">Negative</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="text-xs text-zinc-600">Neutral</span>
          </div>
        </div>
      </div>
    </div>
  );
}