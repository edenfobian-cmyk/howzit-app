import { z } from "zod";

const LOOKING_FOR_VALUES = [
  "jobs",
  "internships",
  "friends",
  "mentors",
  "co-founder",
  "networking",
  "business-opportunities",
  "events",
  "other",
] as const;

export const step1Schema = z.object({
  first_name: z.string().trim().min(2, "Enter your first name").max(50),
  surname: z.string().trim().min(2, "Enter your surname").max(50),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  age: z.number({ message: "Enter your age" }).int().min(13, "You must be at least 13").max(100),
  referred_by: z.string().optional(),
});

export const step2Schema = z.object({
  looking_for: z
    .array(z.enum(LOOKING_FOR_VALUES))
    .min(1, "Select at least one option"),
});

export const waitlistSchema = step1Schema.extend(step2Schema.shape);

export type Step1Values = z.infer<typeof step1Schema>;
export type Step2Values = z.infer<typeof step2Schema>;
export type WaitlistFormValues = z.infer<typeof waitlistSchema>;
