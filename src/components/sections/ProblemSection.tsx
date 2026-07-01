"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// ── Animated counting number ───────────────────────────────────────
function AnimatedNumber({
  target,
  duration = 1600,
  delay = 0,
  suffix = "",
}: {
  target: number;
  duration?: number;
  delay?: number;
  suffix?: string;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts + delay;
      if (ts < start) { requestAnimationFrame(step); return; }
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(ease * target * 10) / 10);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration, delay]);

  const display = Number.isInteger(target) ? Math.round(val) : val.toFixed(1);
  return <span ref={ref}>{display}{suffix}</span>;
}

// ── Animated bar ───────────────────────────────────────────────────
function Bar({
  label,
  value,
  maxValue = 100,
  color,
  delay = 0,
  subLabel,
}: {
  label: string;
  value: number;
  maxValue?: number;
  color: string;
  delay?: number;
  subLabel?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <div>
          <span className="text-sm font-bold text-white">{label}</span>
          {subLabel && <span className="ml-2 text-xs text-white/40">{subLabel}</span>}
        </div>
        <span className="text-2xl font-black tabular-nums" style={{ color }}>
          <AnimatedNumber target={value} suffix="%" delay={delay} />
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: "0%" }}
          whileInView={{ width: `${(value / maxValue) * 100}%` }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.5, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

// ── Stat card ──────────────────────────────────────────────────────
function StatCard({
  number,
  suffix,
  label,
  sublabel,
  delay,
}: {
  number: number;
  suffix: string;
  label: string;
  sublabel: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-white/10 bg-white/5 p-6"
    >
      <p className="text-4xl font-black text-white sm:text-5xl">
        <AnimatedNumber target={number} suffix={suffix} delay={delay * 1000} />
      </p>
      <p className="mt-2 text-sm font-bold text-white/80 leading-snug">{label}</p>
      <p className="mt-1 text-xs text-white/40">{sublabel}</p>
    </motion.div>
  );
}

// ── Section ────────────────────────────────────────────────────────
export function ProblemSection() {
  return (
    <section className="bg-[var(--charcoal)] px-6 py-20 sm:px-12">
      <div className="mx-auto max-w-5xl">

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--orange)]">
            The problem
          </p>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
            South Africa does not have a talent problem.
          </h2>
          <p className="mt-3 text-3xl font-black leading-tight tracking-tight text-white/35 sm:text-4xl">
            It has an access problem.
          </p>
          <p className="mt-5 text-base leading-relaxed text-white/50">
            Not everyone is born into the right network.
            And in South Africa, that gap is getting wider.
          </p>
        </motion.div>

        {/* Unemployment bars */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 space-y-6"
        >
          <Bar
            label="Youth unemployment"
            value={45.5}
            maxValue={100}
            color="#FF6A00"
            delay={200}
            subLabel="Ages 15–34"
          />
          <Bar
            label="Adult unemployment"
            value={29}
            maxValue={100}
            color="rgba(255,255,255,0.35)"
            delay={400}
            subLabel="Ages 35–64"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-xs text-white/30"
        >
          Stats SA · QLFS 2024. Household network data approximate.
        </motion.p>

        {/* Stat cards */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StatCard
            number={78}
            suffix="%"
            label="of jobs are filled through personal networks"
            sublabel="Not job boards. Not LinkedIn. People who know people."
            delay={0.1}
          />
          <StatCard
            number={2.2}
            suffix="M"
            label="young South Africans not in work, education or training"
            sublabel="Many of them have the drive. Just not the access."
            delay={0.2}
          />
        </div>

        {/* Bridge line */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 border-t border-white/10 pt-10"
        >
          <p className="text-lg font-bold text-white/60 max-w-md">
            Your next opportunity might not be on a job board.
            It might be one conversation away.
          </p>
          <p className="mt-2 text-sm font-black text-[var(--orange)]">
            That&apos;s what Howzit is for.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
