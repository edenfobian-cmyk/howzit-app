import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { SOCIAL_PROOF_BASE } from "@/constants";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { count } = await supabaseAdmin
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    return NextResponse.json(
      { count: (count ?? 0) + SOCIAL_PROOF_BASE },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json({ count: SOCIAL_PROOF_BASE });
  }
}
