export const KATEGORI = [
  { slug: "manajemen", label: "Manajemen Sekolah", page: "/profil/struktur/manajemen" },
  { slug: "komite", label: "Komite", page: "/profil/struktur/komite" },
  { slug: "osis", label: "OSIS", page: "/profil/struktur/osis" },
  { slug: "mpk", label: "MPK", page: "/profil/struktur/mpk" },
  { slug: "tenaga", label: "Profil Tenaga Pendidik & Kependidikan", page: "/profil/tenaga-pendidik" },
] as const;

export type KategoriSlug = (typeof KATEGORI)[number]["slug"];

export function kategoriLabel(slug: string): string {
  return KATEGORI.find((k) => k.slug === slug)?.label ?? slug;
}

export function kategoriPage(slug: string): string | null {
  return KATEGORI.find((k) => k.slug === slug)?.page ?? null;
}

export type StrukturProfil = {
  id: string;
  kategori: string;
  sort_order: number;
  title: string;
  nama: string;
  foto_url: string | null;
};
