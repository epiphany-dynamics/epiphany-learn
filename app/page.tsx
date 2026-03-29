import Link from "next/link";
import Image from "next/image";
import { getAllModules } from "@/lib/content";
import { getModuleColor } from "@/lib/module-colors";
// Module cover images are now generated PNGs at /images/generated/module-{N}-cover.png

const KAHOOT_SHAPES = ["▲", "◆", "●", "■", "★", "⬟"];

const MODULE_EMOJIS = ["🧠", "💬", "🛠️", "🛡️", "🛒", "🚀"];

/* Inline SVG illustrations for the How-It-Works section */
function PickModuleIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Card stack */}
      <rect x="50" y="45" width="100" height="120" rx="16" fill="rgba(19,104,206,0.25)" stroke="rgba(19,104,206,0.5)" strokeWidth="2" />
      <rect x="60" y="35" width="100" height="120" rx="16" fill="rgba(19,104,206,0.35)" stroke="rgba(19,104,206,0.6)" strokeWidth="2" />
      <rect x="70" y="25" width="100" height="120" rx="16" fill="rgba(19,104,206,0.5)" stroke="rgba(19,104,206,0.8)" strokeWidth="2.5" />
      {/* Card content on top card */}
      <rect x="82" y="42" width="56" height="6" rx="3" fill="rgba(255,255,255,0.6)" />
      <rect x="82" y="56" width="40" height="4" rx="2" fill="rgba(255,255,255,0.3)" />
      <rect x="82" y="66" width="48" height="4" rx="2" fill="rgba(255,255,255,0.3)" />
      {/* Star on card */}
      <path d="M120 88 L123 95 L131 96 L125 102 L127 110 L120 106 L113 110 L115 102 L109 96 L117 95 Z" fill="#FFD166" opacity="0.8" />
      {/* Cursor pointer */}
      <path d="M140 120 L148 135 L142 136 L146 148 L140 150 L136 138 L130 142 Z" fill="white" opacity="0.8" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
      {/* Floating sparkles */}
      <circle cx="40" cy="60" r="4" fill="#1368CE" opacity="0.4" />
      <circle cx="175" cy="45" r="3" fill="#FFA602" opacity="0.5" />
      <circle cx="30" cy="130" r="5" fill="#00C9B7" opacity="0.3" />
      <path d="M160 75 L162 70 L164 75 L169 77 L164 79 L162 84 L160 79 L155 77 Z" fill="rgba(255,255,255,0.5)" />
    </svg>
  );
}

function LearnByDoingIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Brain with gears */}
      <ellipse cx="100" cy="85" rx="45" ry="48" fill="rgba(226,27,60,0.2)" stroke="rgba(226,27,60,0.5)" strokeWidth="2.5" />
      {/* Brain fold lines */}
      <path d="M75 65 C85 58, 100 62, 95 78" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M80 85 C92 78, 110 82, 105 95" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M95 62 C108 68, 118 80, 112 92" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Lightning bolt */}
      <path d="M115 30 L105 58 L118 55 L106 82" stroke="#FFD166" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Puzzle piece floating */}
      <path d="M148 60 L165 60 L165 70 C160 67 155 73 165 76 L165 85 L148 85 L148 76 C153 73 148 67 148 70 Z" fill="rgba(226,27,60,0.4)" stroke="rgba(226,27,60,0.6)" strokeWidth="1.5" />
      {/* Checkmarks */}
      <path d="M40 130 L46 136 L56 124" stroke="#26890C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M70 142 L76 148 L86 136" stroke="#26890C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      <path d="M100 154 L106 160 L116 148" stroke="#26890C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      {/* Sparkles */}
      <circle cx="35" cy="50" r="4" fill="#E21B3C" opacity="0.3" />
      <circle cx="170" cy="100" r="5" fill="#FFA602" opacity="0.3" />
      <path d="M155 130 L157 124 L159 130 L165 132 L159 134 L157 140 L155 134 L149 132 Z" fill="rgba(255,255,255,0.5)" />
    </svg>
  );
}

function EarnXPIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Trophy */}
      <path d="M70 55 L70 100 C70 120 85 135 100 140 C115 135 130 120 130 100 L130 55 Z" fill="rgba(255,166,2,0.25)" stroke="rgba(255,166,2,0.6)" strokeWidth="2.5" />
      {/* Trophy handles */}
      <path d="M70 65 C50 65 45 85 60 95" stroke="rgba(255,166,2,0.5)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M130 65 C150 65 155 85 140 95" stroke="rgba(255,166,2,0.5)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Trophy base */}
      <rect x="85" y="140" width="30" height="8" rx="2" fill="rgba(255,166,2,0.3)" stroke="rgba(255,166,2,0.5)" strokeWidth="1.5" />
      <rect x="78" y="148" width="44" height="8" rx="3" fill="rgba(255,166,2,0.25)" stroke="rgba(255,166,2,0.45)" strokeWidth="1.5" />
      {/* Star on trophy */}
      <path d="M100 75 L104 85 L115 86 L107 94 L109 105 L100 100 L91 105 L93 94 L85 86 L96 85 Z" fill="#FFD166" opacity="0.8" />
      {/* XP floating text */}
      <text x="40" y="50" fontSize="20" fontWeight="bold" fill="#FFA602" opacity="0.7">+XP</text>
      <text x="135" y="45" fontSize="16" fontWeight="bold" fill="#FFA602" opacity="0.5">+XP</text>
      {/* Badge icons around */}
      <circle cx="35" cy="90" r="14" fill="rgba(255,62,165,0.2)" stroke="rgba(255,62,165,0.4)" strokeWidth="1.5" />
      <text x="35" y="95" textAnchor="middle" fontSize="14">🏅</text>
      <circle cx="165" cy="80" r="14" fill="rgba(0,201,183,0.2)" stroke="rgba(0,201,183,0.4)" strokeWidth="1.5" />
      <text x="165" y="85" textAnchor="middle" fontSize="14">⭐</text>
      {/* Sparkle confetti */}
      <circle cx="50" cy="130" r="3" fill="#E21B3C" opacity="0.4" />
      <circle cx="155" cy="140" r="4" fill="#1368CE" opacity="0.4" />
      <circle cx="30" cy="160" r="3" fill="#26890C" opacity="0.3" />
      <path d="M170 120 L172 115 L174 120 L179 122 L174 124 L172 129 L170 124 L165 122 Z" fill="rgba(255,255,255,0.5)" />
    </svg>
  );
}

/* Lesson preview mockup SVG */
function LessonPreviewIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Browser window frame */}
      <rect x="10" y="10" width="380" height="260" rx="12" fill="rgba(10,10,10,0.9)" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
      {/* Title bar */}
      <rect x="10" y="10" width="380" height="32" rx="12" fill="rgba(255,255,255,0.05)" />
      <rect x="10" y="30" width="380" height="12" fill="rgba(255,255,255,0.05)" />
      {/* Traffic lights */}
      <circle cx="28" cy="26" r="5" fill="#E21B3C" opacity="0.8" />
      <circle cx="44" cy="26" r="5" fill="#FFA602" opacity="0.8" />
      <circle cx="60" cy="26" r="5" fill="#26890C" opacity="0.8" />
      {/* Progress bar at top */}
      <rect x="10" y="42" width="380" height="4" fill="rgba(255,255,255,0.05)" />
      <rect x="10" y="42" width="190" height="4" fill="#1368CE" rx="0" />
      {/* Content area - lesson text */}
      <rect x="30" y="62" width="180" height="10" rx="4" fill="rgba(255,255,255,0.15)" />
      <rect x="30" y="80" width="140" height="6" rx="3" fill="rgba(255,255,255,0.08)" />
      <rect x="30" y="92" width="160" height="6" rx="3" fill="rgba(255,255,255,0.08)" />
      <rect x="30" y="104" width="120" height="6" rx="3" fill="rgba(255,255,255,0.08)" />
      {/* Quiz card */}
      <rect x="30" y="124" width="340" height="130" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <rect x="50" y="138" width="200" height="8" rx="3" fill="rgba(255,166,2,0.3)" />
      {/* Quiz options - Kahoot style */}
      <rect x="50" y="158" width="148" height="32" rx="8" fill="#E21B3C" opacity="0.7" />
      <text x="68" y="179" fontSize="12" fill="white" opacity="0.9">▲ Option A</text>
      <rect x="206" y="158" width="148" height="32" rx="8" fill="#1368CE" opacity="0.7" />
      <text x="224" y="179" fontSize="12" fill="white" opacity="0.9">◆ Option B</text>
      <rect x="50" y="198" width="148" height="32" rx="8" fill="#26890C" opacity="0.7" />
      <text x="68" y="219" fontSize="12" fill="white" opacity="0.9">● Option C</text>
      <rect x="206" y="198" width="148" height="32" rx="8" fill="#FFA602" opacity="0.7" />
      <text x="224" y="219" fontSize="12" fill="white" opacity="0.9">■ Option D</text>
      {/* XP indicator */}
      <rect x="300" y="62" width="70" height="24" rx="12" fill="rgba(255,166,2,0.15)" stroke="rgba(255,166,2,0.3)" strokeWidth="1" />
      <text x="318" y="78" fontSize="10" fill="#FFA602" fontWeight="bold">⭐ 150 XP</text>
    </svg>
  );
}

export default function HomePage() {
  const modules = getAllModules();
  const totalMinutes = modules.reduce((acc, m) => acc + m.estimatedMinutes, 0);

  return (
    <main className="min-h-screen bg-[var(--bg-page)]">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-animated-bg" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(19,104,206,0.25) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(0,201,183,0.2) 0%, transparent 50%)",
          }}
        />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />

        {/* Animated floating Kahoot shapes in background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {["▲", "◆", "●", "■", "★", "⬟", "▲", "◆", "●", "■"].map((shape, i) => (
            <div
              key={i}
              className="absolute animate-float font-bold select-none"
              style={{
                fontSize: `${24 + (i % 5) * 14}px`,
                color: ["#E21B3C", "#1368CE", "#26890C", "#FFA602", "#FF3EA5", "#00C9B7", "#EB670F", "#FFD166", "#E21B3C", "#1368CE"][i],
                opacity: 0.1 + (i % 4) * 0.04,
                top: `${5 + (i * 9) % 85}%`,
                left: `${2 + (i * 11) % 92}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + (i % 4)}s`,
              }}
            >
              {shape}
            </div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-32">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Left text */}
            <div className="flex-1 text-center md:text-left">
              {/* Animated badge */}
              <div
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold mb-6 animate-fade-in-down"
                style={{
                  background: "linear-gradient(135deg, rgba(19,104,206,0.2), rgba(0,201,183,0.15))",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#00C9B7",
                }}
              >
                <span className="text-lg animate-bounce-in" style={{ animationDelay: "0.3s" }}>🎮</span>
                <span>Learn like it&apos;s a game</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-[var(--text-primary)] leading-[1.05] tracking-tight">
                <span className="block animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                  Learn AI
                </span>
                <span className="inline-block animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
                  without{" "}
                </span>
                <span
                  className="inline-block animate-fade-in-up text-gradient-brand"
                  style={{ animationDelay: "0.4s" }}
                >
                  the hype
                </span>
              </h1>

              <p
                className="text-lg md:text-xl text-[var(--text-secondary)] mb-8 max-w-lg animate-fade-in-up"
                style={{ animationDelay: "0.55s" }}
              >
                {totalMinutes} minutes of free, straight-talk AI education. Quizzes, challenges, XP — built for regular people.
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in-up"
                style={{ animationDelay: "0.7s" }}
              >
                <Link
                  href="/modules/module-1"
                  className="group inline-flex items-center justify-center font-display font-bold px-8 py-4 rounded-2xl text-lg transition-all duration-200 hover:scale-105 active:scale-95 relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #E21B3C 0%, #FF4757 100%)",
                    color: "#fff",
                    boxShadow: "0 6px 30px rgba(226,27,60,0.4)",
                  }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                  <span className="relative flex items-center gap-2">
                    <span className="text-xl">▶</span> Start Learning Free
                  </span>
                </Link>
                <Link
                  href="#modules"
                  className="inline-flex items-center justify-center font-display font-semibold px-8 py-4 rounded-2xl text-lg transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "var(--text-primary)",
                    border: "2px solid rgba(255,255,255,0.15)",
                  }}
                >
                  See What&apos;s Inside ↓
                </Link>
              </div>

              <p
                className="mt-5 text-[var(--text-muted)] text-sm animate-fade-in flex items-center gap-2 justify-center md:justify-start"
                style={{ animationDelay: "0.9s" }}
              >
                <span style={{ color: "#26890C" }}>✓</span> No signup
                <span style={{ color: "#26890C" }}>✓</span> No credit card
                <span style={{ color: "#26890C" }}>✓</span> Progress saves automatically
              </p>
            </div>

            {/* Right illustration — NBP2 generated hero image */}
            <div className="flex-shrink-0 w-80 h-72 md:w-[480px] md:h-[420px] animate-fade-in-up relative" style={{ animationDelay: "0.3s" }}>
              {/* Glow backdrop behind image */}
              <div className="absolute inset-0 rounded-full opacity-30" style={{ background: "radial-gradient(circle, rgba(19,104,206,0.4) 0%, rgba(0,201,183,0.2) 40%, transparent 70%)", filter: "blur(40px)" }} />
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <Image src="/images/generated/hero-landing.png" alt="Learn AI with Epiphany" width={960} height={540} className="rounded-2xl drop-shadow-2xl" priority style={{ filter: "drop-shadow(0 0 40px rgba(19,104,206,0.3))" }} />
              </div>
              {/* Orbiting shapes around image */}
              <div className="absolute w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold animate-orbit-slow" style={{ background: "rgba(226,27,60,0.3)", color: "#E21B3C", top: "5%", left: "5%" }}>▲</div>
              <div className="absolute w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold animate-orbit-slow" style={{ background: "rgba(19,104,206,0.3)", color: "#1368CE", bottom: "15%", right: "0%", animationDelay: "2s" }}>◆</div>
              <div className="absolute w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold animate-orbit-slow" style={{ background: "rgba(255,166,2,0.3)", color: "#FFA602", top: "60%", left: "-5%", animationDelay: "4s" }}>★</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ANIMATED WAVE DIVIDER ============ */}
      <div className="relative h-16 -mt-1">
        <svg viewBox="0 0 1440 60" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
          <path d="M0 30 C360 0 720 60 1080 30 C1260 15 1380 45 1440 30 L1440 60 L0 60 Z" fill="#E21B3C" opacity="0.08" />
          <path d="M0 35 C360 10 720 55 1080 35 C1260 22 1380 48 1440 35 L1440 60 L0 60 Z" fill="#1368CE" opacity="0.06" />
        </svg>
      </div>

      {/* ============ FUN STATS BAR ============ */}
      <section className="relative" style={{ background: "linear-gradient(90deg, #E21B3C, #1368CE, #26890C, #FFA602)", padding: "3px 0" }}>
        <div style={{ background: "var(--bg-page)" }}>
          <div className="max-w-5xl mx-auto px-6 py-10">
            <div className="grid grid-cols-3 gap-8 text-center">
              {[
                { value: modules.length, label: "Modules", icon: (
                  <svg viewBox="0 0 48 48" className="w-12 h-12 mx-auto mb-2" fill="none">
                    <rect x="6" y="8" width="16" height="20" rx="3" fill="#1368CE" opacity="0.6" />
                    <rect x="14" y="4" width="16" height="20" rx="3" fill="#1368CE" opacity="0.8" />
                    <rect x="22" y="0" width="16" height="20" rx="3" fill="#1368CE" />
                    <rect x="24" y="4" width="10" height="2" rx="1" fill="white" opacity="0.6" />
                    <rect x="24" y="8" width="7" height="2" rx="1" fill="white" opacity="0.4" />
                    <circle cx="24" cy="36" r="10" fill="rgba(19,104,206,0.15)" stroke="#1368CE" strokeWidth="1.5" opacity="0.5" />
                  </svg>
                ), color: "#1368CE" },
                { value: `${totalMinutes}+`, label: "Minutes of Fun", icon: (
                  <svg viewBox="0 0 48 48" className="w-12 h-12 mx-auto mb-2" fill="none">
                    <circle cx="24" cy="24" r="18" fill="rgba(255,166,2,0.15)" stroke="#FFA602" strokeWidth="2" />
                    <circle cx="24" cy="24" r="14" fill="rgba(255,166,2,0.1)" />
                    <line x1="24" y1="14" x2="24" y2="24" stroke="#FFA602" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="24" y1="24" x2="32" y2="28" stroke="#FFA602" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="24" cy="24" r="2.5" fill="#FFA602" />
                    {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => (
                      <line key={i} x1={24 + 16 * Math.cos(i * 30 * Math.PI / 180)} y1={24 + 16 * Math.sin(i * 30 * Math.PI / 180)} x2={24 + 18 * Math.cos(i * 30 * Math.PI / 180)} y2={24 + 18 * Math.sin(i * 30 * Math.PI / 180)} stroke="#FFA602" strokeWidth="1.5" opacity="0.5" />
                    ))}
                  </svg>
                ), color: "#FFA602" },
                { value: "100%", label: "Free Forever", icon: (
                  <svg viewBox="0 0 48 48" className="w-12 h-12 mx-auto mb-2" fill="none">
                    <path d="M24 4 L28 18 L42 18 L30 26 L34 40 L24 32 L14 40 L18 26 L6 18 L20 18 Z" fill="rgba(38,137,12,0.2)" stroke="#26890C" strokeWidth="2" />
                    <path d="M24 10 L27 20 L37 20 L29 26 L32 36 L24 30 L16 36 L19 26 L11 20 L21 20 Z" fill="rgba(38,137,12,0.3)" />
                    <path d="M18 22 L22 26 L30 18" stroke="#4CD929" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ), color: "#26890C" },
              ].map((stat, i) => (
                <div key={stat.label} className="animate-fade-in-up" style={{ animationDelay: `${0.2 + i * 0.15}s` }}>
                  {stat.icon}
                  <div className="text-3xl md:text-4xl font-display font-bold" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-[var(--text-muted)] mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FLOATING SHAPES DIVIDER ============ */}
      <div className="relative h-24 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center gap-8 pointer-events-none">
          {["▲", "◆", "●", "■", "★"].map((shape, i) => (
            <div
              key={i}
              className="animate-float text-3xl md:text-4xl font-bold select-none"
              style={{
                color: ["#E21B3C", "#1368CE", "#26890C", "#FFA602", "#FF3EA5"][i],
                opacity: 0.15,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${3 + i * 0.5}s`,
              }}
            >
              {shape}
            </div>
          ))}
        </div>
      </div>

      {/* ============ MODULE GRID — Kahoot-Style Illustrated Cards ============ */}
      <section id="modules" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-[var(--text-primary)] mb-3">
            Pick your adventure <span className="inline-block animate-bounce-in" style={{ animationDelay: "0.2s" }}>🎯</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
            Each module is a standalone mission. Earn XP, unlock badges, and actually understand AI.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod, index) => {
            const color = getModuleColor(mod.id);
            // Generated cover images at /images/generated/module-{N}-cover.png
            return (
              <Link
                key={mod.id}
                href={`/modules/${mod.id}`}
                className="group relative flex flex-col rounded-2xl transition-all duration-300 hover:scale-[1.04] hover:-translate-y-2 active:scale-[0.97] animate-fade-in-up overflow-hidden"
                style={{
                  background: color.hex,
                  boxShadow: `0 8px 32px ${color.glow}`,
                  animationDelay: `${0.1 + index * 0.1}s`,
                }}
              >
                {/* Illustration area — top of card — LARGER */}
                <div className="relative h-44 overflow-hidden flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.15)" }}>
                  {/* Animated glow behind illustration */}
                  <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at center, ${color.hex}, transparent 70%)` }} />
                  {/* Module cover image */}
                  <Image
                    src={`/images/generated/module-${mod.id.replace("module-", "")}-cover.png`}
                    alt={mod.title}
                    width={384}
                    height={216}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 relative z-10"
                  />
                  {/* Animated floating mini shapes inside card */}
                  <div className="absolute top-3 left-4 text-lg animate-float opacity-[0.12] font-bold" style={{ animationDelay: "0s", animationDuration: "3s" }}>
                    {KAHOOT_SHAPES[(index * 2) % KAHOOT_SHAPES.length]}
                  </div>
                  <div className="absolute bottom-4 right-5 text-xl animate-float opacity-[0.1] font-bold" style={{ animationDelay: "1.5s", animationDuration: "4s" }}>
                    {KAHOOT_SHAPES[(index * 2 + 1) % KAHOOT_SHAPES.length]}
                  </div>
                  {/* Shape watermark behind illustration */}
                  <div
                    className="absolute -bottom-2 -right-2 text-[100px] leading-none font-bold pointer-events-none select-none opacity-[0.06]"
                  >
                    {KAHOOT_SHAPES[index % KAHOOT_SHAPES.length]}
                  </div>
                  {/* Module number circle */}
                  <div
                    className="absolute top-3 left-3 w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-base"
                    style={{ background: "rgba(0,0,0,0.4)", color: "#fff", backdropFilter: "blur(4px)" }}
                  >
                    {index + 1}
                  </div>
                  {/* Emoji badge */}
                  <div className="absolute top-3 right-3 text-2xl group-hover:animate-bounce-in">
                    {MODULE_EMOJIS[index]}
                  </div>
                </div>

                {/* Content area */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Shimmer overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <h3 className="relative text-lg font-display font-bold text-white mb-1.5">
                    {mod.title}
                  </h3>
                  <p className="relative text-white/75 text-sm mb-4 flex-1 leading-relaxed">
                    {mod.subtitle}
                  </p>

                  {/* Footer with pills and arrow */}
                  <div className="relative flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.3)", color: "#fff" }}>
                      ⏱ {mod.estimatedMinutes} min
                    </span>
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>
                      ⭐ {mod.xpReward} XP
                    </span>
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}>
                      {mod.lessons?.length ?? 0} lessons
                    </span>
                    <span className="ml-auto text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 text-xl font-bold">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ============ ANIMATED SHAPES TRANSITION ============ */}
      <div className="relative h-20 overflow-hidden">
        <svg viewBox="0 0 1440 80" className="absolute w-full h-full" preserveAspectRatio="none">
          <path d="M0 40 Q360 80 720 40 Q1080 0 1440 40 L1440 80 L0 80 Z" fill="rgba(255,255,255,0.02)" />
          <path d="M0 50 Q360 20 720 50 Q1080 80 1440 50 L1440 80 L0 80 Z" fill="rgba(255,255,255,0.015)" />
        </svg>
      </div>

      {/* ============ HOW IT WORKS — Large Illustrated Steps ============ */}
      <section style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto px-6 py-24">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-[var(--text-primary)] mb-6 text-center">
            How it works <span className="inline-block">🎮</span>
          </h2>
          <p className="text-center text-[var(--text-secondary)] text-lg max-w-xl mx-auto mb-16">
            Three simple steps. No signup, no payments, no boring lectures.
          </p>

          {/* Step 1 — Image left, text right */}
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-20 animate-fade-in-up">
            <div className="flex-1 w-full max-w-sm md:max-w-none">
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl opacity-20" style={{ background: "radial-gradient(circle, rgba(19,104,206,0.4), transparent 70%)", filter: "blur(30px)" }} />
                <PickModuleIllustration className="w-full h-auto max-h-64 md:max-h-80 relative z-10" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-display font-bold text-white" style={{ background: "#1368CE", boxShadow: "0 4px 20px rgba(19,104,206,0.5)" }}>1</span>
                <div className="h-px w-8" style={{ background: "linear-gradient(90deg, #1368CE, transparent)" }} />
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-[var(--text-primary)] mb-3">Pick a module</h3>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-md">
                Each one covers a different AI topic — from fundamentals to real-world tools. No order required, jump in wherever looks fun.
              </p>
            </div>
          </div>

          {/* Step 2 — Text left, image right */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16 mb-20 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            <div className="flex-1 w-full max-w-sm md:max-w-none">
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl opacity-20" style={{ background: "radial-gradient(circle, rgba(226,27,60,0.4), transparent 70%)", filter: "blur(30px)" }} />
                <LearnByDoingIllustration className="w-full h-auto max-h-64 md:max-h-80 relative z-10" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-display font-bold text-white" style={{ background: "#E21B3C", boxShadow: "0 4px 20px rgba(226,27,60,0.5)" }}>2</span>
                <div className="h-px w-8" style={{ background: "linear-gradient(90deg, #E21B3C, transparent)" }} />
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-[var(--text-primary)] mb-3">Learn by doing</h3>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-md">
                Quizzes, reveal cards, and interactive challenges keep it engaging. No walls of text — just hands-on learning that actually sticks.
              </p>
            </div>
          </div>

          {/* Step 3 — Image left, text right */}
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex-1 w-full max-w-sm md:max-w-none">
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl opacity-20" style={{ background: "radial-gradient(circle, rgba(255,166,2,0.4), transparent 70%)", filter: "blur(30px)" }} />
                <EarnXPIllustration className="w-full h-auto max-h-64 md:max-h-80 relative z-10" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-display font-bold text-white" style={{ background: "#FFA602", boxShadow: "0 4px 20px rgba(255,166,2,0.5)" }}>3</span>
                <div className="h-px w-8" style={{ background: "linear-gradient(90deg, #FFA602, transparent)" }} />
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-[var(--text-primary)] mb-3">Earn XP & badges</h3>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-md">
                Track your progress, collect achievements, and level up as you go. Every correct answer and completed lesson earns you XP.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ANIMATED SPARKLE DIVIDER ============ */}
      <div className="relative h-16 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex gap-6 items-center">
            {[0,1,2,3,4].map(i => (
              <div key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.3}s` }}>
                <svg viewBox="0 0 20 20" className="w-4 h-4" fill={["#E21B3C", "#1368CE", "#26890C", "#FFA602", "#FF3EA5"][i]} opacity="0.3">
                  <path d="M10 0 L12 7 L20 10 L12 13 L10 20 L8 13 L0 10 L8 7 Z" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============ LESSON PREVIEW — Animated Mockup ============ */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Text left */}
          <div className="flex-1 text-center md:text-left">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold mb-5"
              style={{ background: "rgba(0,201,183,0.12)", border: "1px solid rgba(0,201,183,0.25)", color: "#00C9B7" }}
            >
              <span className="text-lg">👀</span>
              <span>Sneak peek</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--text-primary)] mb-4">
              See what lessons look like
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-md mb-6">
              Interactive quizzes with Kahoot-style answer blocks, progress tracking, XP rewards, and zero boring lectures. Every lesson is designed to be fun.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {[
                { label: "Kahoot-style quizzes", color: "#E21B3C" },
                { label: "Earn XP", color: "#FFA602" },
                { label: "Track progress", color: "#1368CE" },
                { label: "Unlock badges", color: "#26890C" },
              ].map(tag => (
                <span key={tag.label} className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: `${tag.color}18`, color: tag.color, border: `1px solid ${tag.color}30` }}>
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
          {/* Mockup right */}
          <div className="flex-1 w-full max-w-lg relative">
            <div className="absolute inset-0 rounded-3xl opacity-20" style={{ background: "radial-gradient(circle, rgba(0,201,183,0.3), transparent 60%)", filter: "blur(40px)" }} />
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <LessonPreviewIllustration className="w-full h-auto" />
              {/* Pulsing "Live" indicator */}
              <div className="absolute top-5 right-16 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">Preview</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ QUIZ PREVIEW TEASER ============ */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--text-primary)] mb-3">
            Not your boring online course <span className="inline-block">😎</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg">Interactive quizzes make it stick. Here&apos;s a taste:</p>
        </div>

        {/* Fake quiz preview card — enhanced */}
        <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden relative" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          {/* Glowing accent at top */}
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #E21B3C, #1368CE, #26890C, #FFA602)" }} />
          <div className="p-6 pb-4 text-center">
            <p className="text-[var(--text-secondary)] text-sm font-bold mb-2 uppercase tracking-wider" style={{ color: "#FFA602" }}>Sample Question</p>
            <h3 className="text-xl md:text-2xl font-display font-bold text-[var(--text-primary)]">
              What does &quot;AI&quot; actually stand for?
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3 p-4">
            {[
              { shape: "▲", text: "Automated Internet", color: "#E21B3C" },
              { shape: "◆", text: "Artificial Intelligence", color: "#1368CE" },
              { shape: "●", text: "Advanced Integration", color: "#26890C" },
              { shape: "■", text: "Algorithmic Innovation", color: "#FFA602" },
            ].map((opt, i) => (
              <div
                key={opt.text}
                className="group/opt flex items-center gap-3 py-4 px-5 rounded-xl font-bold text-white transition-all duration-200 hover:scale-[1.04] hover:brightness-110 hover:-translate-y-0.5 cursor-pointer relative overflow-hidden animate-fade-in-up"
                style={{ background: opt.color, animationDelay: `${0.3 + i * 0.1}s` }}
              >
                {/* Shimmer on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-200%] group-hover/opt:translate-x-[200%] transition-transform duration-700" />
                <span className="text-xl opacity-70 relative">{opt.shape}</span>
                <span className="text-sm md:text-base relative">{opt.text}</span>
              </div>
            ))}
          </div>
          <div className="px-6 pb-5 pt-2 text-center">
            <p className="text-[var(--text-muted)] text-sm">
              Every module has quizzes like this. <span style={{ color: "#FFA602" }}>Earn XP for correct answers!</span>
            </p>
          </div>
        </div>
      </section>

      {/* ============ REWARDS SECTION ============ */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--text-primary)] mb-3">
            Learn more, earn more <span className="inline-block">🎁</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            Every module you complete unlocks a free downloadable cheat sheet. Finish all 7 and earn your AI Literate certificate.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {/* Cheat Sheets */}
          <div className="rounded-2xl p-6 text-center" style={{ background: "rgba(0,201,183,0.08)", border: "1px solid rgba(0,201,183,0.2)" }}>
            <div className="text-4xl mb-3">📖</div>
            <h3 className="font-display font-bold text-[var(--text-primary)] mb-2">7 Cheat Sheets</h3>
            <p className="text-sm text-[var(--text-muted)]">
              Jargon decoders, prompt libraries, safety checklists, and more — each one designed to actually be useful.
            </p>
          </div>

          {/* XP & Badges */}
          <div className="rounded-2xl p-6 text-center" style={{ background: "rgba(255,166,2,0.08)", border: "1px solid rgba(255,166,2,0.2)" }}>
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-display font-bold text-[var(--text-primary)] mb-2">XP & Badges</h3>
            <p className="text-sm text-[var(--text-muted)]">
              Earn points for every lesson, unlock badges for milestones, and track your streak on your personal dashboard.
            </p>
          </div>

          {/* Certificate */}
          <div className="rounded-2xl p-6 text-center" style={{ background: "rgba(226,27,60,0.08)", border: "1px solid rgba(226,27,60,0.2)" }}>
            <div className="text-4xl mb-3">🎓</div>
            <h3 className="font-display font-bold text-[var(--text-primary)] mb-2">AI Literate Certificate</h3>
            <p className="text-sm text-[var(--text-muted)]">
              Complete all 7 modules and download a shareable certificate with your name on it. Post it, print it, prove it.
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-[var(--text-faint)] text-sm">
            Everything is free. No signup required. No catch.
          </p>
        </div>
      </section>

      {/* ============ CTA FOOTER ============ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(19,104,206,0.1) 0%, rgba(226,27,60,0.08) 50%, rgba(255,166,2,0.1) 100%)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Large animated floating shapes in background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-6 left-8 text-6xl animate-float" style={{ color: "#E21B3C", opacity: 0.08, animationDelay: "0s", animationDuration: "5s" }}>▲</div>
          <div className="absolute bottom-8 right-12 text-7xl animate-float" style={{ color: "#1368CE", opacity: 0.06, animationDelay: "1s", animationDuration: "6s" }}>◆</div>
          <div className="absolute top-12 right-20 text-5xl animate-float" style={{ color: "#FFA602", opacity: 0.08, animationDelay: "2s", animationDuration: "4.5s" }}>■</div>
          <div className="absolute bottom-12 left-1/4 text-4xl animate-float" style={{ color: "#26890C", opacity: 0.07, animationDelay: "3s", animationDuration: "5.5s" }}>●</div>
          <div className="absolute top-1/2 right-1/3 text-5xl animate-float" style={{ color: "#FF3EA5", opacity: 0.06, animationDelay: "1.5s", animationDuration: "4s" }}>★</div>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          {/* Large rocket illustration */}
          <div className="w-24 h-24 mx-auto mb-6 animate-float" style={{ animationDuration: "4s" }}>
            <svg viewBox="0 0 96 96" className="w-full h-full" fill="none">
              <path d="M48 8 C48 8 64 24 64 48 L64 64 L32 64 L32 48 C32 24 48 8 48 8 Z" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
              <circle cx="48" cy="40" r="6" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
              <path d="M32 52 L20 68 L32 64 Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <path d="M64 52 L76 68 L64 64 Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <path d="M38 64 C38 64 42 80 40 84 C44 76 48 88 48 88 C48 88 52 76 56 84 C54 80 58 64 58 64" fill="#FFA602" opacity="0.6" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-[var(--text-primary)] mb-4">
            Ready to actually understand AI?
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 text-lg max-w-xl mx-auto">
            No signup. No credit card. Just start learning.
          </p>
          <Link
            href="/modules/module-1"
            className="group inline-flex items-center justify-center font-display font-bold px-10 py-5 rounded-2xl text-xl transition-all duration-200 hover:scale-105 active:scale-95 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #E21B3C 0%, #FF4757 100%)",
              color: "#fff",
              boxShadow: "0 6px 30px rgba(226,27,60,0.4)",
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            <span className="relative flex items-center gap-2">
              <span>▶</span> Start Module 1 — It&apos;s Free
            </span>
          </Link>
          <p className="mt-8 text-[var(--text-faint)] text-sm">
            Built by{" "}
            <a
              href="https://epiphanydynamics.ai"
              className="underline hover:text-[var(--text-secondary)] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Epiphany Dynamics
            </a>
            {" "}— AI education for everyone
          </p>
        </div>
      </section>
    </main>
  );
}
