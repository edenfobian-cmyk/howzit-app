"use client";

import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  type PanInfo,
} from "framer-motion";
import {
  Briefcase,
  Calendar,
  GraduationCap,
  Heart,
  MapPin,
  Rocket,
  Users,
  X,
  Zap,
} from "lucide-react";
import { SWIPE_CARDS } from "@/constants";
import type { SwipeCard, SwipeCardType } from "@/types";

const TYPE_CONFIG: Record<SwipeCardType, { icon: typeof Users; label: string; color: string }> = {
  person:      { icon: Users,        label: "Person",      color: "#1A1815" },
  job:         { icon: Briefcase,    label: "Job",         color: "#1A1815" },
  mentor:      { icon: GraduationCap,label: "Mentor",      color: "#FF6A00" },
  "co-founder":{ icon: Rocket,       label: "Co-founder",  color: "#1A1815" },
  event:       { icon: Calendar,     label: "Event",       color: "#1A1815" },
  opportunity: { icon: Zap,          label: "Opportunity", color: "#FF6A00" },
};

const AVATAR_COLORS = ["#FF6A00", "#1A1815", "#4A7C59", "#7C4A6A", "#4A607C"];

function CardView({ card, index }: { card: SwipeCard; index: number }) {
  const cfg = TYPE_CONFIG[card.type];
  const Icon = cfg.icon;
  const avatarBg = AVATAR_COLORS[parseInt(card.id) % AVATAR_COLORS.length];

  return (
    <div className="flex h-full w-full flex-col justify-between rounded-[1.5rem] bg-white p-5 card-shadow-lg">
      {/* Type badge */}
      <div className="flex items-center justify-between">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
          style={{ backgroundColor: `${cfg.color}12`, color: cfg.color }}
        >
          <Icon size={10} strokeWidth={2.5} />
          {cfg.label}
        </span>
        <span className="text-[10px] text-[var(--warm-500)]">#{index + 1}</span>
      </div>

      {/* Avatar + name */}
      <div>
        <div
          className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-black text-white"
          style={{ backgroundColor: avatarBg }}
        >
          {card.avatar}
        </div>
        <h3 className="text-base font-black leading-tight text-[var(--charcoal)]">
          {card.name}
        </h3>
        <p className="mt-0.5 text-xs font-medium text-[var(--warm-500)]">{card.role}</p>
        <p className="mt-1.5 flex items-center gap-1 text-[11px] text-[var(--warm-500)]">
          <MapPin size={10} /> {card.location}
        </p>
        <p className="mt-3 text-xs leading-relaxed text-[var(--charcoal)]/70">{card.bio}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {card.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[var(--warm-200)] px-2 py-0.5 text-[10px] font-medium text-[var(--warm-500)]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PhoneMockup({ onJoinClick }: { onJoinClick: () => void }) {
  const [queue, setQueue] = useState(SWIPE_CARDS);
  const [exitDir, setExitDir] = useState<"left" | "right" | null>(null);
  const [showMatch, setShowMatch] = useState(false);
  const [swipeCount, setSwipeCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback((dir: "left" | "right") => {
    setExitDir(dir);
    if (dir === "right") {
      setShowMatch(true);
      setTimeout(() => setShowMatch(false), 1200);
    }
    setSwipeCount((c) => c + 1);
    setTimeout(() => {
      setQueue((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
      setExitDir(null);
    }, 280);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      advance(Math.random() > 0.3 ? "right" : "left");
    }, 2600);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [advance]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (info.offset.x > 90) advance("right");
    else if (info.offset.x < -90) advance("left");
    timerRef.current = setInterval(() => {
      advance(Math.random() > 0.3 ? "right" : "left");
    }, 2600);
  };

  const showCTA = swipeCount >= 5;
  const visible = queue.slice(0, 3);

  return (
    <div className="relative h-[580px] w-[290px]">
      {/* Phone frame */}
      <div className="relative h-full w-full overflow-hidden rounded-[2.8rem] border-[10px] border-[var(--charcoal)] bg-[var(--charcoal)] shadow-[0_32px_80px_rgba(26,24,21,0.4)]">
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-20 h-5 w-24 -translate-x-1/2 rounded-b-xl bg-[var(--charcoal)]" />
        {/* Screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-[var(--off-white)]">
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-7 pb-2">
            <span className="text-[10px] font-bold text-[var(--charcoal)]">Howzit</span>
            <span className="text-[10px] text-[var(--warm-500)]">
              {queue[0]?.type || "person"}
            </span>
          </div>

          {/* Card stack */}
          <div className="relative mx-3 h-[420px]">
            <AnimatePresence>
              {!showCTA && visible.map((card, i) => {
                const isTop = i === 0;
                return (
                  <motion.div
                    key={card.id}
                    className="absolute inset-0"
                    style={{ zIndex: 10 - i }}
                    drag={isTop ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.65}
                    onDragEnd={isTop ? handleDragEnd : undefined}
                    initial={{ scale: 1 - i * 0.04, y: i * 9, opacity: 0 }}
                    animate={
                      isTop && exitDir
                        ? { x: exitDir === "right" ? 320 : -320, opacity: 0 }
                        : { x: 0, scale: 1 - i * 0.04, y: i * 9, opacity: 1 - i * 0.2 }
                    }
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <CardView card={card} index={SWIPE_CARDS.indexOf(card)} />
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* CTA overlay after 5 swipes */}
            <AnimatePresence>
              {showCTA && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center rounded-[1.5rem] bg-[var(--charcoal)] p-6 text-center"
                >
                  <p className="text-sm font-bold text-white/60">Imagine if these were real.</p>
                  <p className="mt-2 text-xl font-black text-white">Join the waitlist.</p>
                  <button
                    onClick={onJoinClick}
                    className="mt-5 rounded-full bg-[var(--orange)] px-6 py-2.5 text-sm font-bold text-white"
                  >
                    Get Early Access
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Match badge */}
            <AnimatePresence>
              {showMatch && !showCTA && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className="pointer-events-none absolute left-1/2 top-4 z-30 -translate-x-1/2 rounded-full bg-[var(--charcoal)] px-4 py-1.5 text-[11px] font-bold text-white"
                >
                  It&apos;s a match ✓
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action buttons */}
          {!showCTA && (
            <div className="mt-3 flex items-center justify-center gap-5 pb-4">
              <button
                onClick={() => advance("left")}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--warm-200)] bg-white text-[var(--warm-500)] shadow-sm transition-transform hover:scale-110"
              >
                <X size={17} />
              </button>
              <button
                onClick={() => advance("right")}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--orange)] text-white shadow-[0_4px_16px_rgba(255,106,0,0.4)] transition-transform hover:scale-110"
              >
                <Heart size={17} fill="currentColor" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Container Scroll (3D perspective reveal on scroll) ────────────
export const InteractiveAppDemo = forwardRef<HTMLElement, { onJoinClick: () => void }>(
  ({ onJoinClick }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end start"],
    });

    const rotateX    = useTransform(scrollYProgress, [0, 0.4], [22, 0]);
    const scale      = useTransform(scrollYProgress, [0, 0.4], [0.82, 1]);
    const translateY = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
    const opacity    = useTransform(scrollYProgress, [0, 0.15], [0.55, 1]);

    return (
      <section ref={ref as React.RefObject<HTMLElement>} className="relative">
        {/* Tall scroll container */}
        <div ref={containerRef} className="relative h-[220vh]">
          <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
            {/* Section label */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--warm-500)]"
            >
              The product
            </motion.p>

            {/* 3D phone */}
            <div className="perspective-1200">
              <motion.div
                style={{ rotateX, scale, translateY, opacity }}
              >
                <PhoneMockup onJoinClick={onJoinClick} />
              </motion.div>
            </div>

            {/* Scroll hint */}
            <motion.p
              style={{ opacity: useTransform(scrollYProgress, [0, 0.25], [1, 0]) }}
              className="absolute bottom-10 text-xs text-[var(--warm-500)]"
            >
              ↓ Scroll to explore
            </motion.p>
          </div>
        </div>
      </section>
    );
  }
);

InteractiveAppDemo.displayName = "InteractiveAppDemo";
