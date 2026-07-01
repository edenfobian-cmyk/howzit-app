"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { InstagramIcon } from "@/components/shared/InstagramIcon";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/constants";
import { staggerContainer, staggerItem } from "@/animations/variants";

interface HeroProps {
  onJoinClick: () => void;
  onLearnMoreClick: () => void;
}

function SocialProofCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/count")
      .then((r) => r.json())
      .then((d) => setCount(d.count))
      .catch(() => setCount(327));
  }, []);

  return (
    <span className="tabular-nums">
      {count === null ? "..." : `${count.toLocaleString()}`}
    </span>
  );
}

export function Hero({ onJoinClick, onLearnMoreClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-16 px-6 sm:px-12 md:px-20 pt-32 overflow-hidden">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-5xl"
      >
        {/* Eyebrow */}
        <motion.p
          variants={staggerItem}
          className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--warm-500)] mb-8"
        >
          Built in Cape Town · For SA&apos;s next generation
        </motion.p>

        {/* Headline — left-aligned, huge */}
        <motion.h1
          variants={staggerItem}
          className="font-black leading-[0.96] tracking-tight text-[var(--charcoal)]"
          style={{ fontSize: "clamp(3.2rem, 10vw, 7rem)" }}
        >
          Talent is
          <br />
          everywhere.
          <br />
          <span className="text-[var(--orange)]">Access isn&apos;t.</span>
        </motion.h1>

        {/* Supporting sentence */}
        <motion.p
          variants={staggerItem}
          className="mt-8 max-w-lg text-lg leading-relaxed text-[var(--warm-500)] md:text-xl"
        >
          Howzit helps young South Africans meet the people, jobs, mentors and
          opportunities they usually never get close to.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={staggerItem}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={onJoinClick}
            className="group relative rounded-full bg-[var(--orange)] px-8 py-3.5 text-base font-bold text-white transition-transform duration-200 hover:scale-[1.03] active:scale-95 shadow-[0_6px_24px_rgba(255,106,0,0.32)]"
          >
            Join the Founding Members
          </button>
          <button
            onClick={onLearnMoreClick}
            className="flex items-center gap-2 px-4 py-3.5 text-sm font-medium text-[var(--warm-500)] transition-colors hover:text-[var(--charcoal)]"
          >
            See how it works
            <ArrowDown size={14} />
          </button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          variants={staggerItem}
          className="mt-8 flex flex-wrap items-center gap-6 text-sm text-[var(--warm-500)]"
        >
          <span>
            <SocialProofCounter />{" "}
            <span className="font-medium text-[var(--charcoal)]">people</span> have joined the founding waitlist.
          </span>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-medium text-[var(--charcoal)] transition-colors hover:text-[var(--orange)]"
          >
            <InstagramIcon size={14} />
            {INSTAGRAM_HANDLE}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
