import { Resend } from "resend";
import { createElement } from "react";
import { WelcomeEmail } from "@/emails/WelcomeEmail";

const FROM = "Howzit <hello@joinhowzit.com>";

export async function sendWelcomeEmail({
  firstName,
  email,
  referralCode,
}: {
  firstName: string;
  email: string;
  referralCode: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping welcome email");
    return;
  }

  // Instantiate lazily so a missing key never breaks the build or the route
  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Sharp. You're on the Howzit founding waitlist.",
    react: createElement(WelcomeEmail, { firstName, referralCode }),
  });
}
