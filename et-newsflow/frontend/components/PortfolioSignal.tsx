"use client";

interface PortfolioSignal {
  signal_type: "BUY" | "SELL" | "HOLD" | "WATCH";
  affected_holdings: string[];
  unaffected_holdings: string[];
  headline: string;
  analysis: string;
  recommended_action: string;
  confidence: "high" | "medium" | "low";
  time_horizon: string;
  user_portfolio: string[];
}

interface Props {
  signal: PortfolioSignal | null;
}

const SIGNAL_CONFIG = {
  BUY:   { color: "text-green-400",  bg: "bg-green-500/10",  border: "border-green-500/30",  badge: "bg-green-500/20 text-green-300", icon: "↑" },
  SELL:  { color: "text-red-400",    bg: "bg-red-500/10",    border: "border-red-500/30",    badge: "bg-red-500/20 text-red-300",     icon: "↓" },
  HOLD:  { color: "text-blue-400",   bg: "bg-blue-500/10",   border: "border-blue-500/30",   badge: "bg-blue-500/20 text-blue-300",   icon: "→" },
  WATCH: { color: "text-amber-400",  bg: "bg-amber-500/10",  border: "border-amber-500/30",  badge: "bg-amber-500/20 text-amber-300", icon: "◎" },
};

const CONFIDENCE_COLOR = {
  high: "text-green-400",
  medium: "text-amber-400",
  low: "text-zinc-500",
};

export function PortfolioSignal({ signal }: Props) {
  if (!signal) return null;

  const cfg = SIGNAL_CONFIG[signal.signal_type] || SIGNAL_CONFIG.WATCH;

  return (
    <div className={`rounded-xl border p-4 space-y-3 ${cfg.bg} ${cfg.border}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">{cfg.icon}</span>
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
              ⚡ Personalized Alpha Signal
            </p>
            <p className={`text-sm font-bold ${cfg.color}`}>{signal.headline}</p>
          </div>
        </div>
        <div className="text-right">
          <span className={`text-lg font-black ${cfg.color}`}>{signal.signal_type}</span>
          <p className={`text-xs ${CONFIDENCE_COLOR[signal.confidence]}`}>
            {signal.confidence} confidence
          </p>
        </div>
      </div>

      {/* Analysis */}
      <p className="text-xs text-zinc-300 leading-relaxed">{signal.analysis}</p>

      {/* Holdings breakdown */}
      <div className="grid grid-cols-2 gap-2">
        {signal.affected_holdings.length > 0 && (
          <div>
            <p className="text-xs text-zinc-500 mb-1.5">Affected Holdings</p>
            <div className="flex flex-wrap gap-1">
              {signal.affected_holdings.map((h) => (
                <span key={h}
                      className={`text-xs px-2 py-0.5 rounded-full ${cfg.badge}`}>
                  {h}
                </span>
              ))}
            </div>
          </div>
        )}
        {signal.unaffected_holdings.length > 0 && (
          <div>
            <p className="text-xs text-zinc-500 mb-1.5">Unaffected</p>
            <div className="flex flex-wrap gap-1">
              {signal.unaffected_holdings.slice(0, 3).map((h) => (
                <span key={h}
                      className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-500">
                  {h}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action */}
      <div className="flex items-start gap-2 pt-1 border-t border-zinc-700/50">
        <span className={`text-xs mt-0.5 ${cfg.color}`}>→</span>
        <p className={`text-xs leading-relaxed ${cfg.color}`}>{signal.recommended_action}</p>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 text-xs text-zinc-600">
        <span>⏱ {signal.time_horizon}</span>
        <span>·</span>
        <span>Portfolio: {signal.user_portfolio?.slice(0, 3).join(", ")}{signal.user_portfolio?.length > 3 ? "..." : ""}</span>
      </div>
    </div>
  );
}