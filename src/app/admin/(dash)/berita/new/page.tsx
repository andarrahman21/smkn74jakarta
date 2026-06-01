import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { BeritaForm } from "../_form";
import { createBerita } from "../actions";

export const metadata = { title: "Berita baru — Admin SMKN 74" };

async function getCategories(): Promise<string[]> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("berita_categories")
    .select("name")
    .order("sort_order")
    .order("name");
  return (data ?? []).map((r) => r.name as string);
}

export default async function Page() {
  const categories = await getCategories();

  return (
    <div className="w-full">
      <Link
        href="/admin/berita"
        className="inline-flex items-center gap-2 h-9 px-3 -ml-3 mb-4 rounded-lg text-sm text-ink/70 hover:bg-paper-soft hover:text-navy transition-colors"
      >
        <span aria-hidden>←</span>
        Kembali ke daftar berita
      </Link>
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.22em] text-muted mb-2">Admin · Berita</p>
        <h1 className="font-display headline-section">Berita baru.</h1>
      </header>
      <BeritaForm
        action={createBerita}
        categories={categories}
      />
    </div>
  );
}
