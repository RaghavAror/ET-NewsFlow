"use client";

import { useState, useEffect, useRef } from "react";

interface StoryboardFrame {
  frame: number;
  label: string;
  image_url: string;
  status: string;
  source?: string;
}

interface VideoStudioData {
  storyboard: StoryboardFrame[];
  narration: { audio_url: string; status: string; duration_estimate?: number };
  video_job: { status: string; note?: string };
  headline: string;
  script_hook: string;
}

interface Props {
  jobId: string;
  script: any;
}

// ── Image with loading skeleton + auto-retry ─────────────────
function PollinationsImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleError = () => {
    if (retryCount < 4) {
      // Retry with a small delay — Pollinations renders on first request
      setTimeout(() => {
        const sep = src.includes("?") ? "&" : "?";
        setCurrentSrc(`${src}${sep}retry=${retryCount + 1}&t=${Date.now()}`);
        setRetryCount((r) => r + 1);
        setErrored(false);
      }, 3000 * (retryCount + 1)); // 3s, 6s, 9s, 12s
    } else {
      setErrored(true);
    }
  };

  return (
    <div className={`relative w-full h-full bg-zinc-900 ${className}`}>
      {/* Skeleton while loading */}
      {!loaded && !errored && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-zinc-900">
          <div className="w-6 h-6 border-2 border-orange-500/50 border-t-orange-500 rounded-full animate-spin" />
          {retryCount > 0 && (
            <p className="text-xs text-zinc-600">Rendering... ({retryCount}/4)</p>
          )}
        </div>
      )}
      {/* Error state */}
      {errored && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-zinc-900">
          <span className="text-2xl">🎨</span>
          <p className="text-xs text-zinc-600 text-center px-2">{alt}</p>
        </div>
      )}
      {/* Actual image */}
      <img
        src={currentSrc}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-500
          ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}


export function VideoStudio({ jobId, script }: Props) {
  const [data, setData] = useState<VideoStudioData | null>(null);
  const [generating, setGenerating] = useState(false);
  const [activeFrame, setActiveFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cycleRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-cycle frames when audio plays
  useEffect(() => {
    if (!data?.storyboard?.length) return;
    if (isPlaying) {
      cycleRef.current = setInterval(() => {
        setActiveFrame((prev) => (prev + 1) % data.storyboard.length);
      }, 4000);
    } else {
      if (cycleRef.current) clearInterval(cycleRef.current);
    }
    return () => { if (cycleRef.current) clearInterval(cycleRef.current); };
  }, [isPlaying, data]);

  const handleGenerate = async () => {
    setGenerating(true);
    setError("");
    try {
      const res = await fetch("http://localhost:8000/video/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_id: jobId }),
      });
      if (!res.ok) throw new Error(await res.text());
      const result = await res.json();
      setData(result);
    } catch (e: any) {
      setError(e.message || "Generation failed");
    } finally {
      setGenerating(false);
    }
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  // ── Pre-generation ───────────────────────────────────────
  if (!data) {
    return (
      <div className="space-y-4">
        {script && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
              Broadcast Script
            </p>
            <div className="bg-orange-950/30 border border-orange-900/40 rounded-lg p-3">
              <p className="text-xs text-orange-400 font-medium mb-1">⚡ Hook (0:00)</p>
              <p className="text-sm text-white font-medium leading-relaxed">{script.hook}</p>
            </div>
            {(script.segments || []).slice(0, 4).map((seg: string, i: number) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-xs text-zinc-600 font-mono mt-0.5 w-10 flex-shrink-0">
                  {["0:05", "0:15", "0:25", "0:35"][i]}
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed">{seg}</p>
              </div>
            ))}
            {script.call_to_action && (
              <div className="border-t border-zinc-800 pt-2">
                <p className="text-xs text-zinc-600">📱 {script.call_to_action}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2 flex-wrap">
          {[
            { label: "FLUX Storyboard",  color: "text-violet-400 bg-violet-500/10 border-violet-500/20" },
            { label: "gTTS Narration",   color: "text-teal-400 bg-teal-500/10 border-teal-500/20" },
            { label: "100% Free",        color: "text-green-400 bg-green-500/10 border-green-500/20" },
          ].map((b) => (
            <span key={b.label}
                  className={`text-xs px-2.5 py-1 rounded-full border font-medium ${b.color}`}>
              {b.label}
            </span>
          ))}
        </div>

        {error && (
          <p className="text-xs text-red-400 bg-red-950/30 border border-red-900/30 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          onClick={handleGenerate}
          disabled={generating}
          className="w-full py-3 bg-orange-500 hover:bg-orange-400 disabled:opacity-60
                     text-white font-semibold text-sm rounded-xl transition-colors
                     flex items-center justify-center gap-2"
        >
          {generating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generating storyboard + audio...
            </>
          ) : "🎬 Generate AI News Broadcast"}
        </button>
      </div>
    );
  }

  // ── Post-generation: News Desk ────────────────────────────
  const frames = data.storyboard || [];
  const currentFrame = frames[activeFrame % Math.max(frames.length, 1)];

  return (
    <div className="space-y-4">
      {/* Main broadcast player */}
      <div className="relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
        {/* Video frame */}
        <div className="relative aspect-video bg-zinc-950 overflow-hidden">
          {currentFrame?.image_url ? (
            <PollinationsImage
              src={currentFrame.image_url}
              alt={currentFrame.label}
              className="absolute inset-0"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Broadcast overlays */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between
                            px-3 py-2 bg-gradient-to-b from-black/80 to-transparent">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs text-white font-bold tracking-widest">ET NEWSFLOW</span>
              </div>
              <span className="text-xs text-zinc-300 font-mono tabular-nums">
                {new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })} IST
              </span>
            </div>

            {/* Bottom lower-third */}
            <div className="absolute bottom-0 left-0 right-0 px-3 pt-8 pb-2
                            bg-gradient-to-t from-black/95 to-transparent">
              <div className="bg-orange-500 h-0.5 w-full mb-1.5 rounded" />
              <p className="text-white text-xs font-bold leading-tight line-clamp-1">
                {data.headline}
              </p>
              <p className="text-orange-300 text-xs mt-0.5">{currentFrame?.label}</p>
            </div>

            {/* LIVE badge */}
            {isPlaying && (
              <div className="absolute top-2 right-3 flex items-center gap-1
                              bg-red-600 rounded px-2 py-0.5">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                <span className="text-white text-xs font-bold tracking-wider">LIVE</span>
              </div>
            )}
          </div>
        </div>

        {/* Audio controls */}
        <div className="flex items-center gap-3 px-4 py-3 border-t border-zinc-800">
          <button
            onClick={handlePlayPause}
            disabled={!data.narration?.audio_url}
            className="w-9 h-9 rounded-full bg-orange-500 hover:bg-orange-400
                       disabled:opacity-40 flex items-center justify-center
                       transition-colors flex-shrink-0 text-white"
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <div className="flex-1 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
            <div
              className={`h-full bg-orange-500 rounded-full transition-all duration-1000
                ${isPlaying ? "w-3/5" : "w-0"}`}
            />
          </div>
          <span className="text-xs text-zinc-500 font-mono flex-shrink-0">
            ~{Math.round(data.narration?.duration_estimate || 30)}s
          </span>
        </div>

        {/* Hidden audio */}
        {data.narration?.audio_url && (
          <audio
            ref={audioRef}
            src={data.narration.audio_url}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />
        )}
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2">
        {frames.map((frame, i) => (
          <button
            key={frame.frame}
            onClick={() => setActiveFrame(i)}
            className={`flex-1 relative rounded-lg overflow-hidden border transition-all
              ${activeFrame === i
                ? "border-orange-500 ring-1 ring-orange-500/40"
                : "border-zinc-800 hover:border-zinc-600"}`}
            style={{ aspectRatio: "16/9" }}
          >
            <PollinationsImage src={frame.image_url} alt={frame.label} />
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 px-1.5 py-0.5">
              <p className="text-white text-xs truncate">{frame.label}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-zinc-700">
        <div className="flex gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full" />
            FLUX.1 storyboard
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
            gTTS narration
          </span>
        </div>
        <button
          onClick={() => {
            const text = `HOOK: ${data.script_hook}\n\n${(script?.segments || []).join("\n\n")}\n\nCTA: ${script?.call_to_action || ""}`;
            navigator.clipboard.writeText(text);
            alert("Script copied to clipboard!");
          }}
          className="text-zinc-600 hover:text-zinc-400 transition-colors"
        >
          📋 Copy script
        </button>
      </div>
    </div>
  );
}