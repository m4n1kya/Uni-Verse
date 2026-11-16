import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, Bot, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const quickActions = [
  "What's my CGPA?",
  "Bus schedule today",
  "Faculty contacts",
  "Placement stats",
];

const getSmartCampusResponse = (query: string): string => {
  const lower = query.toLowerCase();

  if (lower.includes("cgpa") || lower.includes("gpa") || lower.includes("grade") || lower.includes("credit")) {
    return "📊 CGPA Engine: Open the 'E-Books & Academic Hub' and toggle the CGPA Engine. Enter your earned grades (S=10, A=9, B=8, C=7...) with credit weights to compute your cumulative GPA and academic standing with distinction status.";
  }
  if (lower.includes("bus") || lower.includes("shuttle") || lower.includes("transit") || lower.includes("transport")) {
    return "🚌 Live Campus Shuttle Status:\n• Route A: Arriving in 3 mins at Main Gate\n• Route B: On time (every 20 min from Hostels)\n• Route C: Campus Loop running continuously\nHead to the Transport Hub for live GPS tracking & emergency driver contacts.";
  }
  if (lower.includes("faculty") || lower.includes("professor") || lower.includes("cabin") || lower.includes("teacher")) {
    return "👨‍🏫 Faculty Directory: Access 120+ faculty records in the Faculty tab. Filter by departments (BCE, SCAI, SASL, BAI, SMEC) to view exact cabin locations in AB1 & AB2, research domains, and direct email consultation links.";
  }
  if (lower.includes("placement") || lower.includes("career") || lower.includes("salary") || lower.includes("package") || lower.includes("job")) {
    return "💼 Placement Intelligence 2024–25:\n• 450+ Offers Extended\n• Average Package: 12.5 LPA\n• Highest Package: 45.0 LPA\n• 85+ Recruiting Partners\nCheck the Career Hub to use the GPA eligibility predictor for dream company cutoffs!";
  }
  if (lower.includes("food") || lower.includes("cafeteria") || lower.includes("dining") || lower.includes("lunch") || lower.includes("dosa")) {
    return "🍽️ Food Court Telemetry: Mayuri, Bistro, UnderBelly, and AB Dakshin are currently serving. Place contactless orders and pick up your meal token instantly in the Food Court tab.";
  }
  if (lower.includes("book") || lower.includes("library") || lower.includes("note") || lower.includes("pdf")) {
    return "📚 Academic Hub: Browse over 80+ course subjects categorized by Program Core, Electives, and Skill Development. Unit notes and previous year question banks are ready for download.";
  }

  return `🎓 Uni-Verse Assistant: I can help you locate campus shuttle timings, faculty cabin allocations, cafeteria food specials, placement eligibility benchmarks, or lecture notes. What would you like to explore?`;
};

export function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string; time: string }[]>([
    { 
      role: "ai", 
      content: "Hey there! I'm your Uni-Verse campus copilot. Ask me about shuttle arrivals, faculty cabins, cafeteria specials, or placement cutoffs! 🎓",
      time: "Just now"
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const dispatchMessage = (queryText: string) => {
    if (!queryText.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { role: "user", content: queryText, time: timeStr }]);
    setMessage("");

    setTimeout(() => {
      const answer = getSmartCampusResponse(queryText);
      setMessages(prev => [...prev, { role: "ai", content: answer, time: timeStr }]);
    }, 450);
  };

  const handleSend = () => {
    dispatchMessage(message);
  };

  const handleQuickAction = (action: string) => {
    dispatchMessage(action);
  };

  const handleClearChat = () => {
    setMessages([
      { 
        role: "ai", 
        content: "Conversation cleared. How can I assist you across campus today? 🎓",
        time: "Just now"
      }
    ]);
  };

  return (
    <>
      {/* Sleek Floating Launch Button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open Uni-Verse AI Assistant"
        className={cn(
          "fixed bottom-24 right-4 md:bottom-6 md:right-6 z-50 w-12 h-12 md:w-13 md:h-13 rounded-2xl bg-gradient-to-tr from-primary to-accent text-primary-foreground flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-xl shadow-primary/30 hover:shadow-primary/50 border border-white/20 select-none cursor-pointer",
          isOpen && "scale-0 opacity-0 pointer-events-none"
        )}
      >
        <Sparkles className="w-5 h-5 text-white" />
      </button>

      {/* Modern Sleek Chat Panel */}
      <div
        className={cn(
          "fixed bottom-24 right-4 md:bottom-6 md:right-6 z-50 w-[calc(100vw-2rem)] md:w-96 h-[520px] max-h-[75vh] sleek-card border border-white/10 shadow-2xl flex flex-col transition-all duration-300 transform bg-card/95 backdrop-blur-2xl",
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3.5 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/25 to-accent/20 border border-primary/30 flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-display font-semibold text-xs tracking-tight">UniVerse Copilot</h3>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </div>
              <p className="text-[10px] text-muted-foreground">Active Campus Intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleClearChat}
              title="Clear conversation"
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-3 scrollbar-hide">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex flex-col animate-fade-in",
                msg.role === "user" ? "items-end" : "items-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed shadow-sm whitespace-pre-line",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm shadow-primary/20 font-medium"
                    : "bg-white/[0.04] border border-white/[0.06] text-foreground rounded-bl-sm"
                )}
              >
                {msg.content}
              </div>
              <span className="text-[9px] text-muted-foreground/60 px-1 mt-0.5">
                {msg.time}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-3 py-2 flex gap-1.5 overflow-x-auto scrollbar-hide border-t border-white/[0.04] bg-white/[0.01]">
          {quickActions.map((action) => (
            <button
              key={action}
              onClick={() => handleQuickAction(action)}
              className="px-2.5 py-1 text-[10px] font-semibold bg-white/[0.03] hover:bg-primary/15 hover:text-primary hover:border-primary/30 border border-white/[0.08] rounded-lg whitespace-nowrap transition-all cursor-pointer"
            >
              {action}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-white/[0.08]">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about shuttle, faculty, cutoffs, dining..."
              className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all text-foreground placeholder:text-muted-foreground/50"
            />
            <button
              onClick={handleSend}
              className="w-8 h-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-all shadow-md shadow-primary/25 cursor-pointer shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
