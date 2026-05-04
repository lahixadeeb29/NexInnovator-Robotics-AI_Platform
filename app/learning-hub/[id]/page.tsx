"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLang, useXP } from "@/lib/store";
import { ROBOTS } from "@/lib/platform-data";
import { ArrowLeft, Copy, Check, Zap } from "lucide-react";

export default function RobotDetailPage() {
  const { id } = useParams();
  const { t } = useLang();
  const { addXP } = useXP();
  const [tab, setTab] = useState<"overview"|"code"|"bangla"|"viva">("overview");
  const [copied, setCopied] = useState(false);
  const [xpEarned, setXpEarned] = useState(false);

  const robot = ROBOTS.find(r => r.id === id);
  if (!robot) return (
    <div className="nex-section nex-container" style={{ textAlign: "center" }}>
      <h2>Robot not found</h2>
      <Link href="/learning-hub" className="nex-btn-primary" style={{ marginTop: 20, display: "inline-flex" }}>
        ← Back to Learning Hub
      </Link>
    </div>
  );

  const lc = robot.level === "beginner" ? "var(--emerald)" : robot.level === "intermediate" ? "var(--amber)" : "var(--rose)";

  const copyCode = () => {
    navigator.clipboard.writeText(robot.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    if (!xpEarned) {
      addXP(50);
      setXpEarned(true);
    }
  };

  const TABS = [
    { key: "overview", en: "Overview", bn: "ওভারভিউ" },
    { key: "code", en: "Code", bn: "কোড" },
    { key: "bangla", en: "বাংলা গাইড", bn: "বাংলা গাইড" },
    { key: "viva", en: "Viva Q&A", bn: "ভাইভা" },
  ] as const;

  return (
    <div className="nex-section">
      <div className="nex-container">
        {/* Back */}
        <Link href="/learning-hub" className="nex-btn-ghost" style={{ marginBottom: 24, display: "inline-flex" }}>
          <ArrowLeft size={16}/> {t("Back to Learning Hub","লার্নিং হাবে ফিরুন")}
        </Link>

        {/* Header */}
        <div style={{
          background: "var(--bg-card)", border: "1px solid var(--border)",
          borderRadius: 20, padding: "2rem", marginBottom: "2rem",
          display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap"
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: 18, fontSize: "2.5rem",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: `${lc}12`, border: `1px solid ${lc}30`, flexShrink: 0
          }}>{robot.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
              <span className={`nex-badge level-${robot.level}`}>{robot.level}</span>
              <span className="nex-badge badge-cyan">⚡ {robot.difficulty}</span>
              <span className="nex-badge badge-amber">⏱ {robot.time}</span>
              <span className="nex-badge badge-violet">💰 {robot.budget}</span>
            </div>
            <h1 style={{ fontSize: "clamp(1.5rem,4vw,2.5rem)", marginBottom: 10 }}>{robot.name}</h1>
            <p style={{ color: "var(--text-sub)", lineHeight: 1.8, maxWidth: 600 }}>{robot.desc}</p>
          </div>
          {!xpEarned && (
            <button onClick={() => { addXP(100); setXpEarned(true); }}
              className="nex-btn-primary">
              <Zap size={14}/> {t("Claim 100 XP","১০০ XP নিন")}
            </button>
          )}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: "1.5rem", flexWrap: "wrap" }}>
          {TABS.map(tb => (
            <button key={tb.key} onClick={() => setTab(tb.key)}
              className={`nex-tab ${tab === tb.key ? "active" : ""}`}>
              {t(tb.en, tb.bn)}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div className="nex-card">
              <h3 style={{ marginBottom: 16, color: "var(--cyan)" }}>🔧 {t("Components","কম্পোনেন্ট")}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {robot.components.map((c, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "8px 12px", background: "var(--bg-elevated)",
                    borderRadius: 8, border: "1px solid var(--border)"
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: lc, flexShrink: 0 }}/>
                    <span style={{ fontSize: "0.875rem" }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="nex-card">
              <h3 style={{ marginBottom: 16, color: "var(--cyan)" }}>📊 {t("Project Info","প্রজেক্ট তথ্য")}</h3>
              {[
                { label: t("Budget","বাজেট"), value: robot.budget, color: "var(--emerald)" },
                { label: t("Build Time","নির্মাণ সময়"), value: robot.time, color: "var(--amber)" },
                { label: t("Difficulty","কঠিনত্ব"), value: robot.difficulty, color: robot.level === "beginner" ? "var(--emerald)" : robot.level === "intermediate" ? "var(--amber)" : "var(--rose)" },
                { label: t("Level","স্তর"), value: robot.level, color: lc },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>{item.label}</span>
                  <span style={{ color: item.color, fontWeight: 700, fontSize: "0.875rem" }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "code" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h3>{t("Complete Source Code","সম্পূর্ণ সোর্স কোড")}</h3>
              <button onClick={copyCode} className="nex-btn-outline" style={{ padding: "8px 16px", fontSize: "0.8rem" }}>
                {copied ? <><Check size={14}/> {t("Copied!","কপি হয়েছে!")}</> : <><Copy size={14}/> {t("Copy Code","কোড কপি করুন")}</>}
              </button>
            </div>
            <div className="code-block">{robot.code}</div>
          </div>
        )}

        {tab === "bangla" && (
          <div className="nex-card">
            <h3 style={{ marginBottom: 16, color: "var(--cyan)" }}>🇧🇩 বাংলা ব্যাখ্যা</h3>
            <p style={{ lineHeight: 2, fontSize: "1rem", color: "var(--text-sub)" }}>{robot.bangla}</p>
          </div>
        )}

        {tab === "viva" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h3 style={{ marginBottom: 8 }}>{t("Viva Questions","ভাইভা প্রশ্ন")}</h3>
            {robot.viva.map((q, i) => (
              <div key={i} className="nex-card" style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{
                  width: 28, height: 28, borderRadius: 8, background: "rgba(0,212,255,0.1)",
                  border: "1px solid rgba(0,212,255,0.25)", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "0.8rem", fontWeight: 700,
                  color: "var(--cyan)", flexShrink: 0, fontFamily: "Orbitron,monospace"
                }}>Q{i+1}</span>
                <p style={{ lineHeight: 1.7, fontSize: "0.9rem", paddingTop: 4 }}>{q}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
