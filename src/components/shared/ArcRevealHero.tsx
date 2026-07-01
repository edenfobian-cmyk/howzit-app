"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type ArcRevealGreeting = { text: string; lang?: string };

export interface ArcRevealHeroProps {
  greetings?: ArcRevealGreeting[];
  greetingHold?: number;
  storageKey?: string;
  className?: string;
  greetingClassName?: string;
  children?: React.ReactNode;
}

const DEFAULT_GREETINGS: ArcRevealGreeting[] = [
  { text: "People." },
  { text: "Opportunity." },
  { text: "Connection." },
  { text: "Howzit." },
];

export function ArcRevealHero({
  greetings = DEFAULT_GREETINGS,
  greetingHold = 500,
  storageKey,
  className,
  greetingClassName,
  children,
}: ArcRevealHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  // Check localStorage synchronously so returning users never see the overlay
  const [visible, setVisible] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false; // never block SSR
    try {
      if (localStorage.getItem(storageKey ?? "__howzit_intro") === "done") return false;
    } catch {}
    return true;
  });

  const [animatingOut, setAnimatingOut] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  // If reduced-motion preference, skip immediately
  React.useEffect(() => {
    if (prefersReducedMotion && visible) setVisible(false);
  }, [prefersReducedMotion, visible]);

  // Greeting cycle → trigger slide-out after last word
  React.useEffect(() => {
    if (!visible || animatingOut) return;
    const isLast = index >= greetings.length - 1;
    const wait = isLast ? greetingHold + 220 : greetingHold;
    const t = window.setTimeout(() => {
      if (isLast) setAnimatingOut(true);
      else setIndex((i) => i + 1);
    }, wait);
    return () => window.clearTimeout(t);
  }, [visible, animatingOut, index, greetings.length, greetingHold]);

  const onSlideComplete = React.useCallback(() => {
    // Only act when the slide-up animation has actually finished
    if (!animatingOut) return;
    try { localStorage.setItem(storageKey ?? "__howzit_intro", "done"); } catch {}
    setVisible(false);
    setAnimatingOut(false);
  }, [animatingOut, storageKey]);

  return (
    <div className={cn("relative w-full", className)}>
      {children}

      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1A1815]"
          // The key animation: when animatingOut becomes true, y slides to -100vh
          animate={{ y: animatingOut ? "-100%" : 0 }}
          transition={{
            duration: animatingOut ? 0.9 : 0,
            ease: [0.76, 0, 0.24, 1],
          }}
          onAnimationComplete={onSlideComplete}
        >
          {/* Howzit wordmark */}
          <div className="absolute left-8 top-8 select-none text-sm font-black text-white/20">
            Howzit
          </div>

          {/* Cycling greeting word */}
          <AnimatePresence mode="wait">
            {!animatingOut && (
              <motion.span
                key={index}
                lang={greetings[index]?.lang}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "select-none px-6 text-center text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl",
                  index === greetings.length - 1 && "text-[#FF6A00]",
                  greetingClassName,
                )}
              >
                {greetings[index]?.text}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Progress dots */}
          <div className="absolute bottom-10 flex gap-2">
            {greetings.map((_, i) => (
              <motion.div
                key={i}
                className="h-1 rounded-full bg-white/20"
                animate={{
                  width: i === index ? 24 : 6,
                  backgroundColor: i === index ? "#FF6A00" : "rgba(255,255,255,0.2)",
                }}
                transition={{ duration: 0.25 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default ArcRevealHero;
