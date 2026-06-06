import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { KATEGORI, kategoriLabel, kategoriPage, type StrukturProfil } from "@/lib/struktur";
import { StrukturManager } from "./_manager";

export async function generateMetadata({ params }: { params: Promise<{ kategori: string }> }) {
  const { kategori } = await params;
  return { title: `Struktur — ${kategoriLabel(kategori)} — Admin SMKN 74` };
}

export default async function Page({ params }: { params: Promise<{ kategori: string }> }) {
  const { kategori } = await params;
  if (!KATEGORI.some((k) => k.slug === kategori)) notFound();

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("struktur_profil")
    .select("id, kategori, sort_order, title, nama, foto_url")
    .eq("kategori", kategori)
    .order("sort_order", { ascending: true });

  const items = (data ?? []) as StrukturProfil[];
  const page = kategoriPage(kategori);

  return (
    <div className="w-full">
      <Link
        href="/admin/struktur"
        className="inline-flex items-center gap-2 h-9 px-3 -ml-3 mb-4 rounded-lg text-sm text-ink/70 hover:bg-paper-soft hover:text-navy transition-colors"
      >
        <span aria-hidden>←</span>
        Kembali ke Struktur Organisasi
      </Link>
      <header className="mb-6 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted mb-2">Admin · Struktur Organisasi</p>
          <h1 className="font-display headline-section">{kategoriLabel(kategori)}.</h1>
          <p className="text-sm text-muted mt-2 max-w-xl">
            Kelola profil: titel/jabatan, nama, &amp; foto. Urutkan dengan tombol ▲▼.
          </p>
        </div>
        {page && (
          <Link
            href={page}
            target="_blank"
            className="h-9 px-4 rounded-full border border-moss/40 text-moss text-xs font-medium hover:bg-moss hover:text-paper transition-colors inline-flex items-center gap-1.5"
          >
            <span>↗</span> Lihat halaman
          </Link>
        )}
      </header>

      <StrukturManager kategori={kategori} items={items} />
    </div>
  );
}
