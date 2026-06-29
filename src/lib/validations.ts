import { z } from "zod";

export const waitlistSchema = z.object({
  first_name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  city: z.string().min(2, "Please enter your city").max(100, "City name is too long"),
  age_group: z.enum(["18-21", "22-25", "26-29", "30-35"] as const, {
    message: "Please select your age group",
  }),
  interests: z
    .array(
      z.enum([
        "jobs",
        "internships",
        "mentorship",
        "co-founders",
        "investors",
        "communities",
        "networking",
        "collaborators",
      ] as const)
    )
    .min(1, "Please select at least one interest"),
});

export type WaitlistFormValues = z.infer<typeof waitlistSchema>;
