import type { FaqItem, Feature, Interest, AgeGroup, SwipeCard, Stat, Testimonial } from "@/types";

export const SITE_NAME = "Howzit";
export const SITE_URL = "https://howzit.app";
export const SITE_DESCRIPTION =
  "The easiest way for ambitious South Africans to find their people. Swipe to connect with jobs, mentors, co-founders, investors, and communities.";

export const ORANGE = "#FF5500";
export const BLACK = "#0A0A0A";

export const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Why SA", href: "#why-sa" },
  { label: "FAQ", href: "#faq" },
];

export const AGE_GROUPS: { value: AgeGroup; label: string }[] = [
  { value: "18-21", label: "18–21" },
  { value: "22-25", label: "22–25" },
  { value: "26-29", label: "26–29" },
  { value: "30-35", label: "30–35" },
];

export const INTERESTS: { value: Interest; label: string; emoji: string }[] = [
  { value: "jobs", label: "Jobs", emoji: "💼" },
  { value: "internships", label: "Internships", emoji: "🎓" },
  { value: "mentorship", label: "Mentorship", emoji: "🌱" },
  { value: "co-founders", label: "Co-founders", emoji: "🤝" },
  { value: "investors", label: "Investors", emoji: "💰" },
  { value: "communities", label: "Communities", emoji: "🌍" },
  { value: "networking", label: "Networking", emoji: "🔗" },
  { value: "collaborators", label: "Collaborators", emoji: "⚡" },
];

export const SA_CITIES = [
  "Cape Town",
  "Johannesburg",
  "Durban",
  "Pretoria",
  "Port Elizabeth",
  "Bloemfontein",
  "East London",
  "Nelspruit",
  "Kimberley",
  "Polokwane",
  "Pietermaritzburg",
  "Stellenbosch",
];

export const SWIPE_CARDS: SwipeCard[] = [
  {
    id: "1",
    type: "person",
    name: "Thabo M.",
    role: "Senior Software Engineer",
    location: "Cape Town",
    tags: ["React", "Node.js", "Mentor"],
    color: "#FF5500",
  },
  {
    id: "2",
    type: "opportunity",
    name: "Startup Opportunity",
    role: "Co-founder Wanted",
    location: "Johannesburg",
    tags: ["FinTech", "Early Stage", "Equity"],
    color: "#0A0A0A",
  },
  {
    id: "3",
    type: "person",
    name: "Naledi K.",
    role: "Venture Partner @ Savanna VC",
    location: "Sandton",
    tags: ["Investor", "Pre-Seed", "EdTech"],
    color: "#FF5500",
  },
  {
    id: "4",
    type: "community",
    name: "Build With Africa",
    role: "Community · 2.4k members",
    location: "Pan-African",
    tags: ["Builders", "Founders", "Open"],
    color: "#0A0A0A",
  },
  {
    id: "5",
    type: "person",
    name: "Ayasha P.",
    role: "UX Designer & Creative Director",
    location: "Durban",
    tags: ["Design", "Branding", "Open to work"],
    color: "#FF5500",
  },
  {
    id: "6",
    type: "opportunity",
    name: "Marketing Lead",
    role: "Full-time · Growth Stage",
    location: "Remote (SA)",
    tags: ["Marketing", "R35k/mo", "Series A"],
    color: "#0A0A0A",
  },
];

export const FEATURES: Feature[] = [
  {
    id: "verified",
    title: "Verified Profiles",
    description:
      "Every user is verified. No ghost profiles, no spam — just real, ambitious South Africans.",
    icon: "Shield",
  },
  {
    id: "smart",
    title: "Smart Matching",
    description:
      "Our algorithm learns what matters to you and surfaces connections that actually make sense.",
    icon: "Sparkles",
  },
  {
    id: "cofounders",
    title: "Co-founder Matching",
    description:
      "Find your technical co-founder or business partner. Build the next big thing together.",
    icon: "Users",
  },
  {
    id: "opportunities",
    title: "Opportunity Discovery",
    description:
      "Jobs, internships, grants, and pitching opportunities — all surfaced through your swipe feed.",
    icon: "Briefcase",
  },
  {
    id: "communities",
    title: "Communities",
    description:
      "Join and build micro-communities around industries, cities, and interests.",
    icon: "Globe",
  },
  {
    id: "mentorship",
    title: "Mentorship",
    description:
      "Connect with experienced professionals who have walked the path you're on.",
    icon: "GraduationCap",
  },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Create your profile",
    description:
      "Tell us who you are, what you're building, and what you're looking for. Takes 90 seconds.",
  },
  {
    step: "02",
    title: "Swipe your feed",
    description:
      "Right for yes, left for no. People, jobs, communities, opportunities — all in one feed.",
  },
  {
    step: "03",
    title: "Match & connect",
    description:
      "When someone swipes right on you too, you unlock a direct conversation. No cold outreach needed.",
  },
  {
    step: "04",
    title: "Build together",
    description:
      "From first message to first meeting. Howzit gets out of the way so you can do the work.",
  },
];

export const SA_STATS: Stat[] = [
  { value: "32%", label: "Youth unemployment rate in South Africa", suffix: "" },
  { value: "1M+", label: "Young South Africans enter the job market each year", suffix: "" },
  { value: "78%", label: "Of opportunities are found through connections, not job boards", suffix: "" },
  { value: "9", label: "Provinces. One platform.", suffix: "" },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Siya Dlamini",
    role: "Software Engineer",
    location: "Cape Town",
    avatar: "SD",
    quote:
      "I found my current job through a connection I made in the first week. This is exactly what SA needed.",
  },
  {
    id: "2",
    name: "Kefilwe Nkosi",
    role: "Founder, TechBridge",
    location: "Johannesburg",
    avatar: "KN",
    quote:
      "Found my CTO within two weeks. No recruiters, no LinkedIn spam — just a real conversation that changed everything.",
  },
  {
    id: "3",
    name: "Rameez Jacobs",
    role: "Product Designer",
    location: "Durban",
    avatar: "RJ",
    quote:
      "The swipe format makes networking feel natural, not forced. I've made 3 genuine professional relationships.",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is Howzit free to use?",
    answer:
      "Howzit will offer a generous free tier forever. Premium features like advanced filters and priority matching will be available on paid plans. Early waitlist members get 3 months of premium free.",
  },
  {
    question: "When does Howzit launch?",
    answer:
      "We're launching in Cape Town and Johannesburg first, then rolling out nationally. Waitlist members get early access before the public. Join now to secure your spot.",
  },
  {
    question: "Is it only for job seekers?",
    answer:
      "Not at all. Howzit is for anyone who wants to grow their network — whether you're a founder looking for co-founders, a professional looking for a mentor, a student looking for an internship, or an investor looking for dealflow.",
  },
  {
    question: "How is this different from LinkedIn?",
    answer:
      "LinkedIn is a CV repository. Howzit is a network builder. The swipe mechanic makes discovery frictionless, the matching algorithm is intention-aware, and every connection is opt-in from both sides — so every conversation starts with mutual interest.",
  },
  {
    question: "Is Howzit only for South Africans?",
    answer:
      "We're built specifically for the South African context — local cities, local opportunities, local communities. We may expand across Africa in the future, but for now we're 100% focused on building the best network for ambitious South Africans.",
  },
  {
    question: "How do I know profiles are real?",
    answer:
      "We use phone verification, LinkedIn cross-referencing, and community reporting to keep Howzit high-quality. Verified badges are earned, not bought.",
  },
];
