import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSection } from "@/lib/site-content/registry";
import { SiteContentForm } from "./_form";
import { updateSiteContent } from "../actions";

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const s = getSection(section);
  return { title: `${s?.title ?? "Edit"} — Halaman Website` };
}

export default async function Page({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const sec = getSection(section);
  if (!sec) notFound();

  // Ambil override yang ada untuk field section ini
  const keys = sec.fields.map((f) => f.key);
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("site_content")
    .select("key, value")
    .in("key", keys);

  const overrides: Record<string, string> = {};
  for (const row of data ?? []) overrides[row.key] = row.value;

  // Nilai awal = override jika ada, kalau tidak default
  const values: Record<string, string> = {};
  for (const f of sec.fields) {
    overrides[f.key] !== undefined && overrides[f.key] !== ""
      ? (values[f.key] = overrides[f.key])
      : (values[f.key] = f.default);
  }

  const boundAction = updateSiteContent.bind(null, sec.id);

  return (
    <div className="w-full">
      <Link
        href="/admin/halaman-website"
        className="inline-flex items-center gap-2 h-9 px-3 -ml-3 mb-4 rounded-lg text-sm text-ink/70 hover:bg-paper-soft hover:text-navy transition-colors"
      >
        <span aria-hidden>←</span>
        Kembali ke Halaman Website
      </Link>
      <header className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted mb-2">Admin · Halaman Website</p>
          <h1 className="font-display headline-section">{sec.title}.</h1>
          <p className="text-sm text-muted mt-2 max-w-2xl">{sec.description}</p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="h-9 px-4 rounded-full border border-moss/40 text-moss text-xs font-medium hover:bg-moss hover:text-paper transition-colors inline-flex items-center gap-1.5"
        >
          <span>↗</span> Lihat beranda
        </Link>
      </header>

      {sec.dynamicNote && (
        <div className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-navy/5 border border-navy/10 text-sm text-ink/70">
          <span className="text-navy">ℹ</span>
          <span>{sec.dynamicNote}</span>
        </div>
      )}

      <SiteContentForm action={boundAction} fields={sec.fields} values={values} />
    </div>
  );
}
