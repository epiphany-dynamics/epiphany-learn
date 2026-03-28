"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProgress, type ProgressState } from "@/lib/progress";
import { MODULE_REWARDS, ALL_MODULE_IDS, hasCompletedAllModules } from "@/lib/rewards";
import Certificate from "@/components/gamification/Certificate";

export default function RewardsPage() {
  const [progress, setProgress] = useState<ProgressState | null>(null);
  const [certName, setCertName] = useState("");

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  if (!progress) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-page)" }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "var(--accent-blue)", borderTopColor: "transparent" }} />
      </div>
    );
  }

  const completedModuleIds = Object.entries(progress.modules)
    .filter(([, m]) => m.completed)
    .map(([id]) => id);

  const allComplete = hasCompletedAllModules(completedModuleIds);

  return (
    <main className="min-h-screen" style={{ background: "var(--bg-page)" }}>
      {/* Header */}
      <div className="max-w-3xl mx-auto px-6 pt-10 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <Link href="/dashboard" className="text-sm transition-colors" style={{ color: "var(--text-muted)" }}>
            ← Dashboard
          </Link>
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold" style={{ color: "var(--text-primary)" }}>
          My Rewards
        </h1>
        <p className="mt-2" style={{ color: "var(--text-secondary)" }}>
          Complete modules to unlock free cheat sheets. Finish all 7 to earn your certificate.
        </p>
      </div>

      {/* Certificate Section */}
      <div className="max-w-3xl mx-auto px-6 mb-10">
        <div
          className="rounded-2xl p-6 md:p-8 relative overflow-hidden"
          style={{
            background: allComplete
              ? "linear-gradient(135deg, rgba(255, 166, 2, 0.12), rgba(226, 27, 60, 0.08))"
              : "var(--bg-card)",
            border: allComplete
              ? "1px solid rgba(255, 166, 2, 0.3)"
              : "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-start gap-5">
            <div className="text-5xl flex-shrink-0">
              {allComplete ? "🎓" : "🔒"}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-display font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                AI Literate Certificate
              </h2>
              {allComplete ? (
                <>
                  <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                    You completed all 7 modules. You earned this.
                  </p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>
                        Your name (for the certificate)
                      </label>
                      <input
                        type="text"
                        value={certName}
                        onChange={(e) => setCertName(e.target.value)}
                        placeholder="Enter your name"
                        className="px-3 py-2 rounded-lg text-sm font-medium outline-none transition-colors"
                        style={{
                          background: "var(--bg-elevated)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "var(--text-primary)",
                          width: "220px",
                        }}
                      />
                    </div>
                    <Certificate
                      userName={certName}
                      completionDate={progress.lastUpdated}
                      totalXP={progress.xp}
                    />
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                    Complete all 7 modules to unlock your AI Literate certificate — shareable on LinkedIn, printable, and proof you actually understand this stuff.
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(completedModuleIds.length / ALL_MODULE_IDS.length) * 100}%`,
                          background: "linear-gradient(90deg, #FFA602, #EB670F)",
                        }}
                      />
                    </div>
                    <span className="text-xs font-bold flex-shrink-0" style={{ color: "var(--text-muted)" }}>
                      {completedModuleIds.length}/{ALL_MODULE_IDS.length}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cheat Sheets Grid */}
      <div className="max-w-3xl mx-auto px-6 pb-16">
        <h2 className="text-lg font-display font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          Cheat Sheets
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {ALL_MODULE_IDS.map((moduleId, i) => {
            const reward = MODULE_REWARDS[moduleId];
            if (!reward) return null;
            const unlocked = completedModuleIds.includes(moduleId);

            return (
              <div
                key={moduleId}
                className="rounded-2xl p-5 transition-all"
                style={{
                  background: unlocked ? "var(--bg-card)" : "var(--bg-card)",
                  border: unlocked
                    ? "1px solid rgba(0, 201, 183, 0.2)"
                    : "1px solid rgba(255,255,255,0.04)",
                  opacity: unlocked ? 1 : 0.5,
                }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">
                    {unlocked ? reward.icon : "🔒"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold font-display text-sm mb-0.5" style={{ color: "var(--text-primary)" }}>
                      {reward.title}
                    </p>
                    <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
                      Module {i + 1} reward
                    </p>
                    {unlocked ? (
                      <>
                        <p className="text-xs mb-3" style={{ color: "var(--text-secondary)" }}>
                          {reward.description}
                        </p>
                        <a
                          href={`/rewards/${reward.fileName}`}
                          download
                          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                          style={{ background: "rgba(0, 201, 183, 0.12)", color: "#00C9B7" }}
                        >
                          ⬇ Download PDF
                        </a>
                      </>
                    ) : (
                      <p className="text-xs" style={{ color: "var(--text-faint)" }}>
                        Complete Module {i + 1} to unlock
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
