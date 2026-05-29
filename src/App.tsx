import React, { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Briefcase, Code, Cpu, Database, Sparkles, Shield, 
  Mail, MessageSquare, Terminal, ExternalLink, Github, Linkedin, 
  MapPin, Clock, Calendar, ChevronRight, CheckCircle2, 
  Download, Zap, Activity, Info, Menu, X, ArrowUpRight, Loader2, Maximize2, FileText
} from "lucide-react";
import { PROJECTS, FRONTEND_AI_PROJECTS, SKILL_CATEGORIES, TIMELINE, PORTFOLIO_STATS } from "./data";

// React 19 optimized lazy dynamic components (Code Splitting)
const ArchitectureVisualizer = lazy(() => import("./components/ArchitectureVisualizer"));
const RecruiterChat = lazy(() => import("./components/RecruiterChat"));
const ResumeModal = lazy(() => import("./components/ResumeModal"));

// Suspense Loader Fallback UI
const SectionSuspenseFallback = () => (
  <div className="w-full max-w-7xl mx-auto px-6 py-8 flex items-center justify-center">
    <div className="bg-[#030712] border border-slate-800 p-6 rounded-2xl w-full flex flex-col items-center justify-center gap-3 animate-pulse">
      <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
      <span className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">Loading system component...</span>
    </div>
  </div>
);

// High-End Minimalist Code Terminal Widget for Hero Section
const HeroCodeConsole = () => {
  return (
    <motion.div 
      animate={{ 
        boxShadow: [
          "0 0 40px -20px rgba(79, 70, 229, 0.15)",
          "0 0 50px -10px rgba(99, 102, 241, 0.3)",
          "0 0 40px -20px rgba(79, 70, 229, 0.15)"
        ],
        borderColor: [
          "rgba(30, 41, 59, 1)",
          "rgba(99, 102, 241, 0.35)",
          "rgba(30, 41, 59, 1)"
        ]
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="bg-[#030712] border border-slate-800 rounded-2xl p-5 shadow-2xl relative w-full overflow-hidden font-mono text-xs select-none backdrop-blur-md"
    >
      {/* File Tab Header */}
      <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
          </div>
          <span className="text-slate-500 ml-3 text-[10px] uppercase tracking-wider font-mono">api/summarizer.ts</span>
        </div>
        <span className="text-[10px] text-indigo-455 text-indigo-400 font-semibold tracking-wider font-mono">TypeScript • Express</span>
      </div>

      {/* Code Text with custom premium syntax coloring */}
      <pre className="text-slate-350 leading-relaxed text-[11px] font-mono overflow-x-auto whitespace-pre">
        <code>
          <span className="text-pink-400">import</span> {"{"} GoogleGenAI {"}"} <span className="text-pink-400">from</span> <span className="text-emerald-400">"@google/genai"</span>;{"\n"}
          <span className="text-pink-400">import</span> {"{"} Router {"}"} <span className="text-pink-400">from</span> <span className="text-emerald-400">"express"</span>;{"\n\n"}
          <span className="text-pink-400">const</span> ai = <span className="text-blue-400">new</span> <span className="text-amber-300">GoogleGenAI</span>();{"\n"}
          <span className="text-pink-400">const</span> router = <span className="text-blue-450 text-blue-450 text-blue-400">Router</span>();{"\n\n"}
          router.<span className="text-teal-400">post</span>(<span className="text-emerald-400">"/api/summarize"</span>, <span className="text-pink-400">async</span> (req, res) =&gt; {"{"}{"\n"}
          {"  "}<span className="text-pink-400">const</span> {"{"} messages {"}"} = req.body;{"\n\n"}
          {"  "}<span className="text-[#64748b]">/{"/"} Stream transcript summarization</span>{"\n"}
          {"  "}<span className="text-pink-400">const</span> response = <span className="text-pink-400">await</span> ai.models.<span className="text-teal-400">generateContent</span>({"{"}{"\n"}
          {"    "}model: <span className="text-emerald-400">"gemini-3.5-flash"</span>,{"\n"}
          {"    "}contents: messages,{"\n"}
          {"    "}config: {"{"}{"\n"}
          {"      "}systemInstruction: <span className="text-emerald-400">"Extract key milestones."</span>,{"\n"}
          {"      "}responseMimeType: <span className="text-emerald-400">"application/json"</span>{"\n"}
          {"    "}{"}"}{"\n"}
          {"  "}{"}"});{"\n\n"}
          {"  "}<span className="text-pink-400">return</span> res.<span className="text-teal-405 text-teal-400 font-medium">json</span>({"{"} summary: response.text {"}"});{"\n"}
          {"}"});
        </code>
      </pre>

      {/* Compiler Status line */}
      <div className="mt-5 pt-3.5 border-t border-slate-900/80 flex items-center justify-between text-[10px] text-slate-500 font-mono uppercase tracking-widest font-bold">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>ESM Production Compiled</span>
        </div>
        <span>OK</span>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<any | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  
  // Project screenshot gallery selection state
  const [activeScreenshot, setActiveScreenshot] = useState<Record<string, number>>({
    "meetmind-ai": 0,
    "synapse-ai": 0,
    "linkmind-ai": 0,
  });

  // Handle contact via direct Gmail compose redirect as ordered
  const handleContactClick = () => {
    const subject = "Portfolio Inquiry — Naresh Kamarthy";
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=kamarthinaresh79@gmail.com&su=${encodeURIComponent(subject)}`;
    window.open(gmailUrl, "_blank");
  };

  // Set active section on scroll with optimized IntersectionObserver
  useEffect(() => {
    const list = [
      "about-section",
      "projects-section",
      "timeline-section",
      "skills-section",
      "architecture-section"
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId.split("-")[0]);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    list.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // State for Executive Resume View
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Trigger Resume Modal Window
  const handlePdfDownload = () => {
    setIsResumeOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 selection:bg-indigo-600 selection:text-white pb-1 relative font-sans overflow-x-hidden">
      
      {/* Subtle floating blurred gradient circles for warm tech mood */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none -mr-40 -mt-40" />
      <div className="absolute top-[800px] left-1/4 w-[600px] h-[600px] bg-indigo-950/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[2000px] right-10 w-[700px] h-[700px] bg-indigo-900/5 blur-[170px] pointer-events-none" />

      {/* Modern sticky navigation header */}
      <nav className="sticky top-0 w-full z-40 bg-[#020617]/80 border-b border-slate-900 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-display font-bold text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]">
              NK
            </div>
            <div>
              <span className="text-sm font-semibold text-slate-100 tracking-tight">
                Naresh Kamarthy
              </span>
              <p className="text-[10px] font-mono text-indigo-400">Senior Software Engineer</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider font-mono h-full">
            <a 
              href="#about-section" 
              className={`relative hover:text-white transition-all duration-200 py-1 ${activeSection === "about" ? "text-indigo-450 text-indigo-400 font-bold" : "text-slate-400"}`}
            >
              Intro
              {activeSection === "about" && (
                <motion.span 
                  layoutId="activeTabUnderline"
                  className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-indigo-500 rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
            </a>
            <a 
              href="#projects-section" 
              className={`relative hover:text-white transition-all duration-200 py-1 ${activeSection === "projects" ? "text-indigo-450 text-indigo-400 font-bold" : "text-slate-400"}`}
            >
              Projects
              {activeSection === "projects" && (
                <motion.span 
                  layoutId="activeTabUnderline"
                  className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-indigo-500 rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
            </a>
            <a 
              href="#timeline-section" 
              className={`relative hover:text-white transition-all duration-200 py-1 ${activeSection === "timeline" ? "text-indigo-450 text-indigo-400 font-bold" : "text-slate-400"}`}
            >
              Timeline
              {activeSection === "timeline" && (
                <motion.span 
                  layoutId="activeTabUnderline"
                  className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-indigo-500 rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
            </a>
            <a 
              href="#skills-section" 
              className={`relative hover:text-white transition-all duration-200 py-1 ${activeSection === "skills" ? "text-indigo-450 text-indigo-400 font-bold" : "text-slate-400"}`}
            >
              Stack
              {activeSection === "skills" && (
                <motion.span 
                  layoutId="activeTabUnderline"
                  className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-indigo-500 rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
            </a>
            <a 
              href="#architecture-section" 
              className={`relative hover:text-white transition-all duration-200 py-1 ${activeSection === "architecture" ? "text-indigo-450 text-indigo-400 font-bold" : "text-slate-400"}`}
            >
              Architecture
              {activeSection === "architecture" && (
                <motion.span 
                  layoutId="activeTabUnderline"
                  className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-indigo-500 rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
            </a>
            <motion.button 
              onClick={handleContactClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hover:text-white transition-colors py-1 text-slate-400 font-bold cursor-pointer font-mono"
            >
              Contact
            </motion.button>
          </div>

          {/* Desktop Right items */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[9px] uppercase font-bold text-green-400 tracking-widest font-mono">Available</span>
            </div>
            <button 
              onClick={handlePdfDownload}
              className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-[0_0_20px_rgba(79,70,229,0.35)] hover:bg-indigo-500 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Resume .PDF
            </button>
          </div>

          {/* Mobile open button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile slide drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0, y: -10 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden w-full bg-[#020617] border-b border-slate-800 p-6 space-y-4 absolute top-16 left-0 shadow-2xl z-50 font-mono text-xs uppercase tracking-wider overflow-hidden"
            >
              <div className="flex flex-col gap-3 font-semibold text-slate-300">
                <a onClick={() => setMobileMenuOpen(false)} href="#about-section" className="hover:text-white py-1.5 border-b border-slate-800/60">Intro</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#projects-section" className="hover:text-white py-1.5 border-b border-slate-800/60">Projects</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#timeline-section" className="hover:text-white py-1.5 border-b border-slate-800/60">Timeline</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#skills-section" className="hover:text-white py-1.5 border-b border-slate-800/60">Stack</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#architecture-section" className="hover:text-white py-1.5 border-b border-slate-800/60">Architecture</a>
                <button 
                  onClick={() => { setMobileMenuOpen(false); handleContactClick(); }} 
                  className="hover:text-white py-1.5 text-left font-bold text-slate-300 cursor-pointer"
                >
                  Contact
                </button>
              </div>
              <div className="flex flex-col gap-2 pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handlePdfDownload();
                  }}
                  className="w-full text-center flex items-center justify-center gap-2 text-xs font-mono bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-slate-200 cursor-pointer uppercase font-bold"
                >
                  <Download className="w-4 h-4 text-indigo-400" /> Print Resume PDF
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 1. HERO SECTION */}
      <header id="about-section" className="w-full max-w-7xl mx-auto px-6 pt-12 md:pt-20 lg:pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Info Info details */}
          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.05
                }
              }
            }}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6"
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 110, damping: 15 } }
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#4f46e5]/10 border border-[#4f46e5]/25 rounded-full"
            >
              <span className="w-2 h-2 rounded-full bg-[#4f46e5] animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-400 uppercase">
                SCALABLE MERN & AI SYSTEMS ARCHITECT
              </span>
            </motion.div>

            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 18 } }
              }}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight text-white leading-[1.05]"
            >
              Naresh Kamarthy
            </motion.h1>
            
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-lg sm:text-xl font-sans font-medium text-slate-200"
            >
              Senior Software Engineer <span className="text-slate-500">/ MERN Stack & AI Systems</span>
            </motion.p>
            
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-sm md:text-base text-slate-400 leading-relaxed max-w-xl font-sans font-medium"
            >
              Senior Software Engineer building scalable MERN platforms, secure SaaS systems, realtime architectures, and AI-powered web applications.
            </motion.p>

            {/* Quick stats grid row */}
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
              }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2"
            >
              {PORTFOLIO_STATS.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 16 } }
                  }}
                  whileHover={{ 
                    y: -4, 
                    scale: 1.02, 
                    borderColor: "rgba(99, 102, 241, 0.4)",
                    boxShadow: "0 6px 20px -5px rgba(79, 70, 229, 0.15)",
                    backgroundColor: "rgba(15, 23, 42, 0.6)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="bg-slate-950/40 border border-slate-900 p-3 px-4 rounded-xl font-mono cursor-default select-none transition-colors duration-150"
                >
                  <p className="text-xl font-bold text-white tracking-tight">{item.value}</p>
                  <p className="text-[9px] text-slate-500 uppercase mt-0.5 tracking-wider font-semibold">{item.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Action CTAs */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <motion.a
                href="https://github.com/naresh-kamarthy"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.02, backgroundColor: "#0f172a" }}
                whileTap={{ scale: 0.98 }}
                className="bg-slate-900 text-slate-200 border border-slate-800 p-2.5 px-4.5 rounded-xl text-xs font-mono tracking-wider uppercase font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Github className="w-4 h-4 text-indigo-400" /> GitHub
              </motion.a>
              <motion.button
                onClick={handlePdfDownload}
                whileHover={{ scale: 1.02, backgroundColor: "#0f172a" }}
                whileTap={{ scale: 0.98 }}
                className="bg-slate-900 text-slate-200 border border-slate-800 p-2.5 px-4.5 rounded-xl text-xs font-mono tracking-wider uppercase font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-indigo-400" /> Resume
              </motion.button>
              <motion.button
                onClick={handleContactClick}
                whileHover={{ scale: 1.02, backgroundColor: "#4338ca" }}
                whileTap={{ scale: 0.98 }}
                className="bg-indigo-600 text-white p-2.5 px-5 rounded-xl text-xs font-mono tracking-wider uppercase font-bold shadow-[0_0_20px_rgba(79,70,229,0.35)] transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Mail className="w-4 h-4" /> Contact
              </motion.button>
              <motion.a
                href="https://www.linkedin.com/in/naresh-kamarthy-aa1239130"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.02, backgroundColor: "#0f172a" }}
                whileTap={{ scale: 0.98 }}
                className="bg-slate-900 text-slate-200 border border-slate-800 p-2.5 px-4.5 rounded-xl text-xs font-mono tracking-wider uppercase font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Linkedin className="w-4 h-4 text-indigo-400" /> LinkedIn
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Hero Right Visual Column: Code Console Widget */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-5 relative w-full flex items-center justify-center"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-indigo-600/5 blur-[90px] rounded-full pointer-events-none" />
            <HeroCodeConsole />
          </motion.div>

        </div>
      </header>

      {/* 2. FEATURED PROJECTS SECTION */}
      <section id="projects-section" className="w-full relative py-12 border-t border-slate-900 bg-slate-950/20">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="mb-3 uppercase text-[#64748b] font-mono text-xs font-black tracking-[0.2em] flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-400" /> Showcase
              </div>
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">
                Featured Projects
              </h2>
              <p className="mt-2 text-slate-400 max-w-lg text-sm md:text-base font-sans leading-relaxed">
                Production-grade applications utilizing structured schemas, real-time workflows, and database indexing.
              </p>
            </div>
            
            <a 
              href="https://github.com/naresh-kamarthy" 
              target="_blank" 
              rel="noreferrer" 
              className="text-white hover:text-indigo-400 font-sans text-xs font-bold inline-flex items-center gap-2 mt-4 md:mt-0 transition-colors"
            >
              Browse complete GitHub codebase <Github className="w-4 h-4" />
            </a>
          </div>

          {/* List of 40% Text & 60% Visual Cards */}
          <div className="space-y-16">
            {PROJECTS.map((proj) => {
              const currentImgIdx = activeScreenshot[proj.id] ?? 0;
              const activeImg = proj.images ? proj.images[currentImgIdx] : proj.primaryImage;
              
              const getScreenLabel = (url: string) => {
                const name = url.split("/").pop() || "";
                if (name.includes("admin_dashboard") || name.includes("admin.png")) return "Admin Board";
                if (name.includes("ai_summary")) return "AI Summarizer";
                if (name.includes("ai_comparison")) return "LLM Evaluation";
                if (name.includes("analytics_operations") || name.includes("analytics")) return "Usage Analytics";
                if (name.includes("meeting_dashboard")) return "Live Workspace";
                if (name.includes("tasks_board")) return "Action Items";
                if (name.includes("user_workspace")) return "User Board";
                if (name.includes("campaigns")) return "Campaign Center";
                if (name.includes("mobile")) return "Mobile Layout";
                if (name.includes("dashboard")) return "Platform Dashboard";
                return "Main System View";
              };

              return (
                <motion.div 
                  key={proj.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ 
                    y: -4,
                    borderColor: "rgba(99, 102, 241, 0.22)",
                    boxShadow: "0 15px 35px -15px rgba(79, 70, 229, 0.16)",
                    backgroundColor: "rgba(3, 7, 18, 0.65)"
                  }}
                  className="bg-[#030712]/50 border border-slate-900 rounded-2xl p-6 md:p-8 hover:border-slate-800 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative"
                >
                  {/* Left Specs Container (40% width) */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-6 h-full">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[9px] font-mono p-1 px-2.5 bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 font-bold uppercase rounded tracking-wider">
                          {proj.category}
                        </span>
                        {proj.metrics && (
                          <span className="text-[9px] font-mono p-1 px-2.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-bold uppercase rounded tracking-wider">
                            {proj.metrics.split("•")[0].trim()}
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl font-sans font-bold text-white tracking-tight">
                        {proj.title}
                      </h3>
                      
                      <p className="text-xs text-indigo-400 font-mono uppercase tracking-wider font-semibold">
                        {proj.description}
                      </p>

                      {/* Summary explanation block */}
                      {proj.architectureSummary && (
                        <p className="text-xs text-slate-400 leading-relaxed font-sans">{proj.longDescription}</p>
                      )}

                      {/* Key bullet-points */}
                      <div className="space-y-2.5 pt-3">
                        <p className="text-[9px] font-mono text-slate-500 font-bold tracking-widest uppercase">System Implementations</p>
                        {proj.highlights.slice(0, 4).map((high, hIdx) => {
                          const parts = high.split(" ");
                          const firstWords = parts.slice(0, 2).join(" ");
                          const restWords = parts.slice(2).join(" ");
                          return (
                            <div key={hIdx} className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500/90 shrink-0 mt-0.5" />
                              <span className="text-xs text-slate-300 font-sans leading-relaxed">
                                <strong className="text-slate-100 font-semibold">{firstWords}</strong> {restWords}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Footer buttons (No Live Demo CTA) */}
                    <div className="pt-5 border-t border-slate-900/80 space-y-4">
                      <div className="flex flex-wrap gap-1.5">
                        {proj.tech.map((tag, tIdx) => (
                          <span 
                            key={tIdx} 
                            className="bg-slate-900/50 border border-slate-800 text-slate-400 p-1 px-2.5 rounded text-[9px] font-mono uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <a 
                          href={proj.githubUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 p-2.5 px-4 rounded-xl text-xs font-sans font-medium transition-all inline-flex items-center gap-1.5"
                        >
                          <Github className="w-3.5 h-3.5" /> GitHub Code
                        </a>
                        <button 
                          onClick={() => setSelectedCaseStudy(proj)}
                          className="bg-slate-900 hover:bg-indigo-950/40 text-slate-200 hover:text-indigo-300 border border-slate-800 hover:border-indigo-500/30 p-2.5 px-4 rounded-xl text-xs font-sans font-medium transition-all inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <Briefcase className="w-3.5 h-3.5 text-indigo-400" /> Case Study
                        </button>
                        <button 
                          onClick={() => {
                            const targetTab = proj.id === "meetmind-ai" ? "ai" : proj.id === "synapse-ai" ? "realtime" : "auth";
                            const event = new CustomEvent("set-architecture-tab", { detail: targetTab });
                            window.dispatchEvent(event);
                            const element = document.getElementById("architecture-section");
                            if (element) {
                              element.scrollIntoView({ behavior: "smooth" });
                            }
                          }}
                          className="bg-indigo-650 hover:bg-indigo-600 text-white p-2.5 px-4 rounded-xl text-xs font-sans font-semibold transition-all inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <Cpu className="w-3.5 h-3.5" /> View System
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Real Screenshot Panel (60% width) */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="bg-[#030712] border border-slate-900 rounded-2xl overflow-hidden relative shadow-xl">
                      {/* Window Header */}
                      <div className="flex items-center justify-between text-[11px] text-slate-500 bg-[#020617] border-b border-slate-900/80 px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-rose-500/40" />
                          <span className="w-2 h-2 rounded-full bg-amber-500/40" />
                          <span className="w-2 h-2 rounded-full bg-emerald-500/40" />
                          <span className="text-slate-400 ml-2 text-[10px] font-mono tracking-wider truncate max-w-[200px] sm:max-w-none">
                            {proj.id === "meetmind-ai" ? "meetmind.ai/dashboard" : proj.id === "synapse-ai" ? "synapseai.io/editor" : "linkmind.ai/analytics"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[9px] shrink-0 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span>PRODUCTION ACTIVE</span>
                        </div>
                      </div>

                      {/* Img Scrollable Viewport */}
                      <div className="relative aspect-[16/10] overflow-y-auto bg-[#030712] scroll-smooth scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                        <AnimatePresence mode="wait">
                          {activeImg ? (
                            <motion.div 
                              key={activeImg}
                              initial={{ opacity: 0, y: 3 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -3 }}
                              transition={{ duration: 0.18, ease: "easeInOut" }}
                              className="relative w-full"
                            >
                              <img 
                                src={activeImg} 
                                alt={`${proj.title} Workspace screenshot`}
                                className="w-full h-auto block object-top cursor-zoom-in hover:brightness-[1.02] transition-all"
                                referrerPolicy="no-referrer"
                                onClick={() => setLightboxSrc(activeImg)}
                              />
                              <div 
                                onClick={() => setLightboxSrc(activeImg)}
                                className="absolute bottom-3 right-3 bg-slate-950/90 border border-slate-800 rounded-xl px-3 py-1.5 text-[9px] font-mono text-slate-300 flex items-center gap-1.5 backdrop-blur-md cursor-pointer select-none"
                              >
                                <Maximize2 className="w-3 h-3 text-indigo-400" />
                                <span>Click to Expand</span>
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div 
                              key="missing"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex items-center justify-center p-12 text-slate-500 font-mono text-xs"
                            >
                              Screen capture not loaded
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Screenshot Tab Selector bar */}
                    {proj.images && proj.images.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {proj.images.map((imgUrl, imgIdx) => {
                          const isActive = currentImgIdx === imgIdx;
                          const label = getScreenLabel(imgUrl);
                          return (
                            <motion.button
                              key={imgIdx}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setActiveScreenshot(prev => ({ ...prev, [proj.id]: imgIdx }))}
                              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9px] font-mono border transition-all duration-150 cursor-pointer ${
                                isActive
                                  ? "bg-indigo-600/15 border-indigo-500/50 text-indigo-400 font-bold"
                                  : "bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-300"
                              }`}
                            >
                              {label}
                            </motion.button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. EXPERIENCE TIMELINE SECTION */}
      <section id="timeline-section" className="w-full max-w-7xl mx-auto px-6 py-12 border-t border-slate-900">
        <div className="mb-12 text-center max-w-xl mx-auto">
          <div className="mb-3 uppercase text-[#64748b] font-mono text-xs font-black tracking-[0.2em] flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-400" /> Career Milestones
          </div>
          <h2 className="text-3xl font-display font-medium text-white tracking-tight">
            Work History
          </h2>
          <p className="mt-2 text-slate-400 text-sm font-sans leading-relaxed">
            Prior roles focused on administrative dashboard frameworks, performance profiling, and modular web structures.
          </p>
        </div>

        {/* Timeline structure */}
        <div className="space-y-6 max-w-3xl mx-auto relative before:absolute before:inset-y-0 before:left-4 sm:before:left-6 before:w-[1px] before:bg-slate-900">
          {TIMELINE.map((role, rIdx) => (
            <motion.div 
              key={rIdx}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: rIdx * 0.08, type: "spring", stiffness: 100, damping: 20 }}
              className="relative pl-12 sm:pl-16 pb-1 group"
            >
              <span className="absolute left-4 sm:left-6 -translate-x-1/2 top-6 w-2.5 h-2.5 rounded-full bg-indigo-600 ring-4 ring-[#020617] z-10 transition-transform duration-200" />

              <motion.div 
                whileHover={{ 
                  y: -4, 
                  borderColor: "rgba(99, 102, 241, 0.25)",
                  boxShadow: "0 12px 25px -10px rgba(79, 70, 229, 0.18)",
                  backgroundColor: "rgba(3, 7, 18, 0.65)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-[#030712]/40 border border-slate-900 p-6 rounded-xl text-left hover:border-indigo-500/20 transition-all duration-300 shadow-md cursor-default"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-indigo-400 font-mono text-[10px]">
                  <span className="font-semibold uppercase tracking-wider">{role.period}</span>
                  <span className="text-slate-500">{role.location}</span>
                </div>
                <h3 className="text-lg font-sans font-bold text-white mt-1">{role.company}</h3>
                <p className="text-xs text-slate-400 italic font-medium">{role.role}</p>
                
                <ul className="mt-3.5 space-y-2.5 text-xs sm:text-[13px] text-slate-300 leading-relaxed font-sans">
                  {role.highlights.map((hlt, lIdx) => {
                    const renderTextWithBolds = (text: string) => {
                      if (!text.includes("**")) return text;
                      const parts = text.split("**");
                      return parts.map((part, index) => {
                        if (index % 2 === 1) {
                          return (
                            <strong key={index} className="text-indigo-400 font-bold">
                              {part}
                            </strong>
                          );
                        }
                        return part;
                      });
                    };

                    const parts = hlt.split(" ");
                    const firstWords = parts.slice(0, 2).join(" ");
                    const restWords = parts.slice(2).join(" ");
                    return (
                      <li key={lIdx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/80 mt-1.5 shrink-0" />
                        <span>
                          <strong className="text-slate-100 font-semibold">{renderTextWithBolds(firstWords)}</strong> {renderTextWithBolds(restWords)}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-4 pt-3.5 border-t border-slate-900/60 flex flex-wrap gap-1.5">
                  {role.stack.map((tag, tIdx) => (
                     <span key={tIdx} className="text-[9px] font-mono uppercase bg-slate-900 px-2 py-0.5 border border-slate-850 rounded text-slate-450">
                       {tag}
                     </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. SKILLS / TECHNICAL STACK SECTION */}
      <section id="skills-section" className="w-full max-w-7xl mx-auto px-6 py-12 border-t border-slate-900">
        <div className="mb-12 text-center max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3 uppercase text-[#64748b] font-mono text-xs font-black tracking-[0.2em]">
            <Cpu className="w-4 h-4 text-indigo-400" /> Capabilities
          </div>
          <h2 className="text-3xl font-display font-medium text-white tracking-tight">
            Technical Stack
          </h2>
          <p className="mt-2 text-slate-400 text-sm font-sans leading-relaxed">
            A focused directory of core technologies, orchestration drivers, and design libraries used in production systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.05, type: "spring", stiffness: 100, damping: 20 }}
              whileHover={{ 
                y: -3, 
                borderColor: "rgba(99, 102, 241, 0.25)",
                boxShadow: "0 10px 30px -10px rgba(79, 70, 229, 0.12)",
                backgroundColor: "rgba(3, 7, 18, 0.45)"
              }}
              className="bg-[#030712]/30 border border-slate-900 rounded-xl p-5 transition-all duration-300"
            >
              <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-slate-900/80">
                <div className="p-1.5 bg-slate-900 border border-slate-800 rounded-lg text-indigo-400">
                  {cat.icon === "Layout" && <Code className="w-3.5 h-3.5" />}
                  {cat.icon === "Cpu" && <Cpu className="w-3.5 h-3.5" />}
                  {cat.icon === "Database" && <Database className="w-3.5 h-3.5" />}
                  {cat.icon === "Sparkles" && <Sparkles className="w-3.5 h-3.5" />}
                  {cat.icon === "Shield" && <Shield className="w-3.5 h-3.5" />}
                  {cat.icon === "Code" && <Terminal className="w-3.5 h-3.5" />}
                </div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                  {cat.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill, sIdx) => (
                  <motion.span 
                    key={sIdx}
                    whileHover={{ scale: 1.05, y: -0.5, color: "#fff", borderColor: "rgba(99, 102, 241, 0.35)" }}
                    transition={{ type: "spring", stiffness: 450, damping: 14 }}
                    className="px-2 py-0.5 bg-slate-900 border border-slate-850 rounded text-[10px] font-mono text-slate-400 select-none cursor-default transition-all duration-150"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4.5. LOW PROFILE ENGINEERING LABS */}
      <section id="labs-section" className="w-full max-w-7xl mx-auto px-6 py-6 border-t border-slate-900/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <div>
            <span className="text-[9px] font-mono font-bold tracking-wider text-indigo-400/80 uppercase">
              Experimental Code
            </span>
            <h3 className="text-lg font-display font-medium text-white tracking-tight mt-0.5">
              Engineering Lab Modules
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 max-w-sm md:text-right font-sans">
            Minimal prototypes and lightweight utilities showcasing architectural concepts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FRONTEND_AI_PROJECTS.map((colProj, cIdx) => (
            <motion.div 
              key={cIdx} 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: cIdx * 0.05, type: "spring", stiffness: 100, damping: 20 }}
              whileHover={{ 
                scale: 1.025,
                y: -3,
                borderColor: "rgba(99, 102, 241, 0.45)",
                boxShadow: "0 12px 28px -8px rgba(99, 102, 241, 0.15), 0 0 15px rgba(99, 102, 241, 0.3)",
                backgroundColor: "rgba(3, 7, 18, 0.35)"
              }}
              className="bg-[#030712]/15 border border-slate-900 rounded-lg p-3.5 flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[7.5px] font-mono text-slate-500 uppercase tracking-widest">PROTOTYPE</span>
                  <span className="text-[8.5px] font-mono text-indigo-400/90">{colProj.tech[0]}</span>
                </div>
                <h4 className="text-xs font-semibold text-slate-300 font-sans">
                  {colProj.title}
                </h4>
                <p className="text-[10px] text-slate-400 mt-1 leading-normal font-sans">
                  {colProj.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-slate-900/35">
                <div className="flex gap-1">
                  {colProj.tech.slice(0, 2).map((tg, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="text-[7.5px] font-mono text-slate-500 bg-[#020617]/50 px-1 py-0.5 rounded border border-slate-900/65 animate-fade-in"
                    >
                      {tg}
                    </span>
                  ))}
                </div>

                <motion.a 
                  href={colProj.githubUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  whileHover={{ scale: 1.04, color: "#f8fafc" }}
                  whileTap={{ scale: 0.96 }}
                  className="text-[8.5px] font-mono text-slate-400 hover:text-slate-200 flex items-center gap-1 bg-[#020617]/40 border border-slate-900/50 px-1.5 py-0.5 rounded transition-colors"
                >
                  <Github className="w-2.5 h-2.5" /> Source
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. COMPACT ARCHITECTURE SNAPSHOT */}
      <section>
        <Suspense fallback={<SectionSuspenseFallback />}>
          <ArchitectureVisualizer />
        </Suspense>
      </section>

      {/* 6. FOOTER */}
      <footer className="w-full bg-[#020617] border-t border-slate-900 py-6 text-[10px] font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-indigo-600 rounded flex items-center justify-center font-bold text-white text-xs shadow-[0_0_10px_rgba(79,70,229,0.3)] select-none">
                NK
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">Naresh Kamarthy</span>
                <p className="text-[10px] text-slate-500 mt-0.5">© {new Date().getFullYear()} Naresh Kamarthy. All development rights reserved.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 font-mono">
              <span>React.js + Express.js • Verified</span>
              <span className="hidden sm:inline text-slate-800">|</span>
              <a href="#about-section" className="text-indigo-400 hover:text-white transition-colors cursor-pointer">
                Top of Page
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Recruiter AI Chat Companion */}
      <Suspense fallback={null}>
        <RecruiterChat />
      </Suspense>

      {/* CASE STUDY MODAL INSIGHTS */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <motion.div 
            id="case-study-modal" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.96, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 15, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="bg-[#030712] border border-slate-900 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-900">
                <div>
                  <span className="text-[9px] font-mono p-1 px-2.5 bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 font-bold uppercase rounded tracking-wider">
                    SYSTEM CASE STUDY & ARTIFACTS
                  </span>
                  <h3 className="text-xl font-sans font-bold text-white tracking-tight mt-2">
                    {selectedCaseStudy.title}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedCaseStudy(null)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
                  aria-label="Close Case Study"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 font-sans">
                
                {/* A. Challenge */}
                <div>
                  <h4 className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider mb-2">
                    A. System Challenge
                  </h4>
                  <div className="bg-[#020617] border border-slate-900 p-4 rounded-xl">
                    <p className="text-xs text-rose-450 text-rose-400 font-mono mb-1 text-[9px] uppercase tracking-wide font-bold">Problem Context</p>
                    <p className="text-xs sm:text-sm text-slate-350 leading-relaxed font-sans">
                      {selectedCaseStudy.id === "meetmind-ai" ? "Enterprise dynamic meeting segments lose crucial actionables in unparsed text files or recordings. Manual transcription pipelines introduce delays, and insecure API handling poses multi-tenant team scope collision risks." :
                       selectedCaseStudy.id === "synapse-ai" ? "Interactive text document canvases face severe merge conflicts on socket connection loss, resulting in broken coordinate mapping or slow cursor positions across collaborative groups." :
                       "Bulk analytical reports block redirect flows on single-thread Node processes, choking active URL resolution throughput under fast-scaling campaigns."}
                    </p>
                  </div>
                </div>

                {/* B. Execution */}
                <div>
                  <h4 className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider mb-2">
                    B. Engineering Execution
                  </h4>
                  <div className="bg-[#020617] border border-slate-900 p-4 rounded-xl">
                    <p className="text-xs text-indigo-400 font-mono mb-1 text-[9px] uppercase tracking-wide font-bold">Solution Delivery</p>
                    <p className="text-xs sm:text-sm text-slate-350 leading-relaxed font-sans">
                      {selectedCaseStudy.id === "meetmind-ai" ? "Developed custom chunking wrappers parsing multi-stage summaries. Leveraged structured systems models to compile predictable action timelines inside partitioned multi-tenant database systems." :
                       selectedCaseStudy.id === "synapse-ai" ? "Implemented a web broadcast gateway using web sockets to align user layouts. Created in-memory delta queues that debounce changes before bulk updating core cluster databases." :
                       "Configured immediate redirection resolution off Redis cache hits under 0.15ms, offloading geo-logging events to independent background tasks."}
                    </p>
                  </div>
                </div>

                {/* C. Systems */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="bg-[#020617] p-3 border border-slate-900 rounded-xl">
                    <p className="text-[10px] font-bold text-white uppercase font-sans">Security Standard</p>
                    <p className="text-[11px] text-slate-400 mt-1 font-sans leading-relaxed">Dual-token secure rotating credentials with restrictive role verification filters.</p>
                  </div>
                  <div className="bg-[#020617] p-3 border border-slate-900 rounded-xl">
                    <p className="text-[10px] font-bold text-white uppercase font-sans">Scale Strategy</p>
                    <p className="text-[11px] text-slate-400 mt-1 font-sans leading-relaxed">Aggregated dataset transactions running asynchronous decoupled threads.</p>
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="flex justify-end p-6 border-t border-slate-900 gap-3 bg-slate-950/25">
                <button
                  onClick={() => {
                    const targetTab = selectedCaseStudy.id === "meetmind-ai" ? "ai" : selectedCaseStudy.id === "synapse-ai" ? "realtime" : "auth";
                    const event = new CustomEvent("set-architecture-tab", { detail: targetTab });
                    window.dispatchEvent(event);
                    setSelectedCaseStudy(null);
                    const element = document.getElementById("architecture-section");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-md transition-all inline-flex items-center gap-1 font-sans cursor-pointer"
                >
                  Explore Layout Blueprint <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => setSelectedCaseStudy(null)}
                  className="p-2 border border-slate-800 text-slate-300 hover:bg-slate-900 rounded-xl text-xs font-sans px-4 transition-all cursor-pointer font-bold"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SCREENSHOT FULLSCREEN VIEWER */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md cursor-zoom-out"
            onClick={() => setLightboxSrc(null)}
          >
            <motion.div
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 inset-x-0 z-10 flex items-center justify-between p-4 px-6 bg-[#020617]/90 border-b border-slate-900/80 backdrop-blur-md flex-row">
                <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">
                  Visual Screenshot Scope
                </span>
                <button
                  onClick={() => setLightboxSrc(null)}
                  className="p-1 px-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-xs cursor-pointer font-bold font-mono uppercase"
                >
                  Close
                </button>
              </div>

              <div className="p-4 flex justify-center bg-[#020617]/50">
                <img
                  src={lightboxSrc}
                  alt="High Resolution Screenshot Preview"
                  className="w-full h-auto rounded-lg border border-slate-950 shadow-2xl object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EXECUTIVE RESUME SERVICE SYSTEM */}
      <AnimatePresence>
        {isResumeOpen && (
          <Suspense fallback={
            <div className="fixed inset-0 bg-[#020617]/90 z-50 flex items-center justify-center font-mono text-xs text-slate-500 uppercase">
              Loading resume builder...
            </div>
          }>
            <ResumeModal 
              isOpen={isResumeOpen}
              onClose={() => setIsResumeOpen(false)}
              onIncrementDownload={() => {}}
            />
          </Suspense>
        )}
      </AnimatePresence>

    </div>
  );
}
