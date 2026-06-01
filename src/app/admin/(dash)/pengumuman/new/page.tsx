import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { PengumumanForm } from "../_form";
import { createPengumuman } from "../actions";

export const metadata = { title: "Pengumuman baru — Admin SMKN 74" };

async function getFormData() {
  const supabase = createAdminClient();
  const [catRes, tagRes] = await Promise.all([
    supabase
      .from("pengumuman_categories")
      .select("name")
      .order("sort_order")
      .order("name"),
    supabase
      .from("pengumuman")
      .select("tag")
      .not("tag", "is", null),
  ]);
  const categories = (catRes.data ?? []).map((r) => r.name as string);
  const tags = [...new Set((tagRes.data ?? []).map((r) => r.tag as string).filter(Boolean))].sort();
  return { categories, tags };
}

export default async function Page() {
  const { categories, tags } = await getFormData();

  return (
    <div className="w-full">
      <Link
        href="/admin/pengumuman"
        className="inline-flex items-center gap-2 h-9 px-3 -ml-3 mb-4 rounded-lg text-sm text-ink/70 hover:bg-paper-soft hover:text-navy transition-colors"
      >
        <span aria-hidden>←</span>
        Kembali ke daftar pengumuman
      </Link>
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.22em] text-muted mb-2">Admin · Pengumuman</p>
        <h1 className="font-display headline-section">Pengumuman baru.</h1>
      </header>
      <PengumumanForm
        action={createPengumuman}
        submitLabel="Publikasikan →"
        categories={categories}
        existingTags={tags}
      />
    </div>
  );
}
