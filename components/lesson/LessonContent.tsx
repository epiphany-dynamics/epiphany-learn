"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  completeLesson,
  isLessonCompleted,
  setLastVisited,
  getProgress,
  awardBadge,
  unlockReward,
  getCompletedLessonCount,
} from "@/lib/progress";
import { BADGES } from "@/lib/achievements";
import { getRewardForModule } from "@/lib/rewards";
import type { Lesson, ModuleMeta } from "@/lib/content";
import { getModuleColor } from "@/lib/module-colors";
import XPBurst from "@/components/gamification/XPBurst";
import BadgeToast from "@/components/gamification/BadgeToast";
import Confetti from "@/components/gamification/Confetti";
import ModuleComplete from "@/components/gamification/ModuleComplete";
import SlideRenderer from "./SlideRenderer";

interface Props {
  lesson: Lesson;
  moduleId: string;
  moduleTitle: string;
  moduleBadgeId?: string;
  totalLessons: number;
  nextModuleId?: string | null;
  nextModuleTitle?: string | null;
  prevLesson: ModuleMeta["lessons"][number] | null;
  nextLesson: ModuleMeta["lessons"][number] | null;
  children: React.ReactNode;
}

export default function LessonContent({
  lesson,
  moduleId,
  moduleTitle,
  moduleBadgeId,
  totalLessons,
  nextModuleId,
  nextModuleTitle,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  prevLesson,
  nextLesson,
  children,
}: Props) {
  const [completed, setCompleted] = useState(false);
  const [showXP, setShowXP] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showModuleComplete, setShowModuleComplete] = useState(false);
  const [earnedBadge, setEarnedBadge] = useState<(typeof BADGES)[string] | null>(null);
  const [completionStats, setCompletionStats] = useState({
    xpEarned: 0,
    totalXP: 0,
    streak: 0,
    lessonsCompleted: 0,
  });
  const startedAtRef = useRef(Date.now());
  const isLastLesson = nextLesson === null;

  useEffect(() => {
    setCompleted(isLessonCompleted(moduleId, lesson.id));
    setLastVisited(moduleId, lesson.slug, lesson.title);
  }, [moduleId, lesson.id, lesson.slug, lesson.title]);

  function handleComplete() {
    if (completed) return;

    const prevState = getProgress();
    const prevTotalCompleted = Object.values(prevState.modules)
      .flatMap((m) => Object.values(m.lessons))
      .filter((l) => l.completed).length;

    const newState = completeLesson(moduleId, lesson.id, lesson.xpReward);
    setCompleted(true);

    const badgesAwarded: string[] = [];

    if (prevTotalCompleted === 0) {
      awardBadge("first-lesson");
      badgesAwarded.push("first-lesson");
    }

    const elapsedMinutes = (Date.now() - startedAtRef.current) / 60000;
    if (elapsedMinutes < 5 && !prevState.badges.includes("speed-learner")) {
      awardBadge("speed-learner");
      badgesAwarded.push("speed-learner");
    }

    if (isLastLesson && moduleBadgeId && !prevState.badges.includes(moduleBadgeId)) {
      awardBadge(moduleBadgeId);
      badgesAwarded.push(moduleBadgeId);
    }

    setShowXP(true);
    setTimeout(() => setShowXP(false), 2000);

    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3500);

    const priorityBadgeId =
      badgesAwarded.find((b) => b === moduleBadgeId) ||
      badgesAwarded.find((b) => b === "first-lesson") ||
      badgesAwarded[0];
    if (priorityBadgeId && BADGES[priorityBadgeId]) {
      setEarnedBadge(BADGES[priorityBadgeId]);
    }

    const completedInModule = getCompletedLessonCount(moduleId);
    const badgeXP = priorityBadgeId ? (BADGES[priorityBadgeId]?.xpReward ?? 0) : 0;
    setCompletionStats({
      xpEarned: lesson.xpReward + badgeXP,
      totalXP: newState.xp,
      streak: newState.streak,
      lessonsCompleted: Math.min(completedInModule, totalLessons),
    });

    if (isLastLesson) {
      // Unlock the cheat sheet reward for this module
      const reward = getRewardForModule(moduleId);
      if (reward) {
        unlockReward(reward.id);
      }
      setTimeout(() => setShowModuleComplete(true), 1800);
    }
  }

  const color = getModuleColor(moduleId);

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 64px)" }}>
      {/* Gamification overlays */}
      <XPBurst xp={lesson.xpReward} visible={showXP} />
      <Confetti count={60} active={showConfetti} />

      {earnedBadge && (
        <BadgeToast
          badge={earnedBadge}
          onDismiss={() => setEarnedBadge(null)}
          autoDismissMs={6000}
        />
      )}

      <ModuleComplete
        visible={showModuleComplete}
        moduleTitle={moduleTitle}
        moduleId={moduleId}
        xpEarned={completionStats.xpEarned}
        totalXP={completionStats.totalXP}
        streak={completionStats.streak}
        lessonsCompleted={completionStats.lessonsCompleted}
        badgeEarned={moduleBadgeId ? (BADGES[moduleBadgeId] ?? null) : null}
        nextModuleId={nextModuleId}
        nextModuleTitle={nextModuleTitle}
        onDismiss={() => setShowModuleComplete(false)}
      />

      {/* ═══ SLIDE-BASED CONTENT ═══ */}
      <div className="flex-1 flex flex-col min-h-0">
        <SlideRenderer color={color.hex} glow={color.glow}>
          {children}

          {/* Completion slide — injected as the last section after a break */}
          <div className="flex flex-col items-center justify-center text-center py-8">
            {!completed ? (
              <>
                <div className="text-5xl mb-5 animate-bounce-in">🎓</div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-[#F0EFEB] mb-3">
                  Ready to complete this lesson?
                </h2>
                <p className="text-[#F0EFEB]/50 mb-6 max-w-sm">
                  You&apos;ve reached the end! Hit the button below to earn your XP.
                </p>
                <button
                  onClick={handleComplete}
                  className="group font-display font-bold px-10 py-4 rounded-2xl text-white text-lg transition-all hover:scale-105 active:scale-95 relative overflow-hidden"
                  style={{ background: color.gradient, boxShadow: `0 6px 24px ${color.glow}` }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                  <span className="relative flex items-center gap-2">
                    Mark Complete — Earn {lesson.xpReward} XP ⚡
                  </span>
                </button>
              </>
            ) : (
              <>
                <div className="text-5xl mb-5">✅</div>
                <h2 className="text-2xl font-display font-bold mb-3" style={{ color: "#4CD929" }}>
                  Lesson Complete!
                </h2>
                <p className="text-[#F0EFEB]/40 mb-6">You earned {lesson.xpReward} XP for this lesson.</p>
              </>
            )}

            {/* Navigation — only shows AFTER completing */}
            {completed && (
              <div className="flex flex-col items-center gap-3 mt-6 w-full max-w-sm mx-auto">
                {nextLesson ? (
                  <Link
                    href={`/modules/${moduleId}/${nextLesson.slug}`}
                    className="lesson-nav-btn block w-full text-center font-display font-bold px-8 py-4 rounded-2xl text-lg"
                    style={{ background: color.hex, boxShadow: `0 6px 24px ${color.glow}` }}
                  >
                    Next Lesson: {nextLesson.title} →
                  </Link>
                ) : nextModuleId ? (
                  <Link
                    href={`/modules/${nextModuleId}`}
                    className="lesson-nav-btn block w-full text-center font-display font-bold px-8 py-4 rounded-2xl text-lg"
                    style={{ background: "#1368CE", boxShadow: "0 6px 24px rgba(19,104,206,0.4)" }}
                  >
                    Next Module: {nextModuleTitle ?? "Continue"} →
                  </Link>
                ) : (
                  <Link
                    href="/dashboard"
                    className="lesson-nav-btn block w-full text-center font-display font-bold px-8 py-4 rounded-2xl text-lg"
                    style={{ background: "#FFA602", boxShadow: "0 6px 24px rgba(255,166,2,0.4)" }}
                  >
                    View Your Progress →
                  </Link>
                )}
                <Link
                  href={`/modules/${moduleId}`}
                  className="text-[#F0EFEB]/30 hover:text-[#F0EFEB]/60 transition-colors text-sm mt-2"
                >
                  ← Back to {moduleTitle}
                </Link>
              </div>
            )}
          </div>
        </SlideRenderer>
      </div>
    </div>
  );
}
