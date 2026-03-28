import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllModules, getModule } from "@/lib/content";
import { getModuleColor, getModuleColorVars } from "@/lib/module-colors";
// Module cover images are now generated PNGs at /images/generated/module-{N}-cover.png

const KAHOOT_SHAPES = ["▲", "◆", "●", "■", "★", "⬟"];
const MODULE_EMOJIS = ["🧠", "💬", "🛠️", "🛡️", "🛒", "🚀"];

// Lesson-level emojis for visual richness on lesson cards
const LESSON_EMOJIS: Record<string, string[]> = {
  "module-1": ["🤖", "📊", "🔮", "⚡"],
  "module-2": ["💭", "✍️", "🎯", "🧪"],
  "module-3": ["📱", "📧", "🏠", "🎨"],
  "module-4": ["🔒", "👁️", "⚠️", "👨‍👩‍👧"],
  "module-5": ["💰", "🏷️", "⚖️", "🛍️"],
  "module-6": ["🗺️", "🔧", "🧩", "🏆"],
};

// What you'll learn topics per module
const MODULE_LEARNINGS: Record<string, { icon: string; text: string }[]> = {
  "module-1": [
    { icon: "🧠", text: "What AI actually is (and isn't)" },
    { icon: "📊", text: "How machine learning works" },
    { icon: "🔮", text: "Real-world AI applications" },
    { icon: "⚡", text: "AI capabilities and limitations" },
  ],
  "module-2": [
    { icon: "💬", text: "How to talk to AI chatbots effectively" },
    { icon: "✍️", text: "Writing better prompts" },
    { icon: "🎯", text: "Getting useful outputs consistently" },
    { icon: "🧪", text: "Experimenting with different approaches" },
  ],
  "module-3": [
    { icon: "📱", text: "AI tools you can use today" },
    { icon: "📧", text: "Automating everyday tasks" },
    { icon: "🏠", text: "AI for work and home" },
    { icon: "🎨", text: "Creative AI applications" },
  ],
  "module-4": [
    { icon: "🔒", text: "AI privacy and security basics" },
    { icon: "👁️", text: "Spotting AI-generated content" },
    { icon: "⚠️", text: "Common AI risks to watch for" },
    { icon: "🛡️", text: "Protecting yourself online" },
  ],
  "module-5": [
    { icon: "💰", text: "Evaluating AI products" },
    { icon: "🏷️", text: "Free vs paid AI tools" },
    { icon: "⚖️", text: "Making smart purchasing decisions" },
    { icon: "🛍️", text: "Avoiding AI hype and scams" },
  ],
  "module-6": [
    { icon: "🗺️", text: "Planning your first AI project" },
    { icon: "🔧", text: "Picking the right tools" },
    { icon: "🧩", text: "Putting it all together" },
    { icon: "🏆", text: "Launching and iterating" },
  ],
};

// Animated lesson icon SVGs — small inline SVGs for each lesson card
const LESSON_MINI_ILLUSTRATIONS = [
  // Lesson 1: Book/reading
  ({ color }: { color: string }) => (
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
      <rect x="8" y="6" width="24" height="28" rx="3" fill={`${color}40`} stroke={color} strokeWidth="1.5" opacity="0.8" />
      <rect x="10" y="10" width="14" height="2" rx="1" fill="white" opacity="0.5" />
      <rect x="10" y="15" width="10" height="2" rx="1" fill="white" opacity="0.35" />
      <rect x="10" y="20" width="12" height="2" rx="1" fill="white" opacity="0.35" />
      <circle cx="28" cy="28" r="6" fill={`${color}60`} />
      <path d="M26 28 L28 30 L31 26" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    </svg>
  ),
  // Lesson 2: Lightbulb/idea
  ({ color }: { color: string }) => (
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
      <circle cx="20" cy="16" r="10" fill={`${color}30`} stroke={color} strokeWidth="1.5" opacity="0.8" />
      <path d="M16 22 L16 28 L24 28 L24 22" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <rect x="16" y="29" width="8" height="3" rx="1.5" fill={`${color}50`} />
      <path d="M17 12 L20 8 L23 12" stroke="#FFD166" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      <circle cx="9" cy="10" r="2" fill="#FFD166" opacity="0.5" />
      <circle cx="31" cy="10" r="1.5" fill="#FFD166" opacity="0.4" />
    </svg>
  ),
  // Lesson 3: Puzzle piece
  ({ color }: { color: string }) => (
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
      <path d="M10 12 L18 12 L18 16 C15 14 13 18 18 20 L18 28 L10 28 L10 20 C13 22 15 18 10 16 Z" fill={`${color}40`} stroke={color} strokeWidth="1.5" opacity="0.8" />
      <path d="M20 12 L28 12 L28 16 C25 14 23 18 28 20 L28 28 L20 28 L20 20 C23 22 25 18 20 16 Z" fill={`${color}25`} stroke={color} strokeWidth="1.5" opacity="0.6" />
      <circle cx="32" cy="8" r="3" fill="#FFD166" opacity="0.5" />
    </svg>
  ),
  // Lesson 4: Trophy/star
  ({ color }: { color: string }) => (
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
      <path d="M20 6 L23 14 L32 15 L25 22 L27 31 L20 27 L13 31 L15 22 L8 15 L17 14 Z" fill={`${color}35`} stroke={color} strokeWidth="1.5" opacity="0.8" />
      <circle cx="20" cy="18" r="4" fill={`${color}50`} />
      <path d="M18 18 L19.5 19.5 L23 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <circle cx="8" cy="8" r="2" fill="#FFD166" opacity="0.4" />
      <circle cx="33" cy="6" r="1.5" fill="#FFD166" opacity="0.3" />
    </svg>
  ),
];

interface Props {
  params: { moduleId: string };
}

export async function generateStaticParams() {
  return getAllModules().map((m) => ({ moduleId: m.id }));
}

export async function generateMetadata({ params }: Props) {
  const mod = getModule(params.moduleId);
  if (!mod) return {};
  return { title: `${mod.title} — Epiphany Learn`, description: mod.description };
}

export default function ModulePage({ params }: Props) {
  const mod = getModule(params.moduleId);
  if (!mod) notFound();

  const firstLesson = mod.lessons[0];
  const color = getModuleColor(params.moduleId);
  const colorVars = getModuleColorVars(params.moduleId);
  const moduleIndex = parseInt(params.moduleId.replace("module-", "")) - 1;
  // Generated cover images at /images/generated/module-{N}-cover.png
  const emoji = MODULE_EMOJIS[moduleIndex] ?? "📚";
  const lessonEmojis = LESSON_EMOJIS[params.moduleId] ?? ["📝", "📖", "🎯", "✅"];
  const learnings = MODULE_LEARNINGS[params.moduleId] ?? MODULE_LEARNINGS["module-1"];

  return (
    <main className="min-h-screen bg-[var(--bg-page)]" style={colorVars as React.CSSProperties}>
      {/* ============ MODULE HERO — MUCH LARGER ============ */}
      <section className="relative overflow-hidden" style={{ background: color.hex }}>
        {/* Floating shapes in background — more, larger */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {KAHOOT_SHAPES.map((shape, i) => (
            <div
              key={i}
              className="absolute animate-float font-bold select-none"
              style={{
                fontSize: `${28 + i * 14}px`,
                color: "rgba(255,255,255,0.06)",
                top: `${10 + i * 16}%`,
                left: `${3 + i * 18}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${5 + i}s`,
              }}
            >
              {shape}
            </div>
          ))}
        </div>

        {/* Large glow orbs */}
        <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full" style={{ background: "rgba(255,255,255,0.04)", filter: "blur(80px)" }} />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full" style={{ background: "rgba(0,0,0,0.15)", filter: "blur(60px)" }} />

        {/* Dark gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: "linear-gradient(to top, var(--bg-page), transparent)" }} />

        {/* Breadcrumb bar */}
        <div className="relative" style={{ background: "rgba(0,0,0,0.15)" }}>
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-3 text-sm">
            <Link href="/" className="text-white/40 hover:text-white/70 transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <Link href="/modules" className="text-white/40 hover:text-white/70 transition-colors">Modules</Link>
            <span className="text-white/20">/</span>
            <span className="text-white/80 font-medium">{mod.title}</span>
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 pt-10 pb-24 md:pt-16 md:pb-36">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Left: text content */}
            <div className="flex-1 text-center md:text-left">
              {/* Module badge */}
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold mb-5 animate-fade-in-down" style={{ background: "rgba(0,0,0,0.3)", color: "#fff", backdropFilter: "blur(4px)" }}>
                <span className="text-lg">{emoji}</span>
                <span>Module {moduleIndex + 1}</span>
              </div>

              {/* Stat pills */}
              <div className="flex flex-wrap gap-3 mb-5 justify-center md:justify-start animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <span className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "rgba(0,0,0,0.3)", color: "#fff" }}>
                  ⏱ {mod.estimatedMinutes} min
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "rgba(0,0,0,0.3)", color: "#fff" }}>
                  📝 {mod.lessons.length} lessons
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "rgba(255,255,255,0.2)", color: "#FFD166" }}>
                  ⭐ +{mod.xpReward} XP
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
                {mod.title}
              </h1>
              <p className="text-white/80 text-lg md:text-xl mb-2 animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
                {mod.subtitle}
              </p>
              <p className="text-white/50 max-w-lg text-base animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
                {mod.description}
              </p>

              {firstLesson && (
                <div className="mt-8 animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
                  <Link
                    href={`/modules/${mod.id}/${firstLesson.slug}`}
                    className="group inline-flex items-center gap-2 font-display font-bold px-8 py-4 rounded-2xl text-lg text-white transition-all duration-200 hover:scale-105 active:scale-95 relative overflow-hidden"
                    style={{ background: "rgba(0,0,0,0.4)", border: "2px solid rgba(255,255,255,0.25)" }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                    <span className="relative flex items-center gap-2">
                      <span className="text-xl">▶</span> Start Module
                    </span>
                  </Link>
                </div>
              )}
            </div>

            {/* Right: cover image — LARGE & PROMINENT */}
            <div className="flex-shrink-0 w-72 md:w-[420px] animate-fade-in-up relative" style={{ animationDelay: "0.2s" }}>
              {/* Glow behind image */}
              <div className="absolute -inset-8 rounded-full opacity-30" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.2), transparent 60%)", filter: "blur(40px)" }} />
              <div className="relative">
                <Image
                  src={`/images/generated/module-${params.moduleId.replace('module-', '')}-cover.png`}
                  alt={mod.title}
                  width={768}
                  height={432}
                  className="rounded-2xl object-cover w-full h-auto drop-shadow-2xl"
                  style={{ boxShadow: `0 8px 40px ${color.glow}, 0 0 80px ${color.glow}40`, borderRadius: "0.75rem" }}
                  priority
                />
              </div>
              {/* Orbiting elements */}
              <div className="absolute w-10 h-10 rounded-full flex items-center justify-center text-xl animate-orbit-slow" style={{ top: "-5%", right: "5%", background: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)" }}>
                {lessonEmojis[0]}
              </div>
              <div className="absolute w-10 h-10 rounded-full flex items-center justify-center text-xl animate-orbit-slow" style={{ bottom: "5%", left: "-3%", background: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)", animationDelay: "3s" }}>
                {lessonEmojis[1]}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHAT YOU'LL LEARN — Visual with Icons ============ */}
      <section className="max-w-5xl mx-auto px-6 py-12 -mt-12 relative z-10">
        <div className="rounded-2xl p-6 md:p-8 animate-fade-in-up" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}>
          <h3 className="text-lg font-display font-bold text-[var(--text-primary)] mb-5 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color.hex}30` }}>
              <svg viewBox="0 0 20 20" className="w-4 h-4" fill={color.hex}>
                <path d="M10 0 L12 7 L20 10 L12 13 L10 20 L8 13 L0 10 L8 7 Z" />
              </svg>
            </span>
            What you&apos;ll learn
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learnings.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] group/learn animate-fade-in-up"
                style={{ background: "rgba(255,255,255,0.02)", animationDelay: `${i * 80}ms` }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-transform duration-300 group-hover/learn:scale-110 group-hover/learn:rotate-6" style={{ background: `${color.hex}25` }}>
                  {item.icon}
                </div>
                <span className="text-[var(--text-secondary)] text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LESSONS LIST — with animated icons ============ */}
      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">
            Lessons in this module
          </h2>
          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${color.hex}40, transparent)` }} />
        </div>

        <div className="space-y-4">
          {mod.lessons.map((lesson, index) => {
            const LessonIcon = LESSON_MINI_ILLUSTRATIONS[index % LESSON_MINI_ILLUSTRATIONS.length];
            return (
              <Link
                key={lesson.id}
                href={`/modules/${mod.id}/${lesson.slug}`}
                className="group flex items-center gap-5 rounded-2xl p-5 md:p-6 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 animate-fade-in-up relative overflow-hidden"
                style={{
                  animationDelay: `${index * 80}ms`,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: `linear-gradient(135deg, ${color.hex}08, transparent)` }} />

                {/* Lesson illustration / icon — animated */}
                <div className="flex-shrink-0 relative">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 relative overflow-hidden"
                    style={{ background: color.gradient, boxShadow: `0 4px 16px ${color.glow}` }}
                  >
                    {/* Mini SVG illustration */}
                    <div className="w-10 h-10 relative z-10">
                      <LessonIcon color={color.hex} />
                    </div>
                    {/* Animated sparkle inside */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  {/* Tiny number badge */}
                  <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-[var(--bg-page)] border-2" style={{ borderColor: color.hex, color: color.textDark }}>
                    {index + 1}
                  </div>
                  {/* Emoji floating */}
                  <div className="absolute -bottom-1 -left-1 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-[-4px]">
                    {lessonEmojis[index] ?? "📝"}
                  </div>
                </div>

                {/* Lesson content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <span className="font-display font-semibold text-[var(--text-primary)] group-hover:text-white transition-colors text-lg">
                      {lesson.title}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] line-clamp-1">{lesson.subtitle}</p>
                  <div className="flex items-center gap-3 mt-2.5">
                    <span className="text-xs text-[var(--text-faint)] flex items-center gap-1">
                      <svg viewBox="0 0 16 16" className="w-3 h-3 inline" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="8" cy="8" r="6.5" />
                        <line x1="8" y1="5" x2="8" y2="8" strokeLinecap="round" />
                        <line x1="8" y1="8" x2="10.5" y2="10" strokeLinecap="round" />
                      </svg>
                      {lesson.estimatedMinutes} min
                    </span>
                    <span className="text-xs font-medium flex items-center gap-1" style={{ color: color.textDark }}>
                      <svg viewBox="0 0 16 16" className="w-3 h-3 inline" fill={color.textDark}>
                        <path d="M8 1 L9.5 5.5 L14 6 L10.5 9 L11.5 14 L8 11.5 L4.5 14 L5.5 9 L2 6 L6.5 5.5 Z" />
                      </svg>
                      +{lesson.xpReward} XP
                    </span>
                  </div>
                </div>

                {/* Arrow with animated background */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" style={{ background: `${color.hex}15` }}>
                  <span className="text-[var(--text-faint)] group-hover:text-[var(--text-primary)] transition-colors font-bold">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ============ MODULE NAVIGATION ============ */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-between gap-4 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {moduleIndex > 0 ? (
            <Link
              href={`/modules/module-${moduleIndex}`}
              className="text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors text-sm flex items-center gap-2"
            >
              <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.05)" }}>←</span>
              Previous Module
            </Link>
          ) : (
            <Link href="/modules" className="text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors text-sm flex items-center gap-2">
              <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.05)" }}>←</span>
              All Modules
            </Link>
          )}
          {moduleIndex < 5 && (
            <Link
              href={`/modules/module-${moduleIndex + 2}`}
              className="text-sm font-medium hover:opacity-80 transition-colors flex items-center gap-2"
              style={{ color: color.textDark }}
            >
              Next Module
              <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${color.hex}15` }}>→</span>
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
