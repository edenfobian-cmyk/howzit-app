import type { LookingFor, SwipeCard, ProblemStat } from "@/types";

export const SITE_NAME = "Howzit";
export const SITE_URL = "https://joinhowzit.com";
export const SITE_DESCRIPTION =
  "Howzit helps young South Africans meet the people, jobs, mentors and opportunities they usually never get close to.";

export const ORANGE = "#FF6A00";
export const CHARCOAL = "#1A1815";
export const INSTAGRAM_URL = "https://www.instagram.com/join.howzit";
export const INSTAGRAM_HANDLE = "@join.howzit";

export const SOCIAL_PROOF_BASE = 287;

export const LOOKING_FOR_OPTIONS: { value: LookingFor; label: string; emoji: string }[] = [
  { value: "jobs",                  label: "Jobs",                  emoji: "💼" },
  { value: "internships",           label: "Internships",           emoji: "🎓" },
  { value: "friends",               label: "Friends",               emoji: "🤝" },
  { value: "mentors",               label: "Mentors",               emoji: "🌱" },
  { value: "co-founder",            label: "A co-founder",          emoji: "🚀" },
  { value: "networking",            label: "Networking",            emoji: "🔗" },
  { value: "business-opportunities", label: "Business opportunities", emoji: "💡" },
  { value: "events",                label: "Events",                emoji: "📍" },
  { value: "other",                 label: "Something else",        emoji: "✨" },
];

export const SWIPE_CARDS: SwipeCard[] = [
  {
    id: "1",
    type: "person",
    name: "Aaliyah Davids",
    role: "Actuarial Science Student",
    location: "Cape Town · UCT",
    bio: "Looking for a mentor in finance or insurance.",
    tags: ["Finance", "Mentorship", "3rd Year"],
    avatar: "AD",
  },
  {
    id: "2",
    type: "co-founder",
    name: "Kabelo Sithole",
    role: "Logistics Startup Founder",
    location: "Johannesburg",
    bio: "Building last-mile delivery for township businesses. Need a technical co-founder.",
    tags: ["Logistics", "Founder", "Co-founder Wanted"],
    avatar: "KS",
  },
  {
    id: "3",
    type: "job",
    name: "Software Eng Internship",
    role: "Seedlab · Paid · 3 months",
    location: "Cape Town · Hybrid",
    bio: "Join a Y Combinator-backed team building fintech for South Africa.",
    tags: ["React", "TypeScript", "Fintech"],
    avatar: "SL",
  },
  {
    id: "4",
    type: "person",
    name: "Thando Mkhize",
    role: "Junior Developer",
    location: "Durban",
    bio: "Self-taught. 1 year in. Looking for my first real project or team.",
    tags: ["JavaScript", "Open to Work", "Learner"],
    avatar: "TM",
  },
  {
    id: "5",
    type: "event",
    name: "Startup Networking Night",
    role: "Free · 40 founders attending",
    location: "Cape Town · Tomorrow 7pm",
    bio: "Low-key meetup for builders in Cape Town. Bring a card. Or don't.",
    tags: ["Founders", "Free Entry", "Cape Town"],
    avatar: "SN",
  },
  {
    id: "6",
    type: "mentor",
    name: "Refiloe Dlamini",
    role: "VC Analyst · 5 years exp",
    location: "Sandton",
    bio: "Open to mentoring 1–2 ambitious founders. Especially pre-seed EdTech & HealthTech.",
    tags: ["Investor", "Mentor", "EdTech"],
    avatar: "RD",
  },
  {
    id: "7",
    type: "person",
    name: "Lwandle Nkosi",
    role: "Clothing Brand Founder",
    location: "Cape Town",
    bio: "Building a streetwear brand. Looking for a creative marketer to grow together.",
    tags: ["Fashion", "Creative", "Looking for Marketer"],
    avatar: "LN",
  },
  {
    id: "8",
    type: "opportunity",
    name: "Marketing Lead",
    role: "Series A Startup · R38k/mo",
    location: "Remote (SA only)",
    bio: "Fast-growing fintech looking for a growth marketer with community experience.",
    tags: ["Marketing", "Growth", "Remote"],
    avatar: "ML",
  },
];

export const PROBLEM_STATS: ProblemStat[] = [
  { value: 45, suffix: "%", label: "of young South Africans are unemployed" },
  { value: 3, suffix: "in 4",  label: "opportunities come through personal networks" },
  { value: 82, suffix: "%", label: "say they lack access, not ambition" },
];

export const FIRST_WEEK = [
  {
    day: "Day 1",
    title: "Create your profile.",
    body: "Tell us what you're building, learning, or looking for. Takes 90 seconds.",
  },
  {
    day: "Day 2",
    title: "See your feed.",
    body: "People, jobs, mentors and opportunities matched to you — not random noise.",
  },
  {
    day: "Day 3",
    title: "Swipe on what matters.",
    body: "Right for yes. Left for no. No cold emails. No awkward LinkedIn requests.",
  },
  {
    day: "Day 4",
    title: "Get a match.",
    body: "When someone swipes right on you too, a conversation unlocks. Both sides opted in.",
  },
  {
    day: "Day 5",
    title: "Start talking.",
    body: "A real conversation with someone who actually wants the same thing.",
  },
  {
    day: "Day 7",
    title: "Your network grows.",
    body: "One week in. You already know more of the right people than you did before.",
  },
];
