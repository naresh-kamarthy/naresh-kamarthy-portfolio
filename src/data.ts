import { Project, SkillCategory, TimelineItem } from "./types";

export const PORTFOLIO_STATS = [
  { label: "Years Experience", value: "5.8" },
  { label: "Core MERN SaaS", value: "3" },
  { label: "Systems Architecture", value: "Production" },
  { label: "Code Coverage", value: "88%" },
];

export const PROJECTS: Project[] = [
  {
    id: "meetmind-ai",
    title: "MeetMind AI",
    category: "AI",
    description: "Meeting transcription workflows & collaborative productivity suites",
    longDescription: "An intelligent meeting intelligence platform that automates recording transcription, processes streaming transcripts, and extracts high-accuracy action-items using structured schema parsers.",
    architectureSummary: "AI summary pipeline utilizing validation middleware, system role prompt routing, and protected workspace isolation.",
    highlights: [
      "Engineered automated pipelines to capture and transcribe recorded meeting sessions.",
      "Developed system prompt structures with Gemini APIs to extract robust, structured action tasklists.",
      "Built customizable collaborative UI boards to let client groups instantly tag, order, and dispatch key tasks.",
      "Established multi-tenant database partitions to securely isolate team folders and transcript logs."
    ],
    features: [
      "Speech-to-Text Pipeline",
      "AI Task Extraction",
      "Workspace Authorization",
      "Interactive Action Boards"
    ],
    tech: ["Gemini API", "Node.js", "Express", "MongoDB", "React.js", "TypeScript"],
    githubUrl: "https://github.com/naresh-kamarthy/meetmind-ai",
    liveUrl: "#",
    metrics: "120ms Parsing Latency • 99% Extraction Accuracy",
    primaryImage: "https://raw.githubusercontent.com/naresh-kamarthy/meetmind-ai/main/meetmind-client/assets/dashboard.png",
    images: [
      "https://raw.githubusercontent.com/naresh-kamarthy/meetmind-ai/main/meetmind-client/assets/dashboard.png",
      "https://raw.githubusercontent.com/naresh-kamarthy/meetmind-ai/main/meetmind-client/assets/ai_summary.png",
      "https://raw.githubusercontent.com/naresh-kamarthy/meetmind-ai/main/meetmind-client/assets/meeting_dashboard.png",
      "https://raw.githubusercontent.com/naresh-kamarthy/meetmind-ai/main/meetmind-client/assets/tasks_board.png"
    ]
  },
  {
    id: "synapse-ai",
    title: "SynapseAI",
    category: "Realtime",
    description: "Concurrent multi-user collaborative editing workspaces",
    longDescription: "A high-performance interactive collaborative workspace managing active participants and multi-cursor positions. Leverages persistent Socket.IO connections to achieve lag-free presence tracking and instant state synchronization.",
    architectureSummary: "Full-duplex real-time events broker featuring connection caches and write-debounced database sync buffers.",
    highlights: [
      "Engineered low-latency bi-directional channels utilizing Socket.IO to synchronize remote cursor deltas.",
      "Built resilient conflict resolution algorithms to seamlessly merge concurrent in-app changes on active documents.",
      "Configured high-throughput Node.js event routers to handle broadcasts across concurrent rooms.",
      "Integrated memory buffers to group user edits and execute debounced bulk operations against MongoDB nodes."
    ],
    features: [
      "Socket.IO Sync Grid",
      "Lag-Free Cursor Tracking",
      "Conflict Resolution Grid",
      "Bulk Database Debouncing"
    ],
    tech: ["Socket.IO", "WebSockets", "Node.js", "Express", "React.js", "TypeScript"],
    githubUrl: "https://github.com/naresh-kamarthy/synapseai-realtime-platform",
    liveUrl: "#",
    metrics: "Sub-40ms Delivery • 15k Event Broadcasts/sec",
    primaryImage: "https://raw.githubusercontent.com/naresh-kamarthy/synapseai-realtime-platform/main/assets/user_workspace.png",
    images: [
      "https://raw.githubusercontent.com/naresh-kamarthy/synapseai-realtime-platform/main/assets/user_workspace.png",
      "https://raw.githubusercontent.com/naresh-kamarthy/synapseai-realtime-platform/main/assets/ai_comparison.png"
    ]
  },
  {
    id: "linkmind-ai",
    title: "LinkMind AI",
    category: "MERN",
    description: "High-throughput URL resolution architecture & analytics gateway",
    longDescription: "A streamlined routing and statistics pipeline that serves click redirects in sub-millisecond durations via ultra-fast Redis memory lookups, and processes click logs asynchronously.",
    architectureSummary: "Cache-optimized routing engine leveraging Redis cache lookup lines and compound compound index maps.",
    highlights: [
      "Engineered rapid, non-blocking redirect pipelines matching Redis key-value stores under 0.15ms.",
      "Optimized query analytical lookups in MongoDB using structured multi-column compound index planning.",
      "Designed decoupled background workers to update geographical logs asynchronously without blocking routing tasks.",
      "Implemented intelligent routing rules to shield server instances from automated scraping and bot spikes."
    ],
    features: [
      "Redis Cache Redirection",
      "Compound Index Plans",
      "Async Analytics Pipeline",
      "Bot Mitigation Filters"
    ],
    tech: ["Redis Cache", "MongoDB Indexing", "Express.js", "Node.js", "TypeScript"],
    githubUrl: "https://github.com/naresh-kamarthy/linkmind-ai",
    liveUrl: "#",
    metrics: "0.15ms Redirect Latency • 2.5M+ Resolves Managed",
    primaryImage: "https://raw.githubusercontent.com/naresh-kamarthy/linkmind-ai/main/assets/dashboard.png",
    images: [
      "https://raw.githubusercontent.com/naresh-kamarthy/linkmind-ai/main/assets/dashboard.png",
      "https://raw.githubusercontent.com/naresh-kamarthy/linkmind-ai/main/assets/analytics.png"
    ]
  }
];

export const FRONTEND_AI_PROJECTS = [
  {
    title: "Nexus UI Orchestrator",
    description: "Interactive schema-driven dynamic layout compiler that compiles complex custom interface configurations at runtime.",
    tech: ["React.js", "TypeScript", "JSON Schema"],
    demoUrl: "#",
    githubUrl: "https://github.com/naresh-kamarthy/nexus-ui-orchestrator"
  },
  {
    title: "Gemini Stream Parser",
    description: "High-performance consumer utilities parsing chunked Gemini LLM tokens to stream direct content trees.",
    tech: ["React.js", "TypeScript", "Gemini SDK"],
    demoUrl: "#",
    githubUrl: "https://github.com/naresh-kamarthy/gemini-stream-chat"
  },
  {
    title: "Aether Motion Flow",
    description: "Visual logic coordinate layout with customizable vectors, smooth curve animations, and fluid view transformations.",
    tech: ["React.js", "TypeScript", "Framer Motion"],
    demoUrl: "#",
    githubUrl: "https://github.com/naresh-kamarthy/aether-flow"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    icon: "Layout",
    skills: [
      "React.js",
      "TypeScript",
      "Redux Toolkit",
      "Tailwind CSS v4",
      "Framer Motion",
      "Responsive Layouts",
    ]
  },
  {
    title: "Backend Services",
    icon: "Cpu",
    skills: [
      "Node.js",
      "Express.js",
      "RESTful APIs",
      "Socket.IO",
      "Redis Caching",
      "Refined WebSockets",
    ]
  },
  {
    title: "Databases & Cloud",
    icon: "Database",
    skills: [
      "MongoDB",
      "Mongoose",
      "Cloudinary",
      "Vercel Deployment",
      "Render Gateway Routing",
    ]
  },
  {
    title: "Security Foundations",
    icon: "Shield",
    skills: [
      "HttpOnly Cookies",
      "Refresh Token Rotation",
      "SameSite Policies",
      "RBAC Middleware",
      "Helmet / CORS Headers",
    ]
  },
  {
    title: "AI Integration",
    icon: "Sparkles",
    skills: [
      "Gemini SDK",
      "Prompt Optimization",
      "JSON Schema Responses",
      "Streaming Response APIs",
    ]
  },
  {
    title: "Verification & Tools",
    icon: "Code",
    skills: [
      "Jest Unit Tests",
      "React Testing Library",
      "Git / CI Pipelines",
      "Postman API Tooling",
    ]
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    company: "Navajna Technologies Pvt Ltd",
    role: "Senior Software Engineer",
    period: "01/2022 – 02/2025",
    highlights: [
      "Architected complex administrative workspace views for **Client: MasterCard**, ensuring high-speed data renders under heavy loads.",
      "Designed dynamic grid arrays and lazy data-loading schemes to display sequential datasets with sub-second latencies.",
      "Optimized production builds via routing code-splitting, reducing initial index load footprints by over 25%.",
      "Constructed comprehensive automation testing guidelines with Jest, maintaining stable 88% coverage benchmarks."
    ],
    stack: ["React.js", "TypeScript", "Redux Toolkit", "Node.js", "Express", "REST APIs", "Jest", "RTL"],
    location: "Hyderabad, India"
  },
  {
    company: "Vectramind Technologies Pvt Ltd",
    role: "Software Engineer",
    period: "06/2019 – 12/2021",
    highlights: [
      "Designed high-traffic React and Angular web layouts for secure customer transaction histories.",
      "Mapped interactive dashboard controls cleanly with core backend transactional REST services.",
      "Improved mobile responsiveness and standard display compatibility thresholds across multiple client products."
    ],
    stack: ["React.js", "Angular", "TypeScript", "Redux", "React Router", "MUI"],
    location: "Hyderabad, India"
  }
];
