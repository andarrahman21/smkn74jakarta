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
    .from("hero_slides")
    .select("id", { count: "exact", head: true })
    .eq("sort_order", sort_order);
  if (excludeId) q = q.neq("id", excludeId);
  const { count } = await q;
  return (count ?? 0) > 0
    ? `Urutan ${sort_order} sudah dipakai slide lain. Pilih nomor urut yang berbeda.`
    : null;
}

function revalidateAll() {
  revalidatePath("/admin/hero-banner");
  revalidatePath("/");
}

function readForm(fd: FormData) {
  const sortOrderRaw = String(fd.get("sort_order") ?? "0");
  const sort_order = parseInt(sortOrderRaw, 10) || 0;
  const eyebrow = String(fd.get("eyebrow") ?? "").trim();
  const head = String(fd.get("head") ?? "").trim();
  const tag = String(fd.get("tag") ?? "").trim() || null;
  const caption = String(fd.get("caption") ?? "").trim() || null;
  const year_label = String(fd.get("year_label") ?? "").trim() || null;
  const image_url = String(fd.get("image_url") ?? "").trim() || null;
  const image_alt = String(fd.get("image_alt") ?? "").trim() || null;
  const statusRaw = String(fd.get("status") ?? "draft");
  const status = statusRaw === "published" ? "published" : "draft";

  return {
    sort_order,
    eyebrow,
    head,
    tag,
    caption,
    year_label,
    image_url,
    image_alt,
    status,
    updated_at: new Date().toISOString(),
  };
}

// ─── Create ───────────────────────────────────────────────────────────────────

export async function createHeroSlide(
  _prev: ActionResult,
  fd: FormData
): Promise<ActionResult> {
  try {
    const payload = readForm(fd);
    const supabase = createAdminClient();
    const conflict = await checkSortOrderConflict(supabase, payload.sort_order);
    if (conflict) return { ok: false, error: conflict };
    const { error } = await supabase.from("hero_slides").insert(payload);
    if (error) return { ok: false, error: error.message };
    revalidateAll();
    redirect("/admin/hero-banner?toast=created");
  } catch (e) {
    if (isRedirectError(e)) throw e;
    return { ok: false, error: e instanceof Error ? e.message : "Terjadi kesalahan." };
  }
  return { ok: true };
}

// ─── Update ───────────────────────────────────────────────────────────────────

export async function updateHeroSlide(
  id: string,
  _prev: ActionResult,
  fd: FormData
): Promise<ActionResult> {
  try {
    const payload = readForm(fd);
    const supabase = createAdminClient();
    const conflict = await checkSortOrderConflict(supabase, payload.sort_order, id);
    if (conflict) return { ok: false, error: conflict };
    const { error } = await supabase.from("hero_slides").update(payload).eq("id", id);
    if (error) return { ok: false, error: error.message };
    revalidateAll();
    redirect("/admin/hero-banner?toast=updated");
  } catch (e) {
    if (isRedirectError(e)) throw e;
    return { ok: false, error: e instanceof Error ? e.message : "Terjadi kesalahan." };
  }
  return { ok: true };
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export async function deleteHeroSlide(fd: FormData) {
  const id = String(fd.get("id") ?? "");
  if (!id) return;
  const supabase = createAdminClient();
  const { error } = await supabase.from("hero_slides").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/hero-banner?toast=deleted");
}

// ─── Bulk delete ──────────────────────────────────────────────────────────────

export async function bulkDeleteHeroSlides(fd: FormData) {
  const ids = fd.getAll("ids").map(String).filter(Boolean);
  if (!ids.length) return;
  const supabase = createAdminClient();
  const { error } = await supabase.from("hero_slides").delete().in("id", ids);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/hero-banner?toast=bulk_deleted");
}

// ─── Bulk publish ─────────────────────────────────────────────────────────────

export async function bulkPublishHeroSlides(fd: FormData) {
  const ids = fd.getAll("ids").map(String).filter(Boolean);
  if (!ids.length) return;
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("hero_slides")
    .update({ status: "published", updated_at: new Date().toISOString() })
    .in("id", ids);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/hero-banner?toast=bulk_published");
}

// ─── Toggle status ────────────────────────────────────────────────────────────

export async function toggleHeroSlideStatus(fd: FormData) {
  const id = String(fd.get("id") ?? "");
  const next = String(fd.get("next") ?? "draft");
  if (!id) return;
  const status = next === "published" ? "published" : "draft";
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("hero_slides")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect(`/admin/hero-banner?toast=${status === "published" ? "published" : "drafted"}`);
}

// ─── Duplicate ────────────────────────────────────────────────────────────────

export async function duplicateHeroSlide(fd: FormData) {
  const id = String(fd.get("id") ?? "");
  if (!id) return;
  const supabase = createAdminClient();
  const { data, error: fetchErr } = await supabase
    .from("hero_slides")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (fetchErr || !data) throw new Error("Data tidak ditemukan.");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: _id, created_at: _ca, updated_at: _ua, ...rest } = data as Record<string, unknown>;
  const { error } = await supabase.from("hero_slides").insert({
    ...rest,
    eyebrow: `${rest.eyebrow} (Salinan)`,
    status: "draft",
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/hero-banner?toast=duplicated");
}
