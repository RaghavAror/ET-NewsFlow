"""
agents/video_studio.py — Open-Source Video Generation
Storyboard: Pollinations.ai (free, no key)
Audio: gTTS (Google TTS, free, no key)
Video: Wan2.1 via SiliconFlow (requires valid key)
"""
from __future__ import annotations
import os
import re
import json
import httpx
import asyncio
import base64
import io
from datetime import datetime
from urllib.parse import quote

from dotenv import load_dotenv
load_dotenv()

SILICONFLOW_API_KEY = os.getenv("SILICONFLOW_API_KEY", "")
SILICONFLOW_BASE    = "https://api.siliconflow.cn/v1"
VIDEO_MODEL         = "Wan-AI/Wan2.1-T2V-14B"

print(f"[VideoStudio] SiliconFlow key: {'SET' if SILICONFLOW_API_KEY else 'NOT SET'}")
print(f"[VideoStudio] Storyboard: Pollinations.ai (free)")
print(f"[VideoStudio] Audio: gTTS (free)")


def _clean(text: str) -> str:
    text = re.sub(r'[\x00-\x1f]', '', str(text))
    return re.sub(r'\s+', ' ', text).strip()


def _pollinations_url(prompt: str) -> str:
    """Pollinations.ai — free image generation, no API key needed."""
    # Remove ALL special characters that break URLs
    clean = re.sub(r'[^\w\s,.-]', '', prompt[:150])
    clean = re.sub(r'\s+', ' ', clean).strip()
    safe = quote(clean)
    seed = abs(hash(clean)) % 999999
    return (
        f"https://image.pollinations.ai/prompt/{safe}"
        f"?width=1280&height=720&nologo=true&model=flux&seed={seed}"
    )


# ── Storyboard via Pollinations (always free) ────────────────

async def generate_storyboard(script_hook: str, segments: list, headline: str) -> list:
    clean_headline = re.sub(r'[^\w\s]', '', str(headline))[:60]

    frames = [
        {
            "frame": 1,
            "label": "Opening Hook",
            "prompt": f"Professional TV news broadcast studio Indian financial news desk cinematic lighting Bloomberg style graphics {clean_headline}",
        },
        {
            "frame": 2,
            "label": "Data Visualization",
            "prompt": f"Financial data visualization stock market charts Nifty 50 index modern infographic blue orange color scheme {clean_headline}",
        },
        {
            "frame": 3,
            "label": "Expert Analysis",
            "prompt": f"Indian financial expert analyst modern office Economic Times branding professional corporate setting {clean_headline}",
        },
    ]

    async def generate_one(frame: dict) -> dict:
        image_url = _pollinations_url(frame["prompt"])
        print(f"[VideoStudio] Frame {frame['frame']} URL: {image_url[:80]}...")
        return {**frame, "image_url": image_url, "status": "ready", "source": "pollinations"}

    results = await asyncio.gather(*[generate_one(f) for f in frames])
    return list(results)


# ── Audio via gTTS (free, no key) ────────────────────────────

async def generate_narration(script_text: str) -> dict:
    clean_text = _clean(script_text)[:400]
    print(f"[VideoStudio] Generating audio for: {clean_text[:50]}...")

    try:
        from gtts import gTTS
        tts = gTTS(text=clean_text, lang='en', slow=False)
        buf = io.BytesIO()
        tts.write_to_fp(buf)
        buf.seek(0)
        b64 = base64.b64encode(buf.read()).decode()
        audio_data_url = f"data:audio/mp3;base64,{b64}"
        print(f"[VideoStudio] Audio generated via gTTS ({len(b64)} chars)")
        return {
            "audio_url": audio_data_url,
            "duration_estimate": len(clean_text) / 15,
            "status": "ready",
            "source": "gtts",
        }
    except ImportError:
        print("[VideoStudio] gTTS not installed — run: pip install gtts")
        return {
            "audio_url": "",
            "status": "skipped",
            "note": "Run: pip install gtts  to enable audio",
        }
    except Exception as e:
        print(f"[VideoStudio] gTTS error: {e}")
        return {"audio_url": "", "status": "error", "error": str(e)}


# ── Video via Wan2.1 (requires SiliconFlow key) ──────────────

async def generate_video(headline: str, hook: str) -> dict:
    if not SILICONFLOW_API_KEY:
        return {
            "status": "skipped",
            "note": "Add valid SILICONFLOW_API_KEY to .env for video generation",
        }

    prompt = (
        f"Professional Indian TV news broadcast anchor reporting on "
        f"{_clean(headline)[:60]}, Economic Times studio, "
        f"dynamic lower-third graphics, cinematic, 4K quality"
    )

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(
                f"{SILICONFLOW_BASE}/video/submit",
                headers={
                    "Authorization": f"Bearer {SILICONFLOW_API_KEY}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": VIDEO_MODEL,
                    "prompt": prompt,
                    "negative_prompt": "blurry, low quality, cartoon",
                    "image_size": "1280x720",
                    "num_frames": 81,
                    "guidance_scale": 5.0,
                    "num_inference_steps": 30,
                },
            )
            if resp.status_code == 200:
                data = resp.json()
                return {
                    "request_id": data.get("requestId", ""),
                    "status": "generating",
                    "eta_seconds": 120,
                }
            else:
                print(f"[VideoStudio] Video failed ({resp.status_code}): {resp.text[:100]}")
                return {"status": "failed", "error": f"HTTP {resp.status_code}: {resp.text[:80]}"}
    except Exception as e:
        return {"status": "error", "error": str(e)}


async def poll_video_status(request_id: str) -> dict:
    if not request_id or not SILICONFLOW_API_KEY:
        return {"status": "skipped"}
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            resp = await client.get(
                f"{SILICONFLOW_BASE}/video/status/{request_id}",
                headers={"Authorization": f"Bearer {SILICONFLOW_API_KEY}"},
            )
            if resp.status_code == 200:
                data = resp.json()
                status = data.get("status", "unknown")
                if status == "Succeed":
                    return {
                        "status": "ready",
                        "video_url": data.get("results", {}).get("videos", [{}])[0].get("url", ""),
                    }
                elif status == "Failed":
                    return {"status": "failed", "error": data.get("message", "")}
                return {"status": "generating", "progress": data.get("progress", 0)}
            return {"status": "error", "error": f"HTTP {resp.status_code}"}
    except Exception as e:
        return {"status": "error", "error": str(e)}


# ── Full pipeline ────────────────────────────────────────────

async def run_video_studio(headline: str, script: dict, job_id: str) -> dict:
    hook = script.get("hook", headline) or headline
    segments = script.get("segments", [])
    narration_text = f"{hook}. {' '.join(str(s) for s in segments[:2])}"

    print(f"[VideoStudio] Starting for: {headline[:60]}")

    storyboard_task = generate_storyboard(hook, segments, headline)
    narration_task  = generate_narration(narration_text)

    storyboard, narration = await asyncio.gather(storyboard_task, narration_task)

    ready = sum(1 for f in storyboard if f.get("status") == "ready")
    print(f"[VideoStudio] Storyboard: {ready}/3 ready | Narration: {narration.get('status')}")

    video_job = await generate_video(headline, hook)
    print(f"[VideoStudio] Video: {video_job.get('status')}")

    return {
        "storyboard": storyboard,
        "narration": narration,
        "video_job": video_job,
        "headline": headline,
        "script_hook": hook,
        "generated_at": datetime.now().isoformat(),
        "siliconflow_key_configured": bool(SILICONFLOW_API_KEY),
    }