"use client";

import { useState } from "react";

interface Props {
  id?: string;
  label: string;
  reveal: string;
}

const STARS = [
  { top: "8%",  left: "6%",   size: 2, delay: 0,    duration: 2.8, peak: 0.7 },
  { top: "15%", left: "22%",  size: 1, delay: 0.6,  duration: 3.5, peak: 0.4 },
  { top: "12%", right: "10%", size: 3, delay: 1.2,  duration: 2.4, peak: 0.6 },
  { top: "25%", right: "22%", size: 1, delay: 0.3,  duration: 4.0, peak: 0.5 },
  { top: "35%", left: "5%",   size: 2, delay: 1.8,  duration: 3.1, peak: 0.4 },
  { top: "45%", left: "18%",  size: 1, delay: 0.9,  duration: 2.6, peak: 0.6 },
  { top: "55%", right: "8%",  size: 2, delay: 2.1,  duration: 3.8, peak: 0.5 },
  { top: "60%", left: "40%",  size: 1, delay: 0.4,  duration: 2.9, peak: 0.3 },
  { top: "70%", right: "25%", size: 3, delay: 1.5,  duration: 3.3, peak: 0.7 },
  { top: "75%", left: "10%",  size: 1, delay: 2.4,  duration: 4.2, peak: 0.4 },
  { top: "82%", right: "15%", size: 2, delay: 0.7,  duration: 3.0, peak: 0.5 },
  { top: "88%", left: "55%",  size: 1, delay: 1.1,  duration: 2.7, peak: 0.6 },
  { top: "30%", left: "60%",  size: 2, delay: 1.9,  duration: 3.6, peak: 0.4 },
  { top: "50%", left: "75%",  size: 1, delay: 0.2,  duration: 2.5, peak: 0.5 },
  { top: "20%", left: "45%",  size: 1, delay: 2.7,  duration: 4.5, peak: 0.3 },
];

export default function RevealCard({ label, reveal }: Props) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasBeenRevealed, setHasBeenRevealed] = useState(false);

  function handleClick() {
    setIsRevealed(!isRevealed);
    if (!hasBeenRevealed) setHasBeenRevealed(true);
  }

  return (
    <div
      className="my-3 select-none cursor-pointer group"
      style={{ display: "grid", gridTemplate: "1fr / 1fr" }}
      onClick={handleClick}
      role="button"
      aria-expanded={isRevealed}
    >
      {/* ════ FRONT FACE ════ */}
      <div
        className="rounded-2xl p-5 flex items-center justify-between gap-4 relative overflow-hidden"
        style={{
          gridArea: "1 / 1",
          background: "radial-gradient(ellipse at 70% 20%, rgba(19,104,206,0.08) 0%, rgba(10,10,12,0.95) 50%, rgba(8,8,10,1) 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
          opacity: isRevealed ? 0 : 1,
          transform: isRevealed ? "scale(0.97)" : "scale(1)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
          pointerEvents: isRevealed ? "none" : "auto",
        }}
      >
        {/* Animated shimmer */}
        <div className="reveal-card-shimmer absolute inset-0 pointer-events-none" />

        {/* Star field */}
        {STARS.map((s, i) => (
          <div
            key={i}
            className="reveal-card-sparkle"
            style={{
              top: s.top,
              left: s.left,
              right: s.right,
              width: s.size,
              height: s.size,
              "--star-delay": `${s.delay}s`,
              "--star-duration": `${s.duration}s`,
              "--star-peak": s.peak,
            } as React.CSSProperties}
          />
        ))}

        {/* Content */}
        <div className="flex items-center gap-3 relative z-10">
          <span
            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
            style={{
              background: "linear-gradient(135deg, var(--module-color, #1368CE), var(--module-color, #1368CE)90)",
              color: "#fff",
              boxShadow: "0 4px 12px var(--module-glow, rgba(19,104,206,0.3))",
              animation: "questionPulse 2.5s ease-in-out infinite",
            }}
          >
            ?
          </span>
          <span className="font-display font-medium text-[#F0EFEB]/80 group-hover:text-[#F0EFEB] transition-colors">
            {label}
          </span>
        </div>

        {/* Tap indicator */}
        <div className="flex items-center gap-2 relative z-10">
          <span
            className="text-xs text-white/25 flex-shrink-0 tracking-wider uppercase font-bold group-hover:text-white/40 transition-colors"
            style={{ animation: "tapPulse 2s ease-in-out infinite" }}
          >
            Tap to reveal
          </span>
          <span className="text-white/20 group-hover:text-white/40 group-hover:translate-x-0.5 transition-all text-lg">
            →
          </span>
        </div>

        {/* Glow border on hover */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow: "inset 0 0 20px var(--module-glow, rgba(19,104,206,0.15)), 0 0 30px var(--module-glow, rgba(19,104,206,0.1))",
          }}
        />
      </div>

      {/* ════ BACK FACE ════ */}
      <div
        className="rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden"
        style={{
          gridArea: "1 / 1",
          background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
          border: "2px solid var(--module-color, rgba(0,201,183,0.5))",
          boxShadow: "0 0 30px var(--module-glow, rgba(0,201,183,0.25)), inset 0 1px 0 rgba(255,255,255,0.08)",
          opacity: isRevealed ? 1 : 0,
          transform: isRevealed ? "scale(1)" : "scale(0.97)",
          transition: "opacity 0.25s ease 0.05s, transform 0.25s ease 0.05s",
          pointerEvents: isRevealed ? "auto" : "none",
        }}
      >
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(135deg, var(--module-bg-light, rgba(0,201,183,0.08)), transparent)" }}
        />

        {/* Sparkle burst on first reveal */}
        {hasBeenRevealed && isRevealed && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 3,
                  height: 3,
                  background: "var(--module-color, #00C9B7)",
                  top: `${20 + Math.random() * 60}%`,
                  left: `${10 + Math.random() * 80}%`,
                  animation: `revealSparkle ${1.5 + Math.random()}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 1.5}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Header */}
        <div className="flex items-center gap-3 relative">
          <span
            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
            style={{
              background: "var(--module-color, #00C9B7)",
              boxShadow: "0 4px 12px var(--module-glow, rgba(0,201,183,0.3))",
            }}
          >
            ✓
          </span>
          <span className="font-display font-medium text-[#F0EFEB]">
            {label}
          </span>
        </div>

        {/* Revealed content */}
        <p className="text-[#F0EFEB]/75 text-sm leading-relaxed relative">
          {reveal}
        </p>

        {/* Tap to flip back hint */}
        <div className="text-xs text-white/20 text-right mt-1">
          ← Tap to hide
        </div>
      </div>
    </div>
  );
}
