export type LookingFor =
  | "jobs"
  | "friends"
  | "mentors"
  | "co-founder"
  | "networking"
  | "internships"
  | "business-opportunities"
  | "other";

export type WaitlistStatus = "pending" | "approved" | "invited";

export interface WaitlistEntry {
  id?: string;
  created_at?: string;
  email: string;
  first_name: string;
  surname: string;
  age: number;
  looking_for: LookingFor;
  status?: WaitlistStatus;
  source?: string;
}

export type WaitlistFormData = Omit<WaitlistEntry, "id" | "created_at" | "status" | "source">;

export type SwipeCardType = "person" | "job" | "mentor" | "co-founder" | "event";

export interface SwipeCard {
  id: string;
  type: SwipeCardType;
  name: string;
  role: string;
  location: string;
  tags: string[];
}

export interface ProblemStat {
  value: number;
  suffix: string;
  label: string;
}
