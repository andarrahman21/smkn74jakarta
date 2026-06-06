import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { JURUSAN, jurusanLabel, type ModulAjar } from "@/lib/modul-ajar";
import { ModulManager } from "./_manager";

export async function generateMetadata({ params }: { params: Promise<{ jurusan: string }> }) {
  const { jurusan } = await params;
  return { title: `Modul Ajar — ${jurusanLabel(jurusan)} — Admin SMKN 74` };
}

export default async function Page({ params }: { params: Promise<{ jurusan: string }> }) {
  const { jurusan } = await params;
  if (!JURUSAN.some((j) => j.slug === jurusan)) notFound();

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("modul_ajar")
    .select("id, jurusan, sort_order, title, kelas, cover_url, file_url")
    .eq("jurusan", jurusan)
    .order("sort_order", { ascending: true });

  const items = (data ?? []) as ModulAjar[];

  return (
    <div className="w-full">
      <Link
        href="/admin/modul-ajar"
        className="inline-flex items-center gap-2 h-9 px-3 -ml-3 mb-4 rounded-lg text-sm text-ink/70 hover:bg-paper-soft hover:text-navy transition-colors"
      >
        <span aria-hidden>←</span>
        Kembali ke Modul Ajar
      </Link>
      <header className="mb-6 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted mb-2">Admin · Modul Ajar</p>
          <h1 className="font-display headline-section">{jurusanLabel(jurusan)}.</h1>
          <p className="text-sm text-muted mt-2 max-w-xl">
            Kelola modul ajar: cover, judul, &amp; file PDF (flipbook). Urutkan dengan tombol ▲▼.
          </p>
        </div>
        <Link
          href={`/profil/keahlian/${jurusan}`}
          target="_blank"
          className="h-9 px-4 rounded-full border border-moss/40 text-moss text-xs font-medium hover:bg-moss hover:text-paper transition-colors inline-flex items-center gap-1.5"
        >
          <span>↗</span> Lihat halaman
        </Link>
      </header>

      <ModulManager jurusan={jurusan} items={items} />
    </div>
  );
}
