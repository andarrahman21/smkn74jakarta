import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { MisiManager, type MisiItem } from "./_manager";

export const metadata = { title: "Kelola Misi — Admin SMKN 74" };

export default async function Page() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("misi")
    .select("id, sort_order, title, body")
    .order("sort_order", { ascending: true });

  const items = (data ?? []) as MisiItem[];

  return (
    <div className="w-full">
      <Link
        href="/admin/halaman-website"
        className="inline-flex items-center gap-2 h-9 px-3 -ml-3 mb-4 rounded-lg text-sm text-ink/70 hover:bg-paper-soft hover:text-navy transition-colors"
      >
        <span aria-hidden>←</span>
        Kembali ke Halaman Website
      </Link>
      <header className="mb-6 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted mb-2">Admin · Halaman Website · Visi &amp; Misi</p>
          <h1 className="font-display headline-section">Kelola Misi.</h1>
          <p className="text-sm text-muted mt-2 max-w-xl">
            Tambah, hapus, urutkan, dan edit poin misi. Perubahan langsung tampil di halaman Visi &amp; Misi.
          </p>
        </div>
        <Link
          href="/profil/visi-misi"
          target="_blank"
          className="h-9 px-4 rounded-full border border-moss/40 text-moss text-xs font-medium hover:bg-moss hover:text-paper transition-colors inline-flex items-center gap-1.5"
        >
          <span>↗</span> Lihat halaman
        </Link>
      </header>

      <MisiManager items={items} />
    </div>
  );
}
