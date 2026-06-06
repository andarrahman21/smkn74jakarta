import { createPublicClient } from "@/lib/supabase/server";
import { formatIndoDate, formatIndoDateParts } from "./utils";
import type { Berita } from "./types";

const COLS = "id, slug, num, tag, bg, published_at, author, read_time, title, excerpt, body, body_html, image, image_alt, thumbnail, thumbnail_alt, status, view_count";

const NOW = () => new Date().toISOString();

type Row = {
  id: string;
  slug: string;
  num: string;
  tag: string;
  bg: string;
  published_at: string;
  author: string;
  read_time: string;
  title: string;
  excerpt: string;
  body: string[];
  body_html: string | null;
  image: string;
  image_alt: string | null;
  thumbnail: string | null;
  thumbnail_alt: string | null;
  status: string;
  view_count: number;
};

function toBerita(r: Row): Berita {
  return {
    id: r.id,
    slug: r.slug,
    num: r.num,
    month: formatIndoDateParts(r.published_at).monthShort,
    tag: r.tag,
    bg: r.bg,
    date: formatIndoDate(r.published_at),
    author: r.author,
    readTime: r.read_time,
    title: r.title,
    excerpt: r.excerpt,
    body: r.body ?? [],
    bodyHtml: r.body_html ?? null,
    image: r.image,
    imageAlt: r.image_alt ?? null,
    thumbnail: r.thumbnail ?? null,
    thumbnailAlt: r.thumbnail_alt ?? null,
    status: r.status,
    viewCount: r.view_count ?? 0,
  };
}

export async function getBeritaList(limit?: number): Promise<Berita[]> {
  try {
    const supabase = createPublicClient();
    const now = NOW();
    let q = supabase
      .from("berita")
      .select(COLS)
      .eq("status", "published")
      .lte("published_at", now)
      .order("published_at", { ascending: false });
    if (limit) q = q.limit(limit);
    const { data, error } = await q;
    if (error) throw error;
    return (data ?? []).map((r) => toBerita(r as Row));
  } catch {
    return [];
  }
}

export async function getBerita(slug: string): Promise<Berita | null> {
  try {
    const supabase = createPublicClient();
    const now = NOW();
    const { data, error } = await supabase
      .from("berita")
      .select(COLS)
      .eq("slug", slug)
      .eq("status", "published")
      .lte("published_at", now)
      .maybeSingle();
    if (error) throw error;
    return data ? toBerita(data as Row) : null;
  } catch {
    return null;
  }
}

export async function getBeritaSlugs(): Promise<string[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("berita")
      .select("slug")
      .eq("status", "published");
    if (error) throw error;
    return (data ?? []).map((r) => r.slug);
  } catch {
    return [];
  }
}

// Mark unused for now (kept for potential future filter UI)
export { formatIndoDateParts as _formatIndoDateParts };
