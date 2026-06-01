"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { createAdminClient } from "@/lib/supabase/admin";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ActionResult = { ok: boolean; error?: string };

type PrestasiLevel = "Internasional" | "Nasional" | "Provinsi" | "Kota";
type PrestasiIcon = "trophy" | "calc" | "dance" | "code" | "robot" | "music" | "theater" | "medal";

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
    .from("prestasi")
    .select("id", { count: "exact", head: true })
    .eq("slug", slug);
  if (excludeId) q = q.neq("id", excludeId);
  const { count } = await q;
  return (count ?? 0) > 0
    ? `Slug "${slug}" sudah dipakai. Ganti judul atau edit slug secara manual.`
    : null;
}

function revalidateAll(slug?: string) {
  revalidatePath("/admin/prestasi");
  revalidatePath("/prestasi");
  revalidatePath("/");
  if (slug) revalidatePath(`/prestasi/${slug}`);
}

function stripHtmlToText(html: string): string[] {
  // Extract plain-text paragraphs from HTML for the body text[] fallback
  return html
    .replace(/<\/p>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function readForm(fd: FormData) {
  const title = String(fd.get("title") ?? "").trim();
  const slug = String(fd.get("slug") ?? "").trim() || slugify(title);
  const achievedAt = String(fd.get("achieved_at") ?? "").trim();
  const levelRaw = String(fd.get("level") ?? "Kota");
  const level: PrestasiLevel =
    ["Internasional", "Nasional", "Provinsi", "Kota"].includes(levelRaw)
      ? (levelRaw as PrestasiLevel)
      : "Kota";
  const tag = String(fd.get("tag") ?? "").trim();
  const sub = String(fd.get("sub") ?? "").trim();
  const iconRaw = String(fd.get("icon") ?? "trophy");
  const icon: PrestasiIcon =
    ["trophy", "calc", "dance", "code", "robot", "music", "theater", "medal"].includes(iconRaw)
      ? (iconRaw as PrestasiIcon)
      : "trophy";
  const bg = String(fd.get("bg") ?? "bg-navy").trim() || "bg-navy";
  const imageUrl = String(fd.get("image_url") ?? "").trim();
  const imageAlt = String(fd.get("image_alt") ?? "").trim();
  const teamRaw = String(fd.get("team") ?? "").trim();
  const bodyHtml = String(fd.get("body_html") ?? "").trim();

  // team: split by newline
  const team = teamRaw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  // body text[]: strip HTML for plain-text fallback
  const body = bodyHtml ? stripHtmlToText(bodyHtml) : [];

  const statusRaw = String(fd.get("status") ?? "draft");
  const status = statusRaw === "published" ? "published" : "draft";

  return {
    title,
    slug,
    achieved_at: achievedAt ? new Date(achievedAt).toISOString() : new Date().toISOString(),
    level,
    tag: tag || null,
    sub: sub || null,
    icon,
    bg: bg || null,
    image_url: imageUrl || null,
    image_alt: imageAlt || null,
    team: team.length > 0 ? team : null,
    body: body.length > 0 ? body : [],
    body_html: bodyHtml || null,
    status,
  };
}

// ─── Create ───────────────────────────────────────────────────────────────────

export async function createPrestasiItem(
  _prev: ActionResult,
  fd: FormData
): Promise<ActionResult> {
  try {
    const payload = readForm(fd);
    if (!payload.title) return { ok: false, error: "Judul wajib diisi." };

    const supabase = createAdminClient();
    const conflict = await checkSlugConflict(supabase, payload.slug);
    if (conflict) return { ok: false, error: conflict };

    const { error } = await supabase.from("prestasi").insert(payload);
    if (error) return { ok: false, error: error.message };

    revalidateAll(payload.slug);
    redirect("/admin/prestasi?toast=created");
  } catch (e) {
    if (isRedirectError(e)) throw e;
    return { ok: false, error: e instanceof Error ? e.message : "Terjadi kesalahan." };
  }
  return { ok: true };
}

// ─── Update ───────────────────────────────────────────────────────────────────

export async function updatePrestasiItem(
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
      .from("prestasi")
      .update(payload)
      .eq("id", id);
    if (error) return { ok: false, error: error.message };

    revalidateAll(payload.slug);
    redirect("/admin/prestasi?toast=updated");
  } catch (e) {
    if (isRedirectError(e)) throw e;
    return { ok: false, error: e instanceof Error ? e.message : "Terjadi kesalahan." };
  }
  return { ok: true };
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export async function deletePrestasiItem(fd: FormData) {
  const id = String(fd.get("id") ?? "");
  if (!id) return;
  const supabase = createAdminClient();
  const { error } = await supabase.from("prestasi").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/prestasi?toast=deleted");
}

// ─── Bulk delete ──────────────────────────────────────────────────────────────

export async function bulkDeletePrestasiItems(fd: FormData) {
  const ids = fd.getAll("ids").map(String).filter(Boolean);
  if (!ids.length) return;
  const supabase = createAdminClient();
  const { error } = await supabase.from("prestasi").delete().in("id", ids);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/prestasi?toast=bulk_deleted");
}

// ─── Toggle status ────────────────────────────────────────────────────────────

export async function togglePrestasiStatus(fd: FormData) {
  const id = String(fd.get("id") ?? "");
  const next = String(fd.get("next") ?? "draft");
  if (!id) return;
  const status = next === "published" ? "published" : "draft";
  const supabase = createAdminClient();
  const { error } = await supabase.from("prestasi").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect(`/admin/prestasi?toast=${status === "published" ? "published" : "drafted"}`);
}

// ─── Duplicate ────────────────────────────────────────────────────────────────

export async function duplicatePrestasiItem(fd: FormData) {
  const id = String(fd.get("id") ?? "");
  if (!id) return;
  const supabase = createAdminClient();
  const { data, error: fetchErr } = await supabase
    .from("prestasi")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (fetchErr || !data) throw new Error("Data tidak ditemukan.");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: _id, created_at: _ca, updated_at: _ua, ...rest } = data as Record<string, unknown>;
  const newSlug = `${rest.slug}-copy-${Date.now().toString(36)}`;
  const { error } = await supabase.from("prestasi").insert({
    ...rest,
    slug: newSlug,
    title: `${rest.title} (Salinan)`,
    status: "draft",
  });
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/prestasi?toast=duplicated");
}

// ─── Bulk publish ─────────────────────────────────────────────────────────────

export async function bulkPublishPrestasiItems(fd: FormData) {
  const ids = fd.getAll("ids").map(String).filter(Boolean);
  if (!ids.length) return;
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("prestasi")
    .update({ status: "published" })
    .in("id", ids);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/prestasi?toast=bulk_published");
}

// ─── Auto-save ────────────────────────────────────────────────────────────────

export async function autoSavePrestasiItem(
  id: string,
  fd: FormData
): Promise<ActionResult> {
  try {
    const payload = readForm(fd);
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("prestasi")
      .update({ body_html: payload.body_html, body: payload.body, title: payload.title })
      .eq("id", id);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Auto-save gagal." };
  }
}

// ─── Categories ───────────────────────────────────────────────────────────────

export async function createPrestasiCategory(
  _prev: ActionResult,
  fd: FormData
): Promise<ActionResult> {
  const name = String(fd.get("name") ?? "").trim();
  if (!name) return { ok: false, error: "Nama kategori wajib diisi." };
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("prestasi_categories")
    .insert({ name, sort_order: 99 });
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/prestasi/categories");
  return { ok: true };
}

export async function deletePrestasiCategory(fd: FormData) {
  const id = String(fd.get("id") ?? "");
  if (!id) return;
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("prestasi_categories")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/prestasi/categories");
  redirect("/admin/prestasi/categories?toast=cat_deleted");
}
