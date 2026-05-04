"use client";
import { useState } from "react";
import { useLang, useXP } from "@/lib/store";
import { CERT_QUESTIONS } from "@/lib/platform-data";
import { CheckCircle, XCircle, Award } from "lucide-react";

type Level = "beginner" | "intermediate" | "advanced";

export default function CertificationsPage() {
  const { t } = useLang();
  const { addXP } = useXP();
  const [level, setLevel] = useState<Level>("beginner");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [xpAwarded, setXpAwarded] = useState(false);

  const questions = CERT_QUESTIONS[level];
  const q = questions[current];

  const answer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.ans) setScore(s => s + 1);
  };

  const next = () => {
    if (current + 1 >= questions.length) {
      setDone(true);
      if (!xpAwarded) {
        const xpReward = level === "beginner" ? 200 : level === "intermediate" ? 400 : 800;
        addXP(Math.round((score + (selected === q.ans ? 1 : 0)) / questions.length * xpReward));
        setXpAwarded(true);
      }
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
    }
  };

  const reset = () => { setCurrent(0); setSelected(null); setScore(0); setDone(false); setXpAwarded(false); };

  const LEVELS: Level[] = ["beginner", "intermediate", "advanced"];
  const lc = level === "beginner" ? "var(--emerald)" : level === "intermediate" ? "var(--amber)" : "var(--rose)";

  return (
    <div className="nex-section">
      <div className="nex-container" style={{ maxWidth: 700 }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span className="nex-badge badge-violet" style={{ marginBottom: 16, display: "inline-block" }}>
            🎓 {t("Certification Quiz","সার্টিফিকেশন কুইজ")}
          </span>
          <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", marginBottom: 12 }}>
            {t("Test Your Knowledge","আপনার জ্ঞান পরীক্ষা করুন")}
          </h1>
        </div>

        {/* Level selector */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: "2rem" }}>
          {LEVELS.map(l => (
            <button key={l} onClick={() => { setLevel(l); reset(); }}
              className={`nex-tab ${level === l ? "active" : ""}`}>
              {t(l.charAt(0).toUpperCase() + l.slice(1), l === "beginner" ? "শিক্ষানবিশ" : l === "intermediate" ? "মধ্যবর্তী" : "উন্নত")}
            </button>
          ))}
        </div>

        {!done ? (
          <div className="nex-card">
            {/* Progress */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                {t("Question","প্রশ্ন")} {current + 1} / {questions.length}
              </span>
              <span style={{ fontSize: "0.8rem", color: "var(--cyan)", fontFamily: "Orbitron,monospace" }}>
                {score} {t("correct","সঠিক")}
              </span>
            </div>
            <div className="progress-bar" style={{ marginBottom: 24 }}>
              <div className="progress-fill" style={{ width: `${(current / questions.length) * 100}%` }}/>
            </div>

            <h3 style={{ fontSize: "1.1rem", lineHeight: 1.6, marginBottom: 24 }}>{q.q}</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {q.opts.map((opt, i) => {
                let bg = "var(--bg-elevated)";
                let border = "var(--border)";
                let color = "var(--text)";
                if (selected !== null) {
                  if (i === q.ans) { bg = "rgba(16,185,129,0.15)"; border = "var(--emerald)"; color = "var(--emerald)"; }
                  else if (i === selected && selected !== q.ans) { bg = "rgba(255,77,109,0.15)"; border = "var(--rose)"; color = "var(--rose)"; }
                }
                return (
                  <button key={i} onClick={() => answer(i)} style={{
                    padding: "14px 18px", background: bg,
                    border: `1px solid ${border}`, borderRadius: 10,
                    color, fontSize: "0.9rem", textAlign: "left", cursor: selected !== null ? "default" : "pointer",
                    display: "flex", alignItems: "center", gap: 10, transition: "all 200ms"
                  }}>
                    {selected !== null && i === q.ans && <CheckCircle size={16} color="var(--emerald)"/>}
                    {selected !== null && i === selected && selected !== q.ans && <XCircle size={16} color="var(--rose)"/>}
                    {(selected === null || (i !== q.ans && i !== selected)) && (
                      <span style={{ width: 24, height: 24, borderRadius: "50%", border: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", flexShrink: 0 }}>
                        {["A","B","C","D"][i]}
                      </span>
                    )}
                    {opt}
                  </button>
                );
              })}
            </div>

            {selected !== null && (
              <button onClick={next} className="nex-btn-primary" style={{ marginTop: 20, width: "100%", justifyContent: "center" }}>
                {current + 1 >= questions.length ? t("See Results","ফলাফল দেখুন") : t("Next Question","পরের প্রশ্ন")}
              </button>
            )}
          </div>
        ) : (
          <div className="nex-card" style={{ textAlign: "center" }}>
            <Award size={64} color={lc} style={{ margin: "0 auto 20px" }}/>
            <h2 style={{ marginBottom: 8 }}>{t("Quiz Complete!","কুইজ সম্পন্ন!")}</h2>
            <div style={{ fontSize: "4rem", fontWeight: 900, color: lc, fontFamily: "Orbitron,monospace", marginBottom: 8 }}>
              {score}/{questions.length}
            </div>
            <p style={{ color: "var(--text-muted)", marginBottom: 24 }}>
              {score === questions.length ? t("Perfect score! 🎉","নিখুঁত স্কোর! 🎉") :
               score >= questions.length * 0.8 ? t("Excellent work! ⚡","চমৎকার! ⚡") :
               score >= questions.length * 0.6 ? t("Good job! Keep learning.","ভালো! শিখতে থাকুন।") :
               t("Keep practicing — you'll get there!","অনুশীলন চালিয়ে যান!")}
            </p>
            <button onClick={reset} className="nex-btn-primary">
              {t("Try Again","আবার চেষ্টা করুন")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
