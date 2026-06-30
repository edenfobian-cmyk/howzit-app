"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/animations/variants";

interface FinalCTAProps {
  onJoinClick: () => void;
}

export function FinalCTA({ onJoinClick }: FinalCTAProps) {
  return (
    <section className="bg-[var(--charcoal)] px-6 py-28">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-xl text-center"
      >
        <h2 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
          Join the waitlist.
        </h2>
        <p className="mt-4 text-base text-white/55">
          Built in South Africa 🇿🇦, for South Africans.
        </p>

        <button
          onClick={onJoinClick}
          className="mt-9 rounded-full bg-[var(--orange)] px-9 py-3.5 text-base font-semibold text-white shadow-[0_8px_24px_rgba(255,106,0,0.3)] transition-transform duration-200 hover:scale-[1.03] active:scale-95"
        >
          Join the waitlist
        </button>

        <p className="mt-6 text-xs text-white/35">
          We&apos;ll only email you when something important happens.
        </p>
      </motion.div>
    </section>
  );
}
