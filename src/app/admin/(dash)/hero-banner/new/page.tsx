import Link from "next/link";
import { HeroBannerForm } from "../_form";
import { createHeroSlide } from "../actions";

export const metadata = { title: "Tambah Slide Hero — Admin SMKN 74" };

export default function Page() {
  return (
    <div className="w-full">
      <Link
        href="/admin/hero-banner"
        className="inline-flex items-center gap-2 h-9 px-3 -ml-3 mb-4 rounded-lg text-sm text-ink/70 hover:bg-paper-soft hover:text-navy transition-colors"
      >
        <span aria-hidden>←</span>
        Kembali ke daftar slide
      </Link>
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.22em] text-muted mb-2">Admin · Hero Banner</p>
        <h1 className="font-display headline-section">Slide baru.</h1>
      </header>
      <HeroBannerForm action={createHeroSlide} />
    </div>
  );
}
