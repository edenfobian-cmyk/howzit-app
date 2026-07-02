import { NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/email";

// TEMPORARY — remove after email is confirmed working
export async function GET() {
  try {
    await sendWelcomeEmail({
      firstName: "Luke",
      email: "lukebianca@gmail.com",
      referralCode: "test1234",
    });

    return NextResponse.json({ success: true, message: "Test email sent to lukebianca@gmail.com" });
  } catch (err) {
    console.error("Test email error:", err);
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}
