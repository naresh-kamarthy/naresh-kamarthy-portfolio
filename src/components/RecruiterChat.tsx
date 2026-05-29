import { useState, useRef, useEffect, useId, useTransition } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, X, Send, Sparkles, Loader2, ArrowUpRight, 
  Terminal, ShieldCheck, Mail, HelpCircle 
} from "lucide-react";
import { ChatMessage } from "../types";

export default function RecruiterChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I am Naresh's virtual AI Twin. Running live on his Express + Gemini server instance. Ask me anything about Naresh's MERN skills, projects like MeetMind AI, or work achievements!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatBubbleId = useId();

  // Scroll to bottom on new chats
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isPending]);

  const handleSend = (textToSend?: string) => {
    const speech = textToSend || input.trim();
    if (!speech || isPending) return;

    if (!textToSend) setInput("");

    // Append user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: speech,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);

    startTransition(async () => {
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })) 
          })
        });

        if (!response.ok) {
          throw new Error("Local instance network failure");
        }

        const data = await response.json();
        
        const assistantMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages((prev) => [...prev, assistantMsg]);
      } catch (err) {
        console.error("AI Communication error:", err);
        // Fail fallback safely in code:
        const errorMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I apologies, but the local Express endpoint experienced a timeout. Ensure the server is listening correctly on port 3000.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    });
  };

  const handleQuickQuestion = (qn: string) => {
    handleSend(qn);
  };

  const sampleQuestions = [
    "What did Naresh build at Navajna Technologies?",
    "Can you detail MeetMind AI's architecture?",
    "How does Naresh handle JWT security?",
  ];

  return (
    <>
      {/* Floating Active Launcher Bubble */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          id={chatBubbleId}
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-2xl shadow-indigo-500/30 transition-all duration-300 transform hover:scale-105 active:scale-95 group relative ${
            isOpen ? "rotate-90 bg-slate-900 border border-slate-800" : ""
          }`}
          aria-label="Toggle AI Recruiter Companion"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative">
              <MessageSquare className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-indigo-600 animate-pulse" />
            </div>
          )}

          {/* Magnetic text prompt helper on launcher */}
          {!isOpen && (
            <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-950/90 hover:bg-slate-950 border border-slate-900 shadow-xl px-3.5 py-1.5 rounded-lg text-xs font-mono text-slate-300 font-medium tracking-wide whitespace-nowrap opacity-0 md:group-hover:opacity-100 transition-all duration-300 translate-x-3 pointer-events-none">
              Chat with Naresh&apos;s AI Twin 🤖
            </span>
          )}
        </button>
      </div>

      {/* Slide-out Portal Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-24 right-6 w-[92vw] sm:w-[420px] h-[550px] bg-slate-950 border border-slate-900 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Drawer Header with system telemetry markers */}
            <div className="p-4 px-5 bg-gradient-to-r from-slate-950 to-indigo-950/30 border-b border-slate-900 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full bg-indigo-950/80 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
                </div>
                <div>
                  <h3 className="text-sm font-sans font-bold text-white flex items-center gap-1">
                    Recruiter Assistant <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">AI TWIN</span>
                  </h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>MERN Client Node Online</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setMessages([
                      {
                        id: "welcome",
                        role: "assistant",
                        content: "Hello! History wiped successfully. I am Naresh's virtual AI Twin. Ask me anything about Naresh's skills, Navajna highlights, or project details!",
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      }
                    ]);
                  }}
                  title="Clear history"
                  className="p-1.5 hover:bg-slate-900 rounded-md text-slate-500 hover:text-slate-300 transition-all"
                >
                  <Terminal className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-slate-900 rounded-md text-slate-400 hover:text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversation Window Grid */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth">
              {messages.map((msg) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                  >
                    <div className={`max-w-[85%] rounded-xl p-3.5 text-sm leading-relaxed ${
                      isUser 
                        ? "bg-indigo-600 text-white rounded-tr-none px-4 shadow-md shadow-indigo-500/10 font-sans" 
                        : "bg-slate-900/60 border border-slate-800 text-slate-200 rounded-tl-none font-sans"
                    }`}>
                      {/* Process markdown highlights for AI bot answers */}
                      {isUser ? (
                        <p>{msg.content}</p>
                      ) : (
                        <div className="space-y-2 whitespace-pre-line break-words">
                          {msg.content}
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                );
              })}

              {/* Loader feedback */}
              {isPending && (
                <div className="flex flex-col items-start">
                  <div className="bg-slate-900/30 border border-slate-900 text-slate-400 rounded-xl rounded-tl-none p-3 px-4 text-sm flex items-center gap-2 font-mono">
                    <Loader2 className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
                    <span>Gemini twin compiling response...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Suggestions and Input Tray */}
            <div className="p-4 bg-slate-950 border-t border-slate-900 space-y-3">
              {/* Micro-prompter suggestions if user has sent little */}
              {messages.length <= 2 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1 px-0.5">
                    <HelpCircle className="w-3 h-3 text-slate-600" /> QUICK SUGGESTIONS
                  </span>
                  <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto">
                    {sampleQuestions.map((qn, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleQuickQuestion(qn)}
                        className="text-[11px] font-sans font-medium text-slate-400 hover:text-white bg-slate-900/50 hover:bg-indigo-950/30 border border-slate-800 hover:border-indigo-500/20 px-2.5 py-1.5 rounded-md text-left transition-all max-w-full truncate cursor-pointer"
                      >
                        {qn}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Form trigger layout */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask virtual twin about Naresh..."
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-sans"
                  disabled={isPending}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isPending}
                  className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white disabled:bg-slate-900 disabled:text-slate-600 disabled:border-slate-800 transition-all flex items-center justify-center shrink-0 border border-indigo-500/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Footer status markers */}
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-600 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" /> Secure Encryption
                </span>
                <span>Type &apos;reset&apos; to clear logs</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
