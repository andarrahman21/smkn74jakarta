import { createPublicClient } from "@/lib/supabase/server";
import { formatIndoDateParts } from "./utils";

const COLS = "id, slug, published_at, category, tag, title, excerpt, body, body_html, cover_image, cover_image_alt";

type Row = {
  id: string;
  slug: string;
  published_at: string;
  category: string;
  tag: string | null;
  title: string;
  excerpt: string;
  body: string[];
  body_html: string | null;
  cover_image: string | null;
  cover_image_alt: string | null;
};

export type PrestasiCmsPost = {
  id: string;
  slug: string;
  day: string;
  month: string;
  year: string;
  date: string;
  category: string;
  tag: string | null;
  title: string;
  excerpt: string;
  body: string[];
  bodyHtml: string | null;
  coverImage: string | null;
  coverImageAlt: string | null;
};

function toPrestasiCms(r: Row): PrestasiCmsPost {
  const p = formatIndoDateParts(r.published_at);
  return {
    id: r.id,
    slug: r.slug,
    day: p.day,
    month: p.monthShort,
    year: p.year,
    date: `${parseInt(p.day, 10)} ${p.monthLong} ${p.year}`,
    category: r.category,
    tag: r.tag,
    title: r.title,
    excerpt: r.excerpt,
    body: r.body ?? [],
    bodyHtml: r.body_html ?? null,
    coverImage: r.cover_image ?? null,
    coverImageAlt: r.cover_image_alt ?? null,
  };
}

const NOW = () => new Date().toISOString();

export async function getPrestasiCmsList(limit?: number): Promise<PrestasiCmsPost[]> {
  const supabase = createPublicClient();
  let q = supabase
    .from("prestasi_cms")
    .select(COLS)
    .eq("status", "published")
    .lte("published_at", NOW())
    .order("published_at", { ascending: false });
  if (limit) q = q.limit(limit);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []).map((r) => toPrestasiCms(r as Row));
}

export async function getPrestasiCms(slug: string): Promise<PrestasiCmsPost | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("prestasi_cms")
    .select(COLS)
    .eq("slug", slug)
    .eq("status", "published")
    .lte("published_at", NOW())
    .maybeSingle();
  if (error) throw error;
  return data ? toPrestasiCms(data as Row) : null;
}

export async function getPrestasiCmsSlugs(): Promise<string[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("prestasi_cms")
    .select("slug")
    .eq("status", "published")
    .lte("published_at", NOW());
  if (error) throw error;
  return (data ?? []).map((r) => r.slug);
}
