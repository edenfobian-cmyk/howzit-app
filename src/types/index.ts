export interface WaitlistEntry {
  id?: string;
  created_at?: string;
  email: string;
  first_name: string;
  city: string;
  age_group: AgeGroup;
  interests: Interest[];
  status?: WaitlistStatus;
  source?: string;
}

export type AgeGroup = "18-21" | "22-25" | "26-29" | "30-35";

export type Interest =
  | "jobs"
  | "internships"
  | "mentorship"
  | "co-founders"
  | "investors"
  | "communities"
  | "networking"
  | "collaborators";

export type WaitlistStatus = "pending" | "approved" | "invited";

export interface WaitlistFormData {
  first_name: string;
  email: string;
  city: string;
  age_group: AgeGroup;
  interests: Interest[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  quote: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SwipeCard {
  id: string;
  type: "person" | "opportunity" | "community";
  name: string;
  role: string;
  location: string;
  tags: string[];
  color: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Stat {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}
