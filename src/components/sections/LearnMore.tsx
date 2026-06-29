"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Briefcase,
  Rocket,
  Sparkles,
  GraduationCap,
  Globe,
  Shield,
  ChevronRight,
} from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/animations/variants";

interface LearnMoreProps {
  onJoinClick: () => void;
}

const features = [
  {
    icon: Sparkles,
    title: "Smart matching",
    description:
      "Our algorithm surfaces connections that actually make sense — based on your goals, not just your job title.",
  },
  {
    icon: Rocket,
    title: "Co-founder matching",
    description:
      "Building something? Find your technical co-founder or business partner through mutual swipe matching.",
  },
  {
    icon: GraduationCap,
    title: "Mentorship",
    description:
      "Connect with experienced professionals who have walked the path you're on. Both sides swipe — so every mentor match is opt-in.",
  },
  {
    icon: Briefcase,
    title: "Opportunity discovery",
    description:
      "Jobs, internships, grants, and pitching opportunities — surfaced through your swipe feed, not buried in a job board.",
  },
  {
    icon: Globe,
    title: "Communities",
    description:
      "Join micro-communities around industries, cities, and interests. Cape Town tech. Joburg finance. SA builders.",
  },
  {
    icon: Shield,
    title: "Verified profiles",
    description:
      "No ghost profiles, no spam. Every user is verified. Real people, real ambitions.",
  },
];

const steps = [
  { number: "01", title: "Create your profile", description: "90 seconds. Tell us who you are and what you're looking for." },
  { number: "02", title: "Swipe your feed", description: "People, jobs, mentors, communities. Right for yes, left for no." },
  { number: "03", title: "Match & connect", description: "When interest is mutual, you unlock a direct conversation." },
  { number: "04", title: "Build together", description: "From first message to first meeting. Howzit gets out of the way." },
];

export const LearnMore = forwardRef<HTMLElement, LearnMoreProps>(
  ({ onJoinClick }, ref) => {
    return (
      <section ref={ref} className="bg-white pb-32">
        {/* Divider */}
        <div className="flex justify-center py-16">
          <div className="w-px h-12 bg-[#E5E5E5]" />
        </div>

        {/* Problem */}
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={staggerItem} className="text-center mb-16">
              <p
                className="text-xs font-bold tracking-[0.15em] uppercase mb-4"
                style={{ color: "#FF5500" }}
              >
                The Problem
              </p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#0A0A0A] mb-4 leading-tight">
                South Africa has incredible talent.
                <br />
                <span className="text-[#737373]">Opportunity is the problem.</span>
              </h2>
              <p className="text-base text-[#525252] max-w-lg mx-auto leading-relaxed">
                Most young South Africans aren't missing ambition. They're missing access.
                The right people are always in the wrong room. Howzit changes that.
              </p>
            </motion.div>

            {/* Problem cards */}
            <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-24">
              {[
                {
                  quote: "Sipho graduated top of his class from UCT... but his LinkedIn is full of recruiters from London.",
                  name: "The graduate",
                },
                {
                  quote: "Naledi is building a fintech startup. Finding a technical co-founder in Joburg feels impossible.",
                  name: "The founder",
                },
                {
                  quote: "Liam has the skills. But the right people are always in the wrong room.",
                  name: "The creative",
                },
              ].map(({ quote, name }) => (
                <div
                  key={name}
                  className="p-6 rounded-2xl border border-[#F0F0F0] bg-[#FAFAFA]"
                >
                  <p className="text-sm text-[#525252] leading-relaxed mb-4 italic">
                    &ldquo;{quote}&rdquo;
                  </p>
                  <p className="text-xs font-semibold text-[#A0A0A0] uppercase tracking-wide">{name}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* How it works */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-24"
          >
            <motion.div variants={staggerItem} className="text-center mb-12">
              <p
                className="text-xs font-bold tracking-[0.15em] uppercase mb-4"
                style={{ color: "#FF5500" }}
              >
                How it works
              </p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#0A0A0A]">
                Four steps. One network.
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map(({ number, title, description }) => (
                <motion.div key={number} variants={staggerItem}>
                  <div className="text-xs font-bold text-[#FF5500] mb-3">{number}</div>
                  <h3 className="font-bold text-[#0A0A0A] mb-2">{title}</h3>
                  <p className="text-sm text-[#525252] leading-relaxed">{description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-24"
          >
            <motion.div variants={staggerItem} className="text-center mb-12">
              <p
                className="text-xs font-bold tracking-[0.15em] uppercase mb-4"
                style={{ color: "#FF5500" }}
              >
                Features
              </p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#0A0A0A]">
                Built for ambition.
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map(({ icon: Icon, title, description }) => (
                <motion.div
                  key={title}
                  variants={staggerItem}
                  className="group p-6 rounded-2xl border border-[#E5E5E5] bg-white hover:border-[#FF5500]/20 hover:shadow-lg transition-all duration-300"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: "rgba(255,85,0,0.08)" }}
                  >
                    <Icon size={18} style={{ color: "#FF5500" }} />
                  </div>
                  <h3 className="font-bold text-[#0A0A0A] mb-2">{title}</h3>
                  <p className="text-sm text-[#525252] leading-relaxed">{description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-24"
          >
            <motion.div
              variants={staggerItem}
              className="rounded-3xl p-10 md:p-14 text-center text-white"
              style={{ backgroundColor: "#0A0A0A" }}
            >
              <p
                className="text-xs font-bold tracking-[0.15em] uppercase mb-6"
                style={{ color: "#FF5500" }}
              >
                Why South Africa
              </p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-10">
                The numbers tell the story.
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { value: "32%", label: "Youth unemployment rate" },
                  { value: "1M+", label: "Young people enter the market each year" },
                  { value: "78%", label: "Of opportunities are found through connections" },
                  { value: "9", label: "Provinces. One platform." },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <div
                      className="text-4xl md:text-5xl font-black mb-2"
                      style={{ color: "#FF5500" }}
                    >
                      {value}
                    </div>
                    <div className="text-sm text-[#A0A0A0] leading-snug">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* FAQ */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-24"
          >
            <motion.div variants={staggerItem} className="text-center mb-12">
              <p
                className="text-xs font-bold tracking-[0.15em] uppercase mb-4"
                style={{ color: "#FF5500" }}
              >
                FAQ
              </p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#0A0A0A]">
                Questions answered.
              </h2>
            </motion.div>
            <div className="max-w-2xl mx-auto space-y-4">
              {[
                {
                  q: "Is Howzit free?",
                  a: "Yes. A generous free tier will always exist. Early waitlist members get 3 months of premium features free at launch.",
                },
                {
                  q: "When does Howzit launch?",
                  a: "We're launching in Cape Town and Johannesburg first, then rolling out nationally. Waitlist members get early access before the public.",
                },
                {
                  q: "How is this different from LinkedIn?",
                  a: "LinkedIn is a CV repository. Howzit is a network builder. The swipe mechanic makes discovery frictionless, every connection is opt-in from both sides, and the experience is built specifically for the South African context.",
                },
                {
                  q: "Is it only for job seekers?",
                  a: "Not at all. Howzit is for anyone who wants to grow their network — founders, investors, mentors, students, creatives, and anyone building something in South Africa.",
                },
                {
                  q: "How do I know profiles are real?",
                  a: "We use phone verification, LinkedIn cross-referencing, and community reporting to keep Howzit high-quality. Verified badges are earned, not bought.",
                },
              ].map(({ q, a }) => (
                <motion.details
                  key={q}
                  variants={staggerItem}
                  className="group border border-[#E5E5E5] rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer select-none font-semibold text-[#0A0A0A] hover:bg-[#FAFAFA] transition-colors">
                    {q}
                    <ChevronRight
                      size={16}
                      className="text-[#A0A0A0] group-open:rotate-90 transition-transform duration-200 flex-shrink-0"
                    />
                  </summary>
                  <div className="px-5 pb-5 text-sm text-[#525252] leading-relaxed">
                    {a}
                  </div>
                </motion.details>
              ))}
            </div>
          </motion.div>

          {/* Final CTA inline */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#0A0A0A] mb-4">
              South Africa is building something special.
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #FF5500 0%, #FF8C00 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Be part of it.
              </span>
            </h2>
            <p className="text-[#525252] mb-8 max-w-md mx-auto">
              Join 2,847 ambitious South Africans already on the waitlist. Early access. Free forever tier. No spam.
            </p>
            <button
              onClick={onJoinClick}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white text-base transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: "#FF5500",
                boxShadow: "0 4px 24px rgba(255,85,0,0.35)",
              }}
            >
              Join the waitlist
              <ChevronRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>
    );
  }
);

LearnMore.displayName = "LearnMore";
