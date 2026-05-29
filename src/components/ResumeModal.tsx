import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { 
  X, Printer, Download, Mail, Phone, MapPin, Github, Linkedin, 
  ExternalLink, Copy, Check, Briefcase, GraduationCap, Award, Search, Sparkles
} from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onIncrementDownload: () => void;
}

export default function ResumeModal({ isOpen, onClose, onIncrementDownload }: ResumeModalProps) {
  const [activeTab, setActiveTab] = useState<"interactive" | "classic">("interactive");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const contactDetails = {
    name: "Naresh Kamarthy",
    title: "Senior Software Engineer | MERN Stack & AI Systems",
    email: "kamarthinaresh79@gmail.com",
    phone: "+91-8520016839",
    location: "India 🇮🇳 (IST, UTC+5:30)",
    website: "naresh-kamarthy-ai-portfolio.vercel.app",
    websiteUrl: "https://naresh-kamarthy-ai-portfolio.vercel.app",
    github: "github.com/naresh-kamarthy",
    githubUrl: "https://github.com/naresh-kamarthy",
    linkedin: "linkedin.com/in/naresh-kamarthy-aa1239130",
    linkedinUrl: "https://linkedin.com/in/naresh-kamarthy-aa1239130"
  };

  const skillsData = [
    { category: "Frontend", items: ["React.js", "TypeScript", "JavaScript (ES6+)", "Redux Toolkit", "React Router", "Tailwind CSS", "Material UI", "Angular"] },
    { category: "Backend", items: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "RBAC", "Socket.IO"] },
    { category: "Database & Cloud", items: ["MongoDB", "Mongoose", "Cloudinary", "Vercel", "Render"] },
    { category: "AI / LLM", items: ["Gemini API", "OpenAI API", "LLM Integration", "Prompt Engineering"] },
    { category: "Security & Performance", items: ["HttpOnly Cookies", "Refresh Tokens", "Helmet", "CORS", "Express Rate Limit", "API Security"] },
    { category: "Testing & Tools", items: ["Jest", "React Testing Library", "GitHub", "Postman", "VS Code", "Cursor"] }
  ];

  const experienceData = [
    {
      company: "Navajna Technologies Pvt Ltd",
      role: "Senior Software Engineer",
      period: "01/2022 – 02/2025",
      location: "Hyderabad, India",
      highlights: [
        "Developed scalable React.js components for enterprise applications using modular and component-driven architecture for Client: MasterCard.",
        "Built scalable role-based dashboards and workflow-driven UI systems (Pixofix, BoxFit), improving usability and operational efficiency.",
        "Implemented unit testing using Jest and React Testing Library to improve application reliability and maintainability.",
        "Reduced application load time by 25% through frontend optimization techniques including lazy loading and code splitting."
      ],
      stack: ["React.js", "TypeScript", "Redux Toolkit", "Node.js", "Express.js", "REST APIs", "Jest", "RTL"]
    },
    {
      company: "Vectramind Technologies Pvt Ltd",
      role: "Software Engineer",
      period: "06/2019 – 12/2021",
      location: "Hyderabad, India",
      highlights: [
        "Developed scalable frontend applications using React.js and Angular for healthcare (Firstpass) and campaign platforms (Synapse).",
        "Created reusable UI component systems to streamline development workflows and improve maintainability.",
        "Integrated REST APIs and realtime data workflows for scalable frontend communication systems.",
        "Collaborated with cross-functional teams to deliver responsive and production-ready web applications."
      ],
      stack: ["React.js", "Angular", "JavaScript", "REST APIs", "Realtime Data", "UI Systems"]
    }
  ];

  const projectsData = [
    {
      title: "MeetMind AI — AI Meeting Notes & Task Manager SaaS",
      stack: "MERN Stack, TypeScript, Redux Toolkit, Node.js, Express.js, MongoDB, JWT, Cloudinary",
      highlights: [
        "Developed a production-grade AI-powered SaaS platform using scalable MERN architecture and TypeScript.",
        "Implemented secure authentication with JWT, HttpOnly cookies, refresh-token flow, RBAC, Helmet, CORS, and rate-limiting middleware.",
        "Built AI-powered meeting workflows including automated summaries, task extraction, and follow-up email generation.",
        "Designed responsive dashboards, reusable React components, and integrated secure Cloudinary avatar management with optimized frontend performance."
      ]
    },
    {
      title: "SynapseAI — Real-Time Multi-Model AI Collaboration Platform",
      stack: "React.js, TypeScript, Node.js, Express.js, MongoDB, Socket.IO, Gemini API",
      highlights: [
        "Built a real-time AI collaboration platform with multi-user communication and streaming workflows using Socket.IO.",
        "Implemented secure RBAC, realtime synchronization, protected authentication systems, and scalable dashboard architecture.",
        "Integrated AI-powered streaming interfaces with responsive frontend systems and optimized state management workflows.",
        "Developed modern SaaS-style UI systems with collaborative workspace interactions and realtime data handling."
      ]
    },
    {
      title: "Nexus UI Orchestrator",
      stack: "React.js, TypeScript, JSON Schema, Gemini API, Redux Toolkit",
      highlights: [
        "Designed a schema-driven frontend system for dynamic runtime component rendering.",
        "Built reusable component registry architecture for scalable UI generation and modular frontend workflows.",
        "Implemented dynamic form generation and validation systems using configurable JSON schemas.",
        "Optimized rendering performance for large nested component structures and dynamic interfaces."
      ]
    }
  ];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handlePrint = () => {
    onIncrementDownload();
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Resume - Naresh Kamarthy</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; }
          body { 
            font-family: 'Inter', sans-serif; 
            color: #1e293b; 
            line-height: 1.5; 
            padding: 40px; 
            max-width: 850px; 
            margin: 0 auto;
            background: #ffffff;
          }
          .header { margin-bottom: 25px; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; }
          h1 { font-size: 28px; font-weight: 700; margin: 0 0 5px 0; color: #0f172a; text-transform: uppercase; letter-spacing: -0.02em; }
          .headline { font-size: 15px; font-weight: 600; color: #4f46e5; margin: 0 0 15px 0; letter-spacing: 0.05em; text-transform: uppercase; }
          .contact-grid { display: grid; grid-template-cols: repeat(2, 1fr); gap: 8px; font-size: 12px; color: #475569; }
          .contact-item { display: flex; align-items: center; gap: 6px; }
          .contact-item a { color: #475569; text-decoration: none; }
          .contact-item a:hover { color: #4f46e5; }
          
          .section-title { 
            font-size: 14px; 
            font-weight: 700; 
            color: #0f172a; 
            border-bottom: 1px solid #cbd5e1; 
            padding-bottom: 4px; 
            margin-top: 25px; 
            margin-bottom: 12px; 
            text-transform: uppercase; 
            letter-spacing: 0.08em; 
          }
          
          .summary { font-size: 12.5px; color: #334155; line-height: 1.6; text-align: justify; }
          
          .skills-container { display: grid; grid-template-cols: 1fr; gap: 8px; }
          .skill-row { font-size: 12px; display: flex; margin-bottom: 4px; }
          .skill-label { font-weight: 700; color: #0f172a; width: 170px; flex-shrink: 0; }
          .skill-values { color: #334155; }
          
          .exp-item { margin-bottom: 18px; }
          .exp-header { display: flex; justify-content: space-between; align-items: baseline; font-weight: 700; font-size: 13px; color: #0f172a; }
          .exp-subheader { display: flex; justify-content: space-between; align-items: baseline; font-size: 12px; color: #4f46e5; font-weight: 600; margin-top: 2px; margin-bottom: 8px; }
          
          ul { padding-left: 15px; margin: 0; }
          li { font-size: 11.5px; margin-bottom: 5px; color: #334155; text-align: justify; line-height: 1.5; }
          
          .project-item { margin-bottom: 16px; }
          .project-title { font-weight: 700; font-size: 13px; color: #0f172a; }
          .project-stack { font-size: 11px; color: #64748b; font-weight: 500; font-style: italic; margin-top: 1px; margin-bottom: 6px; }
          
          .edu-item { display: flex; justify-content: space-between; font-size: 12.5px; font-weight: 600; color: #0f172a; margin-bottom: 4px; }
          .cert-item { font-size: 12.5px; font-weight: 600; color: #0f172a; }
          
          button.print-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            padding: 12px 24px;
            background: #4f46e5;
            color: white;
            border: none;
            border-radius: 50px;
            font-size: 14px;
            font-weight: 600;
            box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.4);
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.2s;
          }
          button.print-btn:hover {
            background: #4338ca;
            transform: translateY(-2px);
          }
          
          @media print {
            body { padding: 0px; }
            button.print-btn { display: none; }
          }
        </style>
      </head>
      <body>
        <button class="print-btn" onclick="window.print()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
          Print to PDF / Save
        </button>

        <div class="header">
          <h1>${contactDetails.name}</h1>
          <div class="headline">${contactDetails.title}</div>
          <div class="contact-grid">
            <div class="contact-item">
              <span>📧</span> <span>${contactDetails.email}</span>
            </div>
            <div class="contact-item">
              <span>✈️</span> <span>${contactDetails.location}</span>
            </div>
            <div class="contact-item">
              <span>📞</span> <span>${contactDetails.phone}</span>
            </div>
            <div class="contact-item">
              <span>🌐</span> <a href="${contactDetails.websiteUrl}" target="_blank">${contactDetails.website}</a>
            </div>
            <div class="contact-item">
              <span>💻</span> <a href="${contactDetails.githubUrl}" target="_blank">${contactDetails.github}</a>
            </div>
            <div class="contact-item">
              <span>🔗</span> <a href="${contactDetails.linkedinUrl}" target="_blank">${contactDetails.linkedin}</a>
            </div>
          </div>
        </div>

        <div class="section-title">Professional Summary</div>
        <div class="summary">
          Senior Software Engineer with 5.8 years of experience building scalable web applications using React.js, TypeScript, Node.js, Express.js, and MongoDB. Specialized in AI-integrated systems, real-time applications, LLM integrations, and production-grade frontend architecture. Experienced in developing responsive SaaS platforms, reusable UI systems, and scalable MERN stack solutions.
        </div>

        <div class="section-title">Technical Skills</div>
        <div class="skills-container">
          ${skillsData.map(s => `
            <div class="skill-row">
              <div class="skill-label">${s.category}:</div>
              <div class="skill-values">${s.items.join(", ")}</div>
            </div>
          `).join("")}
        </div>

        <div class="section-title">Professional Experience</div>
        ${experienceData.map(exp => `
          <div class="exp-item">
            <div class="exp-header">
              <span>${exp.company}</span>
              <span>${exp.period}</span>
            </div>
            <div class="exp-subheader">
              <span>${exp.role}</span>
              <span>${exp.location}</span>
            </div>
            <ul>
              ${exp.highlights.map(h => `<li>${h}</li>`).join("")}
            </ul>
          </div>
        `).join("")}

        <div class="section-title">AI & Full-Stack Projects</div>
        ${projectsData.map(proj => `
          <div class="project-item">
            <div class="project-title">${proj.title}</div>
            <div class="project-stack">Tech Stack: ${proj.stack}</div>
            <ul>
              ${proj.highlights.map(h => `<li>${h}</li>`).join("")}
            </ul>
          </div>
        `).join("")}

        <div class="section-title">Education</div>
        <div class="edu-item">
          <span>Master of Science (Computer Science)</span>
          <span>Score: 85%</span>
        </div>
        <div style="font-size: 11.5px; color: #475569; font-weight: 500;">Rayalaseema University</div>

        <div class="section-title">Certifications</div>
        <div class="cert-item">Prompt to Prototype — AI Product Development</div>
        <div style="font-size: 11.5px; color: #475569; font-weight: 500;">Google for Startups</div>

      </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Filter content based on search query
  const filteredSkills = useMemo(() => {
    if (!searchQuery) return skillsData;
    const cleanQuery = searchQuery.toLowerCase();
    return skillsData.map(group => {
      const matchedItems = group.items.filter(item => item.toLowerCase().includes(cleanQuery));
      const categoryMatches = group.category.toLowerCase().includes(cleanQuery);
      if (categoryMatches) return group;
      if (matchedItems.length > 0) return { ...group, items: matchedItems };
      return null;
    }).filter(Boolean) as typeof skillsData;
  }, [searchQuery]);

  const filteredExperience = useMemo(() => {
    if (!searchQuery) return experienceData;
    const cleanQuery = searchQuery.toLowerCase();
    return experienceData.filter(exp => 
      exp.company.toLowerCase().includes(cleanQuery) ||
      exp.role.toLowerCase().includes(cleanQuery) ||
      exp.stack.some(s => s.toLowerCase().includes(cleanQuery)) ||
      exp.highlights.some(h => h.toLowerCase().includes(cleanQuery))
    );
  }, [searchQuery]);

  const filteredProjects = useMemo(() => {
    if (!searchQuery) return projectsData;
    const cleanQuery = searchQuery.toLowerCase();
    return projectsData.filter(proj => 
      proj.title.toLowerCase().includes(cleanQuery) ||
      proj.stack.toLowerCase().includes(cleanQuery) ||
      proj.highlights.some(h => h.toLowerCase().includes(cleanQuery))
    );
  }, [searchQuery]);

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")})`, "gi"));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-indigo-500/30 text-indigo-200 border-b border-indigo-400/40 rounded px-1 py-0.5 font-semibold text-white">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-slate-950/90 backdrop-blur-xl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative w-full h-[100dvh] md:h-[90dvh] md:max-w-5xl bg-[#030712] border-0 md:border md:border-slate-850 md:rounded-3xl shadow-3xl flex flex-col overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-slate-900 bg-[#030712]/95 z-10 sticky top-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg hidden sm:block">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-lg font-sans font-bold text-slate-100 flex items-center gap-2">
                Naresh Kamarthy <span className="text-indigo-500">/</span> <span className="text-slate-400 text-sm font-normal">Executive Resume</span>
              </h2>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">5.8 Yrs • Senior Software Engineer</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-505 text-white shadow-lg shadow-indigo-500/20 active:translate-y-px transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" /> <span>Print / Save PDF</span>
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-900/40 rounded-lg cursor-pointer transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Views Navigation + Action Hub */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 px-6 bg-slate-950 border-b border-slate-900/60 font-sans">
          <div className="flex items-center bg-slate-900 p-1 rounded-xl w-fit relative">
            <button
              onClick={() => setActiveTab("interactive")}
              className={`relative px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer z-10 ${
                activeTab === "interactive" 
                  ? "text-indigo-400 font-bold" 
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Interactive Digital
              {activeTab === "interactive" && (
                <motion.span 
                  layoutId="modalTabBackground"
                  className="absolute inset-0 bg-slate-950 rounded-lg shadow-sm"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 380, damping: 26 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("classic")}
              className={`relative px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer z-10 ${
                activeTab === "classic" 
                  ? "text-indigo-400 font-bold" 
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Classic Master Copy
              {activeTab === "classic" && (
                <motion.span 
                  layoutId="modalTabBackground"
                  className="absolute inset-0 bg-slate-950 rounded-lg shadow-sm"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 380, damping: 26 }}
                />
              )}
            </button>
          </div>

          {activeTab === "interactive" && (
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-505 text-slate-500" />
              <input
                type="text"
                placeholder="Search skills, companies, tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all font-sans"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-slate-500 hover:text-white text-xs font-mono font-semibold"
                >
                  Clear
                </button>
              )}
            </div>
          )}
        </div>

        {/* Modal body contents */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#020617] scrollbar-thin scrollbar-thumb-slate-900">
          {activeTab === "interactive" ? (
            <div className="space-y-8 max-w-4xl mx-auto pb-8">
              {/* Contact coordinates widgets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono">
                {/* Email */}
                <div className="flex items-center justify-between p-3.5 bg-slate-950/60 border border-slate-900 rounded-xl group hover:border-indigo-500/20 transition-all">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-indigo-400" />
                    <div className="overflow-hidden">
                      <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Email</p>
                      <p className="text-xs text-slate-200 truncate font-semibold">{contactDetails.email}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleCopy(contactDetails.email, "email")}
                    className="p-1 px-2 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white transition-colors cursor-pointer text-[10px] flex items-center gap-1"
                  >
                    {copiedText === "email" ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span>{copiedText === "email" ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-between p-3.5 bg-slate-950/60 border border-slate-900 rounded-xl group hover:border-indigo-500/20 transition-all">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-indigo-400" />
                    <div>
                      <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Phone</p>
                      <p className="text-xs text-slate-200 font-semibold">{contactDetails.phone}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleCopy(contactDetails.phone, "phone")}
                    className="p-1 px-2 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white transition-colors cursor-pointer text-[10px] flex items-center gap-1"
                  >
                    {copiedText === "phone" ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span>{copiedText === "phone" ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                {/* Location */}
                <div className="flex items-center justify-between p-3.5 bg-slate-950/60 border border-slate-900 rounded-xl group hover:border-indigo-500/20 transition-all sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-indigo-400" />
                    <div>
                      <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Location</p>
                      <p className="text-xs text-slate-200 font-semibold">{contactDetails.location}</p>
                    </div>
                  </div>
                  <div className="p-1 px-2 text-[9px] font-bold uppercase rounded bg-indigo-500/10 text-indigo-400">
                    IST
                  </div>
                </div>

                {/* GitHub */}
                <a 
                  href={contactDetails.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 bg-slate-950/60 border border-slate-900 rounded-xl group hover:border-indigo-500/20 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">GitHub Profile</p>
                      <p className="text-xs text-slate-200 font-semibold">{contactDetails.github}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                </a>

                {/* LinkedIn */}
                <a 
                  href={contactDetails.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 bg-slate-950/60 border border-slate-900 rounded-xl group hover:border-indigo-500/20 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-indigo-400" />
                    <div className="overflow-hidden">
                      <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">LinkedIn Connect</p>
                      <p className="text-xs text-slate-200 truncate font-semibold">linkedin.com/in/naresh-kamarthy...</p>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                </a>

                {/* Portfolio URL */}
                <a 
                  href={contactDetails.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 bg-slate-950/60 border border-slate-900 rounded-xl group hover:border-indigo-500/20 transition-all cursor-pointer sm:col-span-2 lg:col-span-1"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <div>
                      <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Live Portfolio</p>
                      <p className="text-xs text-slate-200 font-semibold">{contactDetails.website}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                </a>
              </div>

              {/* Summary card */}
              <div className="bg-slate-950/40 border border-slate-900 p-6 rounded-2xl relative overflow-hidden backdrop-blur-md">
                <h3 className="text-xs uppercase font-mono tracking-widest font-bold text-slate-500 border-b border-slate-900 pb-2 mb-3">Professional Summary</h3>
                <p className="text-slate-300 text-sm leading-relaxed text-justify font-sans">
                  {highlightMatch(
                    "Senior Software Engineer with 5.8 years of experience building scalable web applications using React.js, TypeScript, Node.js, Express.js, and MongoDB. Specialized in AI-integrated systems, real-time applications, LLM integrations, and production-grade frontend architecture. Experienced in developing responsive SaaS platforms, reusable UI systems, and scalable MERN stack solutions.",
                    searchQuery
                  )}
                </p>
              </div>

              {/* Technical skills list (Filtered) */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase font-mono tracking-widest font-bold text-slate-500 border-b border-slate-900 pb-2">Technical Skills</h3>
                {filteredSkills.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No skills matching your search.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredSkills.map((cat, idx) => (
                      <div key={idx} className="bg-slate-950/20 border border-slate-900 p-4.5 rounded-xl">
                        <h4 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest mb-3">
                          {highlightMatch(cat.category, searchQuery)}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {cat.items.map((item, id) => (
                            <span 
                              key={id} 
                              className="text-xs bg-[#030712] border border-slate-900 px-2.5 py-1 rounded text-slate-300 font-medium"
                            >
                              {highlightMatch(item, searchQuery)}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Employment timeline (Filtered) */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase font-mono tracking-widest font-bold text-slate-500 border-b border-slate-900 pb-2">Professional Experience</h3>
                {filteredExperience.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No professional roles matching your search.</p>
                ) : (
                  <div className="space-y-6">
                    {filteredExperience.map((exp, idx) => (
                      <div key={idx} className="bg-slate-950/40 border border-slate-900 p-6 rounded-2xl relative group">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-3 mb-4">
                          <div>
                            <h4 className="text-lg font-sans font-bold text-slate-100 flex items-center gap-2">
                              {highlightMatch(exp.company, searchQuery)}
                              {exp.company.toLowerCase().includes("navajna") && (
                                <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full font-normal">
                                  Client: MasterCard 💳
                                </span>
                              )}
                            </h4>
                            <p className="text-xs font-mono text-indigo-400 font-semibold uppercase tracking-wider mt-0.5">
                              {highlightMatch(exp.role, searchQuery)}
                            </p>
                          </div>
                          <div className="text-right sm:text-right font-mono text-xs">
                            <span className="text-slate-400 block font-semibold">{exp.period}</span>
                            <span className="text-slate-550 text-slate-500 text-[10px] block">{exp.location}</span>
                          </div>
                        </div>

                        <ul className="space-y-3">
                          {exp.highlights.map((hlt, id) => (
                            <li key={id} className="flex items-start gap-3 text-xs sm:text-sm text-slate-400 leading-relaxed text-justify">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                              <span>{highlightMatch(hlt, searchQuery)}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-5 pt-4 border-t border-slate-900 flex flex-wrap gap-1.5">
                          {exp.stack.map((tag, id) => (
                            <span key={id} className="text-[9px] font-mono uppercase bg-slate-900 border border-slate-850 px-2 py-0.5 rounded text-slate-450 text-slate-400">
                              {highlightMatch(tag, searchQuery)}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SaaS & fullstack projects highlights (Filtered) */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase font-mono tracking-widest font-bold text-slate-500 border-b border-slate-900 pb-2">AI & Full-Stack Projects</h3>
                {filteredProjects.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No projects matching your search.</p>
                ) : (
                  <div className="space-y-6">
                    {filteredProjects.map((proj, idx) => (
                      <div key={idx} className="bg-slate-950/40 border border-slate-900 p-6 rounded-2xl relative group">
                        <div className="border-b border-slate-900 pb-3 mb-4">
                          <h4 className="text-base font-sans font-bold text-slate-100 flex items-center justify-between">
                            <span>{highlightMatch(proj.title, searchQuery)}</span>
                            <Sparkles className="w-4 h-4 text-indigo-400" />
                          </h4>
                          <p className="text-[10px] font-mono text-indigo-400 mt-1 uppercase tracking-widest">
                            Tech Stack: {highlightMatch(proj.stack, searchQuery)}
                          </p>
                        </div>

                        <ul className="space-y-3">
                          {proj.highlights.map((hlt, id) => (
                            <li key={id} className="flex items-start gap-3 text-xs sm:text-sm text-slate-400 leading-relaxed text-justify">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                              <span>{highlightMatch(hlt, searchQuery)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Education & Certs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950/40 border border-slate-900 p-6 rounded-2xl">
                  <h3 className="text-xs uppercase font-mono tracking-widest font-bold text-slate-500 border-b border-slate-900 pb-2 mb-4 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-indigo-400" /> Education
                  </h3>
                  <h4 className="text-sm font-sans font-bold text-slate-100">Master of Science (Computer Science)</h4>
                  <p className="text-xs text-indigo-400 font-mono font-semibold mt-1">Rayalaseema University</p>
                  <p className="text-xs text-slate-500 mt-2">Score: <span className="text-emerald-400 font-bold">85%</span></p>
                </div>

                <div className="bg-slate-950/40 border border-slate-900 p-6 rounded-2xl">
                  <h3 className="text-xs uppercase font-mono tracking-widest font-bold text-slate-500 border-b border-slate-900 pb-2 mb-4 flex items-center gap-2">
                    <Award className="w-4 h-4 text-indigo-400" /> Certifications
                  </h3>
                  <h4 className="text-sm font-sans font-bold text-slate-100">Prompt to Prototype — AI Product Development</h4>
                  <p className="text-xs text-indigo-400 font-mono font-semibold mt-1">Google for Startups</p>
                  <p className="text-xs text-slate-500 mt-2">Certified Developer & Creator</p>
                </div>
              </div>

            </div>
          ) : (
            /* Classic Document View - Simulated classic printed paper layout centered in dark background */
            <div className="w-full max-w-4xl mx-auto py-2 bg-[#020617]">
              {/* Printable PDF mockup page container */}
              <div className="bg-white text-slate-800 shadow-2xl p-6 sm:p-12 md:p-16 rounded-2xl border border-slate-200 max-w-[800px] mx-auto min-h-[1100px] selection:bg-indigo-100 text-left relative font-sans">
                {/* PDF Header decor mock */}
                <div className="border-b-2 border-slate-200 pb-4 mb-5">
                  <h3 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 uppercase tracking-tight m-0">{contactDetails.name}</h3>
                  <p className="text-xs font-sans font-bold text-indigo-600 uppercase tracking-wider mt-1 mb-3">{contactDetails.title}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-[11px] text-slate-600 mt-3 border-t border-slate-100 pt-3">
                    <div className="flex items-center gap-1">
                      <span>📧</span> <span className="font-semibold text-slate-700">{contactDetails.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>📞</span> <span className="font-semibold text-slate-700">{contactDetails.phone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>✈️</span> <span className="font-semibold text-slate-700">{contactDetails.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>💻</span> <span className="hover:text-indigo-600">{contactDetails.github}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>🔗</span> <span className="hover:text-indigo-600">{contactDetails.linkedin}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>🌐</span> <span className="hover:text-indigo-600 font-semibold">{contactDetails.website}</span>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="mb-5">
                  <h4 className="text-[12px] font-bold text-slate-900 border-b border-slate-300 pb-1 mb-2 uppercase tracking-widest">Professional Summary</h4>
                  <p className="text-[11.5px] text-slate-755 text-slate-700 leading-relaxed text-justify">
                    Senior Software Engineer with 5.8 years of experience building scalable web applications using React.js, TypeScript, Node.js, Express.js, and MongoDB. Specialized in AI-integrated systems, real-time applications, LLM integrations, and production-grade frontend architecture. Experienced in developing responsive SaaS platforms, reusable UI systems, and scalable MERN stack solutions.
                  </p>
                </div>

                {/* Skills */}
                <div className="mb-5">
                  <h4 className="text-[12px] font-bold text-slate-900 border-b border-slate-300 pb-1 mb-2 uppercase tracking-widest">Technical Skills</h4>
                  <div className="space-y-1.5 text-[11px] text-slate-700">
                    {skillsData.map((s, idx) => (
                      <div key={idx} className="flex">
                        <div className="font-bold text-slate-900 w-[160px] shrink-0">{s.category}:</div>
                        <div>{s.items.join(", ")}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Positions */}
                <div className="mb-5">
                  <h4 className="text-[12px] font-bold text-slate-900 border-b border-slate-300 pb-1 mb-3 uppercase tracking-widest">Professional Experience</h4>
                  <div className="space-y-4">
                    {experienceData.map((exp, idx) => (
                      <div key={idx} className="text-[11px]">
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>{exp.company}</span>
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex justify-between text-indigo-600 font-semibold mt-0.5 mb-1.5">
                          <span>{exp.role}</span>
                          <span className="text-slate-500 font-normal">{exp.location}</span>
                        </div>
                        <ul className="list-disc pl-4 space-y-1 text-slate-700">
                          {exp.highlights.map((h, i) => (
                            <li key={i} className="text-justify">{h}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                <div className="mb-5">
                  <h4 className="text-[12px] font-bold text-slate-900 border-b border-slate-300 pb-1 mb-3 uppercase tracking-widest">AI & Full-Stack Projects</h4>
                  <div className="space-y-4">
                    {projectsData.map((proj, idx) => (
                      <div key={idx} className="text-[11px]">
                        <div className="font-bold text-slate-900">{proj.title}</div>
                        <div className="text-slate-500 font-semibold italic mt-0.5 mb-1.5">Tech Stack: {proj.stack}</div>
                        <ul className="list-disc pl-4 space-y-1 text-slate-700">
                          {proj.highlights.map((h, i) => (
                            <li key={i} className="text-justify">{h}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="mb-5">
                  <h4 className="text-[12px] font-bold text-slate-900 border-b border-slate-300 pb-1 mb-2 uppercase tracking-widest">Education</h4>
                  <div className="flex justify-between text-[11px] font-bold text-slate-900">
                    <span>Master of Science (Computer Science)</span>
                    <span className="text-emerald-600">Score: 85%</span>
                  </div>
                  <div className="text-[10px] text-slate-550 text-slate-500 font-semibold">Rayalaseema University</div>
                </div>

                {/* Certifications */}
                <div>
                  <h4 className="text-[12px] font-bold text-slate-900 border-b border-slate-300 pb-1 mb-2 uppercase tracking-widest">Certifications</h4>
                  <div className="text-[11px] font-bold text-slate-900">Prompt to Prototype — AI Product Development</div>
                  <div className="text-[10px] text-slate-550 text-slate-500 font-semibold">Google for Startups</div>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Banner */}
        <div className="p-3 border-t border-slate-900 bg-slate-950/80 text-[10px] font-mono text-slate-500 text-center select-none shrink-0">
          Double-click to clear highlights • Built dynamically matching original document matrices
        </div>
      </motion.div>
    </div>
  );
}
