"use client";

interface TimelineEvent {
  date: string;
  entity: string;
  event: string;
  significance: "high" | "medium" | "low";
  sentiment_score?: number;
  entities_involved?: string[];
  event_type?: string;
}

interface Props {
  events: TimelineEvent[];
  entities: string[];
}

function getSentimentColor(score: number | undefined) {
  if (score === undefined) return { dot: "bg-zinc-600", card: "border-zinc-800", badge: "bg-zinc-800 text-zinc-500" };
  if (score >= 0.3)  return { dot: "bg-green-500",  card: "border-green-900/50",  badge: "bg-green-500/15 text-green-400" };
  if (score <= -0.3) return { dot: "bg-red-500",    card: "border-red-900/50",    badge: "bg-red-500/15 text-red-400" };
  return               { dot: "bg-blue-500",   card: "border-blue-900/30",   badge: "bg-blue-500/15 text-blue-400" };
}

function getSentimentLabel(score: number | undefined): string {
  if (score === undefined) return "neutral";
  if (score >= 0.6)  return "very positive";
  if (score >= 0.3)  return "positive";
  if (score <= -0.6) return "very negative";
  if (score <= -0.3) return "negative";
  return "neutral";
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric"
    });
  } catch { return dateStr; }
}

const EVENT_TYPE_ICON: Record<string, string> = {
  policy: "🏛",
  market: "📈",
  corporate: "🏢",
  regulatory: "⚖️",
  macro: "🌐",
  geopolitical: "🗺",
};

export function TimelinePanel({ events, entities }: Props) {
  return (
    <div className="h-full flex flex-col">
      <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-300">Story Arc Timeline</h2>
        <div className="flex items-center gap-3 text-xs text-zinc-600">
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full inline-block"/>positive</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-full inline-block"/>negative</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-full inline-block"/>neutral</span>
          <span>{events.length} events</span>
        </div>
      </div>

      {entities.length > 0 && (
        <div className="px-5 py-2 border-b border-zinc-800 flex gap-2 overflow-x-auto">
          {entities.slice(0, 6).map((e) => (
            <span key={e} className="text-xs bg-zinc-900 text-zinc-400 px-2.5 py-1 rounded-full
                                     border border-zinc-800 whitespace-nowrap flex-shrink-0">
              {e}
            </span>
          ))}
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {events.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-zinc-600 text-sm">No timeline events extracted</p>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-zinc-800" />
            <div className="space-y-3">
              {events.map((event, i) => {
                const colors = getSentimentColor(event.sentiment_score);
                const score = event.sentiment_score;
                return (
                  <div key={i} className="flex gap-4 relative">
                    <div className="flex-shrink-0 mt-1.5 relative z-10">
                      <div className={`w-3.5 h-3.5 rounded-full border-2 border-zinc-950 ${colors.dot}`} />
                    </div>
                    <div className={`flex-1 bg-zinc-900 border rounded-lg p-3 mb-1 transition-colors hover:bg-zinc-800/50 ${colors.card}`}>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="text-xs font-mono text-zinc-500 flex-shrink-0">
                          {formatDate(event.date)}
                        </span>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {event.event_type && (
                            <span className="text-xs">{EVENT_TYPE_ICON[event.event_type] || "📌"}</span>
                          )}
                          {score !== undefined && (
                            <span className={`text-xs px-1.5 py-0.5 rounded border ${colors.badge} border-transparent`}>
                              {getSentimentLabel(score)} ({score > 0 ? "+" : ""}{score?.toFixed(1)})
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs font-semibold text-orange-400 mb-1">{event.entity}</p>
                      <p className="text-xs text-zinc-300 leading-relaxed">{event.event}</p>
                      {event.entities_involved && event.entities_involved.length > 1 && (
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {event.entities_involved.slice(0, 3).map((ent) => (
                            <span key={ent} className="text-xs bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded">
                              {ent}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}