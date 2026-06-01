"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";

export type ActionResult = { ok: boolean; error?: string };

function revalidateAll() {
  revalidatePath("/admin/misi");
  revalidatePath("/profil/visi-misi");
}

export async function createMisi(): Promise<ActionResult> {
  const supabase = createAdminClient();
  // sort_order = max + 1
  const { data: rows } = await supabase.from("misi").select("sort_order").order("sort_order", { ascending: false }).limit(1);
  const nextOrder = (rows?.[0]?.sort_order ?? 0) + 1;
  const { error } = await supabase.from("misi").insert({ sort_order: nextOrder, title: "Misi baru", body: "" });
  if (error) return { ok: false, error: error.message };
  revalidateAll();
  return { ok: true };
}

export async function updateMisi(id: string, title: string, body: string): Promise<ActionResult> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("misi")
    .update({ title: title.trim(), body: body.trim(), updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidateAll();
  return { ok: true };
}

export async function deleteMisi(id: string): Promise<ActionResult> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("misi").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidateAll();
  return { ok: true };
}

/** Tukar urutan dengan tetangga (arah: -1 naik, +1 turun). */
export async function moveMisi(id: string, dir: -1 | 1): Promise<ActionResult> {
  const supabase = createAdminClient();
  const { data: all } = await supabase.from("misi").select("id, sort_order").order("sort_order", { ascending: true });
  if (!all) return { ok: false, error: "Data tidak ditemukan." };
  const idx = all.findIndex((m) => m.id === id);
  const swapIdx = idx + dir;
  if (idx < 0 || swapIdx < 0 || swapIdx >= all.length) return { ok: true }; // di ujung, no-op
  const a = all[idx];
  const b = all[swapIdx];
  // Tukar sort_order
  const { error: e1 } = await supabase.from("misi").update({ sort_order: b.sort_order }).eq("id", a.id);
  const { error: e2 } = await supabase.from("misi").update({ sort_order: a.sort_order }).eq("id", b.id);
  if (e1 || e2) return { ok: false, error: (e1 || e2)!.message };
  revalidateAll();
  return { ok: true };
}
