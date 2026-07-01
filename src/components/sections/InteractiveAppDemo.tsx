"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { Heart, MapPin, MessageCircle, X } from "lucide-react";

// ── Card data with Unsplash photos ─────────────────────────────────
const CARDS = [
  {
    id: "1",
    type: "person" as const,
    name: "Zara M.",
    age: 24,
    role: "UX Designer",
    location: "Cape Town",
    bio: "Freelancing and looking for a startup to join as design lead. I work fast and obsessively.",
    tags: ["Design", "Branding", "Mobile"],
    lookingFor: "Startup or studio to join",
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop&crop=faces,center",
    accent: "#FF6A00",
  },
  {
    id: "2",
    type: "opportunity" as const,
    name: "Seedlab",
    age: null,
    role: "Software Internship · 3 months · Paid",
    location: "Cape Town · Hybrid",
    bio: "Y Combinator-backed fintech building the payments infrastructure for South Africa. Team of 14.",
    tags: ["React", "TypeScript", "Fintech"],
    lookingFor: "Junior / graduate developer",
    photo: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=500&fit=crop",
    accent: "#1A1815",
  },
  {
    id: "3",
    type: "person" as const,
    name: "Liam J.",
    age: 27,
    role: "ML Engineer",
    location: "Cape Town",
    bio: "Building AI tooling for SMEs. Looking for a co-founder who gets business and people.",
    tags: ["AI", "Python", "Co-founder"],
    lookingFor: "Business co-founder",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=faces,center",
    accent: "#4A607C",
  },
  {
    id: "4",
    type: "mentor" as const,
    name: "Nadia K.",
    age: 34,
    role: "VC Analyst · 5 years",
    location: "Sandton",
    bio: "Open to mentoring 1–2 founders in EdTech or Consumer. Pre-seed focus. DMs open.",
    tags: ["Investing", "EdTech", "Pre-seed"],
    lookingFor: "Ambitious early founders",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=faces,center",
    accent: "#4A7C59",
  },
  {
    id: "5",
    type: "event" as const,
    name: "Startup Night CT",
    age: null,
    role: "Free · This Friday 7pm",
    location: "V&A Waterfront",
    bio: "300+ builders, founders and investors. Casual vibes. You will know someone here by the end.",
    tags: ["Networking", "Free", "Founders"],
    lookingFor: "Anyone building something",
    photo: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=500&fit=crop",
    accent: "#7C4A4A",
  },
  {
    id: "6",
    type: "person" as const,
    name: "Jordan O.",
    age: 23,
    role: "Content Creator · Filmmaker",
    location: "Cape Town",
    bio: "Making short-form content for SA brands. Looking for creative projects and brand collabs.",
    tags: ["Film", "Content", "Creative"],
    lookingFor: "Brand partnerships",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=faces,center",
    accent: "#6A4A7C",
  },
] as const;

type Card = (typeof CARDS)[number];

const TYPE_LABEL: Record<Card["type"], string> = {
  person: "Profile",
  opportunity: "Opportunity",
  mentor: "Mentor",
  event: "Event",
};

const TYPE_BG: Record<Card["type"], string> = {
  person: "rgba(255,106,0,0.12)",
  opportunity: "rgba(26,24,21,0.08)",
  mentor: "rgba(74,124,89,0.12)",
  event: "rgba(124,74,74,0.12)",
};

const TYPE_COLOR: Record<Card["type"], string> = {
  person: "#FF6A00",
  opportunity: "#1A1815",
  mentor: "#4A7C59",
  event: "#7C4A4A",
};

// ── Swipeable card ─────────────────────────────────────────────────
function SwipeCard({
  card,
  index,
  isTop,
  hinted,
  onSwipe,
}: {
  card: Card;
  index: number;
  isTop: boolean;
  hinted: boolean;
  onSwipe: (dir: "left" | "right") => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-180, 180], [-22, 22]);
  const likeOpacity = useTransform(x, [40, 110], [0, 1]);
  const nopeOpacity = useTransform(x, [-110, -40], [1, 0]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 80 || Math.abs(info.velocity.x) > 500) {
      onSwipe(info.offset.x > 0 ? "right" : "left");
    }
  };

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        zIndex: 10 - index,
        scale: 1 - index * 0.04,
        y: index * 10,
        opacity: 1 - index * 0.18,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.75}
      onDragEnd={isTop ? handleDragEnd : undefined}
      animate={
        isTop && hinted
          ? { x: [0, -18, 15, -10, 6, 0] }
          : { x: 0 }
      }
      transition={
        isTop && hinted
          ? { duration: 0.9, delay: 0, ease: "easeInOut" }
          : { duration: 0 }
      }
    >
      {/* Card */}
      <div className="flex h-full w-full flex-col overflow-hidden rounded-[1.4rem] bg-white shadow-[0_8px_30px_rgba(26,24,21,0.14)]">

        {/* Like / Nope stamps */}
        {isTop && (
          <>
            <motion.div
              style={{ opacity: likeOpacity }}
              className="pointer-events-none absolute left-4 top-6 z-20 rotate-[-14deg] rounded-xl border-2 border-green-500 px-3 py-1.5 text-sm font-black uppercase tracking-wide text-green-500"
            >
              Like
            </motion.div>
            <motion.div
              style={{ opacity: nopeOpacity }}
              className="pointer-events-none absolute right-4 top-6 z-20 rotate-[14deg] rounded-xl border-2 border-red-500 px-3 py-1.5 text-sm font-black uppercase tracking-wide text-red-500"
            >
              Nope
            </motion.div>
          </>
        )}

        {/* Photo */}
        <div className="relative h-[58%] flex-shrink-0 overflow-hidden">
          <img
            src={card.photo}
            alt={card.name}
            className="h-full w-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

          {/* Type badge */}
          <div className="absolute left-3 top-3">
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
              style={{ backgroundColor: TYPE_BG[card.type], color: TYPE_COLOR[card.type] }}
            >
              {TYPE_LABEL[card.type]}
            </span>
          </div>

          {/* Name + location overlaid */}
          <div className="absolute bottom-0 left-0 p-4">
            <p className="text-lg font-black leading-tight text-white">
              {card.name}
              {card.age != null && (
                <span className="ml-1.5 text-sm font-semibold text-white/70">
                  {card.age}
                </span>
              )}
            </p>
            <p className="flex items-center gap-1 text-xs text-white/70">
              <MapPin size={9} strokeWidth={2.5} />
              {card.location}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-4">
          <div>
            <p className="text-xs font-bold text-[var(--charcoal)]">{card.role}</p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-[var(--warm-500)]">
              {card.bio}
            </p>
          </div>
          <div>
            <div className="mt-2 flex flex-wrap gap-1">
              {card.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[var(--warm-200)] px-2 py-0.5 text-[10px] font-medium text-[var(--warm-500)]"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-2">
              <span
                className="inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold"
                style={{ backgroundColor: `${card.accent}12`, color: card.accent }}
              >
                {card.lookingFor}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Match screen ───────────────────────────────────────────────────
function MatchScreen({ name, photo, onDone }: { name: string; photo: string; onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2600); return () => clearTimeout(t); }, [onDone]);
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--charcoal)] px-6 text-center"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.04 }}
    >
      <div className="mb-5 flex -space-x-5">
        {[photo, "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face"].map((src, i) => (
          <motion.img
            key={i} src={src} alt=""
            className="h-20 w-20 rounded-full border-4 border-[var(--charcoal)] object-cover"
            initial={{ scale: 0, rotate: i === 0 ? -15 : 15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.12, type: "spring", stiffness: 320, damping: 24 }}
          />
        ))}
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <p className="text-lg font-black text-[var(--orange)]">It&apos;s a match.</p>
        <p className="mt-1 text-sm text-white/60">You and {name} both swiped right.</p>
      </motion.div>
    </motion.div>
  );
}

// ── Chat screen ────────────────────────────────────────────────────
type Msg = { text: string; from: "me" | "them" };

function ChatScreen({ photo, name, onDone }: { photo: string; name: string; onDone: () => void }) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  useEffect(() => {
    const seq: { text: string; from: "me" | "them"; delay: number }[] = [
      { from: "them", text: "Hey! Love your work 👀", delay: 500 },
      { from: "me",   text: "Thanks! What are you building?", delay: 1500 },
      { from: "them", text: "Can we jump on a call this week?", delay: 2600 },
    ];
    const timers = seq.map(({ text, from, delay }) =>
      setTimeout(() => setMsgs((p) => [...p, { text, from }]), delay)
    );
    const done = setTimeout(onDone, 5200);
    return () => { timers.forEach(clearTimeout); clearTimeout(done); };
  }, [onDone]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col bg-white"
      initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
      transition={{ type: "spring", stiffness: 350, damping: 34 }}
    >
      <div className="flex items-center gap-3 border-b border-[var(--warm-200)] px-5 py-3 pt-10">
        <img src={photo} alt={name} className="h-9 w-9 rounded-full object-cover" />
        <div>
          <p className="text-sm font-bold text-[var(--charcoal)]">{name}</p>
          <p className="text-[10px] text-green-500">● Online now</p>
        </div>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
        <AnimatePresence>
          {msgs.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-[11px] leading-relaxed ${
                m.from === "me" ? "rounded-br-sm bg-[var(--orange)] text-white" : "rounded-bl-sm bg-[var(--warm-100)] text-[var(--charcoal)]"
              }`}>
                {m.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-2 border-t border-[var(--warm-200)] px-4 py-3">
        <div className="flex-1 rounded-full bg-[var(--warm-100)] px-4 py-2 text-[11px] text-[var(--warm-500)]">
          Type a message...
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--orange)]">
          <MessageCircle size={13} className="text-white" />
        </div>
      </div>
    </motion.div>
  );
}

// ── Phone shell ────────────────────────────────────────────────────
type Screen = "app" | "match" | "chat" | "cta";

function PhoneShell({ onJoinClick }: { onJoinClick: () => void }) {
  const [screen, setScreen] = useState<Screen>("app");
  const [queue, setQueue] = useState([...CARDS]);
  const [hinted, setHinted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const lastMatchRef = useRef<{ name: string; photo: string } | null>(null);

  // Swipe hint after 2.5s if user hasn't touched anything
  useEffect(() => {
    if (hasInteracted) return;
    const t = setTimeout(() => setHinted(true), 2500);
    return () => clearTimeout(t);
  }, [hasInteracted]);

  const handleSwipe = useCallback((dir: "left" | "right") => {
    if (screen !== "app") return;
    setHasInteracted(true);
    setHinted(false);

    const top = queue[0];
    if (top && dir === "right" && (top.type === "person" || top.type === "mentor")) {
      lastMatchRef.current = { name: top.name, photo: top.photo };
      setTimeout(() => setScreen("match"), 280);
    }

    setTimeout(() => {
      setQueue((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
    }, 260);
  }, [screen, queue]);

  const visible = queue.slice(0, 3);

  return (
    <div className="relative h-[660px] w-[310px] flex-shrink-0">
      {/* Frame */}
      <div className="relative h-full w-full overflow-hidden rounded-[48px] border-[12px] border-[var(--charcoal)] bg-[var(--charcoal)] shadow-[0_40px_80px_rgba(26,24,21,0.4),0_12px_32px_rgba(26,24,21,0.3)]">
        {/* Dynamic island */}
        <div className="absolute left-1/2 top-0 z-30 h-7 w-28 -translate-x-1/2 rounded-b-[1.2rem] bg-[var(--charcoal)]" />

        {/* Screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[38px] bg-[var(--off-white)]">
          <AnimatePresence mode="wait">

            {/* Main app */}
            {screen === "app" && (
              <motion.div key="app" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 pt-10 pb-2">
                  <span className="text-[11px] font-black text-[var(--charcoal)]">Howzit</span>
                  <span className="text-[10px] text-[var(--warm-500)]">{queue[0]?.type}</span>
                </div>

                {/* Cards */}
                <div className="relative mx-3 h-[500px]">
                  <AnimatePresence>
                    {visible.map((card, i) => (
                      <SwipeCard
                        key={card.id}
                        card={card}
                        index={i}
                        isTop={i === 0}
                        hinted={i === 0 && hinted}
                        onSwipe={handleSwipe}
                      />
                    ))}
                  </AnimatePresence>
                </div>

                {/* Action buttons */}
                <div className="mt-4 flex items-center justify-center gap-5">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSwipe("left")}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--warm-200)] bg-white text-[var(--warm-500)] shadow-sm"
                  >
                    <X size={18} />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSwipe("right")}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--orange)] text-white shadow-[0_6px_20px_rgba(255,106,0,0.45)]"
                  >
                    <Heart size={20} fill="currentColor" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {screen === "match" && lastMatchRef.current && (
              <MatchScreen
                key="match"
                name={lastMatchRef.current.name}
                photo={lastMatchRef.current.photo}
                onDone={() => setScreen("chat")}
              />
            )}

            {screen === "chat" && lastMatchRef.current && (
              <ChatScreen
                key="chat"
                photo={lastMatchRef.current.photo}
                name={lastMatchRef.current.name}
                onDone={() => setScreen("cta")}
              />
            )}

            {screen === "cta" && (
              <motion.div key="cta" className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--charcoal)] p-8 text-center"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              >
                <p className="text-sm font-semibold text-white/40">Imagine if these were real.</p>
                <p className="mt-2 text-2xl font-black text-white">Join the waitlist.</p>
                <button
                  onClick={onJoinClick}
                  className="mt-6 rounded-full bg-[var(--orange)] px-7 py-3 text-sm font-black text-white shadow-[0_4px_20px_rgba(255,106,0,0.45)]"
                >
                  Get early access
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Phone shine */}
      <div className="pointer-events-none absolute inset-0 rounded-[48px] bg-gradient-to-br from-white/8 to-transparent" />
    </div>
  );
}

// ── Exported demo section ──────────────────────────────────────────
export const InteractiveAppDemo = forwardRef<HTMLElement, { onJoinClick: () => void }>(
  ({ onJoinClick }, ref) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [-300, 300], [3.5, -3.5]);
    const rotateY = useTransform(mouseX, [-300, 300], [-3.5, 3.5]);

    useEffect(() => {
      const handler = (e: MouseEvent) => {
        mouseX.set(e.clientX - window.innerWidth / 2);
        mouseY.set(e.clientY - window.innerHeight / 2);
      };
      window.addEventListener("mousemove", handler);
      return () => window.removeEventListener("mousemove", handler);
    }, [mouseX, mouseY]);

    return (
      <section ref={ref as React.RefObject<HTMLElement>} className="overflow-hidden bg-white px-6 py-16 sm:px-12">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Copy — condensed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--orange)]">
              The product
            </p>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-[var(--charcoal)] sm:text-4xl">
              Swipe to find your people.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--warm-500)]">
              People, jobs, mentors and opportunities — matched to what you&apos;re actually looking for.
              Not a job board. Not another LinkedIn.
            </p>

            <ol className="mt-7 space-y-3">
              {[
                "Tell us what you're looking for.",
                "Swipe through matched opportunities.",
                "Match with someone. Start the conversation.",
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--orange)] text-xs font-black text-white mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-[var(--charcoal)]">{s}</span>
                </li>
              ))}
            </ol>

            <button
              onClick={onJoinClick}
              className="mt-8 rounded-full bg-[var(--orange)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(255,106,0,0.3)] transition-transform hover:scale-[1.03] active:scale-95"
            >
              Join the Founding Members
            </button>

            <p className="mt-4 text-xs text-[var(--warm-500)]">← Drag the cards to try it.</p>
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 flex justify-center lg:order-2"
          >
            <motion.div style={{ perspective: 1000, rotateX, rotateY }}>
              <PhoneShell onJoinClick={onJoinClick} />
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }
);

InteractiveAppDemo.displayName = "InteractiveAppDemo";
