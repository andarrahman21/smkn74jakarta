import Link from "next/link";
import { notFound } from "next/navigation";
import { findPage } from "@/lib/site-content/pages";
import { VisualEditor } from "../_visual-editor";
import { updateSiteContentKey } from "../actions";

export const metadata = { title: "Edit Halaman — Admin SMKN 74" };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ path?: string }>;
}) {
  const sp = await searchParams;
  const path = sp.path ?? "/";
  const page = findPage(path);
  if (!page || !page.editable) notFound();

  const previewUrl = `${path}${path.includes("?") ? "&" : "?"}edit=1`;

  return (
    <div className="w-full">
      <Link
        href="/admin/halaman-website"
        className="inline-flex items-center gap-2 h-9 px-3 -ml-3 mb-4 rounded-lg text-sm text-ink/70 hover:bg-paper-soft hover:text-navy transition-colors"
      >
        <span aria-hidden>←</span>
        Kembali ke daftar halaman
      </Link>
      <header className="mb-6 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted mb-2">Admin · Halaman Website</p>
          <h1 className="font-display headline-section">{page.title}.</h1>
          <p className="text-sm text-muted mt-2">
            Klik teks atau gambar di preview untuk mengeditnya.
          </p>
        </div>
        <Link
          href={path}
          target="_blank"
          className="h-9 px-4 rounded-full border border-moss/40 text-moss text-xs font-medium hover:bg-moss hover:text-paper transition-colors inline-flex items-center gap-1.5"
        >
          <span>↗</span> Buka halaman
        </Link>
      </header>

      <VisualEditor updateAction={updateSiteContentKey} previewUrl={previewUrl} />
    </div>
  );
}
