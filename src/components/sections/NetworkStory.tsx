"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { PROBLEM_STATS } from "@/constants";

// Dot network visualisation — dots scattered, then connected
const DOTS = [
  { id: 0,  x: 12,  y: 18, group: "a" },
  { id: 1,  x: 28,  y: 8,  group: "a" },
  { id: 2,  x: 22,  y: 35, group: "a" },
  { id: 3,  x: 8,   y: 50, group: "b" },
  { id: 4,  x: 45,  y: 22, group: "b" },
  { id: 5,  x: 55,  y: 12, group: "b" },
  { id: 6,  x: 70,  y: 30, group: "c" },
  { id: 7,  x: 82,  y: 18, group: "c" },
  { id: 8,  x: 78,  y: 45, group: "c" },
  { id: 9,  x: 60,  y: 55, group: "b" },
  { id: 10, x: 35,  y: 62, group: "a" },
  { id: 11, x: 18,  y: 72, group: "a" },
  { id: 12, x: 50,  y: 78, group: "c" },
  { id: 13, x: 88,  y: 68, group: "c" },
  { id: 14, x: 92,  y: 40, group: "b" },
];

const GROUP_COLOURS: Record<string, string> = {
  a: "#FF6A00",
  b: "#1A1815",
  c: "#8a8680",
};

const CONNECTIONS = [
  [0, 1], [0, 2], [1, 4], [3, 10], [4, 5],
  [5, 6], [6, 7], [6, 8], [7, 14], [8, 9],
  [9, 12], [10, 11], [12, 13],
];

function NetworkDots({ connected }: { connected: boolean }) {
  return (
    <svg viewBox="0 0 100 90" className="h-full w-full" aria-hidden>
      {/* Connections */}
      {CONNECTIONS.map(([a, b]) => {
        const da = DOTS[a], db = DOTS[b];
        return (
          <motion.line
            key={`${a}-${b}`}
            x1={da.x} y1={da.y} x2={db.x} y2={db.y}
            stroke="var(--charcoal)"
            strokeOpacity={0.12}
            strokeWidth={0.6}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={connected ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.8, delay: connected ? 0.4 : 0, ease: "easeInOut" }}
          />
        );
      })}
      {/* Dots */}
      {DOTS.map((d) => (
        <motion.circle
          key={d.id}
          cx={d.x}
          cy={d.y}
          r={2.2}
          fill={GROUP_COLOURS[d.group]}
          fillOpacity={connected ? 1 : 0.3}
          initial={{ scale: 0 }}
          animate={connected
            ? { scale: [1, 1.4, 1], fillOpacity: 1 }
            : { scale: 1,    fillOpacity: 0.3 }
          }
          transition={{
            scale: { duration: 0.6, delay: connected ? d.id * 0.04 : 0, ease: "easeInOut" },
            fillOpacity: { duration: 0.4, delay: connected ? d.id * 0.04 : 0 },
          }}
          style={{ transformOrigin: `${d.x}px ${d.y}px` }}
        />
      ))}
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
        <span className="w-20 shrink-0 text-4xl font-black tabular-nums text-[var(--orange)] sm:text-5xl">
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
  const networkRef = useRef<HTMLDivElement>(null);
  const [connected, setConnected] = useState(false);
  const networkInView = useInView(networkRef, { once: false, margin: "-100px" });

  useEffect(() => {
    setConnected(networkInView);
  }, [networkInView]);

  return (
    <section className="bg-[var(--off-white)] px-6 py-28 sm:px-12">
      <div className="mx-auto max-w-5xl">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--orange)]">
            The problem
          </p>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-[var(--charcoal)] sm:text-4xl">
            South Africa does not have a talent problem.
            <br />
            <span className="text-[var(--warm-500)]">It has an access problem.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[var(--warm-500)]">
            Thousands of ambitious people never meet the person, mentor, employer or co-founder
            who could change their path. Not because they don&apos;t exist — because they never
            get close enough.
          </p>
        </motion.div>

        {/* Network visualisation */}
        <div
          ref={networkRef}
          className="relative my-16 h-[220px] overflow-hidden rounded-3xl border border-[var(--warm-200)] bg-white p-6 sm:h-[280px]"
        >
          <NetworkDots connected={connected} />
          <motion.p
            initial={{ opacity: 0 }}
            animate={connected ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.4 }}
            className="absolute bottom-4 right-5 text-[11px] font-semibold text-[var(--charcoal)]"
          >
            Meet Howzit.
          </motion.p>
          <p className="absolute left-5 top-4 text-[11px] text-[var(--warm-500)]">
            Every dot is a real person.
          </p>
        </div>

        {/* Stats */}
        <div className="max-w-md">
          {PROBLEM_STATS.map((stat, i) => (
            <AnimatedStat key={stat.label} {...stat} delay={i * 0.1} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-xs text-[var(--warm-500)]"
        >
          Every percentage point represents real people.
        </motion.p>
      </div>
    </section>
  );
}
