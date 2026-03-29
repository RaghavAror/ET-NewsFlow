// ═══════════════════════════════════════════════════════════
// components/PublishGate.tsx — HITL approval screen
// ═══════════════════════════════════════════════════════════
"use client";

import { useState } from "react";

interface Props {
  onApprove: (feedback?: string) => void;
  onReject: (feedback?: string) => void;
  state: any;
}

export function PublishGate({ onApprove, onReject, state }: Props) {
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleApprove = async () => {
    setSubmitting(true);
    await onApprove(feedback);
  };

  const handleReject = async () => {
    setSubmitting(true);
    await onReject(feedback);
    setSubmitting(false);
  };

  return (
    <div className="border-b border-orange-900/50 bg-orange-950/20 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              <h2 className="text-lg font-semibold text-orange-300">
                Ready for Review — Human Approval Required
              </h2>
            </div>
            <p className="text-sm text-zinc-400">
              All 5 agents have completed. Review the briefing preview below,
              then publish to render the full dashboard.
            </p>

            {/* Quick preview */}
            {state?.deep_briefing && (
              <div className="mt-3 bg-zinc-900 rounded-lg p-4 max-h-40 overflow-y-auto">
                <p className="text-xs text-zinc-300 font-mono leading-relaxed">
                  {state.deep_briefing.slice(0, 400)}…
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 min-w-64">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Optional feedback or notes…"
              rows={2}
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2
                         text-xs text-white placeholder:text-zinc-600 resize-none
                         focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
            <div className="flex gap-2">
              <button
                onClick={handleReject}
                disabled={submitting}
                className="flex-1 px-4 py-2.5 border border-zinc-700 hover:border-zinc-600
                           text-zinc-400 hover:text-white rounded-lg text-sm transition-colors
                           disabled:opacity-50"
              >
                ↩ Re-run
              </button>
              <button
                onClick={handleApprove}
                disabled={submitting}
                className="flex-1 px-4 py-2.5 bg-orange-500 hover:bg-orange-400
                           text-white font-semibold rounded-lg text-sm transition-colors
                           disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <span className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin" />
                ) : "Publish to Dashboard →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
