"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";

export type ActionResult = { ok: boolean; error?: string };

function revalidate(jurusan: string) {
  revalidatePath("/admin/modul-ajar");
  revalidatePath(`/admin/modul-ajar/${jurusan}`);
  revalidatePath(`/profil/keahlian/${jurusan}`);
}

export async function createModul(
  jurusan: string,
  fields: { title: string; kelas: string; cover_url: string; file_url: string }
): Promise<ActionResult> {
  if (!fields.title.trim()) return { ok: false, error: "Judul wajib diisi." };
  const supabase = createAdminClient();
  const { data: rows } = await supabase
    .from("modul_ajar")
    .select("sort_order")
    .eq("jurusan", jurusan)
    .order("sort_order", { ascending: false })
    .limit(1);
  const nextOrder = (rows?.[0]?.sort_order ?? 0) + 1;
  const { error } = await supabase.from("modul_ajar").insert({
    jurusan,
    sort_order: nextOrder,
    title: fields.title.trim(),
    kelas: fields.kelas.trim() || null,
    cover_url: fields.cover_url.trim() || null,
    file_url: fields.file_url.trim() || null,
  });
  if (error) return { ok: false, error: error.message };
  revalidate(jurusan);
  return { ok: true };
}

export async function updateModul(
  id: string,
  jurusan: string,
  fields: { title: string; kelas: string; cover_url: string; file_url: string }
): Promise<ActionResult> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("modul_ajar")
    .update({
      title: fields.title.trim(),
      kelas: fields.kelas.trim() || null,
      cover_url: fields.cover_url.trim() || null,
      file_url: fields.file_url.trim() || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidate(jurusan);
  return { ok: true };
}

export async function deleteModul(id: string, jurusan: string): Promise<ActionResult> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("modul_ajar").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidate(jurusan);
  return { ok: true };
}

export async function moveModul(id: string, jurusan: string, dir: -1 | 1): Promise<ActionResult> {
  const supabase = createAdminClient();
  const { data: all } = await supabase
    .from("modul_ajar")
    .select("id, sort_order")
    .eq("jurusan", jurusan)
    .order("sort_order", { ascending: true });
  if (!all) return { ok: false, error: "Data tidak ditemukan." };
  const idx = all.findIndex((m) => m.id === id);
  const swap = idx + dir;
  if (idx < 0 || swap < 0 || swap >= all.length) return { ok: true };
  const a = all[idx], b = all[swap];
  const { error: e1 } = await supabase.from("modul_ajar").update({ sort_order: b.sort_order }).eq("id", a.id);
  const { error: e2 } = await supabase.from("modul_ajar").update({ sort_order: a.sort_order }).eq("id", b.id);
  if (e1 || e2) return { ok: false, error: (e1 || e2)!.message };
  revalidate(jurusan);
  return { ok: true };
}
