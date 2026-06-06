"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { X, BookOpen, ArrowLeft, ArrowRight } from "lucide-react";
import { type ModulAjar, KELAS_OPTIONS } from "@/lib/modul-ajar";

const Flipbook = dynamic(() => import("./Flipbook"), { ssr: false });

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-9 px-5 rounded-full text-xs font-medium uppercase tracking-widest transition-colors ${
        active ? "bg-navy text-paper" : "border border-black/10 text-ink/70 hover:border-navy hover:text-navy"
      }`}
    >
      {label}
    </button>
  );
}

export function ModulAjarSection({ items, heading }: { items: ModulAjar[]; heading?: string }) {
  const [open, setOpen] = useState<ModulAjar | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const scrollerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Reset & recompute saat filter berubah
  useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollTo({ left: 0 });
    requestAnimationFrame(update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const scrollBy = (dir: number) => scrollerRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" });

  if (items.length === 0) return null;

  const available = KELAS_OPTIONS.filter((k) => items.some((m) => m.kelas === k));
  const shown = filter === "all" ? items : items.filter((m) => m.kelas === filter);

  return (
    <section className="bg-white border-t border-black/5 py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 reveal">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Modul Ajar</p>
            <h2 className="font-display headline-section max-w-2xl">{heading ?? "Modul ajar konsentrasi ini."}</h2>
          </div>

          {/* Slider controls */}
          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            <div className="relative h-1 w-24 rounded-full bg-mist overflow-hidden hidden sm:block">
              <span className="absolute inset-y-0 left-0 rounded-full bg-navy transition-[width] duration-200" style={{ width: `${Math.max(12, progress * 100)}%` }} />
            </div>
            <button onClick={() => scrollBy(-1)} aria-label="Sebelumnya" disabled={atStart} className="h-11 w-11 rounded-full border border-black/10 grid place-items-center transition-all hover:bg-paper-soft disabled:opacity-30 disabled:cursor-not-allowed">
              <ArrowLeft size={16} />
            </button>
            <button onClick={() => scrollBy(1)} aria-label="Berikutnya" disabled={atEnd} className="h-11 w-11 rounded-full bg-amber text-navy grid place-items-center transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {available.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2 reveal">
            <FilterChip label="Semua" active={filter === "all"} onClick={() => setFilter("all")} />
            {available.map((k) => (
              <FilterChip key={k} label={`Kelas ${k}`} active={filter === k} onClick={() => setFilter(k)} />
            ))}
          </div>
        )}
      </div>

      {/* Scroller */}
      <div
        ref={scrollerRef}
        className="flex gap-5 overflow-x-auto snap-x scroll-pl-5 md:scroll-pl-8 xl:scroll-pl-[calc((100vw-80rem)/2+2rem)] px-5 md:px-8 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="shrink-0 w-0 xl:w-[calc((100vw-80rem)/2-2rem)]" aria-hidden />
        {shown.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => m.file_url && setOpen(m)}
            disabled={!m.file_url}
            className="group text-left snap-start shrink-0 w-[260px] sm:w-[290px] rounded-2xl overflow-hidden bg-paper-soft border border-black/5 hover:border-amber hover:shadow-lg hover:shadow-black/5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <div className="relative aspect-[3/4] bg-navy-deep overflow-hidden">
              {m.cover_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.cover_url} alt={m.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-paper/40"><BookOpen size={36} /></div>
              )}
              {m.kelas && (
                <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-amber text-navy text-[10px] font-semibold uppercase tracking-widest">
                  Kelas {m.kelas}
                </span>
              )}
              {m.file_url && (
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-colors grid place-items-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity h-11 px-5 rounded-full bg-amber text-navy text-xs font-semibold inline-flex items-center gap-2">
                    <BookOpen size={14} /> Buka
                  </span>
                </div>
              )}
            </div>
            <div className="p-4">
              {m.kelas && <p className="text-[10px] uppercase tracking-widest text-amber font-medium mb-1">Kelas {m.kelas}</p>}
              <p className="font-display text-base leading-snug truncate" title={m.title}>{m.title}</p>
              {!m.file_url && <p className="text-[11px] text-muted mt-1">File belum tersedia</p>}
            </div>
          </button>
        ))}
        <div className="shrink-0 w-2" aria-hidden />
      </div>

      {/* Flipbook modal */}
      {open?.file_url && (
        <div className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-sm flex flex-col">
          <div className="flex items-center justify-between px-5 md:px-8 h-16 shrink-0 text-paper">
            <p className="font-display text-lg truncate pr-4">{open.title}</p>
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Tutup"
              className="h-10 w-10 rounded-full bg-white/10 grid place-items-center hover:bg-white/20 transition-colors shrink-0"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 overflow-auto grid place-items-center py-4">
            <Flipbook url={open.file_url} />
          </div>
        </div>
      )}
    </section>
  );
}
