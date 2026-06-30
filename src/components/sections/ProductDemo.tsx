"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { Briefcase, GraduationCap, Heart, Rocket, Users, X, Calendar, MapPin } from "lucide-react";
import { SWIPE_CARDS } from "@/constants";
import type { SwipeCard, SwipeCardType } from "@/types";

const TYPE_ICON: Record<SwipeCardType, typeof Users> = {
  person: Users,
  job: Briefcase,
  mentor: GraduationCap,
  "co-founder": Rocket,
  event: Calendar,
};

const TYPE_LABEL: Record<SwipeCardType, string> = {
  person: "Person",
  job: "Job",
  mentor: "Mentor",
  "co-founder": "Co-founder",
  event: "Event",
};

const SWIPE_THRESHOLD = 110;
const AUTO_ADVANCE_MS = 2800;

function CardFace({ card }: { card: SwipeCard }) {
  const Icon = TYPE_ICON[card.type];
  return (
    <div className="flex h-full w-full flex-col justify-between rounded-[1.75rem] border border-[var(--border)] bg-white p-5 card-shadow-hover">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--orange-dim)] px-3 py-1 text-xs font-semibold text-[var(--orange)]">
          <Icon size={12} />
          {TYPE_LABEL[card.type]}
        </span>
      </div>

      <div>
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--charcoal)]">
          <Icon size={24} className="text-white" strokeWidth={1.75} />
        </div>
        <h3 className="text-xl font-bold text-[var(--charcoal)]">{card.name}</h3>
        <p className="mt-0.5 text-sm text-[var(--grey-500)]">{card.role}</p>
        <p className="mt-2 flex items-center gap-1 text-xs text-[var(--grey-500)]">
          <MapPin size={11} />
          {card.location}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[11px] font-medium text-[var(--grey-500)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductDemo() {
  const [queue, setQueue] = useState(SWIPE_CARDS);
  const [exitDir, setExitDir] = useState<"left" | "right" | null>(null);
  const [showMatch, setShowMatch] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback((dir: "left" | "right") => {
    setExitDir(dir);
    if (dir === "right") {
      setShowMatch(true);
      window.setTimeout(() => setShowMatch(false), 1100);
    }
    window.setTimeout(() => {
      setQueue((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
      setExitDir(null);
    }, 260);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      advance(Math.random() > 0.35 ? "right" : "left");
    }, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [advance]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (info.offset.x > SWIPE_THRESHOLD) advance("right");
    else if (info.offset.x < -SWIPE_THRESHOLD) advance("left");
    timerRef.current = setInterval(() => {
      advance(Math.random() > 0.35 ? "right" : "left");
    }, AUTO_ADVANCE_MS);
  };

  const visible = queue.slice(0, 3);

  return (
    <div className="flex flex-col items-center">
      {/* Phone frame */}
      <div className="relative h-[560px] w-[300px] overflow-hidden rounded-[2.75rem] border-[10px] border-[var(--charcoal)] bg-[var(--charcoal)] shadow-2xl">
        <div className="absolute left-1/2 top-0 z-20 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-[var(--charcoal)]" />
        <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-[var(--off-white)] p-4">
          <div className="relative h-full w-full">
            <AnimatePresence>
              {visible.map((card, i) => {
                const isTop = i === 0;
                return (
                  <motion.div
                    key={card.id}
                    className="absolute inset-0"
                    style={{ zIndex: 10 - i }}
                    drag={isTop ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.7}
                    onDragEnd={isTop ? handleDragEnd : undefined}
                    initial={{ scale: 1 - i * 0.04, y: i * 10, opacity: 0 }}
                    animate={
                      isTop && exitDir
                        ? {
                            x: exitDir === "right" ? 340 : -340,
                            opacity: 0,
                          }
                        : {
                            x: 0,
                            scale: 1 - i * 0.04,
                            y: i * 10,
                            opacity: 1 - i * 0.18,
                          }
                    }
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <CardFace card={card} />
                  </motion.div>
                );
              })}
            </AnimatePresence>

            <AnimatePresence>
              {showMatch && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 24 }}
                  className="pointer-events-none absolute left-1/2 top-6 z-30 -translate-x-1/2 rounded-full bg-[var(--charcoal)] px-4 py-2 text-xs font-semibold text-white shadow-lg"
                >
                  It&apos;s a match ✓
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Manual controls */}
      <div className="mt-7 flex items-center gap-5">
        <button
          aria-label="Pass"
          onClick={() => advance("left")}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--grey-500)] shadow-sm transition-transform duration-150 hover:scale-110 hover:text-[var(--charcoal)] active:scale-95"
        >
          <X size={18} />
        </button>
        <button
          aria-label="Like"
          onClick={() => advance("right")}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--orange)] text-white shadow-[0_6px_18px_rgba(255,106,0,0.32)] transition-transform duration-150 hover:scale-110 active:scale-95"
        >
          <Heart size={18} fill="currentColor" />
        </button>
      </div>
    </div>
  );
}
