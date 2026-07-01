"use client";

import { motion } from "framer-motion";

// Aerial nighttime Cape Town cityscape — Pexels (free for commercial use)
// Video by Pexels: https://www.pexels.com/video/aerial-night-view-of-cape-town-cityscape-33646383/
const VIDEO_URL =
  "https://videos.pexels.com/video-files/33646383/14298776_2560_1440_24fps.mp4";

export function CapeTownSection() {
  return (
    <section className="relative h-[55vh] min-h-[320px] overflow-hidden">
      {/* Background video */}
      <video
        src={VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      />

      {/* Dark overlay — lets video breathe while keeping text legible */}
      <div className="absolute inset-0 bg-[var(--charcoal)]/55" />

      {/* Subtle gradient at top and bottom to blend into surrounding sections */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--charcoal)] to-transparent" />

      {/* Copy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
          Cape Town, South Africa
        </p>
        <h2 className="mt-4 max-w-2xl text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl">
          For the students, builders, job seekers
          <br className="hidden sm:block" />
          and people who just need one real chance.
        </h2>
        <p className="mt-4 text-sm font-medium text-white/50">
          Built here. For everyone trying to get somewhere.
        </p>
      </motion.div>
    </section>
  );
}
