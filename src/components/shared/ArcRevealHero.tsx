"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type ArcRevealGreeting = {
  text: string;
  lang?: string;
};

export interface ArcRevealHeroProps {
  greetings?: ArcRevealGreeting[];
  greetingHold?: number;
  className?: string;
  greetingClassName?: string;
  storageKey?: string;
  children?: React.ReactNode;
}

const DEFAULT_GREETINGS: ArcRevealGreeting[] = [
  { text: "People." },
  { text: "Opportunity." },
  { text: "Connection." },
  { text: "Howzit." },
];

type Phase = "intro" | "exit" | "done";

function getInitialPhase(storageKey?: string, prefersReducedMotion?: boolean | null): Phase {
  if (prefersReducedMotion) return "done";
  if (!storageKey || typeof window === "undefined") return "intro";
  try {
    if (window.localStorage.getItem(storageKey) === "done") return "done";
  } catch {}
  return "intro";
}

export function ArcRevealHero({
  greetings = DEFAULT_GREETINGS,
  greetingHold = 520,
  className,
  greetingClassName,
  storageKey,
  children,
}: ArcRevealHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  const [phase, setPhase] = React.useState<Phase>(() =>
    getInitialPhase(storageKey, prefersReducedMotion)
  );
  const [index, setIndex] = React.useState(0);

  // React to prefersReducedMotion updating after hydration
  React.useEffect(() => {
    if (prefersReducedMotion && phase !== "done") {
      setPhase("done");
    }
  }, [prefersReducedMotion, phase]);

  // Cycle through greetings, then trigger exit
  React.useEffect(() => {
    if (phase !== "intro") return;
    const isLast = index >= greetings.length - 1;
    const delay = isLast ? greetingHold + 180 : greetingHold;
    const t = window.setTimeout(() => {
      if (isLast) {
        setPhase("exit");
      } else {
        setIndex((i) => i + 1);
      }
    }, delay);
    return () => window.clearTimeout(t);
  }, [phase, index, greetingHold, greetings.length]);

  const markDone = React.useCallback(() => {
    if (storageKey) {
      try { window.localStorage.setItem(storageKey, "done"); } catch {}
    }
    setPhase("done");
  }, [storageKey]);

  const showOverlay = phase !== "done";
  const current = greetings[Math.min(index, greetings.length - 1)];

  return (
    <div className={cn("relative w-full", className)}>
      {children}

      <AnimatePresence>
        {showOverlay && (
          <motion.div
            key="overlay"
            className={cn(
              "fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1A1815]",
            )}
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              duration: phase === "exit" ? 0.85 : 0,
              ease: [0.76, 0, 0.24, 1],
            }}
            onAnimationComplete={(def) => {
              if (def && typeof def === "object" && "y" in def && def.y === "-100%") {
                markDone();
              }
            }}
          >
            {/* Small logo watermark */}
            <div className="absolute left-8 top-8 text-white/20 text-sm font-black tracking-tight select-none">
              Howzit
            </div>

            {/* Greeting word */}
            <AnimatePresence mode="wait">
              {phase === "intro" && current && (
                <motion.span
                  key={`${index}`}
                  lang={current.lang}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "select-none text-center text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl",
                    index === greetings.length - 1 && "text-[var(--orange)]",
                    greetingClassName,
                  )}
                >
                  {current.text}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Progress dots */}
            <div className="absolute bottom-10 flex gap-2">
              {greetings.map((_, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full transition-all duration-300"
                  style={{
                    width: i === index ? "24px" : "6px",
                    backgroundColor: i === index ? "#FF6A00" : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ArcRevealHero;
