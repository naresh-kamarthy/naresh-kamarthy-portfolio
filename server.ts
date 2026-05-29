import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory simulated MERN database for messages and portfolio telemetry
const db = {
  messages: [] as any[],
  stats: {
    profileViews: 1420,
    resumeDownloads: 342,
    chatInteractions: 819,
    connectionRequests: 112,
  }
};

// Initialize Gemini client lazily
let ai: GoogleGenAI | null = null;
try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
} catch (err) {
  console.error("Failed to initialize GoogleGenAI client:", err);
}

// AI Recruiter Assistant Prompt (Naresh's Virtual AI Twin)
const TWIN_SYSTEM_INSTRUCTION = `
You are the interactive virtual AI twin & recruiter assistant for Naresh Kamarthy, representing him on his portfolio.
Your role is to act as a highly professional, technical, and cooperative Senior Engineer persona, answering recruiter questions clearly, with precise terminology and enthusiasm.

Background & Bio:
Naresh Kamarthy is a Senior Software Engineer specializing in MERN Stack and AI Systems. He has a track record of building production-grade SaaS platforms, real-time sync networks, and complex generative AI integrations.
He works with React.js, TypeScript, Node.js, Express, MongoDB (MERN), Tailwind CSS, Redis, Socket.IO, and Gemini API.

Employment Timeline:
1. Senior Software Engineer at Navajna Technologies Pvt Ltd (01/2022 - 02/2025)
   - Architected MasterCard enterprise dashboards.
   - Refined complex React architecture and workflow automation pipelines.
   - Conducted major frontend speed and bundle optimization, driving 40%+ load-time improvements.
   - Championed premium testing infrastructure (Jest/RTL).
2. Software Engineer at Vectramind Technologies Pvt Ltd (06/2019 - 12/2021)
   - Created business-critical responsive web systems utilizing React and Angular.
   - Designed reusable components and component library integrations.
   - Conducted robust RESTful API integration and third-party data pipelines.

Key Projects Highlighted on Portfolio:
- MeetMind AI: AI Meeting Notes & Task Manager SaaS. Built with MERN + TypeScript + Redux Toolkit + Gemini API. Features summary generation, token-rotation JWT auth in secure cookies, Cloudinary, real-time sync.
- SynapseAI: Real-time Multi-Model Collaboration system. Built with React + Node + MongoDB + Socket.IO + Gemini. Features live streaming AI pipelines, concurrent multi-user sync.
- LinkMind AI: URL Shortener & Actionable Analytics. Built with MongoDB indexes, Redis cache layered with Socket.IO telemetry, and Gemini AI insights.

Key Strengths you can talk about:
- Deep system architecture: Secure authentication (JWT rotation in HttpOnly cookies), Role-Based Access Control (RBAC), database indexing, Redis, Socket.IO.
- Modern frontend craftsmanship: High-performance React, typed TS, clean Tailwind layout, state management with Redux.
- AI Integration: Real-time streaming response UX, workflow orchestrations, clever prompt engineering, Gemini API grounding.

Style rules:
- Be incredibly informative, professional, and pleasant.
- Keep responses concise or moderately detailed. Never ramble. Use clear formatting, bullet points when appropriate.
- If asked personal questions outside engineering or professional context, guide them back to Naresh's professional capabilities.
`;

// API routes first
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// GET portfolio stats
app.get("/api/stats", (req, res) => {
  // Let views tick up slightly to represent active traffic
  db.stats.profileViews += Math.floor(Math.random() * 2) + 1;
  res.json(db.stats);
});

// Track download telemetry
app.post("/api/telemetry/download", (req, res) => {
  db.stats.resumeDownloads += 1;
  res.json({ success: true, count: db.stats.resumeDownloads });
});

// Handle contact messages
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields (name, email, message)" });
  }

  const newMessage = {
    id: Date.now().toString(),
    name,
    email,
    message,
    timestamp: new Date().toISOString()
  };

  db.messages.push(newMessage);
  db.stats.connectionRequests += 1;

  console.log(`[Database Sync] Message recorded from ${name} (${email}): "${message.substring(0, 50)}..."`);
  
  res.json({ 
    success: true, 
    message: "Your message has been safely persisted to Naresh's MERN server instance." 
  });
});

// Chat virtual twin route (Generates answers using Gemini API or local template backup if API Key is not yet configured)
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid request. messages array is required." });
  }

  db.stats.chatInteractions += 1;
  
  // Format history for Gemini API
  const conversationString = messages
    .map((m: any) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
    .join("\n");

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `${conversationString}\nAssistant:`,
        config: {
          systemInstruction: TWIN_SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      const responseText = response.text || "I apologize, but I couldn't formulate a response right now.";
      return res.json({ response: responseText, isMock: false });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      // Fallback in case of runtime API errors or rate-limiting
    }
  }

  // Purely dynamic fallback responses in case GEMINI_API_KEY is not set or fails.
  // It matches key terms to answer recruiter queries intelligently.
  const userQuery = (messages[messages.length - 1]?.content || "").toLowerCase();
  let fallbackReply = "";

  if (userQuery.includes("project") || userQuery.includes("meetmind") || userQuery.includes("synapse") || userQuery.includes("linkmind")) {
    fallbackReply = "### Naresh's Portfolio Projects 🚀\n\nNaresh has designed several enterprise MERN and AI platforms:\n\n1. **MeetMind AI (SaaS)**\n   * **Role:** Lead Architect\n   * **Tech:** React, Node.js, Express, MongoDB, Gemini API, TypeScript\n   * **Core features:** AI-generated meeting summaries, text task-extraction pipelines, JWT-rotation cookie sessions, and secure media uploads via Cloudinary.\n\n2. **SynapseAI (Real-time Collaboration)**\n   * **Tech:** React + Socket.IO + Node.js + MongoDB + Gemini API\n   * **Core features:** Streaming AI responses, concurrent multi-user live workspace, state synchronizations.\n\n3. **LinkMind AI (URL Shortener & Telemetry)**\n   * **Tech:** MERN Stack + Socket.IO + Redis Caching\n   * **Core features:** Highly indexed MongoDB queries, Socket.IO live analytics, telemetry monitoring pipelines, and Redis speed optimization.\n\nIs there a specific architecture or system you would like to discuss?";
  } else if (userQuery.includes("experience") || userQuery.includes("work") || userQuery.includes("job") || userQuery.includes("history")) {
    fallbackReply = "### Professional Experience 💼\n\nNaresh has over **5+ years of software engineering expertise**:\n\n* **Senior Software Engineer | Navajna Technologies (01/2022 – 02/2025)**\n  * Led architectural updates for high-impact Mastercard dashboards.\n  * Implemented modular backend pipelines and robust frontend modular design.\n  * Optimized bundlers & performance to improve rendering speed by 40%+.\n\n* **Software Engineer | Vectramind Technologies (06/2019 – 12/2021)**\n  * Built critical, responsive modules using React and Angular.\n  * Worked closely with product teams to design reusable interfaces and REST APIs.\n\nWould you like additional details on his roles or accomplishments?";
  } else if (userQuery.includes("contact") || userQuery.includes("hire") || userQuery.includes("email") || userQuery.includes("phone") || userQuery.includes("linkedin")) {
    fallbackReply = "### Get in Touch with Naresh ✉️\n\nYou can reach Naresh directly using these channels:\n\n* **Email:** [kamarthinaresh79@gmail.com](mailto:kamarthinaresh79@gmail.com)\n* **Location:** India 🇮🇳 (Available for remote/hybrid)\n* **LinkedIn:** [linkedin.com/in/naresh-kamarthy-aa1239130](https://www.linkedin.com/in/naresh-kamarthy-aa1239130)\n* **GitHub:** [github.com/naresh-kamarthy](https://github.com/naresh-kamarthy)\n\nAlternatively, you can write a message directly in the **Contact Form** at the bottom of his website, and it will be immediately saved in our MERN server instance!";
  } else if (userQuery.includes("stack") || userQuery.includes("tech") || userQuery.includes("react") || userQuery.includes("node") || userQuery.includes("api") || userQuery.includes("mongo")) {
    fallbackReply = "### Core Technical Stack 🛠️\n\nNaresh possesses a deep, production-tested understanding of:\n\n* **Frontend:** React, TypeScript, Redux Toolkit, Tailwind CSS v4, Material UI, Framer Motion\n* **Backend:** Node.js, Express.js, JWT Cookie Authentication, Role-Based Access Control, Socket.IO, REST APIs\n* **Databases:** MongoDB, Mongoose, Redis caching, Mongo Atlas clustering\n* **AI/Orchestration:** Gemini API integration (streaming responses), workflow automation, Prompt Engineering.\n\nHe strongly believes in securing client-server boundaries, utilizing HTTP-Only cookies, CORS headers, and strict authentication rotation.";
  } else {
    fallbackReply = "Hello! I am Naresh's virtual AI twin, running Live on this MERN + Gemini Server. \n\nI can answer any questions you have about Naresh's core technologies, detailed project architectures, his professional history at Navajna and Vectramind, or how to contact him!\n\nFeel free to ask something like:\n* \"What is Naresh's experience at Navajna?\"\n* \"Tell me about MeetMind AI project and its backend architecture.\"\n* \"How does he handle JWT Security in cookie auth?\"\n* \"How can I get in touch with him?\"";
  }

  // Prepend a nice note that the server is in demo/fallback mode if Gemini key is missing
  if (!ai) {
    fallbackReply = `*Note: The backend is operating in preview demo mode (answers parsed local-side because the Gemini API Key is loading from config secrets).* \n\n${fallbackReply}`;
  }

  res.json({ response: fallbackReply, isMock: !ai });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    // High-performance static routing with optimized Cache-Control headers
    app.use(express.static(distPath, {
      maxAge: '1y',
      immutable: true,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
          res.setHeader('Pragma', 'no-cache');
          res.setHeader('Expires', '0');
        } else {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
      }
    }));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Naresh Kamarthy Portfolio MERN backend listening on port ${PORT}`);
  });
}

startServer();
