"use client";

import { motion } from "framer-motion";
import { ArrowDown, Users, Briefcase, Rocket } from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/animations/variants";

interface HeroProps {
  onJoinClick: () => void;
  onLearnMoreClick: () => void;
}

const pills = [
  { icon: Users, label: "Find your mentor" },
  { icon: Briefcase, label: "Land your dream job" },
  { icon: Rocket, label: "Meet your co-founder" },
];

export function Hero({ onJoinClick, onLearnMoreClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, #FF5500 0%, transparent 70%)",
        }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        {/* Eyebrow */}
        <motion.div variants={staggerItem} className="flex justify-center mb-8">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border"
            style={{
              backgroundColor: "rgba(255, 85, 0, 0.06)",
              borderColor: "rgba(255, 85, 0, 0.2)",
              color: "#FF5500",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
            Now accepting early members · South Africa
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={staggerItem}
          className="text-[clamp(2.5rem,7vw,5rem)] font-black tracking-tight leading-[1.05] text-[#0A0A0A] mb-6"
        >
          Find your people.
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #FF5500 0%, #FF8C00 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Build your future.
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={staggerItem}
          className="text-lg md:text-xl text-[#525252] max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Howzit connects ambitious South Africans with the people and opportunities
          they need — using a swipe interface that makes networking actually enjoyable.
        </motion.p>

        {/* Floating pills */}
        <motion.div
          variants={staggerItem}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {pills.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E5E5E5] text-sm font-medium text-[#0A0A0A] shadow-sm"
            >
              <Icon size={14} style={{ color: "#FF5500" }} />
              {label}
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={staggerItem}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <button
            onClick={onJoinClick}
            className="px-8 py-3.5 rounded-full font-semibold text-white text-base transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95 shadow-lg"
            style={{
              backgroundColor: "#FF5500",
              boxShadow: "0 4px 24px rgba(255,85,0,0.35)",
            }}
          >
            Join the waitlist — it's free
          </button>
          <button
            onClick={onLearnMoreClick}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full font-medium text-sm text-[#525252] hover:text-[#0A0A0A] transition-colors duration-200"
          >
            Learn more
            <ArrowDown size={14} />
          </button>
        </motion.div>

        {/* Social proof micro */}
        <motion.div
          variants={staggerItem}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <div className="flex -space-x-2">
            {["SD", "KN", "RJ", "AP", "TM"].map((initials, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white"
                style={{
                  backgroundColor: i % 2 === 0 ? "#FF5500" : "#0A0A0A",
                  zIndex: 5 - i,
                }}
              >
                {initials}
              </div>
            ))}
          </div>
          <p className="text-sm text-[#737373]">
            <span className="font-semibold text-[#0A0A0A]">2,847</span> people already joined
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
