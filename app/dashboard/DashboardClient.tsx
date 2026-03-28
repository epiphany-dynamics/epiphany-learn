"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProgress, type ProgressState } from "@/lib/progress";
import { getLevel, getLevelProgress, BADGES } from "@/lib/achievements";
import ProgressBar from "@/components/progress/ProgressBar";
import AccountSync from "@/components/auth/AccountSync";
import type { ModuleMeta } from "@/lib/content";
import { getModuleColor } from "@/lib/module-colors";
import { MODULE_ILLUSTRATIONS } from "@/components/ui/ModuleIllustrations";

const KAHOOT_SHAPES = ["▲", "◆", "●", "■", "★", "⬟"];

/* Stat card SVG illustrations */
function LessonsStatIllustration() {
  return (
    <svg viewBox="0 0 60 60" className="w-14 h-14" fill="none">
      <rect x="10" y="8" width="20" height="26" rx="3" fill="rgba(19,104,206,0.3)" stroke="rgba(19,104,206,0.6)" strokeWidth="1.5" />
      <rect x="18" y="4" width="20" height="26" rx="3" fill="rgba(19,104,206,0.5)" stroke="rgba(19,104,206,0.8)" strokeWidth="1.5" />
      <rect x="20" y="9" width="12" height="2" rx="1" fill="white" opacity="0.5" />
      <rect x="20" y="14" width="8" height="2" rx="1" fill="white" opacity="0.35" />
      <rect x="20" y="19" width="10" height="2" rx="1" fill="white" opacity="0.35" />
      <path d="M38 38 L42 42 L50 34" stroke="#4CD929" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="44" cy="38" r="10" fill="rgba(38,137,12,0.1)" stroke="rgba(38,137,12,0.3)" strokeWidth="1" />
    </svg>
  );
}

function BadgesStatIllustration() {
  return (
    <svg viewBox="0 0 60 60" className="w-14 h-14" fill="none">
      <circle cx="30" cy="26" r="16" fill="rgba(255,166,2,0.15)" stroke="rgba(255,166,2,0.5)" strokeWidth="2" />
      <circle cx="30" cy="26" r="10" fill="rgba(255,166,2,0.2)" />
      <path d="M30 18 L32 23 L38 24 L33 28 L35 34 L30 31 L25 34 L27 28 L22 24 L28 23 Z" fill="#FFD166" opacity="0.7" />
      <path d="M22 40 L30 46 L38 40" stroke="rgba(255,166,2,0.4)" strokeWidth="1.5" fill="none" />
      <path d="M24 43 L30 48 L36 43" stroke="rgba(255,166,2,0.3)" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function CompletionStatIllustration() {
  return (
    <svg viewBox="0 0 60 60" className="w-14 h-14" fill="none">
      <circle cx="30" cy="30" r="20" fill="rgba(38,137,12,0.08)" stroke="rgba(38,137,12,0.3)" strokeWidth="2" />
      <circle cx="30" cy="30" r="15" fill="rgba(38,137,12,0.1)" stroke="rgba(38,137,12,0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
      <path d="M22 30 L28 36 L40 24" stroke="#4CD929" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="48" cy="12" r="3" fill="rgba(38,137,12,0.3)" />
      <circle cx="10" cy="14" r="2" fill="rgba(38,137,12,0.2)" />
    </svg>
  );
}

/* XP/Level hero illustration */
function XPHeroIllustration() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
      {/* Trophy */}
      <path d="M45 30 L45 65 C45 80 55 90 60 92 C65 90 75 80 75 65 L75 30 Z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      <path d="M45 38 C30 38 28 52 38 60" stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M75 38 C90 38 92 52 82 60" stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Star on trophy */}
      <path d="M60 42 L63 50 L72 51 L65 57 L67 66 L60 62 L53 66 L55 57 L48 51 L57 50 Z" fill="#FFD166" opacity="0.5" />
      {/* Base */}
      <rect x="50" y="93" width="20" height="5" rx="2" fill="rgba(255,255,255,0.15)" />
      <rect x="46" y="98" width="28" height="5" rx="2" fill="rgba(255,255,255,0.1)" />
      {/* XP particles floating up */}
      <text x="20" y="35" fontSize="12" fontWeight="bold" fill="#FFA602" opacity="0.4">+XP</text>
      <text x="85" y="28" fontSize="10" fontWeight="bold" fill="#FFA602" opacity="0.3">+XP</text>
      <text x="15" y="70" fontSize="9" fontWeight="bold" fill="#FFA602" opacity="0.25">+XP</text>
      {/* Sparkles */}
      <circle cx="25" cy="20" r="2" fill="rgba(255,255,255,0.3)" />
      <circle cx="95" cy="45" r="2.5" fill="rgba(255,255,255,0.25)" />
      <circle cx="100" cy="15" r="1.5" fill="#FFD166" opacity="0.4" />
      <path d="M88 75 L89 72 L90 75 L93 76 L90 77 L89 80 L88 77 L85 76 Z" fill="rgba(255,255,255,0.3)" />
    </svg>
  );
}

interface Props {
  modules: ModuleMeta[];
}

export default function DashboardClient({ modules }: Props) {
  const [progress, setProgress] = useState<ProgressState | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  if (!progress) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-[#F0EFEB]/30 animate-pulse">Loading your progress...</div>
      </div>
    );
  }

  const level = getLevel(progress.xp);
  const levelProgress = getLevelProgress(progress.xp);
  const earnedBadges = progress.badges.map((id) => BADGES[id]).filter(Boolean);
  const streak = progress.streak || 0;
  const lastVisited = progress.lastVisited;

  const totalLessonsCompleted = Object.values(progress.modules)
    .flatMap((m) => Object.values(m.lessons))
    .filter((l) => l.completed).length;
  const totalLessons = modules.reduce((a, m) => a + m.lessons.length, 0);

  return (
    <main className="min-h-screen bg-[var(--bg-page)]">
      {/* ============ HEADER — with larger visual area ============ */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, rgba(19,104,206,0.12) 0%, rgba(0,201,183,0.04) 50%, transparent 100%)" }}>
        {/* Floating shapes — larger, more of them */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {KAHOOT_SHAPES.map((shape, i) => (
            <div
              key={i}
              className="absolute animate-float font-bold select-none"
              style={{
                fontSize: `${22 + i * 10}px`,
                color: ["#E21B3C", "#1368CE", "#26890C", "#FFA602", "#FF3EA5", "#00C9B7"][i],
                opacity: 0.06 + (i % 3) * 0.02,
                top: `${8 + i * 16}%`,
                left: `${4 + i * 18}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + i}s`,
              }}
            >
              {shape}
            </div>
          ))}
        </div>

        {/* Glow orbs */}
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full" style={{ background: "rgba(19,104,206,0.08)", filter: "blur(80px)" }} />
        <div className="absolute top-0 right-1/3 w-48 h-48 rounded-full" style={{ background: "rgba(255,166,2,0.05)", filter: "blur(60px)" }} />

        <div className="relative max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors text-sm">← Home</Link>
            <span className="text-[var(--text-faint)]">/</span>
            <span className="text-[var(--text-secondary)] font-medium text-sm">Your Progress</span>
          </div>
          <Link
            href="/modules"
            className="group inline-flex items-center gap-2 font-display font-bold px-5 py-2.5 rounded-xl text-sm text-white transition-all hover:scale-105 active:scale-95 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #E21B3C, #FF4757)", boxShadow: "0 4px 16px rgba(226,27,60,0.3)" }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            <span className="relative">Continue Learning →</span>
          </Link>
        </div>
      </div>

      {/* ============ WELCOME IMAGE ============ */}
      <div className="max-w-4xl mx-auto px-6 pt-2 pb-0">
        <div className="rounded-2xl overflow-hidden relative" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
          <Image
            src="/images/generated/dashboard-welcome.png"
            alt="Your achievements"
            width={960}
            height={540}
            className="w-full h-auto rounded-2xl"
            priority
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, var(--bg-page) 0%, transparent 20%)" }} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* ============ RESUME CARD ============ */}
        {lastVisited && (
          <div
            className="rounded-2xl p-6 flex items-center justify-between gap-4 animate-fade-in-up relative overflow-hidden"
            style={{ background: "rgba(19,104,206,0.08)", border: "1px solid rgba(19,104,206,0.2)" }}
          >
            {/* Animated floating bookmark */}
            <div className="absolute top-2 right-16 text-4xl opacity-[0.06] pointer-events-none select-none animate-float" style={{ animationDuration: "4s" }}>📖</div>
            <div className="absolute bottom-2 right-4 text-3xl opacity-[0.04] pointer-events-none select-none animate-float" style={{ animationDelay: "2s", animationDuration: "5s" }}>📝</div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "#4DA3FF" }}>
                Resume where you left off
              </p>
              <p className="font-display font-semibold text-[var(--text-primary)]">{lastVisited.lessonTitle}</p>
            </div>
            <Link
              href={`/modules/${lastVisited.moduleId}/${lastVisited.lessonSlug}`}
              className="flex-shrink-0 group font-display font-bold text-white px-5 py-2.5 rounded-xl transition-all hover:scale-105 hover:brightness-110 text-sm relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #1368CE, #2B8BF5)" }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              <span className="relative">Resume →</span>
            </Link>
          </div>
        )}

        {/* ============ XP + LEVEL + STREAK — with illustrations ============ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* XP/Level card — with trophy illustration */}
          <div
            className="md:col-span-2 rounded-2xl p-8 text-white relative overflow-hidden animate-fade-in-up"
            style={{ background: "linear-gradient(135deg, #0F52A0, #1368CE)", animationDelay: "0.1s" }}
          >
            {/* Decorative floating shapes */}
            <div className="absolute top-3 right-3 text-5xl opacity-[0.06] pointer-events-none select-none animate-float" style={{ animationDuration: "5s" }}>★</div>
            <div className="absolute bottom-3 left-3 text-3xl opacity-[0.06] pointer-events-none select-none animate-float" style={{ animationDelay: "2s", animationDuration: "6s" }}>◆</div>
            <div className="absolute top-1/2 right-1/4 text-2xl opacity-[0.04] pointer-events-none select-none animate-float" style={{ animationDelay: "1s", animationDuration: "4s" }}>▲</div>

            <div className="flex items-start gap-6">
              {/* Trophy illustration */}
              <div className="hidden md:block flex-shrink-0 w-28 h-28 animate-float" style={{ animationDuration: "6s" }}>
                <XPHeroIllustration />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-white/50 text-sm font-medium mb-1">Current Level</p>
                    <h2 className="text-2xl font-display font-bold flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-lg" style={{ background: "rgba(255,255,255,0.15)" }}>🏆</span>
                      Level {level.level} — {level.title}
                    </h2>
                  </div>
                  <div className="text-right">
                    <p className="text-white/50 text-sm">Total XP</p>
                    <p className="text-4xl font-display font-bold text-gradient-xp">{progress.xp}</p>
                  </div>
                </div>
                <ProgressBar value={levelProgress} color="yellow" />
                {level.maxXP !== Infinity && (
                  <p className="text-white/50 text-sm mt-2">
                    {level.maxXP - progress.xp} XP to Level {level.level + 1}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Streak card — with animated flame */}
          <div
            className="rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden animate-fade-in-up"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", animationDelay: "0.2s" }}
          >
            {/* Animated background glow for active streak */}
            {streak > 0 && (
              <div className="absolute inset-0 opacity-10 animate-pulse" style={{ background: "radial-gradient(circle, rgba(235,103,15,0.4), transparent 70%)" }} />
            )}
            {streak > 0 ? (
              <>
                {/* Animated flame SVG */}
                <div className="relative w-16 h-16 mb-2">
                  <svg viewBox="0 0 64 64" className="w-full h-full animate-bounce-in" fill="none">
                    <path d="M32 8 C32 8 42 20 42 32 C42 42 38 48 32 52 C26 48 22 42 22 32 C22 20 32 8 32 8 Z" fill="rgba(235,103,15,0.4)" stroke="rgba(235,103,15,0.7)" strokeWidth="2" />
                    <path d="M32 18 C32 18 38 26 38 34 C38 40 36 44 32 46 C28 44 26 40 26 34 C26 26 32 18 32 18 Z" fill="rgba(255,166,2,0.5)" />
                    <path d="M32 28 C32 28 35 32 35 36 C35 39 34 41 32 42 C30 41 29 39 29 36 C29 32 32 28 32 28 Z" fill="#FFD166" opacity="0.7" />
                  </svg>
                  {/* Spark particles */}
                  <div className="absolute top-0 left-1/2 w-1 h-1 rounded-full bg-yellow-400 animate-float opacity-50" style={{ animationDuration: "2s" }} />
                  <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-orange-400 animate-float opacity-40" style={{ animationDelay: "0.5s", animationDuration: "2.5s" }} />
                </div>
                <p className="text-4xl font-display font-bold" style={{ color: "#EB670F" }}>{streak}</p>
                <p className="text-sm font-medium text-[var(--text-secondary)] mt-1">day streak</p>
                <p className="text-xs text-[var(--text-muted)] mt-2">Keep it going!</p>
              </>
            ) : (
              <>
                <div className="w-12 h-12 mb-2 opacity-30">
                  <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
                    <path d="M24 6 C24 6 32 16 32 24 C32 32 28 36 24 38 C20 36 16 32 16 24 C16 16 24 6 24 6 Z" fill="rgba(235,103,15,0.2)" stroke="rgba(235,103,15,0.3)" strokeWidth="1.5" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-[var(--text-muted)]">No streak yet</p>
                <p className="text-xs text-[var(--text-faint)] mt-1">Complete a lesson today!</p>
              </>
            )}
          </div>
        </div>

        {/* ============ OVERALL STATS BAR — with illustrations ============ */}
        <div
          className="rounded-2xl overflow-hidden animate-fade-in-up"
          style={{ background: "linear-gradient(90deg, #E21B3C, #1368CE, #26890C, #FFA602)", padding: "2px", animationDelay: "0.15s" }}
        >
          <div className="bg-[var(--bg-page)] rounded-2xl">
            <div className="grid grid-cols-3 gap-4 p-6 text-center">
              {[
                { value: totalLessonsCompleted, label: "Lessons Done", illustration: <LessonsStatIllustration />, color: "#1368CE" },
                { value: earnedBadges.length, label: "Badges Earned", illustration: <BadgesStatIllustration />, color: "#FFA602" },
                { value: `${Math.round((totalLessonsCompleted / totalLessons) * 100)}%`, label: "Complete", illustration: <CompletionStatIllustration />, color: "#26890C" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <div className="mb-2">{stat.illustration}</div>
                  <div className="text-2xl font-display font-bold" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-xs text-[var(--text-muted)] mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ============ MODULE PROGRESS — with visual indicators ============ */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">Module Progress</h3>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.1), transparent)" }} />
          </div>
          <div className="space-y-4">
            {modules.map((mod, index) => {
              const modProgress = progress.modules[mod.id];
              const completedLessons = modProgress
                ? Object.values(modProgress.lessons).filter((l) => l.completed).length
                : 0;
              const pct = Math.round((completedLessons / mod.lessons.length) * 100);
              const modColor = getModuleColor(mod.id);
              const Illustration = MODULE_ILLUSTRATIONS[index] ?? MODULE_ILLUSTRATIONS[0];

              return (
                <div
                  key={mod.id}
                  className="group rounded-2xl p-5 md:p-6 flex items-center gap-5 transition-all duration-300 hover:scale-[1.01] animate-fade-in-up relative overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    animationDelay: `${index * 60}ms`,
                  }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: `linear-gradient(135deg, ${modColor.hex}08, transparent)` }} />

                  {/* Module illustration — larger */}
                  <div
                    className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 relative"
                    style={{ background: modColor.gradient, boxShadow: `0 4px 16px ${modColor.glow}` }}
                  >
                    <div className="w-11 h-11">
                      <Illustration className="w-full h-full" />
                    </div>
                    {/* Completion badge overlay */}
                    {modProgress?.completed && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#26890C", boxShadow: "0 2px 8px rgba(38,137,12,0.4)" }}>
                        <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 8 L6.5 11.5 L13 5" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Module info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-semibold text-[var(--text-primary)]">{mod.title}</span>
                        {modProgress?.completed && (
                          <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ color: "#4CD929", background: "rgba(38,137,12,0.15)" }}>
                            Complete
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-[var(--text-muted)]">
                        {completedLessons}/{mod.lessons.length}
                      </span>
                    </div>

                    {/* Visual lesson dots + progress bar */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex gap-1 flex-1">
                        {mod.lessons.map((_, li) => (
                          <div
                            key={li}
                            className="flex-1 h-2.5 rounded-full transition-all duration-300"
                            style={{
                              background: li < completedLessons ? modColor.hex : "rgba(255,255,255,0.06)",
                              boxShadow: li < completedLessons ? `0 0 6px ${modColor.glow}` : "none",
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold tabular-nums min-w-[3ch] text-right" style={{ color: pct === 100 ? "#4CD929" : modColor.textDark }}>{pct}%</span>
                    </div>

                    {!modProgress?.completed && (
                      <Link
                        href={`/modules/${mod.id}`}
                        className="text-xs font-bold inline-flex items-center gap-1 hover:opacity-80 transition-colors group/link"
                        style={{ color: modColor.textDark }}
                      >
                        {completedLessons > 0 ? "Continue" : "Start"}
                        <span className="group-hover/link:translate-x-0.5 transition-transform">→</span>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============ BADGES — with visual unlock effects ============ */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">
              Badges ({earnedBadges.length})
            </h3>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(255,166,2,0.2), transparent)" }} />
          </div>
          {earnedBadges.length === 0 ? (
            <div className="rounded-2xl p-12 text-center relative overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.1)" }}>
              {/* Animated floating badge icons */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-4 left-8 text-3xl opacity-[0.06] animate-float" style={{ animationDuration: "4s" }}>🏅</div>
                <div className="absolute bottom-4 right-8 text-3xl opacity-[0.06] animate-float" style={{ animationDelay: "1s", animationDuration: "5s" }}>🏆</div>
                <div className="absolute top-6 right-16 text-2xl opacity-[0.05] animate-float" style={{ animationDelay: "2s", animationDuration: "4.5s" }}>⭐</div>
                <div className="absolute bottom-6 left-16 text-2xl opacity-[0.04] animate-float" style={{ animationDelay: "3s", animationDuration: "5.5s" }}>🎖️</div>
              </div>
              {/* Empty state illustration */}
              <div className="w-20 h-20 mx-auto mb-4">
                <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
                  <circle cx="40" cy="35" r="22" fill="rgba(255,166,2,0.08)" stroke="rgba(255,166,2,0.2)" strokeWidth="2" strokeDasharray="6 4" />
                  <path d="M40 22 L43 31 L52 32 L45 38 L47 47 L40 43 L33 47 L35 38 L28 32 L37 31 Z" fill="rgba(255,166,2,0.1)" stroke="rgba(255,166,2,0.2)" strokeWidth="1.5" />
                  <text x="40" y="66" textAnchor="middle" fontSize="8" fill="rgba(255,166,2,0.3)" fontWeight="bold">LOCKED</text>
                </svg>
              </div>
              <p className="text-[var(--text-muted)] font-medium">Complete lessons to earn badges</p>
              <p className="text-[var(--text-faint)] text-sm mt-1">Each module has a unique badge waiting for you</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {earnedBadges.map((badge, i) => (
                <div
                  key={badge.id}
                  className="group rounded-2xl p-6 text-center relative overflow-hidden transition-all duration-300 hover:scale-[1.04] hover:-translate-y-1 animate-fade-in-up"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,166,2,0.15)",
                    animationDelay: `${i * 80}ms`,
                  }}
                >
                  {/* Animated glow ring behind badge */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(circle at center, rgba(255,166,2,0.08), transparent 60%)" }} />

                  {/* Badge icon with glow */}
                  <div className="relative inline-block mb-3">
                    <div className="absolute inset-0 rounded-full animate-pulse opacity-30" style={{ background: "radial-gradient(circle, rgba(255,166,2,0.4), transparent 70%)", transform: "scale(1.5)" }} />
                    <div className="relative text-5xl animate-bounce-in" style={{ animationDelay: `${i * 100}ms` }}>{badge.icon}</div>
                  </div>

                  <p className="font-display font-bold text-[var(--text-primary)] text-sm relative">{badge.title}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1 relative">{badge.description}</p>

                  {/* Sparkle particles on hover */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg viewBox="0 0 20 20" className="w-4 h-4" fill="#FFD166" opacity="0.5">
                      <path d="M10 0 L12 7 L20 10 L12 13 L10 20 L8 13 L0 10 L8 7 Z" />
                    </svg>
                  </div>
                  <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transitionDelay: "100ms" }}>
                    <svg viewBox="0 0 16 16" className="w-3 h-3" fill="#FFD166" opacity="0.3">
                      <path d="M8 0 L10 6 L16 8 L10 10 L8 16 L6 10 L0 8 L6 6 Z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ============ REWARDS ============ */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">Rewards</h3>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.1), transparent)" }} />
          </div>
          <Link
            href="/rewards"
            className="block rounded-2xl p-5 transition-all hover:scale-[1.01]"
            style={{
              background: "var(--bg-card)",
              border: "1px solid rgba(0, 201, 183, 0.15)",
            }}
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">🎁</span>
              <div className="flex-1">
                <p className="font-display font-bold text-[var(--text-primary)]">Cheat Sheets & Certificate</p>
                <p className="text-sm text-[var(--text-muted)]">
                  Complete modules to unlock free downloadable cheat sheets. Finish all 7 for your AI Literate certificate.
                </p>
              </div>
              <span className="text-[var(--text-faint)] text-xl">→</span>
            </div>
          </Link>
        </div>

        {/* ============ ACCOUNT SYNC ============ */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">Sync Across Devices</h3>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.1), transparent)" }} />
          </div>
          <AccountSync />
        </div>
      </div>
    </main>
  );
}
