"use client";

import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import {
  Briefcase,
  Calendar,
  GraduationCap,
  Heart,
  MapPin,
  MessageCircle,
  Rocket,
  Users,
  X,
} from "lucide-react";

// ── SA card data ──────────────────────────────────────────────────
const SA_CARDS = [
  {
    id: 1,
    name: "Aaliyah Davids",
    initials: "AD",
    color: "#FF6A00",
    title: "Looking for a finance mentor",
    location: "Cape Town · UCT",
    description: "Actuarial science student trying to break into financial services.",
    tags: ["Finance", "Student", "UCT"],
    lookingFor: "Mentor",
    icon: GraduationCap,
    type: "person" as const,
  },
  {
    id: 2,
    name: "Seedlab Internship",
    initials: "SL",
    color: "#1A1815",
    title: "Software Engineering Internship",
    location: "Cape Town · Hybrid · Paid",
    description: "YC-backed fintech building for SA. 3-month paid role for devs.",
    tags: ["Engineering", "Fintech", "Paid"],
    lookingFor: "Graduate Engineer",
    icon: Briefcase,
    type: "opportunity" as const,
  },
  {
    id: 3,
    name: "Kabelo Sithole",
    initials: "KS",
    color: "#4A607C",
    title: "Co-founder wanted",
    location: "Johannesburg",
    description: "Building last-mile delivery for township businesses. Need a technical partner.",
    tags: ["Founder", "Logistics", "Equity"],
    lookingFor: "Technical Co-founder",
    icon: Rocket,
    type: "person" as const,
  },
  {
    id: 4,
    name: "Refiloe Dlamini",
    initials: "RD",
    color: "#4A7C59",
    title: "VC Analyst · Open to mentoring",
    location: "Sandton",
    description: "Helping 1–2 founders in EdTech or HealthTech. Pre-seed focus.",
    tags: ["Mentor", "Investor", "EdTech"],
    lookingFor: "Ambitious Founder",
    icon: Users,
    type: "person" as const,
  },
  {
    id: 5,
    name: "CT Startup Week",
    initials: "CT",
    color: "#7C4A4A",
    title: "Networking night · Free entry",
    location: "V&A Waterfront · Next Friday 7pm",
    description: "300+ founders, builders and investors. Low-key vibes, big connections.",
    tags: ["Event", "Free", "Founders"],
    lookingFor: "Attendees",
    icon: Calendar,
    type: "opportunity" as const,
  },
  {
    id: 6,
    name: "Lwandle Nkosi",
    initials: "LN",
    color: "#6A4A7C",
    title: "Clothing brand founder",
    location: "Cape Town",
    description: "Building a streetwear brand from scratch. Looking for a creative marketer.",
    tags: ["Fashion", "Creative", "Startup"],
    lookingFor: "Marketer",
    icon: Users,
    type: "person" as const,
  },
];

const MATCH_CARD = SA_CARDS[2];

// ── Sub-screens ───────────────────────────────────────────────────
function LockScreen() {
  const now = new Date();
  const time = now.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit", hour12: false });
  return (
    <motion.div
      key="lock"
      className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--charcoal)]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-5xl font-black text-white"
      >
        {time}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.3 }}
        className="mt-2 text-xs text-white"
      >
        Swipe up to open Howzit
      </motion.p>
    </motion.div>
  );
}

function MatchScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      key="match"
      className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--charcoal)] px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.35 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.3, 1] }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--orange)]"
      >
        <Heart size={36} fill="white" className="text-white" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="text-2xl font-black text-white"
      >
        It&apos;s a match.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.45 }}
        className="mt-2 text-sm text-white"
      >
        You and {MATCH_CARD.name} connected.
      </motion.p>
    </motion.div>
  );
}

type Msg = { text: string; from: "me" | "them" };

function ChatScreen({ onDone }: { onDone: () => void }) {
  const [msgs, setMsgs] = useState<Msg[]>([]);

  useEffect(() => {
    const seq: { text: string; from: "me" | "them"; delay: number }[] = [
      { text: "Hey! Excited to connect 🙌", from: "them", delay: 500 },
      { text: "Same! Love what you're building.", from: "me", delay: 1400 },
      { text: "Are you free for a quick call this week?", from: "them", delay: 2400 },
    ];
    const timers = seq.map(({ text, from, delay }) =>
      setTimeout(() => setMsgs((p) => [...p, { text, from }]), delay)
    );
    const done = setTimeout(onDone, 4800);
    return () => { timers.forEach(clearTimeout); clearTimeout(done); };
  }, [onDone]);

  return (
    <motion.div
      key="chat"
      className="absolute inset-0 flex flex-col bg-white"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "spring", stiffness: 340, damping: 32 }}
    >
      {/* header */}
      <div className="flex items-center gap-3 border-b border-[var(--warm-200)] px-5 pb-4 pt-10">
        <div
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-xs font-black text-white"
          style={{ backgroundColor: MATCH_CARD.color }}
        >
          {MATCH_CARD.initials}
        </div>
        <div>
          <p className="text-sm font-bold text-[var(--charcoal)]">{MATCH_CARD.name}</p>
          <p className="flex items-center gap-1 text-[11px] text-green-500">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Online
          </p>
        </div>
      </div>

      {/* messages */}
      <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
        <AnimatePresence>
          {msgs.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                  m.from === "me"
                    ? "rounded-br-sm bg-[var(--orange)] text-white"
                    : "rounded-bl-sm bg-[var(--warm-100)] text-[var(--charcoal)]"
                }`}
              >
                {m.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* input bar */}
      <div className="flex items-center gap-3 border-t border-[var(--warm-200)] px-5 py-3">
        <div className="flex-1 rounded-full bg-[var(--warm-100)] px-4 py-2.5 text-xs text-[var(--warm-500)]">
          Type a message...
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--orange)]">
          <MessageCircle size={14} className="text-white" />
        </div>
      </div>
    </motion.div>
  );
}

// ── Swipe card ────────────────────────────────────────────────────
function SwipeCard({
  card,
  index,
  isTop,
  onSwipe,
}: {
  card: (typeof SA_CARDS)[0];
  index: number;
  isTop: boolean;
  onSwipe: (dir: "left" | "right") => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  const likeOpacity = useTransform(x, [30, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, -30], [1, 0]);
  const Icon = card.icon;

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 90) onSwipe(info.offset.x > 0 ? "right" : "left");
  };

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        zIndex: 10 - index,
        scale: 1 - index * 0.04,
        y: index * 10,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      animate={{ opacity: 1 - index * 0.2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Card */}
      <div className="flex h-full w-full flex-col rounded-[1.4rem] bg-white p-5 shadow-lg">
        {/* Like / Nope labels */}
        {isTop && (
          <>
            <motion.div
              style={{ opacity: likeOpacity }}
              className="pointer-events-none absolute left-4 top-8 rotate-[-12deg] rounded-lg border-2 border-green-500 px-3 py-1 text-sm font-black uppercase text-green-500"
            >
              Like
            </motion.div>
            <motion.div
              style={{ opacity: nopeOpacity }}
              className="pointer-events-none absolute right-4 top-8 rotate-[12deg] rounded-lg border-2 border-red-500 px-3 py-1 text-sm font-black uppercase text-red-500"
            >
              Nope
            </motion.div>
          </>
        )}

        {/* Type badge */}
        <div className="flex items-center justify-between">
          <span
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
            style={{ backgroundColor: `${card.color}15`, color: card.color }}
          >
            <Icon size={9} strokeWidth={2.5} />
            {card.type === "person" ? "Person" : "Opportunity"}
          </span>
        </div>

        {/* Avatar + content */}
        <div className="mt-4 flex gap-3">
          <div
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl text-sm font-black text-white"
            style={{ backgroundColor: card.color }}
          >
            {card.initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-black leading-snug text-[var(--charcoal)]">{card.name}</p>
            <p className="mt-0.5 flex items-center gap-1 text-[11px] text-[var(--warm-500)]">
              <MapPin size={9} /> {card.location}
            </p>
          </div>
        </div>

        <p className="mt-3 text-xs font-semibold text-[var(--charcoal)]">{card.title}</p>
        <p className="mt-1.5 text-[11px] leading-relaxed text-[var(--warm-500)]">{card.description}</p>

        <div className="mt-3 flex flex-wrap gap-1">
          {card.tags.map((t) => (
            <span key={t} className="rounded-full border border-[var(--warm-200)] px-2 py-0.5 text-[10px] text-[var(--warm-500)]">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-3">
          <span className="inline-block rounded-full bg-[var(--orange-dim)] px-3 py-1 text-[10px] font-semibold text-[var(--orange)]">
            Looking for: {card.lookingFor}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Phone mockup ──────────────────────────────────────────────────
type Screen = "lock" | "app" | "match" | "chat" | "cta";

function PhoneMockup({ onJoinClick }: { onJoinClick: () => void }) {
  const [screen, setScreen] = useState<Screen>("lock");
  const [queue, setQueue] = useState(SA_CARDS);
  const [rightSwipes, setRightSwipes] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Wake phone
  useEffect(() => {
    const t1 = setTimeout(() => setScreen("app"), 1400);
    return () => clearTimeout(t1);
  }, []);

  const advance = useCallback((dir: "left" | "right") => {
    if (screen !== "app") return;
    if (dir === "right") {
      const next = rightSwipes + 1;
      setRightSwipes(next);
      if (next === 3) {
        setScreen("match");
        return;
      }
    }
    setQueue((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  }, [screen, rightSwipes]);

  // Auto-cycle
  useEffect(() => {
    if (screen !== "app") return;
    timerRef.current = setInterval(() => advance("right"), 2800);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [advance, screen]);

  const handleDragEnd = (dir: "left" | "right") => {
    if (timerRef.current) clearInterval(timerRef.current);
    advance(dir);
    timerRef.current = setInterval(() => advance("right"), 2800);
  };

  const visible = queue.slice(0, 3);

  return (
    <div className="relative h-[660px] w-[320px]">
      {/* Phone frame */}
      <div className="relative h-full w-full overflow-hidden rounded-[48px] border-[12px] border-[var(--charcoal)] bg-[var(--charcoal)] shadow-[0_40px_80px_rgba(26,24,21,0.45),0_10px_30px_rgba(26,24,21,0.25)]">
        {/* Dynamic island / notch */}
        <div className="absolute left-1/2 top-0 z-30 h-7 w-28 -translate-x-1/2 rounded-b-[1.25rem] bg-[var(--charcoal)]" />
        {/* Screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[38px] bg-[var(--off-white)]">
          <AnimatePresence mode="wait">
            {screen === "lock" && <LockScreen key="lock" />}

            {screen === "app" && (
              <motion.div
                key="app"
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                {/* App status bar */}
                <div className="flex items-center justify-between px-6 pt-10 pb-3">
                  <span className="text-[11px] font-black text-[var(--charcoal)]">Howzit</span>
                  <span className="text-[10px] text-[var(--warm-500)]">{queue[0]?.type}</span>
                </div>

                {/* Cards */}
                <div className="relative mx-4 h-[500px]">
                  <AnimatePresence>
                    {visible.map((card, i) => (
                      <SwipeCard
                        key={card.id}
                        card={card}
                        index={i}
                        isTop={i === 0}
                        onSwipe={handleDragEnd}
                      />
                    ))}
                  </AnimatePresence>
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-center gap-5 pt-3">
                  <button
                    onClick={() => advance("left")}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--warm-200)] bg-white text-[var(--warm-500)] shadow-sm transition-transform hover:scale-105"
                  >
                    <X size={18} />
                  </button>
                  <button
                    onClick={() => advance("right")}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--orange)] text-white shadow-[0_6px_20px_rgba(255,106,0,0.45)] transition-transform hover:scale-105"
                  >
                    <Heart size={20} fill="currentColor" />
                  </button>
                </div>
              </motion.div>
            )}

            {screen === "match" && (
              <MatchScreen key="match" onDone={() => setScreen("chat")} />
            )}

            {screen === "chat" && (
              <ChatScreen key="chat" onDone={() => setScreen("cta")} />
            )}

            {screen === "cta" && (
              <motion.div
                key="cta"
                className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--charcoal)] p-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-base font-bold text-white/60">Imagine if these were real.</p>
                <p className="mt-2 text-2xl font-black text-white">Join the waitlist.</p>
                <p className="mt-3 text-sm text-white/40">Every one of those cards could be a real opportunity waiting for you.</p>
                <button
                  onClick={onJoinClick}
                  className="mt-7 rounded-full bg-[var(--orange)] px-7 py-3 text-sm font-black text-white shadow-[0_4px_20px_rgba(255,106,0,0.4)] transition-transform hover:scale-105"
                >
                  Get Early Access
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Phone shine */}
      <div className="pointer-events-none absolute inset-0 rounded-[48px] bg-gradient-to-br from-white/10 to-transparent" />
    </div>
  );
}

// ── Demo section (exported) ────────────────────────────────────────
export const InteractiveAppDemo = forwardRef<HTMLElement, { onJoinClick: () => void }>(
  ({ onJoinClick }, ref) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [-300, 300], [4, -4]);
    const rotateY = useTransform(mouseX, [-300, 300], [-4, 4]);

    useEffect(() => {
      const handler = (e: MouseEvent) => {
        mouseX.set(e.clientX - window.innerWidth / 2);
        mouseY.set(e.clientY - window.innerHeight / 2);
      };
      window.addEventListener("mousemove", handler);
      return () => window.removeEventListener("mousemove", handler);
    }, [mouseX, mouseY]);

    return (
      <section
        ref={ref as React.RefObject<HTMLElement>}
        className="overflow-hidden bg-white px-6 py-24 sm:px-12"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--orange)]">
              The product
            </p>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-[var(--charcoal)] sm:text-4xl">
              Swipe through people, jobs, mentors and opportunities that actually make sense for you.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--warm-500)]">
              Not everyone is born into the right network. That shouldn&apos;t decide your future.
            </p>

            {/* 3 steps */}
            <ol className="mt-8 space-y-4">
              {[
                "Choose what you're looking for.",
                "Swipe through real opportunities.",
                "Match and start the conversation.",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--orange)] text-xs font-black text-white">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-sm font-medium text-[var(--charcoal)]">{step}</span>
                </li>
              ))}
            </ol>

            <button
              onClick={onJoinClick}
              className="mt-10 rounded-full bg-[var(--orange)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(255,106,0,0.3)] transition-transform hover:scale-[1.03] active:scale-95"
            >
              Join the Founding Members
            </button>

            <p className="mt-4 text-xs text-[var(--warm-500)]">
              ← Drag the cards on the phone to try it.
            </p>
          </motion.div>

          {/* Right: phone */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <motion.div
              style={{ perspective: 1000, rotateX, rotateY }}
              className="will-change-transform"
            >
              <PhoneMockup onJoinClick={onJoinClick} />
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }
);

InteractiveAppDemo.displayName = "InteractiveAppDemo";
