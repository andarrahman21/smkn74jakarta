"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { kategoriPage } from "@/lib/struktur";

export type ActionResult = { ok: boolean; error?: string };

function revalidate(kategori: string) {
  revalidatePath("/admin/struktur");
  revalidatePath(`/admin/struktur/${kategori}`);
  const page = kategoriPage(kategori);
  if (page) revalidatePath(page);
}

export async function createProfil(
  kategori: string,
  fields: { title: string; nama: string; foto_url: string }
): Promise<ActionResult> {
  if (!fields.nama.trim()) return { ok: false, error: "Nama wajib diisi." };
  const supabase = createAdminClient();
  const { data: rows } = await supabase
    .from("struktur_profil")
    .select("sort_order")
    .eq("kategori", kategori)
    .order("sort_order", { ascending: false })
    .limit(1);
  const nextOrder = (rows?.[0]?.sort_order ?? 0) + 1;
  const { error } = await supabase.from("struktur_profil").insert({
    kategori,
    sort_order: nextOrder,
    title: fields.title.trim(),
    nama: fields.nama.trim(),
    foto_url: fields.foto_url.trim() || null,
  });
  if (error) return { ok: false, error: error.message };
  revalidate(kategori);
  return { ok: true };
}

export async function updateProfil(
  id: string,
  kategori: string,
  fields: { title: string; nama: string; foto_url: string }
): Promise<ActionResult> {
  if (!fields.nama.trim()) return { ok: false, error: "Nama wajib diisi." };
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("struktur_profil")
    .update({
      title: fields.title.trim(),
      nama: fields.nama.trim(),
      foto_url: fields.foto_url.trim() || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidate(kategori);
  return { ok: true };
}

export async function deleteProfil(id: string, kategori: string): Promise<ActionResult> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("struktur_profil").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidate(kategori);
  return { ok: true };
}

export async function moveProfil(id: string, kategori: string, dir: -1 | 1): Promise<ActionResult> {
  const supabase = createAdminClient();
  const { data: all } = await supabase
    .from("struktur_profil")
    .select("id, sort_order")
    .eq("kategori", kategori)
    .order("sort_order", { ascending: true });
  if (!all) return { ok: false, error: "Data tidak ditemukan." };
  const idx = all.findIndex((m) => m.id === id);
  const swap = idx + dir;
  if (idx < 0 || swap < 0 || swap >= all.length) return { ok: true };
  const a = all[idx], b = all[swap];
  const { error: e1 } = await supabase.from("struktur_profil").update({ sort_order: b.sort_order }).eq("id", a.id);
  const { error: e2 } = await supabase.from("struktur_profil").update({ sort_order: a.sort_order }).eq("id", b.id);
  if (e1 || e2) return { ok: false, error: (e1 || e2)!.message };
  revalidate(kategori);
  return { ok: true };
}
