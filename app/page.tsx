"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/store";
import { ROBOTS, PLATFORM_STATS, NEWS } from "@/lib/platform-data";
import { ArrowRight, Zap, ChevronRight } from "lucide-react";

function HeroRobot() {
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPulse(p => (p + 1) % 3), 700);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ position: "relative", width: 300, height: 380, margin: "0 auto" }} className="animate-float">
      <svg viewBox="0 0 300 380" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="glow-c" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0"/>
          </radialGradient>
          <filter id="glow-f"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <ellipse cx="150" cy="370" rx="70" ry="10" fill="url(#glow-c)"/>
        <rect x="70" y="310" width="160" height="50" rx="12" fill="#0f1e35" stroke="#ff4d6d" strokeWidth="1.5"/>
        {[90,120,180,210].map(x=>(
          <circle key={x} cx={x} cy="335" r="8" fill="#111f38" stroke="#ff4d6d" strokeWidth="1"/>
        ))}
        <rect x="80" y="175" width="140" height="130" rx="16" fill="#0a1628" stroke="#7c3aed" strokeWidth="1.5"/>
        <rect x="92" y="188" width="116" height="72" rx="10" fill="#060d16" stroke="#7c3aed" strokeWidth="1" opacity="0.7"/>
        <rect x="102" y="198" width="96" height="7" rx="3" fill="#111f38"/>
        <rect x="102" y="198" width={`${55 + pulse * 14}`} height="7" rx="3" fill="#00d4ff" style={{transition:"width 0.4s"}}/>
        <line x1="102" y1="218" x2="198" y2="218" stroke="#7c3aed" strokeWidth="0.5" opacity="0.5"/>
        <line x1="102" y1="228" x2="170" y2="228" stroke="#00d4ff" strokeWidth="0.5" opacity="0.5"/>
        <rect x="30" y="180" width="46" height="120" rx="12" fill="#111f38" stroke="#f0a500" strokeWidth="1.5"/>
        <circle cx="53" cy="200" r="6" fill="#f0a500" opacity={0.4 + pulse * 0.2}/>
        <rect x="224" y="180" width="46" height="120" rx="12" fill="#111f38" stroke="#f0a500" strokeWidth="1.5"/>
        <circle cx="247" cy="200" r="6" fill="#f0a500" opacity={0.4 + pulse * 0.2}/>
        <rect x="130" y="155" width="40" height="22" rx="8" fill="#0f1e35" stroke="#00d4ff" strokeWidth="1"/>
        <rect x="72" y="62" width="156" height="96" rx="20" fill="#0a1628" stroke="#00d4ff" strokeWidth="2" filter="url(#glow-f)"/>
        <rect x="92" y="86" width="42" height="26" rx="9" fill="#060d16" stroke="#00d4ff" strokeWidth="1.5"/>
        <rect x="166" y="86" width="42" height="26" rx="9" fill="#060d16" stroke="#00d4ff" strokeWidth="1.5"/>
        <circle cx="113" cy="99" r={8+(pulse===0?2:0)} fill="#00d4ff" opacity="0.9" style={{transition:"r 0.3s"}}/>
        <circle cx="187" cy="99" r={8+(pulse===0?2:0)} fill="#00d4ff" opacity="0.9" style={{transition:"r 0.3s"}}/>
        <circle cx="113" cy="99" r="4" fill="#fff" opacity="0.6"/>
        <circle cx="187" cy="99" r="4" fill="#fff" opacity="0.6"/>
        <line x1="150" y1="62" x2="150" y2="28" stroke="#00d4ff" strokeWidth="2"/>
        <circle cx="150" cy="20" r="8" fill="#060d16" stroke="#00d4ff" strokeWidth="2"/>
        <circle cx="150" cy="20" r="4" fill="#00d4ff" opacity={0.5+pulse*0.25}/>
        <rect x="112" y="126" width="76" height="13" rx="6" fill="#060d16" stroke="#00d4ff" strokeWidth="1"/>
        {[0,1,2,3].map(i=>(
          <rect key={i} x={118+i*17} y="129" width="10" height="6" rx="3"
            fill="#00d4ff" opacity={pulse===i%3?0.9:0.3}/>
        ))}
      </svg>
    </div>
  );
}

function OrbitRing({ size, duration, color, delay=0 }: {size:number;duration:number;color:string;delay?:number}) {
  return (
    <div style={{
      position:"absolute", top:"50%", left:"50%",
      width:size, height:size, marginTop:-size/2, marginLeft:-size/2,
      borderRadius:"50%", border:`1px solid ${color}`, opacity:0.25,
      animation:`spin-slow ${duration}s linear infinite`, animationDelay:`${delay}ms`,
    }}/>
  );
}

export default function HomePage() {
  const { t } = useLang();
  const featured = ROBOTS.slice(0, 6);

  return (
    <div>
      {/* HERO */}
      <section style={{
        position:"relative", minHeight:"92vh",
        display:"flex", alignItems:"center", overflow:"hidden", paddingTop:"2rem"
      }}>
        <div className="grid-bg" style={{position:"absolute", inset:0, opacity:0.6}}/>
        <div style={{position:"absolute",top:"10%",left:"5%",width:500,height:500,borderRadius:"50%",
          background:"radial-gradient(circle,rgba(0,212,255,0.08) 0%,transparent 70%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:"5%",right:"5%",width:400,height:400,borderRadius:"50%",
          background:"radial-gradient(circle,rgba(124,58,237,0.1) 0%,transparent 70%)",pointerEvents:"none"}}/>

        <div className="nex-container" style={{position:"relative",zIndex:1}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"center"}}>
            <div>
              <div style={{marginBottom:20}} className="animate-fade-up">
                <span className="nex-badge badge-cyan">
                  <Zap size={10}/> {t("Free • Global • Accessible","বিনামূল্যে • বৈশ্বিক • সহজলভ্য")}
                </span>
              </div>
              <h1 className="animate-fade-up delay-100" style={{fontSize:"clamp(2.5rem,5vw,4rem)",marginBottom:20,lineHeight:1.1}}>
                {t("Learn Robotics.","রোবোটিক্স শিখুন।")}<br/>
                <span className="gradient-text">{t("Build the Future.","ভবিষ্যৎ গড়ুন।")}</span>
              </h1>
              <p className="animate-fade-up delay-200" style={{fontSize:"1.1rem",lineHeight:1.8,marginBottom:32,maxWidth:480,color:"var(--text-sub)"}}>
                {t(
                  "From zero experience to AI robotics engineer. 25+ robot manuals, AI tutor, English & Bangla — free for everyone, anywhere.",
                  "শূন্য অভিজ্ঞতা থেকে AI রোবোটিক্স ইঞ্জিনিয়ার পর্যন্ত। ২৫+ ম্যানুয়াল, AI টিউটর — সবার জন্য বিনামূল্যে।"
                )}
              </p>
              <div className="animate-fade-up delay-300" style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:36}}>
                <Link href="/learning-hub" className="nex-btn-primary">
                  {t("Start for Free","বিনামূল্যে শুরু করুন")} <ArrowRight size={16}/>
                </Link>
                <Link href="/ai-assistant" className="nex-btn-outline">
                  🤖 {t("Try NexBot AI","নেক্সবট AI চেষ্টা করুন")}
                </Link>
              </div>
              <div className="animate-fade-up delay-400" style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                {PLATFORM_STATS.map(s=>(
                  <div key={s.label} style={{
                    display:"inline-flex",alignItems:"center",gap:8,
                    padding:"8px 16px",background:"var(--bg-elevated)",
                    border:"1px solid var(--border)",borderRadius:12
                  }}>
                    <span style={{fontWeight:800,color:"var(--cyan)",fontSize:"1rem"}}>{s.value}</span>
                    <span style={{color:"var(--text-muted)",fontSize:"0.8rem"}}>{t(s.label,s.labelBn)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-fade-up delay-300" style={{position:"relative",display:"flex",justifyContent:"center"}}>
              <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
                <OrbitRing size={360} duration={25} color="var(--cyan)"/>
                <OrbitRing size={460} duration={40} color="var(--violet)" delay={2000}/>
                <OrbitRing size={540} duration={60} color="var(--amber)" delay={4000}/>
              </div>
              <div style={{position:"relative",zIndex:1}}>
                <HeroRobot/>
              </div>
              <div style={{position:"absolute",top:"5%",left:"-8%",padding:"10px 16px",
                background:"rgba(10,22,40,0.9)",border:"1px solid var(--border)",borderRadius:12,
                backdropFilter:"blur(10px)",fontSize:"0.78rem"}}>
                <div style={{color:"var(--cyan)",fontWeight:700,marginBottom:2}}>🧠 AI Module</div>
                <div style={{color:"var(--text-muted)"}}>Claude API</div>
              </div>
              <div style={{position:"absolute",bottom:"12%",right:"-5%",padding:"10px 16px",
                background:"rgba(10,22,40,0.9)",border:"1px solid rgba(124,58,237,0.3)",borderRadius:12,
                backdropFilter:"blur(10px)",fontSize:"0.78rem"}}>
                <div style={{color:"#a78bfa",fontWeight:700,marginBottom:2}}>⚙️ ROS2</div>
                <div style={{color:"var(--text-muted)"}}>Node active</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED ROBOTS */}
      <section className="nex-section" style={{background:"var(--bg-deep)"}}>
        <div className="nex-container">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"2.5rem",flexWrap:"wrap",gap:16}}>
            <div>
              <span className="nex-badge badge-cyan" style={{marginBottom:12,display:"inline-block"}}>
                {t("Robot Manuals","রোবট ম্যানুয়াল")}
              </span>
              <h2 style={{fontSize:"clamp(1.8rem,4vw,2.8rem)"}}>
                {t("25+ Complete Guides.","২৫+ সম্পূর্ণ গাইড।")}{" "}
                <span className="gradient-text">{t("Full code included.","সম্পূর্ণ কোড সহ।")}</span>
              </h2>
            </div>
            <Link href="/learning-hub" className="nex-btn-ghost">
              {t("View all","সব দেখুন")} <ChevronRight size={14}/>
            </Link>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:18}}>
            {featured.map(robot=>{
              const lc = robot.level==="beginner"?"var(--emerald)":robot.level==="intermediate"?"var(--amber)":"var(--rose)";
              return (
                <Link key={robot.id} href={`/learning-hub/${robot.id}`} style={{textDecoration:"none"}}>
                  <div className="nex-card" style={{height:"100%",cursor:"pointer",display:"flex",flexDirection:"column"}}>
                    <div style={{display:"flex",gap:14,marginBottom:12}}>
                      <div style={{width:52,height:52,borderRadius:12,flexShrink:0,display:"flex",
                        alignItems:"center",justifyContent:"center",fontSize:"1.6rem",
                        background:`${lc}12`,border:`1px solid ${lc}25`}}>{robot.icon}</div>
                      <div>
                        <h3 style={{fontSize:"0.9rem",marginBottom:4,color:"var(--text)",lineHeight:1.3}}>{robot.name}</h3>
                        <span className={`nex-badge level-${robot.level}`} style={{fontSize:"0.62rem"}}>{robot.level}</span>
                      </div>
                    </div>
                    <p style={{fontSize:"0.8rem",lineHeight:1.7,color:"var(--text-muted)",flex:1,marginBottom:12}}>{robot.desc}</p>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:10,borderTop:"1px solid var(--border)"}}>
                      <div style={{display:"flex",gap:10}}>
                        <span style={{fontSize:"0.7rem",color:lc}}>💰 {robot.budget}</span>
                        <span style={{fontSize:"0.7rem",color:"var(--text-muted)"}}>⏱ {robot.time}</span>
                      </div>
                      <span style={{fontSize:"0.7rem",color:"var(--text-muted)",fontFamily:"Orbitron,monospace"}}>⚡ {robot.difficulty}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="nex-section">
        <div className="nex-container">
          <div style={{textAlign:"center",marginBottom:"3rem"}}>
            <h2 style={{fontSize:"clamp(1.8rem,4vw,2.8rem)",marginBottom:16}}>
              {t("Built different.","ভিন্নভাবে তৈরি।")}{" "}
              <span className="gradient-text">{t("For everyone.","সবার জন্য।")}</span>
            </h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:20}}>
            {[
              {icon:"🌍",title:t("Global Access","বৈশ্বিক অ্যাক্সেস"),body:t("Works on any device. Any connection.","যেকোনো ডিভাইসে কাজ করে।")},
              {icon:"🎓",title:t("100% Free","১০০% বিনামূল্যে"),body:t("No paywalls. Education is a right.","কোনো পেওয়াল নেই। শিক্ষা সবার অধিকার।")},
              {icon:"⚡",title:t("Learn by Doing","করে করে শিখুন"),body:t("Every lesson has a real project.","প্রতিটি পাঠে বাস্তব প্রজেক্ট।")},
              {icon:"🤖",title:t("AI-Powered Tutor","AI টিউটর"),body:t("NexBot AI answers in Bangla and English.","নেক্সবট AI বাংলা ও ইংরেজিতে উত্তর দেয়।")},
            ].map((card,i)=>(
              <div key={i} className="nex-card" style={{textAlign:"center"}}>
                <div style={{fontSize:"2rem",marginBottom:16}}>{card.icon}</div>
                <h3 style={{fontSize:"1rem",fontWeight:700,marginBottom:10}}>{card.title}</h3>
                <p style={{fontSize:"0.85rem",lineHeight:1.7,color:"var(--text-sub)"}}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="nex-section" style={{background:"var(--bg-deep)"}}>
        <div className="nex-container">
          <div style={{marginBottom:"2rem"}}>
            <span className="nex-badge badge-rose" style={{marginBottom:12,display:"inline-block"}}>
              {t("Robotics News","রোবোটিক্স সংবাদ")}
            </span>
            <h2 style={{fontSize:"clamp(1.5rem,3vw,2.2rem)"}}>
              {t("What's happening in robotics","রোবোটিক্সে কী ঘটছে")}
            </h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16}}>
            {NEWS.map((n,i)=>(
              <div key={i} className="nex-card">
                <span className="nex-badge badge-cyan" style={{marginBottom:12,display:"inline-block",fontSize:"0.6rem"}}>{n.tag}</span>
                <h3 style={{fontSize:"0.9rem",marginBottom:8,lineHeight:1.4}}>{n.title}</h3>
                <p style={{fontSize:"0.8rem",lineHeight:1.7,color:"var(--text-muted)"}}>{n.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:"5rem 0",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(0,212,255,0.06) 0%,rgba(124,58,237,0.08) 50%,rgba(255,77,109,0.06) 100%)"}}/>
        <div className="grid-bg" style={{position:"absolute",inset:0,opacity:0.4}}/>
        <div className="nex-container" style={{position:"relative",textAlign:"center"}}>
          <h2 style={{fontSize:"clamp(2rem,5vw,3.5rem)",marginBottom:20,lineHeight:1.1}}>
            {t("Ready to build the future?","ভবিষ্যৎ গড়তে প্রস্তুত?")}<br/>
            <span className="gradient-text">{t("Start today. It's free.","আজই শুরু করুন। বিনামূল্যে।")}</span>
          </h2>
          <p style={{fontSize:"1.1rem",marginBottom:36,color:"var(--text-sub)"}}>
            {t("Join thousands of students learning robotics worldwide.","বিশ্বজুড়ে হাজার হাজার শিক্ষার্থীর সাথে যোগ দিন।")}
          </p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="/learning-hub" className="nex-btn-primary" style={{fontSize:"1rem",padding:"14px 36px"}}>
              {t("Begin Your Journey","যাত্রা শুরু করুন")} <ArrowRight size={18}/>
            </Link>
            <Link href="/ai-assistant" className="nex-btn-outline" style={{fontSize:"1rem",padding:"14px 36px"}}>
              🤖 {t("Try NexBot AI","নেক্সবট AI ব্যবহার করুন")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
