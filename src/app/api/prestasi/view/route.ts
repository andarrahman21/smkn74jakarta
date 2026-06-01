import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    const supabase = createAdminClient();
    const { error } = await supabase.rpc("increment_view_count", { row_id: id });
    if (error) {
      // Fallback: manual increment if RPC not available
      const { data } = await supabase
        .from("prestasi")
        .select("view_count")
        .eq("id", id)
        .maybeSingle();
      await supabase
        .from("prestasi")
        .update({ view_count: (data?.view_count ?? 0) + 1 })
        .eq("id", id);
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
