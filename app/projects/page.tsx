"use client";
import { useState } from "react";
import { useLang, useXP } from "@/lib/store";
import { PROJECTS, ROBOTS } from "@/lib/platform-data";
import Link from "next/link";

export default function ProjectsPage() {
  const { t } = useLang();
  const { addXP } = useXP();
  const [activeTab, setActiveTab] = useState<"school"|"college"|"hackathon"|"robots">("robots");

  const TABS = [
    { key: "robots" as const, en: "25+ Robot Manuals", bn: "২৫+ রোবট ম্যানুয়াল" },
    { key: "school" as const, en: "School Projects", bn: "স্কুল প্রজেক্ট" },
    { key: "college" as const, en: "College Projects", bn: "কলেজ প্রজেক্ট" },
    { key: "hackathon" as const, en: "Hackathon Ideas", bn: "হ্যাকাথন আইডিয়া" },
  ];

  return (
    <div className="nex-section">
      <div className="nex-container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="nex-badge badge-amber" style={{ marginBottom: 16, display: "inline-block" }}>
            {t("Project Library","প্রজেক্ট লাইব্রেরি")}
          </span>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", marginBottom: 16 }}>
            {t("Build Real Things.","বাস্তব জিনিস তৈরি করুন।")}{" "}
            <span className="gradient-text">{t("Learn Faster.","দ্রুত শিখুন।")}</span>
          </h1>
        </div>

        <div style={{ display: "flex", gap: 6, marginBottom: "2rem", flexWrap: "wrap" }}>
          {TABS.map(tb => (
            <button key={tb.key} onClick={() => setActiveTab(tb.key)}
              className={`nex-tab ${activeTab === tb.key ? "active" : ""}`}>
              {t(tb.en, tb.bn)}
            </button>
          ))}
        </div>

        {activeTab === "robots" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
            {ROBOTS.map(robot => {
              const lc = robot.level === "beginner" ? "var(--emerald)" : robot.level === "intermediate" ? "var(--amber)" : "var(--rose)";
              return (
                <Link key={robot.id} href={`/learning-hub/${robot.id}`} style={{ textDecoration: "none" }}>
                  <div className="nex-card" style={{ display: "flex", gap: 12, alignItems: "center", cursor: "pointer" }}>
                    <span style={{ fontSize: "1.8rem" }}>{robot.icon}</span>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: 4 }}>{robot.name}</p>
                      <div style={{ display: "flex", gap: 6 }}>
                        <span className={`nex-badge level-${robot.level}`} style={{ fontSize: "0.6rem" }}>{robot.level}</span>
                        <span style={{ fontSize: "0.72rem", color: lc }}>💰 {robot.budget}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {activeTab !== "robots" && (
          <div>
            <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "0.875rem" }}>
              {t(`${PROJECTS[activeTab].length} project ideas for ${activeTab} level`,`${PROJECTS[activeTab].length}টি প্রজেক্ট আইডিয়া`)}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 12 }}>
              {PROJECTS[activeTab].map((project, i) => (
                <div key={i} className="nex-card" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: "1.4rem" }}>
                    {activeTab === "school" ? "📐" : activeTab === "college" ? "🔬" : "🏆"}
                  </span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: 4 }}>{project}</p>
                    <button onClick={() => addXP(25)} style={{
                      fontSize: "0.7rem", color: "var(--cyan)", background: "none", border: "none",
                      cursor: "pointer", padding: 0, fontFamily: "Orbitron,monospace"
                    }}>+ Claim 25 XP</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
