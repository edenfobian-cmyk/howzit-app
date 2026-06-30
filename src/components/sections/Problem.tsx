"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { PROBLEM_STATS } from "@/constants";
import { staggerContainer, staggerItem } from "@/animations/variants";

function AnimatedStat({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, value, {
      duration: 1.3,
      delay,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, value, motionVal, delay]);

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return unsub;
  }, [rounded]);

  return (
    <div ref={ref} className="border-t border-[var(--border)] py-6 first:border-t-0">
      <div className="flex items-baseline gap-4">
        <span className="w-24 shrink-0 text-4xl font-black tabular-nums text-[var(--orange)] sm:text-5xl">
          {display}
          {suffix}
        </span>
        <p className="text-sm leading-snug text-[var(--grey-500)] sm:text-base">{label}</p>
      </div>
      <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full bg-[var(--grey-200)]">
        <motion.div
          className="h-full rounded-full bg-[var(--orange)]"
          initial={{ width: "0%" }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.3, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export const Problem = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} className="bg-[var(--off-white)] px-6 py-28">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-xl"
      >
        <motion.h2
          variants={staggerItem}
          className="text-3xl font-black leading-tight tracking-tight text-[var(--charcoal)] sm:text-4xl"
        >
          South Africa has talent.
          <br />
          Not access.
        </motion.h2>

        <motion.div variants={staggerItem} className="mt-10">
          {PROBLEM_STATS.map((stat, i) => (
            <AnimatedStat key={stat.label} {...stat} delay={i * 0.12} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
});

Problem.displayName = "Problem";
