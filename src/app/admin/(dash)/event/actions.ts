"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { createAdminClient } from "@/lib/supabase/admin";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ActionResult = { ok: boolean; error?: string };

type EventStatus = "Akan datang" | "Selesai";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function checkSlugConflict(
  supabase: ReturnType<typeof createAdminClient>,
  slug: string,
  excludeId?: string
): Promise<string | null> {
  let q = supabase
    .from("event")
    .select("id", { count: "exact", head: true })
    .eq("slug", slug);
  if (excludeId) q = q.neq("id", excludeId);
  const { count } = await q;
  return (count ?? 0) > 0
    ? `Slug "${slug}" sudah dipakai. Ganti judul atau edit slug secara manual.`
    : null;
}

function revalidateAll(slug?: string) {
  revalidatePath("/admin/event");
  revalidatePath("/event");
  revalidatePath("/");
  if (slug) revalidatePath(`/event/${slug}`);
}

function stripHtmlToText(html: string): string {
  return html
    .replace(/<\/p>/gi, " ")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function readForm(fd: FormData) {
  const title = String(fd.get("title") ?? "").trim();
  const slug = String(fd.get("slug") ?? "").trim() || slugify(title);
  const eventDate = String(fd.get("event_date") ?? "").trim();
  const startsAtTime = String(fd.get("starts_at") ?? "").trim(); // "HH:MM"
  const statusRaw = String(fd.get("status") ?? "Akan datang");
  const status: EventStatus =
    statusRaw === "Selesai" ? "Selesai" : "Akan datang";
  const category = String(fd.get("category") ?? "").trim();
  const imageUrl = String(fd.get("image_url") ?? "").trim();
  const imageAlt = String(fd.get("image_alt") ?? "").trim();
  const bodyHtml = String(fd.get("body_html") ?? "").trim();
  // Combine date + time into ISO timestamp, or null if no time given
  const starts_at =
    startsAtTime && eventDate
      ? new Date(`${eventDate}T${startsAtTime}:00`).toISOString()
      : null;
  return {
    title,
    slug,
    event_date: eventDate,
    starts_at,
    status,
    category: category || null,
    image_url: imageUrl || null,
    image_alt: imageAlt || null,
    body: bodyHtml ? stripHtmlToText(bodyHtml) : null,
    body_html: bodyHtml || null,
    bg: "bg-navy",
    ink: "text-paper",
  };
}

// ─── Create ───────────────────────────────────────────────────────────────────

export async function createEventItem(
  _prev: ActionResult,
  fd: FormData
): Promise<ActionResult> {
  try {
    const payload = readForm(fd);
    if (!payload.title) return { ok: false, error: "Judul wajib diisi." };

    const supabase = createAdminClient();
    const conflict = await checkSlugConflict(supabase, payload.slug);
    if (conflict) return { ok: false, error: conflict };

    const { error } = await supabase.from("event").insert(payload);
    if (error) return { ok: false, error: error.message };

    revalidateAll(payload.slug);
    redirect("/admin/event?toast=created");
  } catch (e) {
    if (isRedirectError(e)) throw e;
    return { ok: false, error: e instanceof Error ? e.message : "Terjadi kesalahan." };
  }
  return { ok: true };
}

// ─── Update ───────────────────────────────────────────────────────────────────

export async function updateEventItem(
  id: string,
  _prev: ActionResult,
  fd: FormData
): Promise<ActionResult> {
  try {
    const payload = readForm(fd);
    if (!payload.title) return { ok: false, error: "Judul wajib diisi." };

    const supabase = createAdminClient();
    const conflict = await checkSlugConflict(supabase, payload.slug, id);
    if (conflict) return { ok: false, error: conflict };

    const { error } = await supabase
      .from("event")
      .update(payload)
      .eq("id", id);
    if (error) return { ok: false, error: error.message };

    revalidateAll(payload.slug);
    redirect("/admin/event?toast=updated");
  } catch (e) {
    if (isRedirectError(e)) throw e;
    return { ok: false, error: e instanceof Error ? e.message : "Terjadi kesalahan." };
  }
  return { ok: true };
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export async function deleteEventItem(fd: FormData) {
  const id = String(fd.get("id") ?? "");
  if (!id) return;
  const supabase = createAdminClient();
  const { error } = await supabase.from("event").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/event?toast=deleted");
}

// ─── Bulk delete ──────────────────────────────────────────────────────────────

export async function bulkDeleteEventItems(fd: FormData) {
  const ids = fd.getAll("ids").map(String).filter(Boolean);
  if (!ids.length) return;
  const supabase = createAdminClient();
  const { error } = await supabase.from("event").delete().in("id", ids);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/event?toast=bulk_deleted");
}

// ─── Duplicate ────────────────────────────────────────────────────────────────

export async function duplicateEventItem(fd: FormData) {
  const id = String(fd.get("id") ?? "");
  if (!id) return;
  const supabase = createAdminClient();
  const { data, error: fetchErr } = await supabase
    .from("event")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (fetchErr || !data) throw new Error("Data tidak ditemukan.");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: _id, created_at: _ca, updated_at: _ua, ...rest } = data as Record<string, unknown>;
  const newSlug = `${rest.slug}-copy-${Date.now().toString(36)}`;
  const { error } = await supabase.from("event").insert({
    ...rest,
    slug: newSlug,
    title: `${rest.title} (Salinan)`,
    status: "Akan datang",
  });
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/event?toast=duplicated");
}

// ─── Bulk publish (Akan datang) ───────────────────────────────────────────────

export async function bulkPublishEventItems(fd: FormData) {
  const ids = fd.getAll("ids").map(String).filter(Boolean);
  if (!ids.length) return;
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("event")
    .update({ status: "Akan datang" })
    .in("id", ids);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/event?toast=bulk_published");
}

// ─── Categories ───────────────────────────────────────────────────────────────

export async function createEventCategory(
  _prev: ActionResult,
  fd: FormData
): Promise<ActionResult> {
  const name = String(fd.get("name") ?? "").trim();
  if (!name) return { ok: false, error: "Nama kategori wajib diisi." };
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("event_categories")
    .insert({ name, sort_order: 99 });
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/event/categories");
  return { ok: true };
}

export async function deleteEventCategory(fd: FormData) {
  const id = String(fd.get("id") ?? "");
  if (!id) return;
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("event_categories")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/event/categories");
  redirect("/admin/event/categories?toast=cat_deleted");
}

// ─── Auto-save ────────────────────────────────────────────────────────────────

export async function autoSaveEventItem(
  id: string,
  fd: FormData
): Promise<ActionResult> {
  try {
    const title = String(fd.get("title") ?? "").trim();
    const bodyHtml = String(fd.get("body_html") ?? "").trim();
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("event")
      .update({
        ...(title ? { title } : {}),
        body_html: bodyHtml || null,
        body: bodyHtml ? stripHtmlToText(bodyHtml) : null,
      })
      .eq("id", id);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Terjadi kesalahan." };
  }
}
