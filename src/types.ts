export interface Project {
  id: string;
  title: string;
  category: "MERN" | "AI" | "Realtime";
  description: string;
  longDescription?: string;
  architectureSummary?: string;
  features: string[];
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  highlights: string[];
  metrics?: string;
  images?: string[];
  primaryImage?: string;
}

export interface Skill {
  name: string;
  icon?: string;
  level?: string; // e.g., "Expert", "Advanced"
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export interface TimelineItem {
  company: string;
  role: string;
  period: string;
  highlights: string[];
  stack: string[];
  location?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface TechStat {
  label: string;
  value: string;
  description: string;
}
