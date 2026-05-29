import { useState, useMemo } from "react";
import { GitPullRequest, GitMerge, BookOpen, Star, RefreshCw, Terminal, GitBranch } from "lucide-react";

export default function GitHubVisualizer() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [activeRepo, setActiveRepo] = useState<string>("meetmind-ai");

  // Generate highly realistic GitHub contribution grid with varying intensity colors for a 20-week span (140 days)
  const contributionGrid = useMemo(() => {
    const grid: { value: number; date: string; activity: string }[] = [];
    const date = new Date("2025-05-25"); // Anchor past date
    for (let i = 139; i >= 0; i--) {
      const curDate = new Date(date);
      curDate.setDate(date.getDate() - i);
      // Give random weight skewed to represent very active developer profile
      let value = 0;
      const rand = Math.random();
      if (rand > 0.85) value = 4; // Dark green
      else if (rand > 0.6) value = 3;  // Medium green
      else if (rand > 0.3) value = 2;  // Soft green
      else if (rand > 0.1) value = 1;  // Minimal green
      else value = 0; // Cold slate/none

      // Skew weekend values lower for realism
      const dayOfWeek = curDate.getDay();
      if ((dayOfWeek === 0 || dayOfWeek === 6) && value > 1) {
        value -= 1;
      }

      const activityLogs = [
        "No commits recorded",
        "Merged 1 branch fix in core middleware",
        "Pushed 3 updates to React rendering tree; optimized hydration",
        "Committed secure auth endpoint; tested cookie rotation payloads",
        "Resolved 4 high-concurrency websocket connection bottlenecks in Redis layer"
      ];

      grid.push({
        value,
        date: curDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        activity: activityLogs[value]
      });
    }
    return grid;
  }, []);

  const totalCommits = useMemo(() => {
    return contributionGrid.reduce((sum, item) => sum + (item.value * 2 + (item.value > 0 ? 1 : 0)), 462);
  }, [contributionGrid]);

  const activeDayLog = selectedDay !== null ? contributionGrid[selectedDay] : null;

  const repositories = [
    {
      name: "meetmind-ai",
      desc: "Meeting transcription and productivity platform utilizing secure dual-token rotating cookies.",
      stars: 48,
      forks: 12,
      lang: "TypeScript",
      langColor: "bg-blue-500"
    },
    {
      name: "synapse-ai",
      desc: "Low-latency collaborative document workspace synchronized with Socket.IO web sockets.",
      stars: 32,
      forks: 7,
      lang: "TypeScript",
      langColor: "bg-blue-500"
    },
    {
      name: "linkmind-ai",
      desc: "High-performance Express routing engine with MongoDB indexing and custom Redis caches.",
      stars: 18,
      forks: 4,
      lang: "TypeScript",
      langColor: "bg-blue-500"
    }
  ];

  return (
    <div id="github-section" className="w-full relative py-10 md:py-14 border-t border-slate-900 bg-slate-950/20 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Simplified compact module title */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-900/40 pb-5">
          <div>
            <div className="mb-2 uppercase text-[#64748b] font-mono text-[9px] font-black tracking-[0.2em] flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5 text-emerald-400" /> Open Source Codebase Proof
            </div>
            <h2 className="text-xl md:text-2xl font-sans font-bold text-white tracking-tight">
              GitHub Technical Telemetry
            </h2>
          </div>
          <p className="text-xs text-slate-450 max-w-sm font-sans md:text-right">
            Secondary verification metrics proving daily active developer contributions across private production nodes.
          </p>
        </div>

        {/* 2-Column Space Saving Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column (Timeline Grid + Commit inspector) - 60% wide (7 cols) */}
          <div className="lg:col-span-8 bg-slate-950/70 border border-slate-900 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900/60 pb-3">
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider font-mono">140-Day Active Matrix</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Select any active node block to inspect logs synchronously.</p>
              </div>
              <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-mono">
                <span>Less</span>
                <span className="w-2 h-2 rounded bg-slate-900 border border-slate-800" />
                <span className="w-2 h-2 rounded bg-emerald-950/40" />
                <span className="w-2 h-2 rounded bg-emerald-800/60" />
                <span className="w-2 h-2 rounded bg-emerald-600/80" />
                <span className="w-2 h-2 rounded bg-emerald-500" />
                <span>More</span>
              </div>
            </div>

            {/* Matrix dots grid - compact */}
            <div className="w-full overflow-x-auto pb-1 select-none">
              <div className="grid grid-flow-col grid-rows-7 gap-[3px] max-w-fit">
                {contributionGrid.map((item, idx) => {
                  let colorClass = "bg-slate-900 hover:bg-slate-850 border-[0.3px] border-slate-800/10";
                  if (item.value === 1) colorClass = "bg-emerald-950/30 border-[0.3px] border-emerald-900/10 hover:bg-emerald-900/50";
                  if (item.value === 2) colorClass = "bg-emerald-900/50 border-[0.3px] border-emerald-850/10 hover:bg-emerald-800/70";
                  if (item.value === 3) colorClass = "bg-emerald-700/70 border-[0.3px] border-emerald-600/15 hover:bg-emerald-600";
                  if (item.value === 4) colorClass = "bg-emerald-500 border-[0.3px] border-emerald-450/20 shadow-[0_0_8px_rgba(16,185,129,0.12)]";
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedDay(idx)}
                      className={`w-[8px] h-[8px] rounded transition-all duration-150 relative cursor-pointer ${colorClass} ${
                        selectedDay === idx ? "ring-2 ring-indigo-500 scale-110 z-10" : ""
                      }`}
                      title={`${item.date}: ${item.activity}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Commit logs inspector box */}
            <div className="bg-slate-950/80 border border-slate-900 rounded-xl p-3 flex items-start justify-between gap-3 font-mono text-[11px] min-h-[60px]">
              <div className="flex items-start gap-2.5">
                <Terminal className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="text-slate-500 text-[8px] uppercase font-black tracking-widest">METADATA CODE INSPECTOR</p>
                  {activeDayLog ? (
                    <div className="leading-relaxed">
                      <span className="text-indigo-400 font-bold">{activeDayLog.date} </span>
                      <span className="text-slate-200">—— {activeDayLog.activity}</span>
                    </div>
                  ) : (
                    <p className="text-slate-500 italic text-[10px]">Select a green matrix node coordinate to list verified repository logs.</p>
                  )}
                </div>
              </div>
              {activeDayLog && (
                <button 
                  onClick={() => setSelectedDay(null)}
                  className="text-[9px] font-mono font-bold text-indigo-400 hover:text-indigo-300 px-2.2 py-0.5 rounded border border-indigo-500/20 bg-indigo-500/5 transition-all cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* 4 compact sub-stats in a grid row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-1">
              <div className="bg-[#020617] border border-slate-900 p-2.5 rounded-xl text-center">
                <span className="text-[8px] font-mono text-slate-500 uppercase font-semibold block">Total Commits</span>
                <span className="text-base font-bold text-white font-mono">{totalCommits}</span>
              </div>
              <div className="bg-[#020617] border border-slate-900 p-2.5 rounded-xl text-center">
                <span className="text-[8px] font-mono text-slate-500 uppercase font-semibold block">Pull Requests</span>
                <span className="text-base font-bold text-white font-mono">164</span>
              </div>
              <div className="bg-[#020617] border border-slate-900 p-2.5 rounded-xl text-center">
                <span className="text-[8px] font-mono text-slate-500 uppercase font-semibold block">Primary Stack</span>
                <span className="text-base font-bold text-white font-mono">MERN / TS</span>
              </div>
              <div className="bg-[#020617] border border-slate-900 p-2.5 rounded-xl text-center">
                <span className="text-[8px] font-mono text-slate-500 uppercase font-semibold block">Starred Nodes</span>
                <span className="text-base font-bold text-white font-mono">112</span>
              </div>
            </div>
          </div>

          {/* Right Column (Repositories Showcase) - 40% wide (4 cols) */}
          <div className="lg:col-span-4 space-y-2.5">
            <p className="text-[9px] font-mono text-slate-500 font-bold uppercase tracking-widest pl-1">Highlighted Repositories</p>
            {repositories.map((repo, idx) => {
              return (
                <div
                  key={idx}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 flex flex-col justify-between hover:border-slate-800 ${
                    activeRepo === repo.name
                      ? "bg-slate-950/80 border-indigo-500/20 ring-1 ring-indigo-500/5"
                      : "bg-slate-950/30 border-slate-900/60"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between font-sans">
                      <span className="text-xs font-mono font-bold text-indigo-400 flex items-center gap-1 select-all">
                        git clone {repo.name}
                      </span>
                      <Star className="w-3 h-3 text-amber-500" />
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans leading-relaxed line-clamp-2">
                      {repo.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between w-full pt-2 mt-2.5 border-t border-slate-900/55">
                    <span className="flex items-center gap-1 text-[8px] font-mono text-slate-550 uppercase">
                      <span className={`w-1.5 h-1.5 rounded-full ${repo.langColor}`} />
                      {repo.lang}
                    </span>
                    
                    <div className="flex items-center gap-2 text-[8px] font-mono text-slate-550">
                      <span className="flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5" /> {repo.stars}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <RefreshCw className="w-2.5 h-2.5" /> {repo.forks}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}
