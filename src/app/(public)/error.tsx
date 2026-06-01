"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <section className="relative min-h-[70vh] bg-navy text-paper overflow-hidden flex items-center">
      <div aria-hidden className="absolute inset-0 flex items-end justify-between px-8 opacity-25">
        {[240, 280, 320, 220, 300, 260, 320, 280, 300, 260, 340, 240].map((h, i) => (
          <span
            key={i}
            className="block w-[4vw] max-w-[60px] bg-rust/70 rounded-full animate-wave"
            style={{ height: `${h}px`, animationDelay: `${(i % 5) * 0.18}s`, animationDuration: `${1.4 + (i % 4) * 0.18}s` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/70 to-navy" />
      </div>

      <div className="relative mx-auto max-w-3xl px-5 md:px-5 md:px-8 py-16 md:py-24 text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-rust animate-fade-up">Terjadi galat</p>
        <h1 className="mt-4 font-display text-[64px] md:text-[88px] leading-none font-light animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Ada yang <em className="not-italic text-amber">tidak beres</em>.
        </h1>
        <p className="mt-6 text-lg text-paper/75 max-w-xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
          Coba muat ulang halaman. Kalau masalah berlanjut, hubungi Tata Usaha sekolah.
        </p>
        {error?.digest && (
          <p className="mt-3 text-xs text-paper/40 font-mono">Kode galat: {error.digest}</p>
        )}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-amber text-navy text-sm font-semibold hover:scale-105 transition-transform"
          >
            Coba lagi →
          </button>
          <Link href="/" className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-paper/30 text-sm font-medium hover:bg-white/5 transition-colors">
            Beranda
          </Link>
        </div>
      </div>
    </section>
  );
}
