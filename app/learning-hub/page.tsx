"use client";
import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/store";
import { ROBOTS, type RobotLevel } from "@/lib/platform-data";
import { Search } from "lucide-react";

const LEVELS: { value: RobotLevel | "all"; en: string; bn: string }[] = [
  { value: "all", en: "All Levels", bn: "সব স্তর" },
  { value: "beginner", en: "Beginner", bn: "শিক্ষানবিশ" },
  { value: "intermediate", en: "Intermediate", bn: "মধ্যবর্তী" },
  { value: "advanced", en: "Advanced", bn: "উন্নত" },
];

export default function LearningHubPage() {
  const { t } = useLang();
  const [filter, setFilter] = useState<RobotLevel | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = ROBOTS.filter(r => {
    const matchLevel = filter === "all" || r.level === filter;
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.desc.toLowerCase().includes(search.toLowerCase());
    return matchLevel && matchSearch;
  });

  return (
    <div className="nex-section">
      <div className="nex-container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="nex-badge badge-cyan" style={{ marginBottom: 16, display: "inline-block" }}>
            {t("Robot Library","রোবট লাইব্রেরি")}
          </span>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", marginBottom: 16 }}>
            {t("Learn. Build. Master.","শিখুন। তৈরি করুন। দক্ষ হোন।")}
          </h1>
          <p style={{ maxWidth: 560, margin: "0 auto", color: "var(--text-sub)", lineHeight: 1.8 }}>
            {t(
              "25+ complete robot manuals with full Arduino/Python code, components list, and viva questions.",
              "২৫+ সম্পূর্ণ রোবট ম্যানুয়াল — Arduino/Python কোড, কম্পোনেন্ট তালিকা, এবং ভাইভা প্রশ্ন সহ।"
            )}
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 12, marginBottom: "2rem", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
            <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}/>
            <input
              className="nex-input"
              style={{ paddingLeft: 40 }}
              placeholder={t("Search robots...","রোবট খুঁজুন...")}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {LEVELS.map(l => (
              <button key={l.value} onClick={() => setFilter(l.value)}
                className={`nex-tab ${filter === l.value ? "active" : ""}`}>
                {t(l.en, l.bn)}
              </button>
            ))}
          </div>
        </div>

        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
          {filtered.length} {t("robots found","টি রোবট পাওয়া গেছে")}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
          {filtered.map(robot => {
            const lc = robot.level === "beginner" ? "var(--emerald)" : robot.level === "intermediate" ? "var(--amber)" : "var(--rose)";
            return (
              <Link key={robot.id} href={`/learning-hub/${robot.id}`} style={{ textDecoration: "none" }}>
                <div className="nex-card" style={{ height: "100%", display: "flex", flexDirection: "column", cursor: "pointer" }}>
                  <div style={{ display: "flex", gap: 14, marginBottom: 14 }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: 14, flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.8rem", background: `${lc}12`, border: `1px solid ${lc}25`
                    }}>{robot.icon}</div>
                    <div>
                      <h3 style={{ fontSize: "0.95rem", marginBottom: 6, lineHeight: 1.3 }}>{robot.name}</h3>
                      <div style={{ display: "flex", gap: 6 }}>
                        <span className={`nex-badge level-${robot.level}`} style={{ fontSize: "0.62rem" }}>{robot.level}</span>
                        <span className="nex-badge" style={{ fontSize: "0.62rem", color: "var(--text-muted)", background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
                          ⚡ {robot.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: "0.82rem", lineHeight: 1.7, color: "var(--text-muted)", flex: 1, marginBottom: 14 }}>{robot.desc}</p>
                  <div style={{ display: "flex", gap: 16, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
                    <span style={{ fontSize: "0.75rem", color: lc }}>💰 {robot.budget}</span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>⏱ {robot.time}</span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: "auto" }}>
                      {robot.components.length} {t("parts","পার্টস")}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
