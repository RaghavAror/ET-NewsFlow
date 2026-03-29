# ET NewsFlow — AI-Powered News Intelligence Platform

> **"News that knows you."** — Transforming Economic Times from a publisher into a personalized intelligence engine.

---


## Problem Statement

Business news in 2026 is still delivered like it's 2005, static text articles, one-size-fits-all homepage, same format for everyone. ET NewsFlow fixes this across 5 intelligent dimensions:

| # | Feature | The Old Way | The ET NewsFlow Way |
|---|---------|-------------|---------------------|
| 1 | **My ET** | Same homepage for all | Role-aware personalized feed |
| 2 | **News Navigator** | 8 separate articles | 1 interactive synthesized briefing |
| 3 | **Video Studio** | Text only | Article → 60s broadcast video |
| 4 | **Story Arc** | Disconnected stories | Interactive narrative timeline |
| 5 | **Vernacular Engine** | English only | Hindi/Tamil/Telugu with financial context |

---

## System Architecture

### High-Level Overview

```mermaid
flowchart TD
    A[User\nProfile + ET URL] --> B[FastAPI\nOrchestrator]
    B --> C[Redis\nJob State]
    B --> D{5-Agent\nPipeline}
    
    D --> E[Researcher]
    D --> F[Synthesizer]
    D --> G[Story Arc]
    D --> H[Impact Analyst]
    D --> I[Scriptwriter]

    E --> |knowledge_base| F
    F --> |deep_briefing| G
    G --> |timeline_events| H
    H --> |impact_cards| I
    
    I --> J[HITL Gate\nApprove/Reject]
    J --> |approved| K[Redis\nPublish Final]
    K --> L[SSE Stream\n→ Frontend]
    
    subgraph "Service Layer"
        M[GROQ API]
        N[Redis Pub/Sub]
        O[gTTS + Wan2.1]
        P[Pollinations.ai]
    end

    E & F & G & H & I --> M
    B --> N
    I --> O & P

    subgraph "Frontend (Next.js 14)"
        L --> Q[Personalized Feed]
        L --> R[Deep Briefing]
        L --> S[Story Arc Chart]
        L --> T[Navigator Chat]
        L --> U[Video Studio]
        L --> V[Vernacular Audio]
    end
```

### Agent Communication Protocol

```mermaid
sequenceDiagram
    participant U as User
    participant API as FastAPI
    participant R as Redis
    participant FE as Next.js

    U->>API: POST /analyze {url, profile}
    API->>R: job:{id} = "starting"
    API-->>U: {job_id, status: "started"}
    
    Note over API,R: Background task spawns

    API->>R: publish "Researcher starting..."
    R-->>FE: SSE: agent_log
    API->>API: researcher_node(state)
    API->>R: publish "5 articles fetched"
    R-->>FE: SSE: agent_log

    API->>API: synthesizer_node(state)
    API->>R: publish "Deep Briefing ready"
    R-->>FE: SSE: agent_log

    API->>API: story_arc_node(state)
    API->>API: impact_analyst_node(state)
    API->>API: scriptwriter_node(state)
    
    API->>R: publish "awaiting_approval"
    R->>R: store fullstate (4hr TTL)
    R-->>FE: SSE: awaiting_approval + full state

    U->>API: PATCH /jobs/{id}/approve
    API->>R: publish final_result
    R-->>FE: SSE: published
```

### State Machine (LangGraph)

```mermaid
stateDiagram-v2
    [*] --> Starting
    Starting --> Researching: URL + Profile submitted
    Researching --> Synthesizing: knowledge_base built
    Researching --> Error: researcher_error set
    Synthesizing --> StoryArc: deep_briefing ready
    Synthesizing --> Error: synthesizer_error set
    StoryArc --> ImpactAnalysis: timeline_events extracted
    ImpactAnalysis --> Scriptwriting: impact_cards + signal ready
    Scriptwriting --> AwaitingApproval: video_script ready
    AwaitingApproval --> Published: HITL approved
    AwaitingApproval --> Rejected: HITL rejected
    Error --> [*]
    Published --> [*]
    Rejected --> [*]
```

---

## Agent Deep Dive

### Agent 1: Researcher
**File:** `backend/agents/researcher.py`

**Intuition:** The LLM needs raw material before it can synthesize. The Researcher fetches the primary article and scrapes ET for context. Crucially, it applies a profile constraint to its system prompt so the same article gets researched differently depending on whether the reader is an investor or a student.

```mermaid
flowchart LR
    A[URL + Profile Constraint] --> B[httpx scraper]
    B --> C[Primary Article\nHTML → text]
    C --> D[LLM: generate\n3 related queries]
    D --> E[ET search scraper\nfor each query]
    E --> F[knowledge_base\nstring assembled]
    
    style A fill:#FF6B35,color:#fff
    style F fill:#10B981,color:#fff
```

**Key Design:** Profile constraint is injected into the researcher's system prompt, not the user message. This means the LLM's entire reasoning frame changes — an investor's Researcher focuses on market impact, a student's Researcher surfaces explainers.

---

### Agent 2: Synthesizer
**File:** `backend/agents/synthesizer.py`

**Intuition:** The Synthesizer is an analyst it reads everything the Researcher found and writes a structured briefing with exactly 5 sections. The rigid structure (enforced via prompt) ensures the frontend always knows what to render.

```
## Key Development      ← What happened
## Why It Matters Now   ← Urgency + stakes  
## The Bigger Trend     ← Macro context
## Contrarian View      ← Intellectual honesty
## Data Points          ← Verifiable numbers
THEMES_JSON: [...]      ← Parsed separately for tag cloud
```


---

### Agent 3: Story Arc Detective
**File:** `backend/agents/story_arc.py`

**Intuition:** Every news story is an episode in a longer narrative. Story Arc connects the dots, it extracts 6–8 dated events, assigns sentiment scores from -1.0 to +1.0, and maps key entities. The frontend renders these as an interactive timeline with a sentiment curve.

```mermaid
flowchart TD
    A[knowledge_base] --> B[LLM: extract\n6-8 events as JSON]
    B --> C{Valid JSON?}
    C -->|Yes| D[Sort by date]
    C -->|No| E[Regex fallback\n+ story_arc_error]
    D --> F[timeline_events[]\nwith sentiment_score]
    F --> G[Interactive Timeline\non Frontend]
```

---

### Agent 4: Impact Analyst
**File:** `backend/agents/impact_analyst.py`

**Intuition:** News has different implications for different stakeholders. Rather than one generic takeaway, Impact Analyst generates 3 persona-specific impact cards (Retail Investor, Corporate Exec, Student) plus a portfolio signal (BUY/WATCH/SELL) for the user's held stocks.

```mermaid
flowchart LR
    A[knowledge_base +\nuser_portfolio[]] --> B[LLM: 3-persona\nJSON impact cards]
    B --> C[impact_cards[]\nper persona]
    A --> D[LLM: portfolio scan\nfor each held stock]
    D --> E[portfolio_signal\nBUY/WATCH/SELL]
    C & E --> F[Impact Cards UI\n+ Signal Banner]
```


---

### Agent 5: Scriptwriter
**File:** `backend/agents/scriptwriter.py`

**Intuition:** The deepest form of content repurposing — turn text into broadcast. The Scriptwriter outputs a structured video script with a 5-second hook, 6 timed segments, and visual cue descriptions. This directly feeds the Video Studio's generation pipeline.

```json
{
  "hook": "India's biggest bank just did something that could affect every savings account...",
  "segments": ["Segment 1 (0:05-0:15): context setup", "..."],
  "visual_cues": [
    {"timestamp": "0:00", "description": "Dramatic zoom on stock ticker"},
    {"timestamp": "0:35", "description": "Animated bar chart appearing"}
  ],
  "call_to_action": "Read the full story on Economic Times"
}
```

---

## Personalization Engine

```mermaid
flowchart TD
    A[User Input:\nRole + Age + Interests] --> B[get_personalized_query]
    B --> C[Domain keywords\nfor headline fetching]
    A --> D[get_researcher_constraint]
    D --> E[System prompt addon\nfor Researcher LLM]
    A --> F[rank_news - FeedRanker]
    F --> G[Scored headlines:\n+3 role match\n+2 interest match\n+1 age relevance]
    
    subgraph "Role → Constraint Mapping"
        H["investor → 'Focus on market impact,\nstock movements, earnings data'"]
        I["founder → 'Look for funding rounds,\ncompetitor moves, M&A'"]
        J["student → 'Fetch background context,\nexplainers, simplify jargon'"]
    end
    
    D --> H & I & J
```

---

## Vernacular Engine

```mermaid
flowchart LR
    A[Deep Briefing\nEnglish] --> B{Language\nSelector}
    B -->|Hindi| C[LOCALIZATION_PROMPT_HI\n+ financial term\nparenthetical rules]
    B -->|Tamil| D[LOCALIZATION_PROMPT_TA]
    B -->|Telugu| E[LOCALIZATION_PROMPT_TE]
    C & D & E --> F[LLM Translation\nClaude Sonnet]
    F --> G[Localized Briefing\ncached in Redis 1hr]
    G --> H[gTTS TTS\nlang code: hi/ta/te]
    H --> I[Base64 Audio\nstreamed to browser]
```

---

## Video Studio Pipeline

```mermaid
flowchart TD
    A[video_script JSON\nfrom Scriptwriter] --> B[Pollinations.ai\nStoryboard Images]
    A --> C[gTTS\nHook narration]
    B --> D[Image URLs\nper segment]
    C --> E[Audio Base64]
    A --> F[SiliconFlow API\nWan2.1-T2V-14B]
    D & E --> F
    F --> G[Poll for video status]
    G -->|pending| G
    G -->|ready| H[Video URL\nreturned to client]
```

---

## Feature Coverage Matrix

| Feature | My ET | Navigator | Video Studio | Story Arc | Vernacular |
|---------|-------|-----------|--------------|-----------|------------|
| Personalization | ✅ Full | ✅ Profile-aware | ✅ Script tone | ✅ Entity focus | ✅ Role adapts |
| LLM Agent | FeedRanker + Researcher | Synthesizer + Navigator | Scriptwriter | Story Arc | Localization |
| Real-time SSE | ✅ | ✅ | ✅ Poll | ✅ | ✅ |
| Caching | Redis 4hr | Redis 4hr | Redis 1hr | Redis 4hr | Redis 1hr |
| Offline fallback | ✅ Rule-based ranker | ❌ | ❌ | ✅ Empty timeline | ❌ |
| Languages | EN | EN | EN | EN | HI/TA/TE/BN |

---

## Project Structure

```
et-newsflow/
├── backend/
│   ├── main.py                    # FastAPI app, all routes, pipeline runner
│   ├── agents/
│   │   ├── researcher.py          # Agent 1: Article scraping + profile constraint
│   │   ├── synthesizer.py         # Agent 2: Deep Briefing generation
│   │   ├── story_arc.py           # Agent 3: Timeline + sentiment extraction
│   │   ├── impact_analyst.py      # Agent 4: Portfolio signals + persona cards
│   │   ├── scriptwriter.py        # Agent 5: Broadcast video script
│   │   ├── navigator.py           # Chat Q&A from article knowledge base
│   │   ├── navigator_search.py    # Multi-article synthesis for search
│   │   ├── news_fetcher.py        # Profile-aware ET headline scraper
│   │   ├── personalization.py     # Role → query/constraint mapping
│   │   ├── localization.py        # Vernacular translation engine
│   │   ├── audio_agent.py         # Multilingual TTS (gTTS)
│   │   ├── feed_ranker.py         # Headline scoring by profile
│   │   ├── video_studio.py        # Wan2.1 + Pollinations video pipeline
│   │   └── search_agent.py        # Free-form financial search Q&A
│   ├── services/
│   │   ├── llm.py                 # GROQ api call for LLM
│   │   ├── cache.py               # Redis client, pub/sub, job state helpers
│   │   └── scraper.py             # httpx-based HTML scraper
│   └── workflow/
│       ├── graph.py               # LangGraph state machine definition
│       └── state.py               # Typed state schema
└── frontend/
    └── app/
        ├── page.tsx               # Landing: profile onboarding + trending feed
        └── dashboard/[jobId]/
            └── page.tsx           # Full dashboard: briefing + all features

```


## Setup & Running

### Quick Start

1. Open a terminal and follow the commands.

```bash 
git clone <repo>
cd et-newsflow
redis-server
```

2. Starting backend in second terminal 

```bash 
cd backend
pip install -r requirements.txt 
uvicorn main:app --reload --port 8000
```

3. Starting frontend in third terminal

```bash 
cd frontend 
npm install 
npm run dev 
```

---



