import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { LAYANAN_GROUPS, LAYANAN_ITEMS } from "@/lib/site-content/layanan";
import { LayananLinksManager } from "./_manager";

export const metadata = { title: "Kelola Link Layanan — Admin SMKN 74" };

export default async function Page() {
  const keys = LAYANAN_ITEMS.map((it) => it.key);
  const supabase = createAdminClient();
  const { data } = await supabase.from("site_content").select("key, value").in("key", keys);
  const values: Record<string, string> = {};
  for (const row of data ?? []) values[row.key] = row.value;

  return (
    <div className="w-full max-w-4xl">
      <Link
        href="/admin/halaman-website"
        className="inline-flex items-center gap-2 h-9 px-3 -ml-3 mb-4 rounded-lg text-sm text-ink/70 hover:bg-paper-soft hover:text-navy transition-colors"
      >
        <span aria-hidden>←</span>
        Kembali ke Halaman Website
      </Link>
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.22em] text-muted mb-2">Admin · Halaman Website · Menu Layanan</p>
        <h1 className="font-display headline-section">Kelola Link Layanan.</h1>
        <p className="text-sm text-muted mt-2 max-w-2xl">
          Atur tautan tujuan tiap layanan surat di menu <span className="font-medium text-ink">Layanan</span>.
          Isi dengan URL Google Form atau halaman tujuan. Kosongkan bila belum tersedia.
        </p>
      </header>

      <LayananLinksManager groups={LAYANAN_GROUPS} values={values} />
    </div>
  );
}
