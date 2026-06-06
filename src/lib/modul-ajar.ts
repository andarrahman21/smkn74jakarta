export const JURUSAN = [
  { slug: "tari", label: "Seni Tari" },
  { slug: "musik", label: "Seni Musik" },
  { slug: "karawitan", label: "Seni Karawitan" },
  { slug: "teater", label: "Seni Teater" },
] as const;

export type JurusanSlug = (typeof JURUSAN)[number]["slug"];

export function jurusanLabel(slug: string): string {
  return JURUSAN.find((j) => j.slug === slug)?.label ?? slug;
}

export const KELAS_OPTIONS = ["X", "XI", "XII"] as const;

export type ModulAjar = {
  id: string;
  jurusan: string;
  sort_order: number;
  title: string;
  kelas: string | null;
  cover_url: string | null;
  file_url: string | null;
};
