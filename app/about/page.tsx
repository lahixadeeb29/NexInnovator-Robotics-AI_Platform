"use client";
import { useLang } from "@/lib/store";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  const { t } = useLang();
  return (
    <div className="nex-section">
      <div className="nex-container" style={{ maxWidth: 800 }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="nex-badge badge-cyan" style={{ marginBottom: 16, display: "inline-block" }}>🌍 {t("Our Mission","আমাদের লক্ষ্য")}</span>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", marginBottom: 20, lineHeight: 1.1 }}>
            {t("Robotics education","রোবোটিক্স শিক্ষা")}<br/>
            <span className="gradient-text">{t("for every student.","প্রতিটি শিক্ষার্থীর জন্য।")}</span>
          </h1>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.9, color: "var(--text-sub)", maxWidth: 600, margin: "0 auto" }}>
            {t(
              "NexInnovator was built with one belief: every student, regardless of country, income, or background, deserves access to world-class robotics education.",
              "NexInnovator একটি বিশ্বাস নিয়ে তৈরি: প্রতিটি শিক্ষার্থী, দেশ বা আয় নির্বিশেষে, বিশ্বমানের রোবোটিক্স শিক্ষার সুযোগ পাওয়ার যোগ্য।"
            )}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: "3rem" }}>
          {[
            { icon: "👨‍💻", name: "Abdur Rahman Lahi", role: t("Co-Founder & Lead Engineer","সহ-প্রতিষ্ঠাতা ও প্রধান প্রকৌশলী") },
            { icon: "🤖", name: "Kazi Mahir Adeeb", role: t("Co-Founder & AI Architect","সহ-প্রতিষ্ঠাতা ও AI আর্কিটেক্ট") },
          ].map((founder, i) => (
            <div key={i} className="nex-card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>{founder.icon}</div>
              <h3 style={{ marginBottom: 6 }}>{founder.name}</h3>
              <p style={{ color: "var(--cyan)", fontSize: "0.85rem" }}>{founder.role}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: "3rem" }}>
          {[
            { icon: "🎯", title: t("Mission","লক্ষ্য"), body: t("Free robotics education for every student on Earth.","পৃথিবীর প্রতিটি শিক্ষার্থীর জন্য বিনামূল্যে রোবোটিক্স শিক্ষা।") },
            { icon: "👁️", title: t("Vision","দৃষ্টিভঙ্গি"), body: t("A world where anyone can build intelligent machines.","একটি পৃথিবী যেখানে যে কেউ বুদ্ধিমান মেশিন তৈরি করতে পারে।") },
            { icon: "💎", title: t("Values","মূল্যবোধ"), body: t("Openness, accessibility, quality, and global impact.","উন্মুক্ততা, সহজলভ্যতা, গুণমান এবং বৈশ্বিক প্রভাব।") },
          ].map((item, i) => (
            <div key={i} className="nex-card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: 12 }}>{item.icon}</div>
              <h3 style={{ fontSize: "1rem", marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "var(--text-sub)" }}>{item.body}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link href="/learning-hub" className="nex-btn-primary" style={{ fontSize: "1rem", padding: "14px 36px" }}>
            {t("Start Learning Free","বিনামূল্যে শিখুন")} <ArrowRight size={18}/>
          </Link>
        </div>
      </div>
    </div>
  );
}
