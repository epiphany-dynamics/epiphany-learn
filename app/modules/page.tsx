import Link from "next/link";
import Image from "next/image";
import { getAllModules } from "@/lib/content";
import { getModuleColor } from "@/lib/module-colors";
// Module cover images are now generated PNGs at /images/generated/module-{N}-cover.png

const KAHOOT_SHAPES = ["▲", "◆", "●", "■", "★", "⬟"];
const MODULE_EMOJIS = ["🧠", "💬", "🛠️", "🛡️", "🛒", "🚀"];

export const metadata = {
  title: "Modules — Epiphany Learn",
};

export default function ModulesPage() {
  const modules = getAllModules();
  const totalLessons = modules.reduce((a, m) => a + m.lessons.length, 0);
  const totalMinutes = modules.reduce((a, m) => a + m.estimatedMinutes, 0);
  const totalXP = modules.reduce((a, m) => a + m.xpReward, 0);

  return (
    <main className="min-h-screen bg-[var(--bg-page)]">
      {/* ============ HERO BANNER — with large illustration ============ */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, rgba(19,104,206,0.15) 0%, rgba(0,201,183,0.05) 50%, transparent 100%)" }}>
        {/* Floating shapes — more of them, larger */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {["▲", "◆", "●", "■", "★", "⬟", "▲", "◆"].map((shape, i) => (
            <div
              key={i}
              className="absolute animate-float font-bold select-none"
              style={{
                fontSize: `${22 + (i % 5) * 12}px`,
                color: ["#E21B3C", "#1368CE", "#26890C", "#FFA602", "#FF3EA5", "#00C9B7", "#EB670F", "#FFD166"][i],
                opacity: 0.08 + (i % 4) * 0.03,
                top: `${8 + (i * 12) % 80}%`,
                left: `${4 + (i * 13) % 90}%`,
                animationDelay: `${i * 0.6}s`,
                animationDuration: `${4 + (i % 3)}s`,
              }}
            >
              {shape}
            </div>
          ))}
        </div>

        {/* Glowing orbs — larger */}
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full" style={{ background: "rgba(19,104,206,0.1)", filter: "blur(100px)" }} />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full" style={{ background: "rgba(0,201,183,0.08)", filter: "blur(80px)" }} />
        <div className="absolute top-1/2 right-10 w-48 h-48 rounded-full" style={{ background: "rgba(255,166,2,0.06)", filter: "blur(60px)" }} />

        <div className="relative max-w-6xl mx-auto px-6 py-14 md:py-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-8 animate-fade-in">
            <Link href="/" className="text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors text-sm">
              ← Home
            </Link>
            <span className="text-[var(--text-faint)]">/</span>
            <span className="text-[var(--text-secondary)] font-medium text-sm">All Modules</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Left — text */}
            <div className="flex-1 animate-fade-in-up text-center md:text-left">
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold mb-4"
                style={{ background: "linear-gradient(135deg, rgba(19,104,206,0.2), rgba(255,166,2,0.15))", border: "1px solid rgba(255,255,255,0.12)", color: "#FFA602" }}
              >
                <span className="text-lg">🎯</span>
                <span>Pick your adventure</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-[var(--text-primary)] mb-4">
                All Modules
              </h1>
              <p className="text-[var(--text-secondary)] text-lg max-w-lg mb-6">
                {modules.length} modules, {totalLessons} lessons, {totalMinutes}+ minutes of interactive learning. No order required — jump in anywhere.
              </p>
              <Link
                href="/modules/module-1"
                className="group inline-flex items-center gap-2 font-display font-bold px-7 py-3.5 rounded-2xl text-base text-white transition-all hover:scale-105 active:scale-95 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #E21B3C, #FF4757)", boxShadow: "0 4px 20px rgba(226,27,60,0.35)" }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                <span className="relative flex items-center gap-2">
                  <span className="text-lg">▶</span> Start Module 1
                </span>
              </Link>
            </div>

            {/* Right — NBP2 generated hero image */}
            <div className="flex-shrink-0 w-64 h-56 md:w-96 md:h-80 animate-fade-in-up relative" style={{ animationDelay: "0.2s" }}>
              <div className="absolute inset-0 rounded-full opacity-25" style={{ background: "radial-gradient(circle, rgba(19,104,206,0.4), transparent 70%)", filter: "blur(30px)" }} />
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <Image src="/images/generated/modules-list-hero.png" alt="Your learning journey" width={768} height={432} className="rounded-2xl drop-shadow-2xl" style={{ filter: "drop-shadow(0 0 30px rgba(19,104,206,0.25))" }} />
              </div>
              {/* Orbiting shapes */}
              <div className="absolute w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold animate-orbit-slow" style={{ background: "rgba(226,27,60,0.3)", color: "#E21B3C", top: "0%", left: "10%" }}>▲</div>
              <div className="absolute w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold animate-orbit-slow" style={{ background: "rgba(255,166,2,0.3)", color: "#FFA602", bottom: "10%", right: "5%", animationDelay: "2s" }}>★</div>
            </div>
          </div>

          {/* Stats bar — visual with icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            {[
              { value: modules.length, label: "Modules", color: "#1368CE", icon: "📚" },
              { value: totalLessons, label: "Lessons", color: "#E21B3C", icon: "📝" },
              { value: `${totalXP}`, label: "Total XP", color: "#FFA602", icon: "⭐" },
              { value: "Free", label: "Forever", color: "#26890C", icon: "🎉" },
            ].map((s) => (
              <div key={s.label} className="relative text-center px-4 py-4 rounded-xl overflow-hidden group hover:scale-[1.03] transition-transform" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {/* Glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `radial-gradient(circle, ${s.color}15, transparent 70%)` }} />
                <div className="relative">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="text-2xl font-display font-bold" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-xs text-[var(--text-muted)]">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ANIMATED WAVE DIVIDER ============ */}
      <div className="relative h-12">
        <svg viewBox="0 0 1440 48" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
          <path d="M0 24 C360 0 720 48 1080 24 C1260 12 1380 36 1440 24 L1440 48 L0 48 Z" fill="rgba(255,255,255,0.015)" />
        </svg>
      </div>

      {/* ============ MODULE CARDS GRID ============ */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
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
                  animationDelay: `${0.1 + index * 0.08}s`,
                }}
              >
                {/* Cover image area */}
                <div className="relative h-48 overflow-hidden" style={{ background: "rgba(0,0,0,0.15)" }}>
                  {/* Animated glow behind image */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500" style={{ background: `radial-gradient(circle at center, white, transparent 60%)` }} />
                  {/* Cover image */}
                  <Image
                    src={`/images/generated/module-${index + 1}-cover.png`}
                    alt={mod.title}
                    width={384}
                    height={216}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 relative z-10"
                  />
                  {/* Floating mini shapes overlay */}
                  <div className="absolute top-4 left-5 text-lg animate-float font-bold opacity-[0.15] z-20" style={{ animationDelay: "0s", animationDuration: "3.5s" }}>
                    {KAHOOT_SHAPES[(index * 2) % KAHOOT_SHAPES.length]}
                  </div>
                  <div className="absolute bottom-4 right-6 text-xl animate-float font-bold opacity-[0.12] z-20" style={{ animationDelay: "1.5s", animationDuration: "4s" }}>
                    {KAHOOT_SHAPES[(index * 2 + 1) % KAHOOT_SHAPES.length]}
                  </div>
                  {/* Module number */}
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-base z-20" style={{ background: "rgba(0,0,0,0.4)", color: "#fff", backdropFilter: "blur(4px)" }}>
                    {index + 1}
                  </div>
                  {/* Emoji badge — bounces on hover */}
                  <div className="absolute top-3 right-3 text-2xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12 z-20">{MODULE_EMOJIS[index]}</div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <h3 className="relative text-lg font-display font-bold text-white mb-1.5">{mod.title}</h3>
                  <p className="relative text-white/75 text-sm mb-3 flex-1 leading-relaxed">{mod.subtitle}</p>
                  <p className="relative text-white/50 text-xs mb-4 leading-relaxed line-clamp-2">{mod.description}</p>

                  {/* Visual lesson count bar */}
                  <div className="relative mb-3">
                    <div className="flex gap-1">
                      {mod.lessons.map((_, li) => (
                        <div key={li} className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
                      ))}
                    </div>
                    <p className="text-white/40 text-[10px] mt-1.5 font-medium">{mod.lessons.length} lessons to complete</p>
                  </div>

                  {/* Lesson count pills */}
                  <div className="relative flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.3)", color: "#fff" }}>
                      ⏱ {mod.estimatedMinutes} min
                    </span>
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>
                      ⭐ {mod.xpReward} XP
                    </span>
                    <span className="ml-auto text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 text-xl font-bold">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ============ BOTTOM CTA ============ */}
      <section className="relative overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {/* Large floating shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-4 left-8 text-5xl animate-float" style={{ color: "#E21B3C", opacity: 0.08, animationDuration: "5s" }}>▲</div>
          <div className="absolute bottom-6 right-10 text-6xl animate-float" style={{ color: "#1368CE", opacity: 0.06, animationDelay: "1s", animationDuration: "6s" }}>◆</div>
          <div className="absolute top-1/2 left-1/3 text-4xl animate-float" style={{ color: "#FFA602", opacity: 0.07, animationDelay: "2s", animationDuration: "4.5s" }}>★</div>
        </div>
        <div className="relative max-w-3xl mx-auto px-6 py-20 text-center">
          {/* Animated rocket */}
          <div className="w-16 h-16 mx-auto mb-4 animate-float" style={{ animationDuration: "4s" }}>
            <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
              <path d="M32 6 C32 6 44 18 44 34 L44 46 L20 46 L20 34 C20 18 32 6 32 6 Z" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
              <circle cx="32" cy="28" r="4" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              <path d="M24 46 C24 46 28 58 26 60 C29 54 32 62 32 62 C32 62 35 54 38 60 C36 58 40 46 40 46" fill="#FFA602" opacity="0.6" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-[var(--text-primary)] mb-3">
            Ready to start?
          </h2>
          <p className="text-[var(--text-secondary)] mb-6">No signup required. Jump in and start learning.</p>
          <Link
            href="/modules/module-1"
            className="group inline-flex items-center justify-center font-display font-bold px-8 py-4 rounded-2xl text-lg transition-all duration-200 hover:scale-105 active:scale-95 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #E21B3C 0%, #FF4757 100%)", color: "#fff", boxShadow: "0 6px 30px rgba(226,27,60,0.4)" }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            <span className="relative flex items-center gap-2">
              <span className="text-xl">▶</span> Start Module 1
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
