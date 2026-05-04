"use client";
import { useState, useRef, useEffect } from "react";
import { useLang, useXP } from "@/lib/store";
import { Send, Zap, Bot, User } from "lucide-react";

interface Message { role: "user" | "assistant"; content: string; }

const SUGGESTIONS = [
  "How do I connect an IR sensor to Arduino?",
  "আমাকে L298N মোটর ড্রাইভার সম্পর্কে বলো",
  "What is PWM and how does it work?",
  "লাইন ফলোয়ার রোবট কিভাবে তৈরি করব?",
  "How to reduce noise in ultrasonic sensor?",
  "PID controller কি? কিভাবে কাজ করে?",
];

export default function AIAssistantPage() {
  const { t } = useLang();
  const { addXP } = useXP();
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: t(
      "👋 Hi! I'm NexBot — your AI robotics tutor. I speak English and বাংলা! Ask me anything about robotics, Arduino, sensors, or any of the 25+ robot projects. What are you building today?",
      "👋 হ্যালো! আমি নেক্সবট — আপনার AI রোবোটিক্স টিউটর। আমি বাংলা ও ইংরেজিতে কথা বলি! রোবোটিক্স, Arduino, সেন্সর বা যেকোনো প্রজেক্ট সম্পর্কে জিজ্ঞেস করুন।"
    )}
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.content || "Sorry, I had trouble responding." }]);
      addXP(10);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection error. Please check your API key in .env.local" }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 64px)" }}>
      {/* Header */}
      <div style={{
        borderBottom: "1px solid var(--border)", padding: "1rem 1.5rem",
        background: "var(--bg-deep)", display: "flex", alignItems: "center", gap: 14
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: "linear-gradient(135deg, var(--cyan), var(--violet))",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.4rem", animation: "pulse-glow 2s ease-in-out infinite"
        }}>🤖</div>
        <div>
          <h2 style={{ fontSize: "1.1rem", marginBottom: 2 }}>NexBot AI</h2>
          <p style={{ fontSize: "0.78rem", color: "var(--emerald)" }}>● {t("Online — Bangla & English","অনলাইন — বাংলা ও ইংরেজি")}</p>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
          <Zap size={14} color="var(--amber)"/>
          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{t("+10 XP per message","+১০ XP প্রতি বার্তায়")}</span>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: "flex", gap: 12,
              flexDirection: msg.role === "user" ? "row-reverse" : "row",
              alignItems: "flex-start"
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: msg.role === "user" ? "rgba(0,212,255,0.15)" : "linear-gradient(135deg,var(--cyan),var(--violet))",
                border: msg.role === "user" ? "1px solid rgba(0,212,255,0.3)" : "none",
                fontSize: "1rem"
              }}>
                {msg.role === "user" ? <User size={16} color="var(--cyan)"/> : "🤖"}
              </div>
              <div style={{
                maxWidth: "75%", padding: "12px 16px", borderRadius: 14,
                background: msg.role === "user" ? "rgba(0,212,255,0.08)" : "var(--bg-card)",
                border: `1px solid ${msg.role === "user" ? "rgba(0,212,255,0.2)" : "var(--border)"}`,
                fontSize: "0.9rem", lineHeight: 1.7, whiteSpace: "pre-wrap",
                borderTopRightRadius: msg.role === "user" ? 4 : 14,
                borderTopLeftRadius: msg.role === "assistant" ? 4 : 14,
              }}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,var(--cyan),var(--violet))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>🤖</div>
              <div style={{ padding: "12px 16px", borderRadius: 14, borderTopLeftRadius: 4, background: "var(--bg-card)", border: "1px solid var(--border)", display: "flex", gap: 6, alignItems: "center" }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--cyan)", animation: `blink 1.2s ease-in-out ${i*0.2}s infinite` }}/>
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef}/>
        </div>
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div style={{ padding: "0 1.5rem 1rem", maxWidth: 760, margin: "0 auto", width: "100%" }}>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 8 }}>{t("Try asking:","জিজ্ঞেস করুন:")}</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {SUGGESTIONS.map((s, i) => (
              <button key={i} onClick={() => sendMessage(s)} style={{
                padding: "6px 12px", background: "var(--bg-elevated)",
                border: "1px solid var(--border)", borderRadius: 20,
                fontSize: "0.78rem", color: "var(--text-sub)", cursor: "pointer",
                transition: "all 150ms"
              }}>{s}</button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div style={{
        borderTop: "1px solid var(--border)", padding: "1rem 1.5rem",
        background: "var(--bg-deep)"
      }}>
        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", gap: 10 }}>
          <input
            className="nex-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
            placeholder={t("Ask anything about robotics... (Bangla or English)","রোবোটিক্স সম্পর্কে যেকোনো প্রশ্ন করুন...")}
            disabled={loading}
          />
          <button onClick={() => sendMessage(input)} disabled={loading || !input.trim()} style={{
            padding: "12px 20px", background: "linear-gradient(135deg,var(--cyan),var(--violet))",
            border: "none", borderRadius: 10, color: "#fff", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6, fontWeight: 600,
            opacity: loading || !input.trim() ? 0.5 : 1, transition: "opacity 200ms"
          }}>
            <Send size={16}/> {t("Send","পাঠান")}
          </button>
        </div>
      </div>
    </div>
  );
}
