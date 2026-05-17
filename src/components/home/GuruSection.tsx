"use client";

import { useEffect, useRef, useState } from "react";

const teachers = [
  { initials: "BS", name: "Drs. Bambang Sutiyono, M.Pd", role: "Kepala Sekolah", bg: "bg-moss",  ink: "text-paper" },
  { initials: "WS", name: "Wahyu Setiawan, S.Pd, M.Pd", role: "Wakil Kurikulum", bg: "bg-navy",  ink: "text-paper" },
  { initials: "SR", name: "Siti Rohayu, S.Kom",        role: "Teknik Komputer & Jaringan", bg: "bg-rust", ink: "text-paper" },
  { initials: "AH", name: "Ahmad Hidayat, S.Pd",       role: "Animasi & Multimedia", bg: "bg-amber", ink: "text-navy" },
  { initials: "DN", name: "Dewi Nurjanah, S.Pd",       role: "Bahasa Indonesia", bg: "bg-paper-soft", ink: "text-ink" },
  { initials: "RP", name: "Rio Pramudita, S.Kom",      role: "Rekayasa Perangkat Lunak", bg: "bg-navy-deep", ink: "text-paper" },
  { initials: "LK", name: "Lina Kartika, M.Pd",        role: "Akuntansi", bg: "bg-moss", ink: "text-paper" },
  { initials: "FA", name: "Fadli Akbar, S.Pd",         role: "Olahraga", bg: "bg-rust", ink: "text-paper" },
];

const PAGES = 3; // split the 8 cards into 3 logical pages

export function GuruSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..1
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      const p = max > 0 ? el.scrollLeft / max : 0;
      setProgress(p);
      setAtStart(el.scrollLeft <= 2);
      setAtEnd(el.scrollLeft >= max - 2);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollBy = (dir: number) => {
    scrollerRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  // Current "page" index based on progress (0..PAGES-1)
  // Use floor so leftmost stays active until you've scrolled past 1/PAGES of the track.
  // Snap to 0 explicitly when at the very start to avoid jitter from snap-mandatory layout.
  const activePage = atStart
    ? 0
    : Math.min(PAGES - 1, Math.floor(progress * PAGES));

  return (
    <section className="bg-white py-16 md:py-24 border-t border-black/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12 reveal">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">
              Pengurus & Tenaga Kependidikan
            </p>
            <h2 className="font-display headline-section max-w-2xl">
              Orang-orang yang membentuk sekolah.
            </h2>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            {/* Functional page indicator — active segment widens & turns navy */}
            <div className="flex items-center gap-1.5 mr-2">
              {Array.from({ length: PAGES }).map((_, i) => (
                <button
                  key={i}
                  aria-label={`Halaman ${i + 1}`}
                  onClick={() => {
                    const el = scrollerRef.current;
                    if (!el) return;
                    const max = el.scrollWidth - el.clientWidth;
                    el.scrollTo({ left: (max * i) / (PAGES - 1), behavior: "smooth" });
                  }}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    activePage === i ? "w-10 bg-navy" : "w-4 bg-mist hover:bg-muted/60"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => scrollBy(-1)}
              aria-label="Sebelumnya"
              disabled={atStart}
              className="h-11 w-11 rounded-full border border-black/10 grid place-items-center transition-all hover:bg-paper-soft disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8.5 3.5 L5 7 L8.5 10.5" />
                <path d="M5 7 L12 7" />
              </svg>
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Berikutnya"
              disabled={atEnd}
              className="h-11 w-11 rounded-full bg-amber text-navy grid place-items-center transition-all hover:scale-105 hover:bg-amber-soft disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5.5 3.5 L9 7 L5.5 10.5" />
                <path d="M9 7 L2 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory px-5 md:px-8 max-w-[calc(100%+0px)] mx-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="shrink-0 w-[calc((100vw-80rem)/2)] hidden xl:block" />
        {teachers.map((t, i) => (
          <article
            key={t.initials}
            className={`${t.bg} ${t.ink} group relative snap-start shrink-0 w-[260px] sm:w-[300px] md:w-[316px] aspect-[316/454] rounded-2xl p-5 md:p-6 flex flex-col justify-between transition-transform duration-500 hover:-translate-y-2 cursor-pointer reveal`}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <p className="text-[10px] uppercase tracking-[0.22em] opacity-80">
              {t.role}
            </p>

            <div className="flex-1 grid place-items-center">
              <span className="font-display text-display-xl italic opacity-90 transition-transform duration-700 group-hover:scale-110">
                {t.initials}
              </span>
            </div>

            <div className="border-t border-current/15 pt-4">
              <p className="font-display text-base leading-snug">{t.name}</p>
              <p className="text-[11px] opacity-70 mt-1">{t.role}</p>
            </div>

            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </article>
        ))}
        <div className="shrink-0 w-8" />
      </div>
    </section>
  );
}
