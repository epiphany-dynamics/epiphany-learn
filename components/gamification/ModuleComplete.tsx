"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Badge } from "@/lib/achievements";
import { getRewardForModule } from "@/lib/rewards";
import Confetti from "./Confetti";

interface Props {
  visible: boolean;
  moduleTitle: string;
  moduleId: string;
  xpEarned: number;
  totalXP: number;
  streak: number;
  lessonsCompleted: number;
  badgeEarned?: Badge | null;
  nextModuleId?: string | null;
  nextModuleTitle?: string | null;
  onDismiss: () => void;
}

export default function ModuleComplete({
  visible,
  moduleTitle,
  moduleId,
  xpEarned,
  totalXP,
  streak,
  lessonsCompleted,
  badgeEarned,
  nextModuleId,
  nextModuleTitle,
  onDismiss,
}: Props) {
  const reward = getRewardForModule(moduleId);

  return (
    <AnimatePresence>
      {visible && (
        <>
          <Confetti count={80} active={visible} />

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onDismiss}
          >
            {/* Card */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-3xl max-w-md w-full overflow-hidden"
              style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.9)" }}
            >
              {/* Header gradient */}
              <div className="px-8 pt-8 pb-10 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1368CE, #0D4F9E)" }}>
                {/* Decorative rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full border border-white/10" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full border border-white/10" />
                </div>

                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.2 }}
                  className="text-6xl mb-4 relative z-10"
                >
                  🎓
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold font-display text-white mb-1 relative z-10"
                >
                  Module Complete!
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="text-white/60 text-sm relative z-10"
                >
                  {moduleTitle}
                </motion.p>
              </div>

              {/* Stats */}
              <div className="px-8 py-6">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-3 gap-3 mb-6"
                >
                  <StatCard icon="⚡" value={`+${xpEarned}`} label="XP Earned" color="#FFA602" />
                  <StatCard icon="📚" value={`${lessonsCompleted}`} label="Lessons" color="#26890C" />
                  <StatCard icon="🔥" value={`${streak}d`} label="Streak" color="#EB670F" />
                </motion.div>

                {/* Badge earned */}
                {badgeEarned && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 400, damping: 20 }}
                    className="flex items-center gap-4 rounded-2xl p-4 mb-6"
                    style={{ background: "rgba(255, 166, 2, 0.1)", border: "1px solid rgba(255, 166, 2, 0.2)" }}
                  >
                    <motion.div
                      animate={{ rotate: [0, -10, 10, -6, 6, 0] }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                      className="flex-shrink-0 w-12 h-12 flex items-center justify-center"
                    >
                      {badgeEarned.svgPath ? (
                        <Image src={badgeEarned.svgPath} alt={badgeEarned.title} width={48} height={48} />
                      ) : (
                        <span className="text-3xl">{badgeEarned.icon}</span>
                      )}
                    </motion.div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#FFA602" }}>
                        🏆 Badge Unlocked
                      </p>
                      <p className="font-bold font-display" style={{ color: "#F0EFEB" }}>{badgeEarned.title}</p>
                      <p className="text-xs" style={{ color: "rgba(240, 239, 235, 0.5)" }}>{badgeEarned.description}</p>
                    </div>
                  </motion.div>
                )}

                {/* Reward unlocked */}
                {reward && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.55, type: "spring", stiffness: 400, damping: 20 }}
                    className="rounded-2xl p-4 mb-6"
                    style={{ background: "rgba(0, 201, 183, 0.08)", border: "1px solid rgba(0, 201, 183, 0.2)" }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{reward.icon}</span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#00C9B7" }}>
                          🎁 Cheat Sheet Unlocked
                        </p>
                        <p className="font-bold font-display text-sm" style={{ color: "#F0EFEB" }}>{reward.title}</p>
                      </div>
                    </div>
                    <p className="text-xs mb-3" style={{ color: "rgba(240, 239, 235, 0.5)" }}>{reward.description}</p>
                    <Link
                      href="/rewards"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                      style={{ background: "rgba(0, 201, 183, 0.15)", color: "#00C9B7" }}
                      onClick={onDismiss}
                    >
                      View My Rewards →
                    </Link>
                  </motion.div>
                )}

                {/* Total XP */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-center text-sm mb-5"
                  style={{ color: "rgba(240, 239, 235, 0.5)" }}
                >
                  Total XP: <span className="font-bold" style={{ color: "#FFA602" }}>{totalXP}</span>
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-3"
                >
                  {nextModuleId ? (
                    <Link
                      href={`/modules/${nextModuleId}`}
                      className="lesson-nav-btn block w-full text-center text-white font-semibold py-3.5 rounded-xl transition-colors"
                      style={{ background: "#1368CE" }}
                      onClick={onDismiss}
                    >
                      Next: {nextModuleTitle} →
                    </Link>
                  ) : (
                    <Link
                      href="/dashboard"
                      className="lesson-nav-btn block w-full text-center text-white font-semibold py-3.5 rounded-xl transition-colors"
                      style={{ background: "#1368CE" }}
                      onClick={onDismiss}
                    >
                      View Dashboard →
                    </Link>
                  )}
                  <button
                    onClick={onDismiss}
                    className="block w-full text-center text-sm py-2 transition-colors"
                    style={{ color: "rgba(240, 239, 235, 0.4)" }}
                  >
                    Close
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function StatCard({
  icon,
  value,
  label,
  color,
}: {
  icon: string;
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div
      className="rounded-xl p-3 text-center"
      style={{ background: `${color}15`, border: `1px solid ${color}30` }}
    >
      <div className="text-2xl mb-1">{icon}</div>
      <div className="font-bold font-display text-lg leading-tight" style={{ color }}>{value}</div>
      <div className="text-xs mt-0.5" style={{ color: "rgba(240, 239, 235, 0.5)" }}>{label}</div>
    </div>
  );
}
