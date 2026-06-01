"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { createAdminClient } from "@/lib/supabase/admin";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ActionResult = { ok: boolean; error?: string };

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function checkSortOrderConflict(
  supabase: ReturnType<typeof createAdminClient>,
  sort_order: number,
  excludeId?: string
): Promise<string | null> {
  let q = supabase
    .from("daftar_guru")
    .select("id", { count: "exact", head: true })
    .eq("sort_order", sort_order);
  if (excludeId) q = q.neq("id", excludeId);
  const { count } = await q;
  return (count ?? 0) > 0
    ? `Urutan ${sort_order} sudah dipakai guru lain. Pilih nomor urut yang berbeda.`
    : null;
}

function revalidateAll() {
  revalidatePath("/admin/daftar-guru");
  revalidatePath("/");
  revalidatePath("/profil/tenaga-pendidik");
}

function deriveInitials(name: string): string {
  const words = name.replace(/[.,]/g, " ").split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function readForm(fd: FormData) {
  const sortOrderRaw = String(fd.get("sort_order") ?? "0");
  const sort_order = parseInt(sortOrderRaw, 10) || 0;
  const name = String(fd.get("name") ?? "").trim();
  const initials = String(fd.get("initials") ?? "").trim() || deriveInitials(name);
  const role = String(fd.get("role") ?? "").trim();
  const photo_url = String(fd.get("photo_url") ?? "").trim() || null;
  const statusRaw = String(fd.get("status") ?? "draft");
  const status = statusRaw === "published" ? "published" : "draft";

  return {
    sort_order,
    initials,
    name,
    role,
    photo_url,
    bg: "bg-navy",
    ink: "text-paper",
    group_label: null,
    status,
    updated_at: new Date().toISOString(),
  };
}

// ─── Create ───────────────────────────────────────────────────────────────────

export async function createGuruItem(
  _prev: ActionResult,
  fd: FormData
): Promise<ActionResult> {
  try {
    const payload = readForm(fd);
    if (!payload.name) return { ok: false, error: "Nama guru wajib diisi." };

    const supabase = createAdminClient();
    const conflict = await checkSortOrderConflict(supabase, payload.sort_order);
    if (conflict) return { ok: false, error: conflict };
    const { error } = await supabase.from("daftar_guru").insert(payload);
    if (error) return { ok: false, error: error.message };

    revalidateAll();
    redirect("/admin/daftar-guru?toast=created");
  } catch (e) {
    if (isRedirectError(e)) throw e;
    return { ok: false, error: e instanceof Error ? e.message : "Terjadi kesalahan." };
  }
  return { ok: true };
}

// ─── Update ───────────────────────────────────────────────────────────────────

export async function updateGuruItem(
  id: string,
  _prev: ActionResult,
  fd: FormData
): Promise<ActionResult> {
  try {
    const payload = readForm(fd);
    if (!payload.name) return { ok: false, error: "Nama guru wajib diisi." };

    const supabase = createAdminClient();
    const conflict = await checkSortOrderConflict(supabase, payload.sort_order, id);
    if (conflict) return { ok: false, error: conflict };
    const { error } = await supabase.from("daftar_guru").update(payload).eq("id", id);
    if (error) return { ok: false, error: error.message };

    revalidateAll();
    redirect("/admin/daftar-guru?toast=updated");
  } catch (e) {
    if (isRedirectError(e)) throw e;
    return { ok: false, error: e instanceof Error ? e.message : "Terjadi kesalahan." };
  }
  return { ok: true };
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export async function deleteGuruItem(fd: FormData) {
  const id = String(fd.get("id") ?? "");
  if (!id) return;
  const supabase = createAdminClient();
  const { error } = await supabase.from("daftar_guru").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/daftar-guru?toast=deleted");
}

// ─── Bulk delete ──────────────────────────────────────────────────────────────

export async function bulkDeleteGuruItems(fd: FormData) {
  const ids = fd.getAll("ids").map(String).filter(Boolean);
  if (!ids.length) return;
  const supabase = createAdminClient();
  const { error } = await supabase.from("daftar_guru").delete().in("id", ids);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/daftar-guru?toast=bulk_deleted");
}

// ─── Bulk publish ─────────────────────────────────────────────────────────────

export async function bulkPublishGuruItems(fd: FormData) {
  const ids = fd.getAll("ids").map(String).filter(Boolean);
  if (!ids.length) return;
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("daftar_guru")
    .update({ status: "published", updated_at: new Date().toISOString() })
    .in("id", ids);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/daftar-guru?toast=bulk_published");
}

// ─── Toggle status ────────────────────────────────────────────────────────────

export async function toggleGuruStatus(fd: FormData) {
  const id = String(fd.get("id") ?? "");
  const next = String(fd.get("next") ?? "draft");
  if (!id) return;
  const status = next === "published" ? "published" : "draft";
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("daftar_guru")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect(`/admin/daftar-guru?toast=${status === "published" ? "published" : "drafted"}`);
}

// ─── Duplicate ────────────────────────────────────────────────────────────────

export async function duplicateGuruItem(fd: FormData) {
  const id = String(fd.get("id") ?? "");
  if (!id) return;
  const supabase = createAdminClient();
  const { data, error: fetchErr } = await supabase
    .from("daftar_guru")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (fetchErr || !data) throw new Error("Data tidak ditemukan.");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: _id, created_at: _ca, updated_at: _ua, ...rest } = data as Record<string, unknown>;
  const { error } = await supabase.from("daftar_guru").insert({
    ...rest,
    name: `${rest.name} (Salinan)`,
    status: "draft",
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/daftar-guru?toast=duplicated");
}
