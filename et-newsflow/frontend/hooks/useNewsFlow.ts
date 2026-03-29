"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export interface NewsFlowState {
  job_id?: string;
  primary_article?: any;
  related_articles?: any[];
  deep_briefing?: string;
  key_themes?: string[];
  timeline_events?: any[];
  entities?: string[];
  impact_cards?: any[];
  portfolio_signal?: any;
  user_portfolio?: string[];
  video_script?: any;
  knowledge_base?: string;
  qa_history?: any[];
  localized_briefings?: Record<string, string>;
  agent_logs?: any[];
  headline?: string;
  hitl_status?: "pending" | "approved" | "rejected";
  current_stage?: string;
  completed_stages?: string[];
}

export interface AgentLog {
  agent: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: string;
}

export function useNewsFlow(jobId: string) {
  const [state, setState] = useState<NewsFlowState | null>(null);
  const [stage, setStage] = useState<string>("starting");
  const [isPublished, setIsPublished] = useState(false);
  const [agentLogs, setAgentLogs] = useState<AgentLog[]>([]);
  const esRef = useRef<EventSource | null>(null);

  const handleMessage = (data: any) => {
    const newStage = data.stage ?? data.current_stage ?? "";

    // Agent log — append and return
    if (newStage === "agent_log" && data.log) {
      setAgentLogs((prev) => [...prev, data.log]);
      return;
    }

    if (newStage) setStage(newStage);

    if (newStage === "awaiting_approval") {
      if (data.result) setState(data.result);
      return;
    }

    if (newStage === "published") {
      if (data.result) {
        setState(data.result);
        if (data.result.agent_logs?.length) {
          setAgentLogs(data.result.agent_logs);
        }
      }
      setIsPublished(true);
      setStage("published");
      esRef.current?.close();
      return;
    }

    if (data.result) setState(data.result);
    else if (data.job_id || data.stage) {
      setState((prev) => ({ ...prev, ...data } as NewsFlowState));
    }
  };

  useEffect(() => {
    if (!jobId) return;

    // ── NEW: Check if result already exists in Redis (navigator search results)
    // Poll status immediately — if it's already approved/published, skip SSE wait
    const checkExisting = async () => {
      try {
        const res = await fetch(`http://localhost:8000/jobs/${jobId}/status`);
        if (res.ok) {
          const data = await res.json();
          if (data.hitl_status === "approved" || data.deep_briefing) {
            setState(data);
            setIsPublished(true);
            setStage("published");
            return true; // already done, skip SSE
          }
        }
      } catch {}
      return false;
    };

    let es: EventSource;

    checkExisting().then((done) => {
      if (done) return; // navigator result — no SSE needed

      // Normal pipeline flow — connect SSE as before
      es = new EventSource(`http://localhost:8000/jobs/${jobId}/stream`);
      esRef.current = es;
      es.onopen = () => console.log("SSE connected for", jobId);
      es.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          handleMessage(data);
        } catch (e) {
          console.error("SSE parse error:", e);
        }
      };
      es.onerror = () => console.warn("SSE connection lost");
    });

    return () => es?.close();
  }, [jobId]);

  const approve = useCallback(async (feedback = "") => {
    console.log("Approving job:", jobId);
    try {
      const res = await fetch(`http://localhost:8000/jobs/${jobId}/approve`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback }),
      });
      const data = await res.json();
      console.log("Approve response:", data);

      // Close existing SSE and open a fresh one to catch the published event
      esRef.current?.close();

      const es = new EventSource(`http://localhost:8000/jobs/${jobId}/stream`);
      esRef.current = es;

      es.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Post-approve SSE:", data.stage);

          if (data.stage === "agent_log" && data.log) {
            setAgentLogs((prev) => [...prev, data.log]);
            return;
          }

          // The published event carries the full result
          if (data.stage === "published") {
            if (data.result) setState(data.result);
            setIsPublished(true);
            setStage("published");
            es.close();
            return;
          }

          // Also handle if current state already has approved hitl_status
          if (data.hitl_status === "approved" || data.current_stage === "published") {
            if (data.result) setState(data.result);
            else setState(data as NewsFlowState);
            setIsPublished(true);
            setStage("published");
            es.close();
            return;
          }

          handleMessage(data);
        } catch (e) {
          console.error("Post-approve SSE parse error:", e);
        }
      };

      // Fallback: poll the status endpoint directly after 2 seconds
      // in case SSE misses the published event
      setTimeout(async () => {
        try {
          const statusRes = await fetch(`http://localhost:8000/jobs/${jobId}/status`);
          if (statusRes.ok) {
            const statusData = await statusRes.json();
            console.log("Fallback poll result:", statusData.current_stage || statusData.stage);
            if (
              statusData.hitl_status === "approved" ||
              statusData.current_stage === "published" ||
              statusData.deep_briefing
            ) {
              setState(statusData);
              setIsPublished(true);
              setStage("published");
              es.close();
            }
          }
        } catch {}
      }, 2000);

    } catch (e) {
      console.error("Approve error:", e);
    }
  }, [jobId]);

  const reject = useCallback(async (feedback = "") => {
    try {
      await fetch(`http://localhost:8000/jobs/${jobId}/reject`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback }),
      });
      setStage("starting");
      setIsPublished(false);
      setState(null);
      setAgentLogs([]);
    } catch (e) {
      console.error("Reject error:", e);
    }
  }, [jobId]);

  return { state, stage, isPublished, approve, reject, agentLogs };
}