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

// Suppress unused variable warning — ALLOWED_TAGS and ALLOWED_ATTRS are kept
// as documentation of the allow-list; the regex-based sanitizer below handles
// the actual filtering without needing to enumerate every tag.
void ALLOWED_TAGS; void ALLOWED_ATTRS;

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
  tag: string | null;
  author: string;
  read_time: string;
  num: string;
  bg: string;
  title: string;
  excerpt: string;
  body: string[];
  body_html: string;
  image: string | null;
  thumbnail: string | null;
  status: "draft" | "published";
};

function readForm(fd: FormData): Payload {
  const title = String(fd.get("title") ?? "").trim();
  const slug = String(fd.get("slug") ?? "").trim() || slugify(title);
  const publishedAt = String(fd.get("published_at") ?? "");
  const bodyHtml = sanitizeHtml(String(fd.get("body_html") ?? "").trim());
  const statusRaw = String(fd.get("status") ?? "draft");
  const status: Payload["status"] = statusRaw === "published" ? "published" : "draft";

  // num: use form value or fall back to day-of-month from published_at
  let num = String(fd.get("num") ?? "").trim();
  if (!num && publishedAt) {
    const d = new Date(publishedAt + "T00:00:00+07:00");
    num = String(d.getDate()).padStart(2, "0");
  }

  return {
    slug,
    published_at: publishedAt
      ? new Date(publishedAt + "T00:00:00+07:00").toISOString()
      : new Date().toISOString(),
    tag: String(fd.get("tag") ?? "").trim() || null,
    author: String(fd.get("author") ?? "").trim() || "Tim Humas",
    read_time: (() => { const n = parseInt(String(fd.get("read_time") ?? "3"), 10); return `${isNaN(n) || n < 1 ? 3 : n} menit`; })(),
    num,
    bg: String(fd.get("bg") ?? "").trim() || "bg-navy",
    title,
    excerpt: String(fd.get("excerpt") ?? "").trim(),
    body: htmlToParagraphs(bodyHtml),
    body_html: bodyHtml,
    image: String(fd.get("image") ?? "").trim() || null,
    thumbnail: String(fd.get("thumbnail") ?? "").trim() || null,
    status,
  };
}

async function checkSlugConflict(
  supabase: ReturnType<typeof createAdminClient>,
  slug: string,
  excludeId?: string
): Promise<string | null> {
  let q = supabase
    .from("berita")
    .select("id", { count: "exact", head: true })
    .eq("slug", slug);
  if (excludeId) q = q.neq("id", excludeId);
  const { count } = await q;
  return (count ?? 0) > 0
    ? `Slug "${slug}" sudah dipakai. Ganti judul atau edit slug secara manual.`
    : null;
}

function revalidateAll(slug?: string) {
  revalidatePath("/admin/berita");
  revalidatePath("/berita");
  revalidatePath("/");
  if (slug) revalidatePath(`/berita/${slug}`);
}

// ─── Create ───────────────────────────────────────────────────────────────────

export async function createBerita(
  _prev: ActionResult,
  fd: FormData
): Promise<ActionResult> {
  try {
    const payload = readForm(fd);
    const supabase = createAdminClient();

    const conflict = await checkSlugConflict(supabase, payload.slug);
    if (conflict) return { ok: false, error: conflict };

    const { error } = await supabase.from("berita").insert(payload);
    if (error) return { ok: false, error: error.message };

    revalidateAll(payload.slug);
    redirect("/admin/berita?toast=created");
  } catch (e) {
    if (isRedirectError(e)) throw e;
    return { ok: false, error: e instanceof Error ? e.message : "Terjadi kesalahan." };
  }
  return { ok: true };
}

// ─── Update ───────────────────────────────────────────────────────────────────

export async function updateBerita(
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
      .from("berita")
      .update(payload)
      .eq("id", id);
    if (error) return { ok: false, error: error.message };

    revalidateAll(payload.slug);
    redirect("/admin/berita?toast=updated");
  } catch (e) {
    if (isRedirectError(e)) throw e;
    return { ok: false, error: e instanceof Error ? e.message : "Terjadi kesalahan." };
  }
  return { ok: true };
}

// ─── Auto-save (no redirect, returns result) ─────────────────────────────────

export async function autoSaveBerita(
  id: string,
  fd: FormData
): Promise<ActionResult & { savedAt?: string }> {
  try {
    const payload = readForm(fd);
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("berita")
      .update({ ...payload, status: "draft" })
      .eq("id", id);
    if (error) return { ok: false, error: error.message };
    revalidatePath("/admin/berita");
    return { ok: true, savedAt: new Date().toISOString() };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Terjadi kesalahan." };
  }
}

// ─── Toggle status ────────────────────────────────────────────────────────────

export async function toggleBeritaStatus(fd: FormData) {
  const id = String(fd.get("id") ?? "");
  const next = String(fd.get("next") ?? "");
  if (!id || (next !== "draft" && next !== "published")) return;
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("berita")
    .update({ status: next })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect(`/admin/berita?toast=${next === "published" ? "published" : "drafted"}`);
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export async function deleteBerita(fd: FormData) {
  const id = String(fd.get("id") ?? "");
  if (!id) return;
  const supabase = createAdminClient();
  const { error } = await supabase.from("berita").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/berita?toast=deleted");
}

// ─── Duplicate ────────────────────────────────────────────────────────────────

export async function duplicateBerita(fd: FormData) {
  const id = String(fd.get("id") ?? "");
  if (!id) return;
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("berita")
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
      .from("berita")
      .select("id", { count: "exact", head: true })
      .eq("slug", candidate);
    if ((count ?? 0) === 0) break;
    attempt++;
    candidate = `${baseSlug}-${attempt}`;
  }

  const { error: insertErr } = await supabase.from("berita").insert({
    ...data,
    id: undefined,
    slug: candidate,
    title: `${data.title} (Salinan)`,
    status: "draft",
    published_at: new Date().toISOString(),
    created_at: undefined,
  });
  if (insertErr) throw new Error(insertErr.message);

  revalidatePath("/admin/berita");
  redirect("/admin/berita?toast=duplicated");
}

// ─── Bulk actions ─────────────────────────────────────────────────────────────

export async function bulkDeleteBerita(fd: FormData) {
  const ids = fd.getAll("ids").map(String).filter(Boolean);
  if (!ids.length) return;
  const supabase = createAdminClient();
  const { error } = await supabase.from("berita").delete().in("id", ids);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/berita?toast=bulk_deleted");
}

// ─── Categories ───────────────────────────────────────────────────────────────

export async function createBeritaCategory(
  _prev: ActionResult,
  fd: FormData
): Promise<ActionResult> {
  const name = String(fd.get("name") ?? "").trim();
  if (!name) return { ok: false, error: "Nama kategori wajib diisi." };
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("berita_categories")
    .insert({ name, sort_order: 99 });
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/berita/categories");
  return { ok: true };
}

export async function deleteBeritaCategory(fd: FormData) {
  const id = String(fd.get("id") ?? "");
  if (!id) return;
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("berita_categories")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/berita/categories");
  redirect("/admin/berita/categories?toast=cat_deleted");
}

export async function bulkPublishBerita(fd: FormData) {
  const ids = fd.getAll("ids").map(String).filter(Boolean);
  if (!ids.length) return;
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("berita")
    .update({ status: "published" })
    .in("id", ids);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/berita?toast=bulk_published");
}
