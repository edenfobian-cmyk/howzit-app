export type LookingFor =
  | "jobs"
  | "internships"
  | "friends"
  | "mentors"
  | "co-founder"
  | "networking"
  | "business-opportunities"
  | "events"
  | "other";

export type WaitlistStatus = "pending" | "approved" | "invited";

export interface WaitlistEntry {
  id?: string;
  created_at?: string;
  email: string;
  first_name: string;
  surname: string;
  age: number;
  looking_for: LookingFor[];
  referral_code?: string;
  referred_by?: string;
  status?: WaitlistStatus;
  source?: string;
}

export type SwipeCardType = "person" | "job" | "mentor" | "co-founder" | "event" | "opportunity";

export interface SwipeCard {
  id: string;
  type: SwipeCardType;
  name: string;
  role: string;
  location: string;
  bio: string;
  tags: string[];
  avatar?: string;
}

export interface ProblemStat {
  value: number;
  suffix: string;
  label: string;
}
