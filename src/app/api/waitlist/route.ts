import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { waitlistSchema } from "@/lib/validations";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = waitlistSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 422 }
      );
    }

    const { error } = await supabaseAdmin.from("waitlist").insert({
      ...parsed.data,
      source: req.headers.get("referer") ?? "direct",
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "already_registered", message: "You're already on the list!" },
          { status: 409 }
        );
      }
      throw error;
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("waitlist insert failed:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
