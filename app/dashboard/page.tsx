"use client";
import { useLang, useXP, xpToLevel, xpToNextLevel } from "@/lib/store";
import { ACHIEVEMENTS } from "@/lib/platform-data";
import { Zap, Trophy, Star } from "lucide-react";

export default function DashboardPage() {
  const { t } = useLang();
  const { xp, addXP } = useXP();
  const level = xpToLevel(xp);
  const nextLevelXP = xpToNextLevel(xp);
  const progress = Math.min((xp / nextLevelXP) * 100, 100);
  const unlocked = ACHIEVEMENTS.filter(a => xp >= a.xpThreshold);

  return (
    <div className="nex-section">
      <div className="nex-container">
        <div style={{ marginBottom: "2rem" }}>
          <span className="nex-badge badge-violet" style={{ marginBottom: 12, display: "inline-block" }}>
            {t("Your Progress","আপনার অগ্রগতি")}
          </span>
          <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>
            {t("Dashboard","ড্যাশবোর্ড")}
          </h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20, marginBottom: "2rem" }}>
          {/* XP Card */}
          <div className="nex-card" style={{ textAlign: "center" }}>
            <Zap size={32} color="var(--amber)" style={{ margin: "0 auto 12px" }}/>
            <div style={{ fontSize: "3rem", fontWeight: 900, color: "var(--amber)", fontFamily: "Orbitron,monospace" }}>{xp}</div>
            <p style={{ color: "var(--text-muted)", marginBottom: 16 }}>{t("Total XP Earned","মোট XP অর্জিত")}</p>
            <button onClick={() => addXP(50)} className="nex-btn-primary" style={{ fontSize: "0.8rem", padding: "8px 20px" }}>
              + {t("Test Add 50 XP","পরীক্ষা: ৫০ XP যোগ করুন")}
            </button>
          </div>

          {/* Level Card */}
          <div className="nex-card" style={{ textAlign: "center" }}>
            <Star size={32} color="var(--cyan)" style={{ margin: "0 auto 12px" }}/>
            <div style={{ fontSize: "3rem", fontWeight: 900, color: "var(--cyan)", fontFamily: "Orbitron,monospace" }}>Lv.{level}</div>
            <p style={{ color: "var(--text-muted)", marginBottom: 16 }}>{t("Current Level","বর্তমান স্তর")}</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}/>
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 8 }}>
              {xp} / {nextLevelXP} XP {t("to next level","পরের স্তরে")}
            </p>
          </div>

          {/* Achievements Card */}
          <div className="nex-card" style={{ textAlign: "center" }}>
            <Trophy size={32} color="var(--violet)" style={{ margin: "0 auto 12px" }}/>
            <div style={{ fontSize: "3rem", fontWeight: 900, color: "var(--violet)", fontFamily: "Orbitron,monospace" }}>{unlocked.length}</div>
            <p style={{ color: "var(--text-muted)" }}>{t("Achievements Unlocked","অর্জন আনলক হয়েছে")}</p>
          </div>
        </div>

        {/* Achievements */}
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>🏆 {t("Achievements","অর্জনসমূহ")}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14 }}>
          {ACHIEVEMENTS.map(a => {
            const earned = xp >= a.xpThreshold;
            return (
              <div key={a.id} className="nex-card" style={{
                display: "flex", gap: 14, alignItems: "center",
                opacity: earned ? 1 : 0.4,
                border: earned ? "1px solid rgba(0,212,255,0.3)" : "1px solid var(--border)"
              }}>
                <span style={{ fontSize: "2rem" }}>{a.icon}</span>
                <div>
                  <p style={{ fontWeight: 700, marginBottom: 2, color: earned ? "var(--text)" : "var(--text-muted)" }}>{a.title}</p>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{a.desc}</p>
                  {earned && <span className="nex-badge badge-emerald" style={{ fontSize: "0.6rem", marginTop: 4 }}>✓ {t("Unlocked","আনলক")}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
