import Link from "next/link";
import type { SiteContent } from "@/lib/site-content/get";

const BARS = [280, 300, 320, 220, 360, 240, 320, 280, 300, 280, 320, 240, 300, 280, 320, 260];

export function CTABanner({ cms }: { cms: SiteContent }) {
  return (
    <section className="relative bg-navy text-paper overflow-hidden py-16 md:py-24">
      {/* Animated wave background */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-end justify-between px-8 opacity-30"
      >
        {BARS.map((h, i) => (
          <span
            key={i}
            className="block w-[3vw] max-w-[60px] bg-amber/70 rounded-full animate-wave"
            style={{
              height: `${h}px`,
              animationDelay: `${(i % 6) * 0.2}s`,
              animationDuration: `${1.4 + (i % 4) * 0.2}s`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/60 to-navy" />
      </div>

      <div className="relative mx-auto max-w-4xl px-5 md:px-8 text-center">
        <p data-cms-key="cta.eyebrow" data-cms-type="text" className="text-xs uppercase tracking-[0.22em] text-amber mb-5 animate-fade-up">
          {cms["cta.eyebrow"]}
        </p>
        <h2
          className="font-display headline-page font-light animate-fade-up"
          style={{ animationDelay: "0.15s" }}
        >
          <span data-cms-key="cta.heading_pre" data-cms-type="text">{cms["cta.heading_pre"]}</span> <br />
          <em data-cms-key="cta.heading_accent" data-cms-type="text" className="not-italic text-amber">{cms["cta.heading_accent"]}</em>
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-10 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <Link
            href="/berita/informasi-sekolah/ppdb"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-amber text-navy text-sm font-semibold hover:scale-105 transition-transform"
          >
            <span data-cms-key="cta.ppdb_label" data-cms-type="text">{cms["cta.ppdb_label"]}</span>
          </Link>
          <Link
            href="/kontak"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-paper/30 text-sm font-medium hover:bg-white/5 transition-colors"
          >
            <span data-cms-key="cta.contact_label" data-cms-type="text">{cms["cta.contact_label"]}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
