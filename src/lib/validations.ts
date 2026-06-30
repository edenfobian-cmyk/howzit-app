import { z } from "zod";

export const waitlistSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(2, "Must be at least 2 characters")
    .max(50, "Too long"),
  surname: z
    .string()
    .trim()
    .min(2, "Must be at least 2 characters")
    .max(50, "Too long"),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  age: z
    .number({ message: "Enter your age" })
    .int("Age must be a whole number")
    .min(13, "You must be at least 13")
    .max(100, "Enter a valid age"),
  looking_for: z.enum(
    [
      "jobs",
      "friends",
      "mentors",
      "co-founder",
      "networking",
      "internships",
      "business-opportunities",
      "other",
    ] as const,
    { message: "Please select what you're looking for" }
  ),
});

export type WaitlistFormValues = z.infer<typeof waitlistSchema>;
