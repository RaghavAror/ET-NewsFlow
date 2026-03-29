"use client";

import { useEffect, useRef } from "react";

interface LogEntry {
  agent: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: string;
}

interface Props {
  logs: LogEntry[];
  isRunning: boolean;
}

const TYPE_COLORS = {
  info:    "text-blue-400",
  success: "text-green-400",
  warning: "text-amber-400",
  error:   "text-red-400",
};

const TYPE_PREFIX = {
  info:    "›",
  success: "✓",
  warning: "⚠",
  error:   "✗",
};

const AGENT_COLORS: Record<string, string> = {
  "Orchestrator":       "text-orange-400",
  "Researcher":         "text-violet-400",
  "Synthesizer":        "text-teal-400",
  "Story-Arc Detective":"text-coral-400",
  "Impact Analyst":     "text-amber-400",
  "Scriptwriter":       "text-blue-400",
};

export function AgentConsole({ logs, isRunning }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800 bg-zinc-900">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-amber-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-xs text-zinc-500 font-mono ml-2">agent-reasoning-console</span>
        </div>
        <div className="flex items-center gap-2">
          {isRunning && (
            <>
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-400 font-mono">LIVE</span>
            </>
          )}
          {!isRunning && logs.length > 0 && (
            <span className="text-xs text-zinc-600 font-mono">COMPLETE</span>
          )}
        </div>
      </div>

      {/* Log output */}
      <div className="h-44 overflow-y-auto p-3 font-mono text-xs space-y-1">
        {logs.length === 0 ? (
          <div className="flex items-center gap-2 text-zinc-600 py-2">
            <span className="animate-pulse">_</span>
            <span>Waiting for pipeline to start...</span>
          </div>
        ) : (
          logs.map((log, i) => (
            <div key={i} className="flex items-start gap-2 leading-relaxed">
              <span className="text-zinc-600 flex-shrink-0 w-14">{log.timestamp}</span>
              <span className={`flex-shrink-0 ${TYPE_COLORS[log.type]}`}>
                {TYPE_PREFIX[log.type]}
              </span>
              <span className={`flex-shrink-0 font-medium ${AGENT_COLORS[log.agent] || "text-zinc-400"}`}>
                [{log.agent}]
              </span>
              <span className="text-zinc-400">{log.message}</span>
            </div>
          ))
        )}
        {isRunning && (
          <div className="flex items-center gap-1 text-zinc-600 pt-1">
            <span className="animate-pulse font-bold">█</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}