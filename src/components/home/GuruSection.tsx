"use client";

import { useEffect, useRef, useState } from "react";

export type GuruCard = {
  initials: string;
  name: string;
  role: string;
  bg: string;
  ink: string;
  photo: string | null;
};

const PAGES = 3; // split the cards into 3 logical pages

export function GuruSection({
  teachers,
  eyebrow = "Pengurus & Tenaga Kependidikan",
  heading = "Orang-orang yang membentuk sekolah.",
}: {
  teachers: GuruCard[];
  eyebrow?: string;
  heading?: string;
}) {
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

  if (teachers.length === 0) return null;

  return (
    <section className="bg-white py-16 md:py-24 border-t border-black/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12 reveal">
          <div>
            <p data-cms-key="guru.eyebrow" data-cms-type="text" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">
              {eyebrow}
            </p>
            <h2 data-cms-key="guru.heading" data-cms-type="text" className="font-display headline-section max-w-2xl">
              {heading}
            </h2>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            {/* Functional page indicator — satu garis, thumb bergerak */}
            <div className="relative h-1 w-24 rounded-full bg-mist mr-2 overflow-hidden">
              <span
                className="absolute inset-y-0 rounded-full bg-navy transition-all duration-500"
                style={{ width: `${100 / PAGES}%`, left: `${(activePage * 100) / PAGES}%` }}
              />
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
        className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory px-5 md:px-8 scroll-pl-5 md:scroll-pl-8 xl:scroll-pl-[calc((100vw-80rem)/2+2rem)] max-w-[calc(100%+0px)] mx-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="shrink-0 w-0 xl:w-[calc((100vw-80rem)/2-2rem)]" aria-hidden />
        {teachers.map((t, i) => (
          <article
            key={`${t.name}-${i}`}
            className={`${t.bg} ${t.ink} group relative snap-start shrink-0 w-[260px] sm:w-[300px] md:w-[316px] aspect-[316/454] rounded-2xl p-5 md:p-6 flex flex-col justify-between overflow-hidden reveal`}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            {/* Foto (jika ada) */}
            {t.photo && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.photo}
                  alt={t.name}
                  className="absolute inset-0 h-full w-full object-cover scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              </>
            )}

            {!t.photo && (
              <p className="relative z-10 text-[10px] uppercase tracking-[0.22em] opacity-80">
                {t.role}
              </p>
            )}

            {!t.photo && (
              <div className="flex-1 grid place-items-center">
                <span className="font-display text-display-xl italic opacity-90">
                  {t.initials}
                </span>
              </div>
            )}

            <div className={`relative z-10 mt-auto border-t pt-4 ${t.photo ? "border-white/20 text-white" : "border-current/15"}`}>
              <p className="font-display text-base leading-snug">{t.name}</p>
              <p className={`text-[11px] mt-1 ${t.photo ? "text-white/70" : "opacity-70"}`}>{t.role}</p>
            </div>

            {/* Subtle gradient overlay on hover (non-foto) */}
            {!t.photo && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            )}
          </article>
        ))}
        <div className="shrink-0 w-8" />
      </div>
    </section>
  );
}
