import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, Key, RefreshCw, Lock, Server, Database, Cpu, 
  Sparkles, Globe, Activity, ArrowRight, Terminal, Zap, CheckCircle2, Workflow
} from "lucide-react";

type FlowStep = {
  title: string;
  source: string;
  target: string;
  action: string;
  active: boolean;
};

export default function ArchitectureVisualizer() {
  const [activeTab, setActiveTab] = useState<"auth" | "realtime" | "ai">("ai");
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const handleSetArchTab = (e: any) => {
      if (e.detail) {
        setActiveTab(e.detail);
        setCurrentStep(0);
        setIsPlaying(true);
      }
    };
    window.addEventListener("set-architecture-tab" as any, handleSetArchTab);
    return () => window.removeEventListener("set-architecture-tab" as any, handleSetArchTab);
  }, []);

  // Progression intervals
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 4);
    }, 3800);
    return () => clearInterval(interval);
  }, [isPlaying, activeTab]);

  const handleTabChange = (tab: "auth" | "realtime" | "ai") => {
    setActiveTab(tab);
    setCurrentStep(0);
  };

  const authSteps = [
    {
      title: "1. Credentials Transfer",
      description: "Client submits secure logins to Node proxies using strict HttpOnly encryption.",
      sender: "Browser",
      receiver: "Express Server",
      detail: "POST /api/auth/login",
      icon: Lock,
      status: "Analyzing login credentials handshake..."
    },
    {
      title: "2. Middleware Signature Check",
      description: "Express validates JWT signature keys and parses RBAC profile permissions.",
      sender: "Express",
      receiver: "Auth System",
      detail: "Validated SHA256 cookie credentials",
      icon: Cpu,
      status: "Applying security scope definitions..."
    },
    {
      title: "3. HttpOnly Rotation Set",
      description: "Writes secure same-site keys down storage domains, mitigating client forgery risks.",
      sender: "Express",
      receiver: "Storage Jar",
      detail: "Cookie: Set-Cookie (HttpOnly; SameSite=Strict)",
      icon: Shield,
      status: "Session tokens successfully saved to browser"
    },
    {
      title: "4. Access Completed",
      description: "Grants granular paths based on role schemas, avoiding resource namespace leaks.",
      sender: "Browser",
      receiver: "MongoDB Cluster",
      detail: "Payload session context successfully aligned",
      icon: Database,
      status: "Secure authorization resolved in <3ms"
    }
  ];

  const realtimeSteps = [
    {
      title: "1. WebSockets Connect",
      description: "Initializes persistent bi-directional WebSockets on Node cluster streams.",
      sender: "Browser",
      receiver: "Socket.IO Router",
      detail: "socket.connect() -> ws://host:3000",
      icon: Activity,
      status: "Binding socket connections down active client grids"
    },
    {
      title: "2. Event Dispatching Map",
      description: "Bridges user cursors and doc delta increments under millisecond limits.",
      sender: "Socket.IO Router",
      receiver: "Express Server",
      detail: "on('collab:delta', executeUpdate)",
      icon: Server,
      status: "Processing high packet throughput..."
    },
    {
      title: "3. Redis Lookup Check",
      description: "Queries Redis memory caches to serve telemetry metrics directly from memory.",
      sender: "Express",
      receiver: "Redis Cache",
      detail: "GET 'cursor:room:14' -> CACHE_HIT",
      icon: Globe,
      status: "Redis caching response resolved under 0.2ms"
    },
    {
      title: "4. Debounced Writes Queue",
      description: "Buffers delta writes before executing batch transactions against MongoDB.",
      sender: "Socket.IO",
      receiver: "MongoDB Cluster",
      detail: "db.rooms.bulkWrite([bufferedDeltas])",
      icon: Database,
      status: "Delta write successfully synced to target nodes"
    }
  ];

  const aiSteps = [
    {
      title: "1. API Handshake Initialization",
      description: "App routes summary commands to Express proxy backends to protect keys.",
      sender: "React UI",
      receiver: "Express Gateway",
      detail: "POST /api/chat { context: '...' }",
      icon: Sparkles,
      status: "Constructing request payload parameters..."
    },
    {
      title: "2. Guardrail Synthesis Middleware",
      description: "Extracts profiles before appending precise structured prompts dynamically.",
      sender: "Express Proxy",
      receiver: "Orchestration Pipeline",
      detail: "Appended strict metadata system guidelines",
      icon: Workflow,
      status: "Sanitizing injection attacks..."
    },
    {
      title: "3. Secure Gemini Gateway API Access",
      description: "Retrieves summaries off Gemini endpoints via high-grade SDK adapters.",
      sender: "Pipeline",
      receiver: "Gemini 3.5 Model",
      detail: "ai.models.generateContent({ model: 'gemini-3.5-flash' })",
      icon: Sparkles,
      status: "Computing structured payload response..."
    },
    {
      title: "4. Response Sanitation",
      description: "Strips injection markers and maps data blocks into high-contrast render layers.",
      sender: "Express Gateway",
      receiver: "Browser Window",
      detail: "Success: 200 OK with sanitized transcript tree",
      icon: CheckCircle2,
      status: "Completed parsing in 120ms"
    }
  ];

  const currentTabSteps = 
    activeTab === "auth" ? authSteps : 
    activeTab === "realtime" ? realtimeSteps : aiSteps;

  const currentStepData = currentTabSteps[currentStep];

  return (
    <div id="architecture-section" className="w-full relative py-6 border-t border-slate-900 bg-slate-950/40 font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] bg-indigo-900/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 gap-4">
          <div>
            <div className="mb-2 uppercase text-[#64748b] font-mono text-xs font-black tracking-[0.2em] flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-400" /> Blueprint
            </div>
            <h2 className="text-3xl font-sans font-bold text-white tracking-tight">
              Systems Architecture
            </h2>
            <p className="mt-1 text-slate-400 max-w-lg text-xs sm:text-sm font-sans leading-relaxed">
              Interactive structural flows illustrating secure data structures, multi-user socket threads, and AI gateways.
            </p>
          </div>

          {/* Core controls tab bar */}
          <div className="flex flex-wrap items-center gap-1 p-0.5 bg-[#030712] border border-slate-900 rounded-lg">
            <button
              onClick={() => handleTabChange("ai")}
              className={`px-3 py-1 text-xs font-medium font-mono rounded transition-all duration-200 ${
                activeTab === "ai" 
                  ? "bg-indigo-600 text-white shadow" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Gemini AI adaptors
            </button>
            <button
              onClick={() => handleTabChange("realtime")}
              className={`px-3 py-1 text-xs font-medium font-mono rounded transition-all duration-200 ${
                activeTab === "realtime" 
                  ? "bg-indigo-600 text-white shadow" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Sockets & Caching
            </button>
            <button
              onClick={() => handleTabChange("auth")}
              className={`px-3 py-1 text-xs font-medium font-mono rounded transition-all duration-200 ${
                activeTab === "auth" 
                  ? "bg-indigo-600 text-white shadow" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Secure Auth Map
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Controllers Console */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="bg-[#030712]/70 border border-slate-900 rounded-xl p-3.5">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-900">
                <span className="text-[9px] font-mono font-bold tracking-wider text-slate-500 uppercase">
                  SIMULATION CONTROLS
                </span>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-1 text-[9px] px-2 py-0.5 rounded border border-slate-800 bg-slate-900 text-indigo-400 font-mono"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
                  {isPlaying ? "ACTIVE" : "PAUSED"}
                </button>
              </div>

              {/* Steps timeline buttons */}
              <div className="space-y-1.5">
                {currentTabSteps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsPlaying(false);
                        setCurrentStep(idx);
                      }}
                      className={`w-full text-left p-2 rounded-lg border transition-all duration-250 flex items-start gap-3 group ${
                        idx === currentStep
                          ? "bg-indigo-950/20 border-indigo-500/30"
                          : "bg-transparent border-transparent hover:bg-slate-900/20"
                      }`}
                    >
                      <div className={`p-1 rounded transition-all ${
                        idx === currentStep ? "bg-indigo-700 text-white" : "bg-slate-900 text-slate-500 group-hover:text-slate-300"
                      }`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className={`text-xs font-sans font-bold tracking-tight transition-colors ${
                          idx === currentStep ? "text-slate-200" : "text-slate-450 text-slate-400 group-hover:text-slate-300"
                        }`}>
                          {step.title}
                        </p>
                        <p className="text-[10px] text-slate-550 mt-0.5 font-mono text-slate-500 truncate">
                          {step.sender} → {step.receiver}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation card */}
            <div className="bg-[#030712]/70 border border-slate-900 rounded-xl p-3">
              <span className="inline-flex items-center gap-1 text-[9px] tracking-wider font-mono text-indigo-400 font-bold uppercase mb-1">
                <Terminal className="w-3 h-3" /> System Logic
              </span>
              <p className="text-xs font-sans font-semibold text-slate-200 leading-tight">
                {currentStepData.title}
              </p>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                {currentStepData.description}
              </p>
              <div className="mt-2.5 p-1 px-1.5 bg-[#020617] border border-slate-900 rounded text-[9px] font-mono flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="truncate">{currentStepData.status}</span>
              </div>
            </div>
          </div>

          {/* Right Blueprint Panel - Compact vertical profile bounds */}
          <div className="lg:col-span-8 bg-[#030712]/70 border border-slate-900 rounded-xl p-3.5 min-h-[220px] flex flex-col justify-between relative overflow-hidden">
            
            <div className="w-full flex items-center justify-between border-b border-slate-900 pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-800" />
                <span className="w-2 h-2 rounded-full bg-slate-800" />
                <span className="w-2 h-2 rounded-full bg-slate-800" />
                <span className="text-[10px] font-mono text-slate-500 ml-1.5">orchestration_flow.ts</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                <Activity className="w-3 h-3 text-indigo-400 animate-pulse" />
                <span>Simulated</span>
              </div>
            </div>

            {/* Interactive Flow Grid */}
            <div className="flex-1 w-full bg-[#020617]/40 border border-slate-900 rounded-lg p-3 relative flex flex-col md:flex-row items-center justify-around gap-3 min-h-[115px] overflow-hidden">
              
              {/* Box 1 */}
              <div className={`p-2.5 rounded-lg border transition-all duration-200 w-full md:w-[130px] flex flex-col items-center justify-center text-center gap-1 relative ${
                currentStep === 0 
                  ? "bg-[#020617] border-indigo-500 ring-1 ring-indigo-500/25 scale-[1.01]"
                  : "bg-transparent border-slate-905 border-slate-900 text-slate-500"
              }`}>
                <div className="p-1 bg-slate-900 border border-slate-800 rounded text-indigo-400">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-sans font-bold text-slate-200">User Interface</p>
                  <p className="text-[9px] font-mono text-slate-500">Client Web</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex flex-col items-center justify-center text-center max-w-[80px] relative">
                <div className="w-12 h-[2px] bg-slate-900 rounded relative overflow-hidden">
                  <motion.div 
                    initial={{ left: "-15px" }}
                    animate={{ left: "110%" }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.6,
                      ease: "linear"
                    }}
                    className="absolute top-0 w-4 h-full bg-indigo-500/80 blur-[1.5px]"
                  />
                </div>
                <span className="text-[8px] font-mono text-slate-600 mt-1.5 uppercase tracking-wider">
                  {activeTab === "realtime" ? "WS Channel" : "HTTPS API"}
                </span>
              </div>

              {/* Box 2 */}
              <div className={`p-2.5 rounded-lg border transition-all duration-200 w-full md:w-[130px] flex flex-col items-center justify-center text-center gap-1 relative ${
                currentStep === 1 || currentStep === 2
                  ? "bg-[#020617] border-indigo-500 ring-1 ring-indigo-500/25 scale-[1.01]"
                  : "bg-transparent border-slate-905 border-slate-900 text-slate-500"
              }`}>
                {currentStep === 1 && (
                  <div className="absolute inset-0 bg-indigo-500/5 rounded-lg border border-indigo-500/20 animate-pulse" />
                )}
                <div className="p-1 bg-slate-900 border border-slate-800 rounded text-indigo-400">
                  <Server className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs font-sans font-bold text-slate-200">Node Gateway</p>
                  <p className="text-[9px] font-mono text-slate-500">Express API</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex flex-col items-center justify-center text-center max-w-[80px] relative">
                <div className="w-12 h-[2px] bg-slate-900 rounded relative overflow-hidden">
                  <motion.div 
                    initial={{ left: "-15px" }}
                    animate={{ left: "110%" }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.6,
                      ease: "linear",
                      delay: 0.8
                    }}
                    className="absolute top-0 w-4 h-full bg-indigo-500/80 blur-[1.5px]"
                  />
                </div>
                <span className="text-[8px] font-mono text-slate-600 mt-1.5 uppercase tracking-wider">
                  {activeTab === "ai" ? "GenAI Core" : "DB Cluster"}
                </span>
              </div>

              {/* Box 3 */}
              <div className={`p-2.5 rounded-lg border transition-all duration-200 w-full md:w-[130px] flex flex-col items-center justify-center text-center gap-1 relative ${
                currentStep === 3
                  ? "bg-[#020617] border-indigo-500 ring-1 ring-indigo-500/25 scale-[1.01]"
                  : "bg-transparent border-slate-905 border-slate-900 text-slate-500"
              }`}>
                <div className="p-1 bg-slate-900 border border-slate-800 rounded text-indigo-400">
                  {activeTab === "ai" ? (
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                  ) : (
                    <Database className="w-4 h-4 text-indigo-400" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-sans font-bold text-slate-200">
                    {activeTab === "ai" ? "Gemini Adapter" : "MongoDB Cloud"}
                  </p>
                  <p className="text-[9px] font-mono text-slate-500">
                    {activeTab === "ai" ? "AI Pipeline" : "Atlas Server"}
                  </p>
                </div>
              </div>

            </div>

            {/* Simulated log logger */}
            <div className="mt-3 w-full bg-[#020617] border border-slate-900 rounded p-2 px-3 font-mono text-[11px] text-slate-350">
              <div className="flex items-center justify-between text-slate-500 text-[9px] border-b border-slate-900/60 pb-1 mb-1.5">
                <span>SIMULATED TRANSACTION EVENT</span>
                <span>STATUS: STABLE</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-500 select-none">~</span>
                <div>
                  <p className="text-[#a5b4fc] text-[10px] font-semibold">{currentStepData.detail}</p>
                  <p className="text-slate-500 text-[9px] mt-0.5">Hash Reference: sha255_{SHA_HASH(currentStepData.title)}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function SHA_HASH(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16).substring(0, 8).toUpperCase();
}
