import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { randomBytes } from "crypto";
import { waitlistSchema } from "@/lib/validations";
import { sendWelcomeEmail } from "@/lib/email";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

function generateReferralCode(): string {
  return randomBytes(4).toString("hex");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = waitlistSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "validation_failed", details: parsed.error.flatten() },
        { status: 422 }
      );
    }

    const { first_name, surname, email, age, looking_for, referred_by } = parsed.data;
    const referral_code = generateReferralCode();

    const { data, error } = await supabaseAdmin
      .from("waitlist")
      .insert({
        first_name,
        surname,
        email,
        age,
        looking_for,
        referral_code,
        referred_by: referred_by || null,
        source: req.headers.get("referer") ?? "direct",
      })
      .select("referral_code")
      .single();

    if (error) {
      if (error.code === "23505") {
        // Already registered — find their existing referral code
        const { data: existing } = await supabaseAdmin
          .from("waitlist")
          .select("referral_code")
          .eq("email", email.toLowerCase())
          .single();

        return NextResponse.json(
          { error: "already_registered", referral_code: existing?.referral_code ?? null },
          { status: 409 }
        );
      }
      console.error("waitlist insert failed:", error);
      throw error;
    }

    // Send welcome email — fire-and-forget so a mail failure never blocks signup
    sendWelcomeEmail({
      firstName: first_name,
      email,
      referralCode: data.referral_code,
    }).catch((err) => console.error("Welcome email failed:", err));

    return NextResponse.json(
      { success: true, referral_code: data.referral_code },
      { status: 201 }
    );
  } catch (err) {
    console.error("waitlist error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
