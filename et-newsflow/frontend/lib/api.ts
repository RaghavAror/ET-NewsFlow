// ═══════════════════════════════════════════════════════════
// lib/api.ts — API client
// ═══════════════════════════════════════════════════════════
const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function analyzeArticle(url: string) {
  const res = await fetch(`${BASE}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function approveJob(jobId: string, feedback = "") {
  const res = await fetch(`${BASE}/jobs/${jobId}/approve`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ feedback }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function rejectJob(jobId: string, feedback = "") {
  const res = await fetch(`${BASE}/jobs/${jobId}/reject`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ feedback }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
