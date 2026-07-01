"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";
import { PROBLEM_STATS } from "@/constants";

// 15 dots spread across the SVG canvas
const ALL_DOTS = [
  { id: 0,  sx: 8,  sy: 12, ex: 42, ey: 38, group: "a" },
  { id: 1,  sx: 22, sy: 5,  ex: 48, ey: 30, group: "a" },
  { id: 2,  sx: 15, sy: 28, ex: 38, ey: 45, group: "a" },
  { id: 3,  sx: 5,  sy: 48, ex: 30, ey: 52, group: "b" },
  { id: 4,  sx: 38, sy: 18, ex: 52, ey: 35, group: "b" },
  { id: 5,  sx: 52, sy: 8,  ex: 58, ey: 28, group: "b" },
  { id: 6,  sx: 72, sy: 22, ex: 62, ey: 40, group: "c" },
  { id: 7,  sx: 85, sy: 10, ex: 68, ey: 33, group: "c" },
  { id: 8,  sx: 80, sy: 40, ex: 65, ey: 50, group: "c" },
  { id: 9,  sx: 62, sy: 55, ex: 58, ey: 55, group: "b" },
  { id: 10, sx: 30, sy: 65, ex: 40, ey: 58, group: "a" },
  { id: 11, sx: 12, sy: 75, ex: 35, ey: 62, group: "a" },
  { id: 12, sx: 48, sy: 80, ex: 52, ey: 68, group: "c" },
  { id: 13, sx: 90, sy: 70, ex: 72, ey: 62, group: "c" },
  { id: 14, sx: 95, sy: 42, ex: 78, ey: 48, group: "b" },
];

const CONNECTIONS = [
  [0, 1], [0, 2], [1, 4], [2, 10], [3, 10],
  [4, 5], [5, 6], [6, 7], [6, 8], [7, 14],
  [8, 9], [9, 12], [10, 11], [12, 13], [13, 14],
];

const GROUP_COLOURS: Record<string, string> = {
  a: "#FF6A00",
  b: "#1A1815",
  c: "#8a8680",
};

const PHASES = [
  { headline: "Thousands of ambitious South Africans never meet.", sub: "" },
  { headline: "Same country. Same ambition. Different networks.", sub: "" },
  { headline: "Howzit brings the right people closer.", sub: "" },
  { headline: "One conversation can change the path.", sub: "Meet Howzit." },
];

function NetworkDotStory({ phase }: { phase: number }) {
  const connected = phase >= 2;
  const fullyConnected = phase >= 3;

  return (
    <svg viewBox="0 0 100 90" className="h-full w-full" aria-hidden>
      {/* Connection lines */}
      {CONNECTIONS.map(([a, b]) => {
        const da = ALL_DOTS[a], db = ALL_DOTS[b];
        const ax = connected ? da.ex : da.sx;
        const ay = connected ? da.ey : da.sy;
        const bx = connected ? db.ex : db.sx;
        const by = connected ? db.ey : db.sy;
        return (
          <motion.line
            key={`${a}-${b}`}
            x1={ax} y1={ay} x2={bx} y2={by}
            stroke={fullyConnected ? "#FF6A00" : "var(--charcoal)"}
            strokeOpacity={fullyConnected ? 0.5 : 0.1}
            strokeWidth={fullyConnected ? 0.8 : 0.5}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={fullyConnected ? { pathLength: 1, opacity: 1 } : connected ? { pathLength: 1, opacity: 0.4 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeInOut" }}
          />
        );
      })}

      {/* Dots */}
      {ALL_DOTS.map((d) => {
        const cx = connected ? d.ex : d.sx;
        const cy = connected ? d.ey : d.sy;
        return (
          <motion.circle
            key={d.id}
            cx={cx} cy={cy}
            r={fullyConnected ? 2.8 : 2}
            fill={fullyConnected ? "#FF6A00" : GROUP_COLOURS[d.group]}
            fillOpacity={fullyConnected ? 1 : phase === 0 ? 0.25 : 0.5}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: d.id * 0.03, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        );
      })}
    </svg>
  );
}

function AnimatedStat({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const duration = 1400;
    const step = (ts: number) => {
      if (!start) start = ts + delay * 1000;
      if (ts < start) { requestAnimationFrame(step); return; }
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(ease * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value, delay]);

  return (
    <div ref={ref} className="border-t border-[var(--warm-200)] py-6 first:border-t-0">
      <div className="flex items-baseline gap-3">
        <span className="w-28 shrink-0 text-4xl font-black tabular-nums text-[var(--orange)] sm:text-5xl">
          {display}{suffix}
        </span>
        <p className="text-sm leading-snug text-[var(--warm-500)]">{label}</p>
      </div>
      <div className="mt-3 h-[2px] w-full overflow-hidden rounded-full bg-[var(--warm-200)]">
        <motion.div
          className="h-full rounded-full bg-[var(--orange)]"
          initial={{ width: "0%" }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export function NetworkStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Phase 0–3 based on scroll
  const phase = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75], [0, 1, 2, 3]);
  const [currentPhase, setCurrentPhase] = useState(0);

  useEffect(() => {
    return phase.on("change", (v) => setCurrentPhase(Math.round(v)));
  }, [phase]);

  return (
    <section className="bg-[var(--off-white)]">
      {/* Scroll-story section */}
      <div ref={containerRef} className="relative h-[320vh]">
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
          {/* Phase headline */}
          <div className="mb-8 min-h-[4rem] text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhase}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-lg"
              >
                <p className="text-xl font-black leading-tight text-[var(--charcoal)] sm:text-2xl">
                  {PHASES[currentPhase]?.headline}
                </p>
                {PHASES[currentPhase]?.sub && (
                  <p className="mt-2 text-sm font-semibold text-[var(--orange)]">
                    {PHASES[currentPhase].sub}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot network */}
          <div className="relative h-[220px] w-full max-w-xl overflow-hidden rounded-3xl border border-[var(--warm-200)] bg-white px-6 py-4 sm:h-[260px]">
            <NetworkDotStory phase={currentPhase} />
            <p className="absolute left-5 top-4 text-[10px] text-[var(--warm-500)]">
              Every dot is a real person.
            </p>
          </div>

          <p className="mt-5 text-xs text-[var(--warm-500)]">↓ Keep scrolling</p>
        </div>
      </div>

      {/* Stats — below the scroll section */}
      <div className="px-6 py-20 sm:px-12">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 max-w-md"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--orange)]">
              The problem
            </p>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-[var(--charcoal)] sm:text-4xl">
              South Africa does not have a talent problem.
              <br />
              <span className="text-[var(--warm-500)]">It has an access problem.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--warm-500)]">
              Not everyone has an uncle with connections. That&apos;s the point.
            </p>
          </motion.div>

          <div className="max-w-sm">
            {PROBLEM_STATS.map((stat, i) => (
              <AnimatedStat key={stat.label} {...stat} delay={i * 0.1} />
            ))}
          </div>

          <p className="mt-6 text-xs text-[var(--warm-500)]">
            Every percentage point represents real people.
          </p>
        </div>
      </div>
    </section>
  );
}
