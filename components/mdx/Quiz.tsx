"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  IntroIllustration,
  CorrectIllustration,
  WrongIllustration,
  TimeoutIllustration,
  TrophyIllustration,
  StreakFireIllustration,
} from "@/components/quiz/QuizIllustrations";
import { ILLUSTRATIONS } from "@/lib/illustrations-registry";

/* ================================================================
   TYPES
   ================================================================ */

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
  correctId: string;
  explanation: string;
  image?: string;
  illustration?: string;
}

interface Props {
  id?: string;
  /** All available questions — if more than `count`, a random subset is selected each play */
  questions: Question[];
  /** How many questions to show per play session (default: all if ≤5, else 5) */
  count?: number;
  timePerQuestion?: number; // seconds — default 20
}

interface AnswerRecord {
  questionId: string;
  selectedId: string | null;
  correct: boolean;
  timeSpent: number;
  points: number;
}

/* ================================================================
   CONSTANTS
   ================================================================ */

const KAHOOT_ANSWERS = [
  /* Kahoot CSS ref: raised 3D with darker box-shadow */
  { bg: "#E21B3C", shape: "▲", shadow: "0 0.25rem #B3152F" },
  { bg: "#1368CE", shape: "◆", shadow: "0 0.25rem #0D4F9E" },
  { bg: "#FFA602", shape: "●", shadow: "0 0.25rem #CC8502" },
  { bg: "#26890C", shape: "■", shadow: "0 0.25rem #106B02" },
];

const CORRECT_EMOJIS = ["🎉", "✨", "⭐", "🔥", "💥", "🎯", "💪", "🏆"];
const WRONG_EMOJIS = ["😅", "💭", "🤔", "📚"];

type Phase = "idle" | "intro" | "get-ready" | "question" | "feedback" | "results";

/* ================================================================
   FLOATING EMOJI COMPONENT
   ================================================================ */

function FloatingEmojis({ emojis, count = 8 }: { emojis: string[]; count?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute quiz-emoji-float"
          style={{
            left: `${10 + Math.random() * 80}%`,
            bottom: "-20px",
            fontSize: `${24 + Math.random() * 20}px`,
            animationDelay: `${i * 0.12}s`,
            animationDuration: `${1.2 + Math.random() * 0.8}s`,
          }}
        >
          {emojis[Math.floor(Math.random() * emojis.length)]}
        </div>
      ))}
    </div>
  );
}

/* ================================================================
   ANIMATED PARTICLES
   ================================================================ */

function Particles({ color, count = 20 }: { color: string; count?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * 360;
        const distance = 60 + Math.random() * 100;
        const dx = Math.cos((angle * Math.PI) / 180) * distance;
        const dy = Math.sin((angle * Math.PI) / 180) * distance;
        return (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 rounded-full quiz-particle-burst"
            style={{
              width: 4 + Math.random() * 6,
              height: 4 + Math.random() * 6,
              background: color,
              "--dx": `${dx}px`,
              "--dy": `${dy}px`,
              animationDelay: `${Math.random() * 0.15}s`,
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
}

/* ================================================================
   COUNTDOWN RING (3-2-1)
   ================================================================ */

function CountdownRing({ number, color }: { number: number; color: string }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      {/* Glow behind */}
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{ background: `radial-gradient(circle, ${color}30, transparent 70%)` }}
      />
      {/* SVG ring */}
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 140 140">
        {/* Track */}
        <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
        {/* Animated ring */}
        <circle
          cx="70" cy="70" r={radius} fill="none"
          stroke={color} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset="0"
          className="quiz-countdown-ring"
          style={{ "--circumference": `${circumference}` } as React.CSSProperties}
        />
      </svg>
      {/* Number */}
      <span
        key={number}
        className="relative text-7xl font-display font-bold animate-bounce-in"
        style={{ color, textShadow: `0 0 40px ${color}80` }}
      >
        {number > 0 ? number : "GO!"}
      </span>
    </div>
  );
}

/* ================================================================
   TIMER BAR
   ================================================================ */

function TimerBar({ duration, paused, onTimeUp }: { duration: number; paused: boolean; onTimeUp: () => void }) {
  const barRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (paused) {
      // Freeze the bar at current width
      if (barRef.current) {
        barRef.current.style.animationPlayState = "paused";
      }
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    // Start the animation fresh
    if (barRef.current) {
      barRef.current.style.animation = "none";
      // Force reflow
      void barRef.current.offsetHeight;
      barRef.current.style.animation = `quizTimerShrink ${duration}s linear forwards`;
      barRef.current.style.animationPlayState = "running";
    }

    timeoutRef.current = setTimeout(onTimeUp, duration * 1000);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [duration, paused, onTimeUp]);

  /* Kahoot CSS ref: track height 0.375rem, bg rgba(255,255,255,0.2), rounded-full */
  return (
    <div className="relative" style={{ width: "100%", height: "0.375rem", background: "rgba(255,255,255,0.2)", borderRadius: "9999px" }}>
      <div
        ref={barRef}
        className="quiz-timer-bar"
        style={{ width: "100%", height: "0.375rem" }}
      />
    </div>
  );
}

/* ================================================================
   MAIN QUIZ COMPONENT
   ================================================================ */

/** Shuffle array using Fisher-Yates */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Select N random questions from pool, shuffling option order too */
function selectQuestions(pool: Question[], count: number): Question[] {
  const selected = shuffle(pool).slice(0, count);
  return selected.map((q) => ({
    ...q,
    options: shuffle(q.options), // randomize option order too
  }));
}

export default function Quiz({ questions: questionPool, count, timePerQuestion = 20 }: Props) {
  const questionsPerRound = count ?? Math.min(questionPool.length, 5);
  const [questions, setQuestions] = useState<Question[]>(() =>
    selectQuestions(questionPool, questionsPerRound)
  );
  const [phase, setPhase] = useState<Phase>("idle");
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [introCount, setIntroCount] = useState(3);
  const [timerPaused, setTimerPaused] = useState(true);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const startTimeRef = useRef(Date.now());
  const feedbackRef = useRef<HTMLDivElement>(null);

  // ─── Intro countdown 3-2-1 ───
  useEffect(() => {
    if (phase !== "intro") return;
    if (introCount < 0) {
      setPhase("question");
      setTimerPaused(false);
      startTimeRef.current = Date.now();
      return;
    }
    const t = setTimeout(() => setIntroCount((c) => c - 1), 900);
    return () => clearTimeout(t);
  }, [phase, introCount]);

  // ─── Handle answer ───
  const handleAnswer = useCallback((optionId: string | null) => {
    if (phase !== "question" || selectedId !== null) return;

    setTimerPaused(true);
    setSelectedId(optionId);

    const q = questions[currentQ];
    const correct = optionId === q.correctId;
    const timeSpent = (Date.now() - startTimeRef.current) / 1000;
    const speedBonus = correct ? Math.round(Math.max(0, (1 - timeSpent / timePerQuestion)) * 500) : 0;
    const points = correct ? 500 + speedBonus : 0;

    if (correct) {
      setScore((s) => s + points);
      setStreak((s) => {
        const n = s + 1;
        setMaxStreak((m) => Math.max(m, n));
        return n;
      });
      setShowEmojis(true);
      setShowParticles(true);
    } else {
      setStreak(0);
      setShowEmojis(true);
    }

    setAnswers((a) => [...a, { questionId: q.id, selectedId: optionId, correct, timeSpent, points }]);
    setPhase("feedback");

    // Scroll feedback into view on mobile
    setTimeout(() => {
      feedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 300);

    // Auto-advance
    setTimeout(() => {
      setShowEmojis(false);
      setShowParticles(false);
      if (currentQ < questions.length - 1) {
        setCurrentQ((c) => c + 1);
        setSelectedId(null);
        setTimerPaused(false);
        startTimeRef.current = Date.now();
        setPhase("question");
      } else {
        setPhase("results");
      }
    }, 3000);
  }, [phase, selectedId, currentQ, questions, timePerQuestion]);

  // ─── Time's up handler ───
  const handleTimeUp = useCallback(() => {
    handleAnswer(null);
  }, [handleAnswer]);

  // ─── Keyboard answer selection (Kahoot: 1-4 keys select answers) ───
  useEffect(() => {
    if (phase !== "question" || selectedId !== null) return;
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const q = questions[currentQ];
      if (!q) return;
      const keyMap: Record<string, number> = { "1": 0, "2": 1, "3": 2, "4": 3 };
      const idx = keyMap[e.key];
      if (idx !== undefined && q.options[idx]) {
        e.preventDefault();
        handleAnswer(q.options[idx].id);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, selectedId, currentQ, questions, handleAnswer]);

  function handleStart() {
    // Re-select random questions from pool each play (Kahoot: different questions each replay)
    setQuestions(selectQuestions(questionPool, questionsPerRound));
    setPhase("intro");
    setCurrentQ(0);
    setSelectedId(null);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setAnswers([]);
    setIntroCount(3);
    setTimerPaused(true);
    setShowEmojis(false);
    setShowParticles(false);
  }

  const q = questions[currentQ];
  const lastAnswer = answers[answers.length - 1];
  const correctCount = answers.filter((a) => a.correct).length;
  const introColors = ["#E21B3C", "#FFA602", "#26890C", "#1368CE"];

  // ═══════════════════════════════════════════════════
  //   RENDER
  // ═══════════════════════════════════════════════════

  return (
    <div className="my-10 rounded-3xl overflow-hidden relative quiz-container" style={{ background: "#0A0A0A", border: "2px solid rgba(255,255,255,0.1)" }}>

      {/* ═══════ IDLE — Start Button ═══════ */}
      {phase === "idle" && (
        <div className="flex flex-col items-center justify-center py-16 px-6 relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 quiz-idle-bg" />

          {/* Floating shapes */}
          {KAHOOT_ANSWERS.map((a, i) => (
            <div key={i} className="absolute animate-float font-bold select-none" style={{
              fontSize: `${28 + i * 8}px`, color: a.bg, opacity: 0.1,
              top: `${10 + i * 22}%`, left: `${8 + i * 24}%`,
              animationDelay: `${i * 0.5}s`, animationDuration: `${4 + i}s`,
            }}>
              {a.shape}
            </div>
          ))}

          <div className="relative z-10 text-center">
            {/* Animated game controller illustration */}
            <div className="w-48 h-40 mx-auto mb-4 animate-fade-in">
              <IntroIllustration className="w-full h-full" />
            </div>

            <h3 className="text-2xl font-display font-bold text-white mb-2">Quick Check</h3>
            <p className="text-white/40 text-sm mb-1">{questionsPerRound} questions · Earn points for speed!</p>
            {questionPool.length > questionsPerRound && (
              <p className="text-white/25 text-xs mb-6">🔀 Random selection — different questions each play!</p>
            )}

            {/* Animated shapes row */}
            <div className="flex items-center justify-center gap-3 mb-8">
              {KAHOOT_ANSWERS.map((a, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg font-bold animate-fade-in-up"
                  style={{ background: a.bg, animationDelay: `${0.2 + i * 0.1}s` }}
                >
                  {a.shape}
                </div>
              ))}
            </div>

            <button
              onClick={handleStart}
              className="group font-display font-bold px-10 py-4 rounded-2xl text-white text-lg transition-all hover:scale-105 active:scale-95 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #E21B3C, #FF4757)", boxShadow: "0 8px 32px rgba(226,27,60,0.4)" }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              <span className="relative flex items-center gap-2">
                <span className="text-xl">▶</span> Start Quiz
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ═══════ INTRO — 3-2-1-GO! ═══════ */}
      {phase === "intro" && (
        <div className="flex flex-col items-center justify-center py-16 px-6 relative overflow-hidden" style={{ minHeight: "380px" }}>
          {/* Background gradient shifts with countdown */}
          <div className="absolute inset-0 transition-all duration-700" style={{
            background: `radial-gradient(circle at 50% 50%, ${introColors[3 - Math.max(introCount, 0)]}20, transparent 70%)`,
          }} />

          {/* Floating shapes accelerate */}
          {KAHOOT_ANSWERS.map((a, i) => (
            <div key={i} className="absolute animate-float font-bold select-none" style={{
              fontSize: `${32 + i * 10}px`, color: a.bg, opacity: 0.12 + (3 - Math.max(introCount, 0)) * 0.03,
              top: `${12 + i * 20}%`, left: `${6 + i * 24}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${Math.max(1.5, 4 - (3 - Math.max(introCount, 0)))}s`,
            }}>
              {a.shape}
            </div>
          ))}

          <div className="relative z-10 text-center">
            <div className="text-sm font-bold text-white/30 uppercase tracking-[0.2em] mb-4 animate-fade-in">
              Get Ready!
            </div>

            {/* Controller illustration shrinks as countdown progresses */}
            <div className="w-24 h-20 mx-auto mb-2 animate-fade-in" style={{ opacity: 0.4 + (Math.max(introCount, 0) / 3) * 0.4 }}>
              <IntroIllustration className="w-full h-full" />
            </div>

            <CountdownRing
              number={introCount}
              color={introColors[3 - Math.max(introCount, 0)]}
            />

            <div className="mt-8 text-white/20 text-sm animate-fade-in">
              {questions.length} questions · Answer fast for bonus points!
            </div>
          </div>
        </div>
      )}

      {/* ═══════ QUESTION + FEEDBACK ═══════ */}
      {(phase === "question" || phase === "feedback") && q && (
        <div className="relative">
          {/* ─── Dashed progress segments (Kahoot-style) ─── */}
          <div className="flex gap-1 px-4 pt-3 pb-1">
            {questions.map((_, i) => {
              const answered = answers[i];
              return (
                <div
                  key={i}
                  className="flex-1 rounded-full transition-all duration-300"
                  style={{
                    height: "4px",
                    background: answered
                      ? answered.correct ? "rgba(255,255,255,0.85)" : "rgba(226,27,60,0.6)"
                      : i === currentQ ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.12)",
                  }}
                />
              );
            })}
          </div>

          {/* Timer bar */}
          <TimerBar
            key={currentQ}
            duration={timePerQuestion}
            paused={timerPaused}
            onTimeUp={handleTimeUp}
          />

          {/* Header — score + streak */}
          <div className="px-5 py-2 flex items-center justify-between">
            <span className="text-xs text-white/30 font-medium">{currentQ + 1} of {questions.length}</span>
            <div className="flex items-center gap-3">
              {streak >= 2 && (
                <div key={streak} className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold animate-bounce-in" style={{
                  background: "rgba(235,103,15,0.15)", color: "#EB670F",
                  border: "1px solid rgba(235,103,15,0.3)",
                  boxShadow: "0 0 12px rgba(235,103,15,0.2)",
                }}>
                  <StreakFireIllustration className="w-6 h-8 -my-1" />
                  <span>{streak} streak!</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-sm font-display font-bold" style={{ color: "#FFA602", textShadow: "0 0 10px rgba(255,166,2,0.3)" }}>
                <span className="text-base">⚡</span>
                <span key={score} className="animate-scale-in">{score.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Question content */}
          <div className="px-4 pb-5">
            {/* ─── Kahoot-style card with illustration + question bar ─── */}
            <div className="quiz-question-card mx-auto max-w-2xl p-4 md:p-6 mb-4">
              {/* Large illustration with Ken Burns float */}
              {(() => {
                const Illus = q.illustration ? ILLUSTRATIONS[q.illustration] : null;
                return Illus ? (
                  <div className="quiz-illustration-float w-full h-32 sm:h-48 md:h-72 mb-4 rounded-xl overflow-hidden flex items-center justify-center" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <Illus className="w-full h-full" />
                  </div>
                ) : q.image ? (
                  <div className="quiz-illustration-float w-full mb-4 rounded-xl overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={q.image} alt="" className="w-full h-auto" />
                  </div>
                ) : null;
              })()}

              {/* White question bar (Kahoot-style) */}
              <div className="quiz-question-bar text-center">
                <h3 key={q.id} className="text-base md:text-lg font-display font-bold leading-snug animate-fade-in-up" style={{ color: "#333" }}>
                  {q.text}
                </h3>
              </div>
            </div>

            {/* ─── Answer Grid (Kahoot: 2×2 colored blocks) ─── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
              {q.options.map((opt, oi) => {
                const style = KAHOOT_ANSWERS[oi % KAHOOT_ANSWERS.length];
                const isSelected = selectedId === opt.id;
                const isCorrect = opt.id === q.correctId;
                const showResult = phase === "feedback";

                /* Kahoot CSS ref: raised 3D with box-shadow, 0.25rem radius, translateY hover/active */
                let containerStyle: React.CSSProperties = {
                  background: style.bg,
                  boxShadow: style.shadow,
                  borderRadius: "0.25rem",
                };
                let extraClasses = "";

                if (showResult) {
                  if (isCorrect) {
                    containerStyle = {
                      ...containerStyle,
                      border: "3px solid rgba(255,255,255,0.9)",
                      boxShadow: `0 0 20px ${style.bg}80`,
                      transform: "scale(1.02)",
                    };
                    extraClasses = "quiz-answer-correct-glow";
                  } else if (isSelected && !isCorrect) {
                    containerStyle = {
                      ...containerStyle,
                      opacity: 0.4,
                    };
                    extraClasses = "animate-wrong-shake";
                  } else {
                    /* Kahoot CSS ref: .answer-block--dimmed { opacity: 0.4 } */
                    containerStyle = { ...containerStyle, opacity: 0.4, pointerEvents: "none" };
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      if (phase === "question" && !selectedId) handleAnswer(opt.id);
                    }}
                    disabled={phase === "feedback" || selectedId !== null}
                    className={`
                      flex items-center gap-3 p-4 md:p-5 text-white font-bold text-left
                      relative overflow-hidden animate-fade-in-up
                      ${phase === "question" && !selectedId ? "hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer" : "cursor-default"}
                      ${extraClasses}
                    `}
                    /* Kahoot CSS ref: transition transform 0.1s ease, opacity 0.2s ease */
                    style={{
                      ...containerStyle,
                      animationDelay: `${oi * 100}ms`,
                    }}
                  >
                    {/* Shape icon + keyboard shortcut hint */}
                    <span className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-xl bg-black/20 relative">
                      {style.shape}
                      {/* Keyboard shortcut hint (Kahoot shows key numbers) */}
                      {phase === "question" && !selectedId && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-black/40 text-[10px] font-bold flex items-center justify-center text-white/60">
                          {oi + 1}
                        </span>
                      )}
                    </span>

                    {/* Answer text — Kahoot CSS ref: clamp(1rem, 2vw, 1.25rem) weight 700 */}
                    <span className="leading-snug flex-1" style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", fontWeight: 700 }}>{opt.text}</span>

                    {/* Result indicators */}
                    {showResult && isCorrect && (
                      <span className="flex-shrink-0 w-9 h-9 rounded-full bg-white/25 flex items-center justify-center animate-bounce-in text-lg">
                        ✓
                      </span>
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <span className="flex-shrink-0 w-9 h-9 rounded-full bg-white/25 flex items-center justify-center text-lg">
                        ✗
                      </span>
                    )}

                    {/* Hover shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 pointer-events-none rounded-2xl" />
                  </button>
                );
              })}
            </div>

            {/* ─── Feedback panel with illustrations ─── */}
            {phase === "feedback" && lastAnswer && (
              <div ref={feedbackRef} className="mt-5 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                <div className={`p-4 rounded-2xl text-sm relative overflow-hidden ${
                  lastAnswer.correct
                    ? "quiz-feedback-correct"
                    : "quiz-feedback-wrong"
                }`}>
                  {/* Illustration + text side by side */}
                  <div className="flex items-start gap-4">
                    {/* Animated illustration */}
                    <div className="flex-shrink-0 w-16 h-16 -mt-1">
                      {lastAnswer.correct ? (
                        <CorrectIllustration className="w-full h-full" />
                      ) : lastAnswer.selectedId === null ? (
                        <TimeoutIllustration className="w-full h-full" />
                      ) : (
                        <WrongIllustration className="w-full h-full" />
                      )}
                    </div>

                    <div className="flex-1">
                      {/* Points earned badge */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-display font-bold text-base" style={{ color: lastAnswer.correct ? "#4CD929" : lastAnswer.selectedId === null ? "#FFA602" : "#FF6B7A" }}>
                          {lastAnswer.correct ? "Correct!" : lastAnswer.selectedId === null ? "Time\u2019s up!" : "Not quite!"}
                        </span>
                        {lastAnswer.correct && (
                          <span className="quiz-points-badge text-xs font-bold px-2.5 py-1 rounded-full animate-scale-in" style={{
                            background: "rgba(255,166,2,0.2)", color: "#FFA602",
                            border: "1px solid rgba(255,166,2,0.3)",
                          }}>
                            +{lastAnswer.points} pts
                          </span>
                        )}
                      </div>
                      <p style={{ color: "rgba(240,239,235,0.7)" }}>{q.explanation}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* ─── Full-screen feedback overlay ─── */}
          {phase === "feedback" && (
            <div
              className="absolute inset-0 pointer-events-none z-10 quiz-screen-flash"
              style={{
                background: lastAnswer?.correct
                  ? "radial-gradient(circle at 50% 40%, rgba(38,137,12,0.25), transparent 70%)"
                  : "radial-gradient(circle at 50% 40%, rgba(226,27,60,0.2), transparent 70%)",
              }}
            />
          )}

          {/* ─── Floating emoji burst ─── */}
          {showEmojis && (
            <FloatingEmojis
              emojis={lastAnswer?.correct ? CORRECT_EMOJIS : WRONG_EMOJIS}
              count={lastAnswer?.correct ? 10 : 4}
            />
          )}

          {/* ─── Particle burst on correct ─── */}
          {showParticles && lastAnswer?.correct && (
            <Particles color="#FFA602" count={24} />
          )}
        </div>
      )}

      {/* ═══════ RESULTS ═══════ */}
      {phase === "results" && (
        <div className="px-6 py-10 text-center relative overflow-hidden" style={{ minHeight: "380px" }}>
          {/* Animated gradient background */}
          <div className="absolute inset-0" style={{
            background: "radial-gradient(circle at 30% 20%, rgba(19,104,206,0.12), transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,166,2,0.08), transparent 50%)",
          }} />

          {/* Perfect score floating shapes */}
          {correctCount === questions.length && KAHOOT_ANSWERS.map((a, i) => (
            <div key={i} className="absolute animate-float font-bold select-none" style={{
              fontSize: `${24 + i * 8}px`, color: a.bg, opacity: 0.1,
              top: `${8 + i * 22}%`, left: `${6 + i * 25}%`,
              animationDelay: `${i * 0.5}s`,
            }}>
              {a.shape}
            </div>
          ))}

          {/* Perfect score emoji shower */}
          {correctCount === questions.length && (
            <FloatingEmojis emojis={["🏆", "🎉", "⭐", "✨", "🔥", "💎"]} count={12} />
          )}

          <div className="relative z-10">
            {/* Trophy / rank illustration */}
            <div className="w-44 h-40 mx-auto mb-2 animate-bounce-in">
              <TrophyIllustration
                className="w-full h-full"
                tier={
                  correctCount === questions.length ? "gold"
                    : correctCount >= questions.length * 0.7 ? "silver"
                    : correctCount >= questions.length * 0.4 ? "bronze"
                    : "try"
                }
              />
            </div>

            {/* Rank title */}
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-1 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              {correctCount === questions.length ? "Perfect Score!"
                : correctCount >= questions.length * 0.7 ? "Great Job!"
                : correctCount >= questions.length * 0.4 ? "Good Effort!"
                : "Keep Learning!"}
            </h3>
            <p className="text-white/30 text-sm mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
              Quiz Complete
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto mb-8">
              {[
                { icon: "⚡", value: score.toLocaleString(), label: "Points", color: "#FFA602", borderColor: "rgba(255,166,2,0.25)", bg: "rgba(255,166,2,0.08)" },
                { icon: "✓", value: `${correctCount}/${questions.length}`, label: "Correct", color: "#4CD929", borderColor: "rgba(38,137,12,0.25)", bg: "rgba(38,137,12,0.08)" },
                { icon: "🔥", value: `${maxStreak}`, label: "Best Streak", color: "#EB670F", borderColor: "rgba(235,103,15,0.25)", bg: "rgba(235,103,15,0.08)" },
              ].map((stat, i) => (
                <div key={stat.label} className="rounded-2xl p-4 animate-fade-in-up" style={{
                  background: stat.bg, border: `1px solid ${stat.borderColor}`,
                  animationDelay: `${200 + i * 100}ms`,
                }}>
                  <div className="text-xl mb-1">{stat.icon}</div>
                  <div className="text-xl font-display font-bold" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-2xs text-white/35 mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Per-question breakdown */}
            <div className="max-w-sm mx-auto mb-8 space-y-1.5 text-left">
              {answers.map((a, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 animate-fade-in-up" style={{
                  background: a.correct ? "rgba(38,137,12,0.06)" : "rgba(226,27,60,0.06)",
                  border: `1px solid ${a.correct ? "rgba(38,137,12,0.12)" : "rgba(226,27,60,0.12)"}`,
                  animationDelay: `${500 + i * 80}ms`,
                }}>
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white`} style={{ background: a.correct ? "#26890C" : "#E21B3C" }}>
                    {a.correct ? "✓" : "✗"}
                  </span>
                  <span className="text-sm text-white/60 flex-1 truncate">{questions[i].text}</span>
                  {a.correct && (
                    <span className="text-xs font-bold flex-shrink-0" style={{ color: "#FFA602" }}>+{a.points}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Play Again button */}
            <button
              onClick={handleStart}
              className="group font-display font-bold px-8 py-3.5 rounded-2xl text-white transition-all hover:scale-105 active:scale-95 animate-fade-in-up relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #1368CE, #0D4F9E)", boxShadow: "0 6px 24px rgba(19,104,206,0.4)", animationDelay: "700ms" }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              <span className="relative flex items-center gap-2">
                🔄 Play Again
              </span>
            </button>
            {questionPool.length > questionsPerRound && (
              <p className="text-white/20 text-xs mt-3 animate-fade-in" style={{ animationDelay: "900ms" }}>
                🔀 New questions each time you play!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
