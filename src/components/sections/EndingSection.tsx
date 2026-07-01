"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InstagramIcon } from "@/components/shared/InstagramIcon";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/constants";

const SEQUENCE = ["People", "Opportunity", "Connection", "Howzit."];

interface EndingSectionProps {
  onJoinClick: () => void;
}

export function EndingSection({ onJoinClick }: EndingSectionProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    if (wordIndex >= SEQUENCE.length - 1) return;
    const t = setTimeout(() => setWordIndex((i) => i + 1), 900);
    return () => clearTimeout(t);
  }, [started, wordIndex]);

  return (
    <section className="relative overflow-hidden bg-[var(--charcoal)] px-6 py-24 sm:px-12">
      {/* Ambient orange accent */}
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #FF6A00, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-3xl text-center">
        {/* Quote */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onViewportEnter={() => setStarted(true)}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl"
        >
          Every opportunity starts with a conversation.
        </motion.p>

        {/* Animated word sequence */}
        <div className="mt-12 flex flex-col items-center gap-2 min-h-[12rem]">
          {SEQUENCE.map((word, i) => (
            <AnimatePresence key={word}>
              {wordIndex >= i && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3"
                >
                  {i < SEQUENCE.length - 1 && (
                    <span className="text-white/20 text-sm">↓</span>
                  )}
                  <span
                    className={
                      word === "Howzit."
                        ? "text-2xl font-black text-[var(--orange)] sm:text-3xl"
                        : "text-lg font-semibold text-white/60 sm:text-xl"
                    }
                  >
                    {word}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-col items-center gap-5"
        >
          <button
            onClick={onJoinClick}
            className="rounded-full bg-[var(--orange)] px-10 py-4 text-base font-black text-white shadow-[0_8px_32px_rgba(255,106,0,0.4)] transition-transform hover:scale-[1.04] active:scale-95"
          >
            Join the Founding Members
          </button>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-white"
          >
            <InstagramIcon size={15} />
            Follow the build: {INSTAGRAM_HANDLE}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
