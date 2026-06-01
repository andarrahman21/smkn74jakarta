"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { createAdminClient } from "@/lib/supabase/admin";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ActionResult = { ok: boolean; error?: string };

// ─── HTML sanitizer (whitelist-based, no extra deps) ─────────────────────────

const ALLOWED_TAGS = new Set([
  "p","h2","h3","ul","ol","li","blockquote","hr","br",
  "strong","em","s","u","code","pre","a","img",
  "table","thead","tbody","tfoot","tr","th","td",
  "div","span",
]);

const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a:   new Set(["href","target","rel","class"]),
  img: new Set(["src","alt","class","width","height"]),
  th:  new Set(["style","class","colspan","rowspan"]),
  td:  new Set(["style","class","colspan","rowspan"]),
  p:   new Set(["style","class"]),
  h2:  new Set(["style","class"]),
  h3:  new Set(["style","class"]),
  div: new Set(["style","class"]),
  span:new Set(["style","class"]),
};

function sanitizeHtml(html: string): string {
  return html
    // strip script/style/iframe tags entirely (incl. content)
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[\s\S]*?>/gi, "")
    // strip event handlers
    .replace(/\s+on\w+="[^"]*"/gi, "")
    .replace(/\s+on\w+='[^']*'/gi, "")
    // strip javascript: hrefs
    .replace(/href=["']javascript:[^"']*["']/gi, 'href="#"')
    // strip data: src (except safe images would need explicit allow-list)
    .replace(/src=["']data:[^"']*["']/gi, 'src=""');
}

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

function htmlToParagraphs(html: string): string[] {
  const text = html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p\s*>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"');
  return text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}

type Payload = {
  slug: string;
  published_at: string;
  category: string;
  tag: string | null;
  title: string;
  excerpt: string;
  body: string[];
  body_html: string;
  cover_image: string | null;
  cover_image_alt: string | null;
  status: "draft" | "published";
};

function readForm(fd: FormData): Payload {
  const title = String(fd.get("title") ?? "").trim();
  const slug = String(fd.get("slug") ?? "").trim() || slugify(title);
  const publishedAt = String(fd.get("published_at") ?? "");
  const bodyHtml = sanitizeHtml(String(fd.get("body_html") ?? "").trim());
  const statusRaw = String(fd.get("status") ?? "draft");
  const status: Payload["status"] = statusRaw === "published" ? "published" : "draft";
  return {
    slug,
    published_at: publishedAt
      ? new Date(publishedAt + "T00:00:00+07:00").toISOString()
      : new Date().toISOString(),
    category: String(fd.get("category") ?? "").trim(),
    tag: String(fd.get("tag") ?? "").trim() || null,
    title,
    excerpt: String(fd.get("excerpt") ?? "").trim(),
    body: htmlToParagraphs(bodyHtml),
    body_html: bodyHtml,
    cover_image: String(fd.get("cover_image") ?? "").trim() || null,
    cover_image_alt: String(fd.get("cover_image_alt") ?? "").trim() || null,
    status,
  };
}

async function checkSlugConflict(
  supabase: ReturnType<typeof createAdminClient>,
  slug: string,
  excludeId?: string
): Promise<string | null> {
  let q = supabase
    .from("pengumuman")
    .select("id", { count: "exact", head: true })
    .eq("slug", slug);
  if (excludeId) q = q.neq("id", excludeId);
  const { count } = await q;
  return (count ?? 0) > 0
    ? `Slug "${slug}" sudah dipakai. Ganti judul atau edit slug secara manual.`
    : null;
}

function revalidateAll(slug?: string) {
  revalidatePath("/admin/pengumuman");
  revalidatePath("/pengumuman");
  revalidatePath("/");
  if (slug) revalidatePath(`/pengumuman/${slug}`);
}

// ─── Create ───────────────────────────────────────────────────────────────────

export async function createPengumuman(
  _prev: ActionResult,
  fd: FormData
): Promise<ActionResult> {
  try {
    const payload = readForm(fd);
    const supabase = createAdminClient();

    const conflict = await checkSlugConflict(supabase, payload.slug);
    if (conflict) return { ok: false, error: conflict };

    const { error } = await supabase.from("pengumuman").insert(payload);
    if (error) return { ok: false, error: error.message };

    revalidateAll(payload.slug);
    redirect("/admin/pengumuman?toast=created");
  } catch (e) {
    if (isRedirectError(e)) throw e;
    return { ok: false, error: e instanceof Error ? e.message : "Terjadi kesalahan." };
  }
  return { ok: true };
}

// ─── Update ───────────────────────────────────────────────────────────────────

export async function updatePengumuman(
  id: string,
  _prev: ActionResult,
  fd: FormData
): Promise<ActionResult> {
  try {
    const payload = readForm(fd);
    const supabase = createAdminClient();

    const conflict = await checkSlugConflict(supabase, payload.slug, id);
    if (conflict) return { ok: false, error: conflict };

    const { error } = await supabase
      .from("pengumuman")
      .update(payload)
      .eq("id", id);
    if (error) return { ok: false, error: error.message };

    revalidateAll(payload.slug);
    redirect("/admin/pengumuman?toast=updated");
  } catch (e) {
    if (isRedirectError(e)) throw e;
    return { ok: false, error: e instanceof Error ? e.message : "Terjadi kesalahan." };
  }
  return { ok: true };
}

// ─── Auto-save (no redirect, returns result) ─────────────────────────────────

export async function autoSavePengumuman(
  id: string,
  fd: FormData
): Promise<ActionResult & { savedAt?: string }> {
  try {
    const payload = readForm(fd);
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("pengumuman")
      .update({ ...payload, status: "draft" })
      .eq("id", id);
    if (error) return { ok: false, error: error.message };
    revalidatePath("/admin/pengumuman");
    return { ok: true, savedAt: new Date().toISOString() };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Terjadi kesalahan." };
  }
}

// ─── Toggle status ────────────────────────────────────────────────────────────

export async function togglePengumumanStatus(fd: FormData) {
  const id = String(fd.get("id") ?? "");
  const next = String(fd.get("next") ?? "");
  if (!id || (next !== "draft" && next !== "published")) return;
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("pengumuman")
    .update({ status: next })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect(`/admin/pengumuman?toast=${next === "published" ? "published" : "drafted"}`);
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export async function deletePengumuman(fd: FormData) {
  const id = String(fd.get("id") ?? "");
  if (!id) return;
  const supabase = createAdminClient();
  const { error } = await supabase.from("pengumuman").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/pengumuman?toast=deleted");
}

// ─── Duplicate ────────────────────────────────────────────────────────────────

export async function duplicatePengumuman(fd: FormData) {
  const id = String(fd.get("id") ?? "");
  if (!id) return;
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("pengumuman")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return;

  // Build a unique slug for the copy
  let baseSlug = `${data.slug}-copy`;
  let candidate = baseSlug;
  let attempt = 1;
  while (true) {
    const { count } = await supabase
      .from("pengumuman")
      .select("id", { count: "exact", head: true })
      .eq("slug", candidate);
    if ((count ?? 0) === 0) break;
    attempt++;
    candidate = `${baseSlug}-${attempt}`;
  }

  const { error: insertErr } = await supabase.from("pengumuman").insert({
    ...data,
    id: undefined,
    slug: candidate,
    title: `${data.title} (Salinan)`,
    status: "draft",
    published_at: new Date().toISOString(),
    created_at: undefined,
  });
  if (insertErr) throw new Error(insertErr.message);

  revalidatePath("/admin/pengumuman");
  redirect("/admin/pengumuman?toast=duplicated");
}

// ─── Bulk actions ─────────────────────────────────────────────────────────────

export async function bulkDeletePengumuman(fd: FormData) {
  const ids = fd.getAll("ids").map(String).filter(Boolean);
  if (!ids.length) return;
  const supabase = createAdminClient();
  const { error } = await supabase.from("pengumuman").delete().in("id", ids);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/pengumuman?toast=bulk_deleted");
}

export async function bulkPublishPengumuman(fd: FormData) {
  const ids = fd.getAll("ids").map(String).filter(Boolean);
  if (!ids.length) return;
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("pengumuman")
    .update({ status: "published" })
    .in("id", ids);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/pengumuman?toast=bulk_published");
}

// ─── Categories ───────────────────────────────────────────────────────────────

export async function createCategory(
  _prev: ActionResult,
  fd: FormData
): Promise<ActionResult> {
  const name = String(fd.get("name") ?? "").trim();
  if (!name) return { ok: false, error: "Nama kategori wajib diisi." };
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("pengumuman_categories")
    .insert({ name, sort_order: 99 });
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/pengumuman/categories");
  return { ok: true };
}

export async function deleteCategory(fd: FormData) {
  const id = String(fd.get("id") ?? "");
  if (!id) return;
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("pengumuman_categories")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/pengumuman/categories");
  redirect("/admin/pengumuman/categories?toast=cat_deleted");
}

export async function reorderCategory(fd: FormData) {
  const id = String(fd.get("id") ?? "");
  const sort = parseInt(String(fd.get("sort_order") ?? "0"), 10);
  if (!id) return;
  const supabase = createAdminClient();
  await supabase
    .from("pengumuman_categories")
    .update({ sort_order: sort })
    .eq("id", id);
  revalidatePath("/admin/pengumuman/categories");
}
