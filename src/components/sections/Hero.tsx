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

const AVATARS = [
  { initials: "AD", bg: "#FF6A00" },
  { initials: "KS", bg: "#1A1815" },
  { initials: "TM", bg: "#4A607C" },
  { initials: "RD", bg: "#4A7C59" },
  { initials: "LN", bg: "#7C4A6A" },
];

function SocialProof() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/count")
      .then((r) => r.json())
      .then((d) => setCount(d.count))
      .catch(() => setCount(327));
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Avatar stack */}
      <div className="flex items-center">
        {AVATARS.map((a, i) => (
          <div
            key={i}
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-[11px] font-black text-white"
            style={{ backgroundColor: a.bg, marginLeft: i === 0 ? 0 : -10, zIndex: AVATARS.length - i }}
          >
            {a.initials}
          </div>
        ))}
      </div>

      <div>
        <p className="text-sm font-medium text-[var(--charcoal)]">
          <span className="tabular-nums">
            {count === null ? "..." : count.toLocaleString()}
          </span>{" "}
          <span className="text-[var(--warm-500)]">people have joined the founding waitlist.</span>
        </p>
        <p className="text-xs text-[var(--warm-500)] mt-0.5">
          Founding spots are filling while we build.
        </p>
      </div>
    </div>
  );
}

export function Hero({ onJoinClick, onLearnMoreClick }: HeroProps) {
  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden px-6 pb-16 pt-32 sm:px-12 md:px-20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-5xl"
      >
        {/* Badge */}
        <motion.div variants={staggerItem} className="mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--warm-200)] bg-[var(--warm-100)] px-4 py-1.5 text-xs font-semibold text-[var(--charcoal)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--orange)]" />
            Built in Cape Town for SA&apos;s next generation
          </span>
        </motion.div>

        {/* Headline */}
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

        {/* Supporting */}
        <motion.p
          variants={staggerItem}
          className="mt-7 max-w-lg text-lg leading-relaxed text-[var(--warm-500)] md:text-xl"
        >
          Howzit helps SA&apos;s next generation meet the people, jobs, mentors
          and opportunities they usually never get close to.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={staggerItem}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={onJoinClick}
            className="rounded-full bg-[var(--orange)] px-8 py-3.5 text-base font-bold text-white shadow-[0_6px_24px_rgba(255,106,0,0.32)] transition-transform duration-200 hover:scale-[1.03] active:scale-95"
          >
            Join the Founding Members
          </button>
          <button
            onClick={onLearnMoreClick}
            className="flex items-center gap-2 px-4 py-3.5 text-sm font-medium text-[var(--warm-500)] transition-colors hover:text-[var(--charcoal)]"
          >
            Learn more
            <ArrowDown size={14} />
          </button>
        </motion.div>

        {/* Social proof */}
        <motion.div variants={staggerItem} className="mt-9">
          <SocialProof />
        </motion.div>

        {/* Instagram link */}
        <motion.a
          variants={staggerItem}
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--warm-500)] transition-colors hover:text-[var(--orange)]"
        >
          <InstagramIcon size={14} />
          {INSTAGRAM_HANDLE}
        </motion.a>
      </motion.div>
    </section>
  );
}
