"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Onboarding } from "@/components/Onboarding";
import type { UserProfile } from "@/components/Onboarding";
import { useUserProfile } from "@/hooks/useUserProfile";
import { NewsNavigator } from "@/components/NewsNavigator";

interface Headline {
  id: number;
  headline: string;
  category: string;
  time: string;
  url: string;
  trending: boolean;
  hardcoded?: boolean;
  jobId?: string;
}

const ROLE_ICONS: Record<string, string> = {
  investor:"📈",founder:"🚀",student:"🎓",executive:"🏢",journalist:"📰",policy:"🏛"
};

// ── Hardcoded article — always pinned in feed ─────────────────
const HARDCODED_JOB_ID = "hardcoded-west-asia-chip-001";

const HARDCODED_CARD: Headline = {
  id: 9999,
  headline: "West Asia conflict casts shadow on India's chip goals",
  category: "Technology",
  time: "Featured",
  url: "",
  trending: false,
  hardcoded: true,
  jobId: HARDCODED_JOB_ID,
};

// Profile → keyword query
function getPersonalizedQuery(profile: UserProfile | null): string {
  if (!profile) return "Indian economy business markets";
  const roleKw: Record<string,string> = {
    investor: "stock market equity portfolio NSE BSE returns",
    founder:  "startup funding venture capital competitor M&A",
    student:  "business explainers career news economics education",
    executive:"corporate strategy supply chain regulation",
    journalist:"facts sources policy government data",
    policy:   "RBI SEBI government regulation fiscal monetary",
  };
  const ageKw: Record<string,string> = {
    "18-24":"entry level explainer beginner context",
    "25-34":"career growth investment opportunity",
    "35-49":"wealth management industry analysis",
    "50+":  "dividend blue chip stable retirement",
  };
  const interestKw = (profile.interests || []).slice(0,2).join(" ");
  return [roleKw[profile.role]||"", ageKw[profile.age]||"", interestKw].filter(Boolean).join(" ").slice(0,200);
}

// Extract hot topics
function extractTopics(headlines: Headline[]): string[] {
  const freq: Record<string,number> = {};
  const skip = new Set(["that","this","with","from","have","will","been","they","their","also","more","into"]);
  headlines.forEach(h => {
    h.headline.split(/\s+/).forEach(w => {
      const c = w.replace(/[^a-zA-Z]/g,"");
      if (c.length > 4 && !skip.has(c.toLowerCase())) freq[c] = (freq[c]||0)+1;
    });
    if (h.category) freq[h.category] = (freq[h.category]||0)+3;
  });
  return Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,10).map(([k])=>k);
}

// News card
function NewsCard({ item, profile, isPreprocessed, onGenerate, loading }: {
  item: Headline; profile: UserProfile|null;
  isPreprocessed: boolean; onGenerate:(i:Headline)=>void; loading:boolean;
}) {
  const roleColor: Record<string,string> = {
    investor:"#22c55e",founder:"#f59e0b",student:"#a78bfa",
    executive:"#60a5fa",journalist:"#f97316",policy:"#fb7185",
  };
  const accent = roleColor[profile?.role||""] || "var(--accent)";

  const hook = profile
    ? {
        investor: `Market signal: "${item.headline.slice(0,42)}..." — check portfolio impact.`,
        founder:  `Founder lens: "${item.headline.slice(0,42)}..." — spot competitor moves.`,
        student:  `Study this: "${item.headline.slice(0,42)}..." — we'll add explainers.`,
        executive:`Strategic: "${item.headline.slice(0,42)}..." — regulatory implications.`,
        journalist:`Source check: "${item.headline.slice(0,42)}..." — key facts & data.`,
        policy:   `Policy view: "${item.headline.slice(0,42)}..." — macro implications.`,
      }[profile.role] || item.headline.slice(0,80)
    : item.headline.slice(0,80);

  return (
    <div style={{
      background:"var(--bg-secondary)", borderRadius:14,
      border: item.hardcoded ? "1px solid rgba(249,115,22,0.35)" : "1px solid var(--border)",
      overflow:"hidden", transition:"transform 0.15s, border-color 0.15s",
    }}
    onMouseOver={e=>{(e.currentTarget as HTMLDivElement).style.transform="translateY(-1px)";(e.currentTarget as HTMLDivElement).style.borderColor="var(--border-strong)";}}
    onMouseOut={e=>{(e.currentTarget as HTMLDivElement).style.transform="none";(e.currentTarget as HTMLDivElement).style.borderColor=item.hardcoded?"rgba(249,115,22,0.35)":"var(--border)";}}>
      <div style={{height:2,background:accent,opacity:0.7}}/>
      <div style={{padding:"0.9rem 1rem"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:7}}>
          <span style={{fontFamily:"var(--font-sans)",fontSize:"0.63rem",fontWeight:600,
                         letterSpacing:"0.08em",textTransform:"uppercase",color:"var(--text-muted)",
                         background:"var(--bg-tertiary)",padding:"2px 8px",borderRadius:8}}>
            {item.category}
          </span>
          <div style={{display:"flex",alignItems:"center",gap:7}}>
            {item.trending&&<span style={{fontSize:"0.62rem",color:"var(--accent)",fontFamily:"var(--font-sans)",fontWeight:600}}>● TRENDING</span>}
            {item.hardcoded&&<span style={{fontSize:"0.62rem",color:"var(--accent)",fontFamily:"var(--font-sans)",fontWeight:600}}>⚡ Ready</span>}
            {isPreprocessed&&!item.hardcoded&&<span style={{fontSize:"0.62rem",color:"var(--green)",fontFamily:"var(--font-sans)",fontWeight:600}}>⚡ Ready</span>}
            <span style={{fontSize:"0.63rem",color:"var(--text-muted)",fontFamily:"var(--font-sans)"}}>{item.time}</span>
          </div>
        </div>
        <h3 style={{fontFamily:"var(--font-display)",fontSize:"0.95rem",fontWeight:600,
                     lineHeight:1.35,color:"var(--text-primary)",marginBottom:8}}>
          {item.headline}
        </h3>
        <p style={{fontFamily:"var(--font-serif)",fontSize:"0.77rem",lineHeight:1.65,
                    color:"var(--text-muted)",borderLeft:`2px solid ${accent}`,
                    paddingLeft:"0.65rem",marginBottom:10}}>
          {hook}
        </p>
        <button onClick={()=>onGenerate(item)} disabled={loading}
                style={{
                  width:"100%",padding:"0.52rem",borderRadius:8,cursor:"pointer",
                  background:loading?"var(--bg-tertiary)":"var(--accent)",
                  border:"none",color:loading?"var(--text-muted)":"white",
                  fontFamily:"var(--font-sans)",fontSize:"0.75rem",fontWeight:600,
                  display:"flex",alignItems:"center",justifyContent:"center",gap:6,
                  transition:"opacity 0.15s",opacity:loading?0.6:1,
                }}>
          {loading
            ? <><span style={{width:10,height:10,border:"1.5px solid var(--text-muted)",borderTopColor:"transparent",borderRadius:"50%",display:"inline-block",animation:"spin 0.8s linear infinite"}}/>Starting…</>
            : item.hardcoded ? "⚡ View Briefing" : isPreprocessed ? "⚡ View Briefing" : "Generate Briefing →"}
        </button>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div style={{background:"var(--bg-secondary)",borderRadius:14,border:"1px solid var(--border)",
                  padding:"0.9rem 1rem",animation:"pulse 1.5s infinite"}}>
      {[["30%",10],["85%",14],["65%",14],["100%",36]].map(([w,h],i)=>(
        <div key={i} style={{height:h as number,width:w as string,background:"var(--bg-tertiary)",
                               borderRadius:4,marginBottom:i<3?8:0}}/>
      ))}
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const { profile, saveProfile, clearProfile, loaded } = useUserProfile();
  const [headlines, setHeadlines] = useState<Headline[]>([]);
  const [fetching, setFetching] = useState(true);
  const [preprocessed, setPreprocessed] = useState<Set<number>>(new Set());
  const [loadingId, setLoadingId] = useState<number|null>(null);
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  useEffect(()=>{
    const t = setInterval(()=>setTime(
      new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit",timeZone:"Asia/Kolkata"})+" IST"
    ),1000);
    return ()=>clearInterval(t);
  },[]);

  const fetchHeadlines = useCallback(async()=>{
    setFetching(true);
    try {
      const res = await fetch("http://localhost:8000/trending", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, limit: 5 }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.headlines?.length) {
        setHeadlines(data.headlines);
        setTimeout(()=>setPreprocessed(new Set([data.headlines[0].id])),2000);
      }
    } catch { setError("Cannot reach backend — is uvicorn running on port 8000?"); }
    finally { setFetching(false); }
  },[profile]);

  useEffect(()=>{ if(loaded && profile){ fetchHeadlines(); const t=setInterval(fetchHeadlines,5*60*1000); return()=>clearInterval(t); } },[loaded,fetchHeadlines]);

  const handleGenerate = async(item: Headline)=>{
    // ── Hardcoded article: go straight to dashboard ──────────
    if (item.hardcoded && item.jobId) {
      router.push(`/dashboard/${item.jobId}`);
      return;
    }

    setLoadingId(item.id); setError("");
    try {
      const res = await fetch("http://localhost:8000/analyze",{
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          url: item.url, headline: item.headline,
          context: getPersonalizedQuery(profile),
          user_portfolio: profile?.portfolio?.length ? profile.portfolio : ["Reliance Industries","Nifty 50","Infosys"],
          user_profile: profile ? {role:profile.role,age:profile.age,interests:profile.interests} : null,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      if (!data.job_id) throw new Error("No job_id");
      router.push(`/dashboard/${data.job_id}`);
    } catch(e:any){ setError(`Error: ${e.message}`); }
    finally { setLoadingId(null); }
  };

  if (loaded && !profile) return <Onboarding onComplete={saveProfile}/>;
  if (!loaded) return null;

  const topics = extractTopics(headlines);

  // Merge hardcoded card at position 2 (index 1) in feed
  const feed: Headline[] = fetching ? [] : [
    ...headlines.slice(0, 1),
    HARDCODED_CARD,
    ...headlines.slice(1),
  ];

  return (
    <div style={{minHeight:"100vh",background:"var(--bg-primary)"}}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>

      {/* Header */}
      <header style={{position:"sticky",top:0,zIndex:40,background:"rgba(15,17,21,0.95)",
                       backdropFilter:"blur(12px)",borderBottom:"1px solid var(--border)"}}>
        <div style={{maxWidth:1140,margin:"0 auto",padding:"0.7rem 1.5rem",
                      display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{fontFamily:"var(--font-display)",fontSize:"1.15rem",fontWeight:700,color:"var(--text-primary)"}}>
            ET News<span style={{color:"var(--accent)"}}>Flow</span>
          </span>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontFamily:"var(--font-sans)",fontSize:"0.7rem",color:"var(--text-muted)"}}>
              ● {time}
            </span>
            <div style={{display:"flex",alignItems:"center",gap:6,padding:"0.28rem 0.8rem",
                          borderRadius:20,background:"var(--bg-secondary)",border:"1px solid var(--border-strong)"}}>
              <span>{ROLE_ICONS[profile?.role||""]||"👤"}</span>
              <span style={{fontFamily:"var(--font-sans)",fontSize:"0.73rem",fontWeight:500,color:"var(--text-secondary)"}}>
                {profile?.role ? profile.role.charAt(0).toUpperCase()+profile.role.slice(1) : "Reader"}
              </span>
              <button onClick={clearProfile} title="Change profile"
                      style={{background:"none",border:"none",cursor:"pointer",
                               color:"var(--text-muted)",fontSize:"0.68rem",lineHeight:1,padding:"0 2px"}}>✕</button>
            </div>
          </div>
        </div>
      </header>

      {error&&(
        <div style={{maxWidth:1140,margin:"0.75rem auto",padding:"0 1.5rem"}}>
          <div style={{background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.3)",
                        borderRadius:10,padding:"0.65rem 1rem",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span style={{fontFamily:"var(--font-sans)",fontSize:"0.78rem",color:"#fca5a5"}}>{error}</span>
            <button onClick={()=>setError("")} style={{background:"none",border:"none",cursor:"pointer",color:"#fca5a5",fontSize:"0.78rem"}}>✕</button>
          </div>
        </div>
      )}

      <div style={{maxWidth:1140,margin:"0 auto",padding:"1.25rem 1.5rem",
                    display:"grid",gridTemplateColumns:"270px 1fr",gap:"1.5rem",alignItems:"start"}}>

        {/* LEFT */}
        <aside style={{position:"sticky",top:68,display:"flex",flexDirection:"column",gap:"1.25rem"}}>
          <NewsNavigator profile={profile} />
          <div>
            <p style={{fontFamily:"var(--font-sans)",fontSize:"0.63rem",fontWeight:700,
                         letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--text-muted)",marginBottom:8}}>
              Hot Topics
            </p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {topics.map((t,i)=>(
                <span key={t} style={{
                  padding:"0.28rem 0.7rem",borderRadius:14,cursor:"pointer",
                  background:i<3?"var(--accent-dim)":"var(--bg-secondary)",
                  border:i<3?"1px solid rgba(249,115,22,0.3)":"1px solid var(--border)",
                  color:i<3?"var(--accent)":"var(--text-muted)",
                  fontFamily:"var(--font-sans)",fontSize:"0.7rem",fontWeight:500,
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          {profile?.interests?.length>0&&(
            <div style={{padding:"0.8rem 0.9rem",background:"var(--bg-secondary)",
                          borderRadius:12,border:"1px solid var(--border)"}}>
              <p style={{fontFamily:"var(--font-sans)",fontSize:"0.63rem",fontWeight:700,
                           letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--text-muted)",marginBottom:8}}>
                Your Interests
              </p>
              <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                {profile.interests.map(i=>(
                  <span key={i} style={{fontSize:"0.68rem",padding:"2px 8px",background:"var(--bg-tertiary)",
                                          borderRadius:10,color:"var(--text-muted)",border:"1px solid var(--border)",
                                          fontFamily:"var(--font-sans)"}}>
                    {i}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* MIDDLE: Feed */}
        <main>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.1rem"}}>
            <h1 style={{fontFamily:"var(--font-display)",fontSize:"1.2rem",fontWeight:700,color:"var(--text-primary)"}}>
              For You
              <span style={{fontFamily:"var(--font-sans)",fontSize:"0.72rem",fontWeight:400,
                             color:"var(--text-muted)",marginLeft:10}}>
                curated for {profile?.role||"you"} · {profile?.age||""}
              </span>
            </h1>
            <button onClick={fetchHeadlines} disabled={fetching}
                    style={{background:"none",border:"none",cursor:"pointer",color:"var(--text-muted)",
                              fontFamily:"var(--font-sans)",fontSize:"0.75rem",
                              display:"flex",alignItems:"center",gap:5}}>
              <span style={{display:"inline-block",animation:fetching?"spin 1s linear infinite":"none"}}>↻</span>
              Refresh
            </button>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:"0.9rem"}}>
            {fetching
              ? Array.from({length:5}).map((_,i)=><SkeletonCard key={i}/>)
              : feed.map((item,idx)=>(
                  <div key={item.id} style={{animation:"fadeUp 0.4s ease forwards",
                                               animationDelay:`${idx*60}ms`,opacity:0}}>
                    <NewsCard item={item} profile={profile}
                              isPreprocessed={preprocessed.has(item.id)}
                              onGenerate={handleGenerate} loading={loadingId===item.id}/>
                  </div>
                ))
            }
          </div>

          <p style={{textAlign:"center",marginTop:"2rem",fontFamily:"var(--font-sans)",
                      fontSize:"0.7rem",color:"var(--text-muted)"}}>
            Powered by 5 AI Agents · LangGraph · Human-in-the-loop
          </p>
        </main>
      </div>
    </div>
  );
}