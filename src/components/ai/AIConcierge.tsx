import { useState } from "react";
import { MessageCircle, X, Send, Sparkles, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

const quickActions = [
  "What's my CGPA?",
  "Bus schedule today",
  "Faculty contacts",
  "Placement stats",
];

export function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([
    { role: "ai", content: "Hey there! I'm your UniVerse AI assistant. How can I help you today? 🎓" }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, { role: "user", content: message }]);
    setMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "ai", 
        content: "I'm processing your request! In the full version, I'll provide real-time updates for academics, transport, food menus, faculty contacts, and career predictions." 
      }]);
    }, 800);
  };

  return (
    <>
      {/* Sleek Floating Launch Button */}
      <button
        onClick={() => setIsOpen(true)}
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
          "fixed bottom-24 right-4 md:bottom-6 md:right-6 z-50 w-[calc(100vw-2rem)] md:w-96 h-[500px] max-h-[70vh] sleek-card border border-white/10 shadow-2xl flex flex-col transition-all duration-300 transform bg-card/95 backdrop-blur-2xl",
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-semibold text-sm">UniVerse AI</h3>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </div>
              <p className="text-[11px] text-muted-foreground">Always active on campus</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-xl hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs md:text-sm animate-fade-in leading-relaxed shadow-sm",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm shadow-primary/20 font-medium"
                    : "bg-white/[0.05] border border-white/[0.06] text-foreground rounded-bl-sm"
                )}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-2 flex gap-1.5 overflow-x-auto scrollbar-hide border-t border-white/[0.04]">
          {quickActions.map((action) => (
            <button
              key={action}
              onClick={() => setMessage(action)}
              className="px-2.5 py-1 text-[11px] font-medium bg-white/[0.04] hover:bg-primary/15 hover:text-primary hover:border-primary/30 border border-white/[0.08] rounded-lg whitespace-nowrap transition-all"
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
              placeholder="Ask UniVerse AI..."
              className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-3.5 py-2 text-xs md:text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all text-foreground placeholder:text-muted-foreground/50"
            />
            <button
              onClick={handleSend}
              className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-all shadow-md shadow-primary/25 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
