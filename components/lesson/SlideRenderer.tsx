"use client";

/**
 * SlideRenderer — Kahoot-style slide navigation with transitions
 *
 * KAHOOT RULES (from scraped reference files):
 * 1. NO section is EVER text-only — always has a large image/illustration
 * 2. Images take up 50%+ of visual space
 * 3. Text is SHORT — 1-2 sentences visible, rest scrollable within slide
 * 4. Headings are LARGE and dominate
 * 5. One section per viewport — click to advance, no scrolling between sections
 * 6. Navigation: Back/Next buttons + progress indicator
 * 7. Slide transitions — content fades/slides when navigating
 * 8. Stagger entrance — elements animate in one by one on each slide
 *
 * ARCHITECTURE: CSS show/hide (NOT DOM cloning)
 * Renders ALL MDX content normally (preserving React event handlers),
 * then uses CSS display:none/block to show one section at a time.
 * Transition layer adds fade+slide animation on top of the show/hide.
 * This keeps RevealCard, Quiz, DragDrop etc fully interactive.
 */

import { useState, useCallback, useEffect, useRef } from "react";

type TransitionPhase = "visible" | "exiting" | "entering";

interface Props {
  children: React.ReactNode;
  color: string;
  glow: string;
}

export default function SlideRenderer({ children, color, glow }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [totalSlides, setTotalSlides] = useState(0);
  const [current, setCurrent] = useState(0);
  const [displayedSlide, setDisplayedSlide] = useState(0);
  const [ready, setReady] = useState(false);

  // ─── Transition state machine ───
  const [phase, setPhase] = useState<TransitionPhase>("visible");
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [staggerActive, setStaggerActive] = useState(true);
  const pendingSlide = useRef(0);
  const isAnimating = useRef(false);

  // ─── On mount: tag each top-level node with its slide index ───
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const raf = requestAnimationFrame(() => {
      let slideIndex = 0;
      const children = Array.from(container.children) as HTMLElement[];

      for (const child of children) {
        if (child.hasAttribute("data-slide-break")) {
          // This is a break marker — hide it, increment slide index
          child.style.display = "none";
          slideIndex++;
        } else {
          // Tag this element with its slide index
          child.setAttribute("data-slide-idx", String(slideIndex));
        }
      }

      setTotalSlides(slideIndex + 1);
      setReady(true);
    });

    return () => cancelAnimationFrame(raf);
  }, [children]);

  // ─── Show/hide slides via CSS (based on displayedSlide, not current) ───
  useEffect(() => {
    if (!ready) return;
    const container = containerRef.current;
    if (!container) return;

    const tagged = container.querySelectorAll("[data-slide-idx]");
    tagged.forEach((el) => {
      const idx = parseInt(el.getAttribute("data-slide-idx") ?? "-1");
      (el as HTMLElement).style.display = idx === displayedSlide ? "" : "none";
    });

    // Scroll the slide area to top
    const scrollArea = container.closest(".slide-scroll-area");
    if (scrollArea) scrollArea.scrollTop = 0;
  }, [displayedSlide, ready]);

  // ─── Transition orchestrator ───
  const animateToSlide = useCallback((target: number, dir: "left" | "right") => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    pendingSlide.current = target;
    setDirection(dir);

    // Phase 1: exit current slide
    setPhase("exiting");

    setTimeout(() => {
      // Phase 2: swap which slide is shown, begin entering
      setDisplayedSlide(target);
      // Re-trigger stagger animations by toggling the class off then on
      setStaggerActive(false);
      setPhase("entering");

      // Force a frame so the "entering" initial transform is painted before we transition to visible
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase("visible");
          setStaggerActive(true); // re-enables stagger class, restarting CSS animations

          setTimeout(() => {
            isAnimating.current = false;
          }, 300);
        });
      });
    }, 200);
  }, []);

  // ─── Navigation ───
  const isFirst = current === 0;
  const isLast = totalSlides > 0 && current === totalSlides - 1;

  const goTo = useCallback((idx: number) => {
    if (idx < 0 || idx >= totalSlides) return;
    if (idx === current) return;
    if (isAnimating.current) return;
    const dir = idx > current ? "left" : "right";
    setCurrent(idx);
    animateToSlide(idx, dir);
  }, [totalSlides, current, animateToSlide]);

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Keyboard: arrow keys + space
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); goNext(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  // Touch swipe — require horizontal to exceed vertical to avoid hijacking scroll
  const touchStart = useRef({ x: 0, y: 0 });

  // ─── Compute transition CSS class ───
  let transitionClass = "slide-transition-visible";
  if (phase === "exiting") {
    transitionClass = direction === "left" ? "slide-transition-exit-left" : "slide-transition-exit-right";
  } else if (phase === "entering") {
    transitionClass = "slide-transition-enter";
  }

  return (
    <div
      className="slide-renderer flex flex-col"
      style={{ height: "calc(100vh - 64px)", minHeight: "500px" }}
      onTouchStart={(e) => {
        touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchStart.current.x;
        const dy = e.changedTouches[0].clientY - touchStart.current.y;
        // Only trigger swipe if horizontal movement is dominant (>2x vertical)
        // and exceeds minimum threshold of 80px
        if (Math.abs(dx) > Math.abs(dy) * 2 && Math.abs(dx) > 80) {
          if (dx < 0) goNext();
          else goPrev();
        }
      }}
    >
      {/* ═══ Slide Content ═══ */}
      <div className="flex-1 overflow-y-auto slide-scroll-area">
        <div className="max-w-2xl mx-auto px-5 py-6 md:py-8">
          {/* Slide counter */}
          {totalSlides > 1 && ready && (
            <div className="text-center mb-4">
              <span className="text-sm font-display font-bold tracking-wider" style={{ color }}>
                {current + 1} <span style={{ opacity: 0.4 }}>/ {totalSlides}</span>
              </span>
            </div>
          )}

          {/* Transition wrapper — animates fade+slide, stagger key re-triggers child animations */}
          <div className={`slide-transition-wrapper ${transitionClass}`}>
            {/* All MDX content — React stays alive, CSS handles visibility */}
            <div
              ref={containerRef}
              className={`prose-lesson slide-prose${staggerActive ? " slide-stagger-active" : ""}`}
            >
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Navigation Bar ═══ */}
      {totalSlides > 1 && ready && (
        <div
          className="flex-shrink-0 px-5 py-3 flex items-center justify-between gap-3"
          style={{
            background: "rgba(5,5,5,0.95)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Back */}
          <button
            onClick={goPrev}
            disabled={isFirst}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-15 disabled:hover:scale-100 min-w-[90px]"
            style={{
              color: isFirst ? "rgba(255,255,255,0.15)" : color,
              background: isFirst ? "transparent" : `${color}10`,
              border: `1.5px solid ${isFirst ? "rgba(255,255,255,0.04)" : `${color}25`}`,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Back
          </button>

          {/* Progress dots */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === current ? 28 : 10,
                  height: 10,
                  background: i === current ? color : i < current ? `${color}70` : "rgba(255,255,255,0.1)",
                  boxShadow: i === current ? `0 0 10px ${color}50` : "none",
                }}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={goNext}
            disabled={isLast}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-bold text-sm transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 relative overflow-hidden min-w-[90px] justify-center"
            style={{
              color: "#fff",
              background: isLast ? "rgba(255,255,255,0.06)" : color,
              boxShadow: isLast ? "none" : `0 4px 20px ${glow}`,
            }}
          >
            {!isLast && <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />}
            <span className="relative">{isLast ? "Done" : "Next"}</span>
            {!isLast && <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="relative"><path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          </button>
        </div>
      )}
    </div>
  );
}
