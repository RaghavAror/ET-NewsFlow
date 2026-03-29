"use client";

import { useState } from "react";

interface VisualCue {
  timestamp: string;
  description: string;
}

interface Script {
  hook?: string;
  segments?: string[];
  visual_cues?: VisualCue[];
  call_to_action?: string;
}

interface Props {
  script: Script | null | undefined;
}

const TIMESTAMPS = ["0:00", "0:05", "0:15", "0:25", "0:35", "0:45", "0:55"];

export function ScriptViewer({ script }: Props) {
  const [activeSegment, setActiveSegment] = useState(0);

  if (!script) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-zinc-600 text-sm">Video script not available</p>
      </div>
    );
  }

  const hook = script.hook || "Breaking market news you need to know!";
  const segments = script.segments || [];
  const visualCues = script.visual_cues || [];
  const cta = script.call_to_action || "Read the full story on Economic Times";

  const cueMap: Record<string, string> = {};
  visualCues.forEach((c) => {
    if (c?.timestamp) cueMap[c.timestamp] = c.description;
  });

  return (
    <div className="space-y-4">
      {/* Hook */}
      <div className="bg-orange-950/30 border border-orange-900/50 rounded-lg p-4">
        <p className="text-xs text-orange-500 font-medium mb-2 uppercase tracking-wider">
          ⚡ Hook (0:00)
        </p>
        <p className="text-white font-semibold text-sm leading-relaxed">{hook}</p>
        {cueMap["0:00"] && (
          <p className="text-xs text-zinc-500 mt-2 italic">📷 {cueMap["0:00"]}</p>
        )}
      </div>

      {/* Segments */}
      {segments.length > 0 ? (
        <div className="space-y-2">
          {segments.map((seg, i) => {
            const ts = TIMESTAMPS[i + 1] ?? "";
            return (
              <div
                key={i}
                onClick={() => setActiveSegment(i)}
                className={`rounded-lg p-3 cursor-pointer transition-all border
                  ${activeSegment === i
                    ? "bg-zinc-800 border-zinc-600"
                    : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-zinc-500 font-mono">{ts}</span>
                  <span className="text-xs text-zinc-600">Segment {i + 1}</span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">{seg}</p>
                {cueMap[ts] && (
                  <p className="text-xs text-zinc-500 mt-1.5 italic">📷 {cueMap[ts]}</p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-zinc-600 text-sm text-center py-4">No segments generated</p>
      )}

      {/* CTA */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3">
        <p className="text-xs text-zinc-500 mb-1">📱 End Card</p>
        <p className="text-sm text-white">{cta}</p>
      </div>

      {/* Video generation note */}
      <div className="bg-blue-950/20 border border-blue-900/30 rounded-lg p-4 mt-4">
        <p className="text-xs text-blue-400 font-medium mb-1">🎬 AI Video Generation</p>
        <p className="text-xs text-zinc-500 leading-relaxed">
          This script can be sent to AI video tools like{" "}
          <span className="text-blue-400">HeyGen</span>,{" "}
          <span className="text-blue-400">Runway ML</span>, or{" "}
          <span className="text-blue-400">Synthesia</span> to generate
          a full broadcast-quality video with an AI anchor.
        </p>
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => {
              const text = `HOOK: ${hook}\n\n${segments.join("\n\n")}\n\nCTA: ${cta}`;
              navigator.clipboard.writeText(text);
              alert("Script copied to clipboard! Paste into HeyGen or Runway ML.");
            }}
            className="text-xs px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
          >
            📋 Copy Script
          </button>
          <a
            href="https://www.heygen.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors"
          >
            Open HeyGen →
          </a>
        </div>
      </div>
    </div>
  );
}