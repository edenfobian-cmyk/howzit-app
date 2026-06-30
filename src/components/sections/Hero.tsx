"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { staggerContainer, staggerItem } from "@/animations/variants";
import { NetworkVisual } from "@/components/shared/NetworkVisual";

interface HeroProps {
  onJoinClick: () => void;
  onLearnMoreClick: () => void;
}

export function Hero({ onJoinClick, onLearnMoreClick }: HeroProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-16">
      <NetworkVisual className="pointer-events-none absolute inset-x-0 top-[8%] mx-auto h-[300px] w-full max-w-3xl opacity-70 sm:top-[12%]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <motion.h1
          variants={staggerItem}
          className="text-[clamp(2.75rem,8vw,5.5rem)] font-black leading-[1.04] tracking-tight text-[var(--charcoal)]"
        >
          Find your people.
          <br />
          <span className="gradient-text">Build your future.</span>
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-[var(--grey-500)]"
        >
          The easiest way for ambitious South Africans to meet the people and
          opportunities that change lives.
        </motion.p>

        <motion.div
          variants={staggerItem}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <button
            onClick={onJoinClick}
            className="rounded-full bg-[var(--orange)] px-8 py-3.5 text-base font-semibold text-white shadow-[0_6px_20px_rgba(255,106,0,0.28)] transition-transform duration-200 hover:scale-[1.03] active:scale-95"
          >
            Join the waitlist
          </button>
          <button
            onClick={onLearnMoreClick}
            className="flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-[var(--grey-500)] transition-colors duration-200 hover:text-[var(--charcoal)]"
          >
            Learn more
            <ArrowDown size={14} />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
