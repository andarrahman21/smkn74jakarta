/**
 * Shared types untuk data layer (Supabase ↔ React).
 * Field name di sini = shape yang diharapkan UI (camelCase).
 */

import type { PrestasiIconKey } from "@/components/profil/PrestasiIcon";

export type Pengumuman = {
  id: string;
  slug: string;
  day: string;      // "15"
  month: string;    // "Apr"  (short, untuk badge)
  year: string;     // "2026"
  date: string;     // "15 April 2026" (long, untuk display)
  category: string;
  tag: string | null;
  title: string;
  excerpt: string;
  body: string[];        // plain-text paragraphs fallback
  bodyHtml: string | null; // HTML dari WYSIWYG editor (preferred)
  coverImage: string | null; // URL cover image (opsional)
  coverImageAlt: string | null; // Alt text untuk cover image
};

export type Berita = {
  id: string;
  slug: string;
  num: string;
  month: string;    // "Jun" (short, untuk badge)
  tag: string;
  bg: string;
  date: string;     // "12 Mei 2026"
  author: string;
  readTime: string;
  title: string;
  excerpt: string;
  body: string[];
  bodyHtml: string | null;
  image: string;
  imageAlt: string | null;
  thumbnail: string | null;
  thumbnailAlt: string | null;
  status: string;
  viewCount: number;
};

export type Prestasi = {
  id: string;
  slug: string;
  icon: PrestasiIconKey;
  bg: string;
  date: string;
  year: string;
  level: "Internasional" | "Nasional" | "Provinsi" | "Kota";
  tag: string;
  title: string;
  sub: string;
  team: string[];
  body: string[];
  bodyHtml: string | null;
  image: string | null;
  imageAlt: string | null;
};

export type EventItem = {
  slug: string;
  title: string;
  date: string;
  status: "Akan datang" | "Selesai";
  category: string;
  body: string;
  bodyHtml: string | null;
  bg: string;
  ink: string;
  image: string | null;
  imageAlt: string | null;
};

export type Agenda = {
  day: string;
  month: string;
  year: string;
  date: string;
  time: string;
  title: string;
  location: string;
  category: "Akademik" | "Kesiswaan" | "PKL & Industri" | "Seni & Budaya" | "Komunitas";
};
