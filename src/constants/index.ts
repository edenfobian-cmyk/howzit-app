import type { LookingFor, SwipeCard, ProblemStat } from "@/types";

export const SITE_NAME = "Howzit";
export const SITE_URL = "https://joinhowzit.com";
export const SITE_DESCRIPTION =
  "The easiest way for ambitious South Africans to meet the people and opportunities that change lives.";

export const ORANGE = "#FF6A00";
export const CHARCOAL = "#1A1815";

export const LOOKING_FOR_OPTIONS: { value: LookingFor; label: string }[] = [
  { value: "jobs", label: "Jobs" },
  { value: "friends", label: "Friends" },
  { value: "mentors", label: "Mentors" },
  { value: "co-founder", label: "A co-founder" },
  { value: "networking", label: "Networking" },
  { value: "internships", label: "Internships" },
  { value: "business-opportunities", label: "Business opportunities" },
  { value: "other", label: "Something else" },
];

export const SWIPE_CARDS: SwipeCard[] = [
  {
    id: "1",
    type: "person",
    name: "Thabo M.",
    role: "Senior Software Engineer",
    location: "Cape Town",
    tags: ["React", "Mentor"],
  },
  {
    id: "2",
    type: "co-founder",
    name: "Co-founder Wanted",
    role: "FinTech · Early Stage",
    location: "Johannesburg",
    tags: ["Equity", "Technical"],
  },
  {
    id: "3",
    type: "mentor",
    name: "Naledi K.",
    role: "Venture Partner",
    location: "Sandton",
    tags: ["Investor", "EdTech"],
  },
  {
    id: "4",
    type: "job",
    name: "Marketing Lead",
    role: "Full-time · Growth Stage",
    location: "Remote (SA)",
    tags: ["R35k/mo", "Series A"],
  },
  {
    id: "5",
    type: "event",
    name: "Build With Africa",
    role: "Founders Meetup",
    location: "Pan-African",
    tags: ["2.4k members", "Open"],
  },
];

export const PROBLEM_STATS: ProblemStat[] = [
  { value: 45, suffix: "%", label: "of young South Africans are unemployed" },
  { value: 70, suffix: "%", label: "of opportunities come through personal networks" },
  { value: 82, suffix: "%", label: "say they lack access, not ambition" },
];
