"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang, useXP, xpToLevel } from "@/lib/store";
import { Menu, X, Zap, Globe } from "lucide-react";

const NAV = [
  { href: "/learning-hub", en: "Learning Hub", bn: "লার্নিং হাব" },
  { href: "/ai-assistant",  en: "NexBot AI",   bn: "নেক্সবট AI" },
  { href: "/projects",      en: "Projects",    bn: "প্রজেক্ট" },
  { href: "/dashboard",     en: "Dashboard",   bn: "ড্যাশবোর্ড" },
  { href: "/certifications",en: "Certs",       bn: "সার্টিফিকেট" },
  { href: "/about",         en: "About",       bn: "সম্পর্কে" },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggleLang, t } = useLang();
  const { xp } = useXP();
  const level = xpToLevel(xp);
  const pathname = usePathname();

  return (
    <>
      <header style={{
        position: "sticky", top: 0, zIndex: 1000,
        background: "rgba(5,13,26,0.85)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(26,45,74,0.6)",
      }}>
        <div className="nex-container" style={{ display: "flex", alignItems: "center", height: 64, gap: 16 }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg, var(--cyan), var(--violet))",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem"
            }}>🤖</div>
            <span style={{ fontFamily: "Orbitron, monospace", fontWeight: 900, fontSize: "1rem", color: "var(--text)" }}>
              Nex<span style={{ color: "var(--cyan)" }}>Innovator</span>
            </span>
          </Link>

          <nav style={{ display: "flex", gap: 4, flex: 1, justifyContent: "center" }} className="hidden-mobile">
            {NAV.map(item => (
              <Link key={item.href} href={item.href} style={{
                padding: "6px 14px", borderRadius: 8, textDecoration: "none",
                fontSize: "0.82rem", fontWeight: 500, transition: "all 150ms",
                color: pathname === item.href ? "var(--cyan)" : "var(--text-sub)",
                background: pathname === item.href ? "rgba(0,212,255,0.1)" : "transparent",
              }}>
                {lang === "en" ? item.en : item.bn}
              </Link>
            ))}
          </nav>

          <div style={{ display: "flex", gap: 8, alignItems: "center", marginLeft: "auto" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "5px 12px", background: "var(--bg-elevated)",
              border: "1px solid var(--border)", borderRadius: 9999, cursor: "default"
            }}>
              <Zap size={12} color="var(--amber)" />
              <span style={{ fontSize: "0.75rem", color: "var(--amber)", fontFamily: "Orbitron, monospace", fontWeight: 700 }}>
                Lv.{level}
              </span>
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{xp} XP</span>
            </div>

            <button onClick={toggleLang} style={{
              display: "flex", alignItems: "center", gap: 5,
              padding: "6px 12px", background: "transparent",
              border: "1px solid var(--border)", borderRadius: 8,
              color: "var(--text-sub)", fontSize: "0.78rem", cursor: "pointer",
              fontFamily: "Orbitron, monospace", fontWeight: 600, transition: "all 150ms",
            }}>
              <Globe size={12} /> {lang === "en" ? "বাংলা" : "EN"}
            </button>

            <button onClick={() => setMenuOpen(!menuOpen)} style={{
              background: "transparent", border: "none", color: "var(--text)",
              cursor: "pointer", padding: 4, display: "none"
            }} className="show-mobile">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div style={{
            padding: "1rem 1.5rem 1.5rem", display: "flex", flexDirection: "column", gap: 4,
            borderTop: "1px solid var(--border)", background: "rgba(5,13,26,0.97)"
          }}>
            {NAV.map(item => (
              <Link key={item.href} href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: "10px 14px", borderRadius: 8, textDecoration: "none",
                  fontSize: "0.9rem", color: pathname === item.href ? "var(--cyan)" : "var(--text-sub)",
                  background: pathname === item.href ? "rgba(0,212,255,0.1)" : "transparent",
                }}>
                {lang === "en" ? item.en : item.bn}
              </Link>
            ))}
          </div>
        )}
      </header>

      <main style={{ minHeight: "calc(100vh - 64px)" }}>
        {children}
      </main>

      <footer style={{
        borderTop: "1px solid var(--border)", padding: "2.5rem 0",
        background: "var(--bg-deep)"
      }}>
        <div className="nex-container" style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "1.2rem" }}>🤖</span>
            <div>
              <p style={{ fontFamily: "Orbitron, monospace", fontWeight: 800, fontSize: "0.9rem", color: "var(--text)" }}>
                Nex<span style={{ color: "var(--cyan)" }}>Innovator</span>
              </p>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                {t("Founded by Abdur Rahman Lahi & Kazi Mahir Adeeb", "প্রতিষ্ঠাতা: আবদুর রহমান লাহি ও কাজী মাহির আদিব")}
              </p>
            </div>
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            {t("Free robotics education for the world 🌍", "বিশ্বের জন্য বিনামূল্যে রোবোটিক্স শিক্ষা 🌍")}
          </p>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            © 2024 NexInnovator. MIT License.
          </p>
        </div>
      </footer>
    </>
  );
}
