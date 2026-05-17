"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { prestasiList } from "@/data/prestasi";
import { PrestasiIcon } from "@/components/profil/PrestasiIcon";

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Counter({ target, duration = 1400 }: { target: number; duration?: number }) {
  const { ref, visible } = useInView<HTMLSpanElement>();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, target, duration]);

  return <span ref={ref}>{n}</span>;
}

export function PrestasiSection() {
  const rows = prestasiList.slice(0, 4);
  const nasional = prestasiList.filter((p) => p.level === "Nasional" || p.level === "Internasional").length;

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex items-end justify-between mb-14 reveal">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">
              Prestasi Terbaru
            </p>
            <h2 className="font-display headline-section max-w-xl">
              Catatan prestasi yang membanggakan tahun ini.
            </h2>
          </div>
          <div className="hidden md:flex items-baseline gap-6 font-display">
            <div className="text-center">
              <div className="stat-num font-semibold text-navy">
                <Counter target={prestasiList.length} />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-muted">Total</p>
            </div>
            <span className="text-3xl text-mist">|</span>
            <div className="text-center">
              <div className="stat-num font-semibold text-amber">
                <Counter target={nasional} />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-muted">Nasional</p>
            </div>
          </div>
        </div>

        <ul className="space-y-4">
          {rows.map((r, i) => (
            <li
              key={r.slug}
              className="reveal"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <Link
                href={`/prestasi/${r.slug}`}
                className="group flex items-center gap-6 p-5 rounded-2xl bg-white border border-black/5 hover:border-amber hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className={`${r.bg} shrink-0 h-20 w-32 rounded-xl grid place-items-center text-paper`}>
                  <PrestasiIcon kind={r.icon} className="h-10 w-10" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest text-muted mb-2">
                    <span>{r.date}</span>
                    <span className="h-1 w-1 rounded-full bg-mist" />
                    <span className="text-amber font-medium">★ {r.tag}</span>
                  </div>
                  <h3 className="font-display text-lg leading-snug group-hover:text-navy transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-xs text-muted mt-1">{r.sub}</p>
                </div>
                <div className="shrink-0 h-10 w-10 rounded-full border border-black/10 grid place-items-center transition-all group-hover:bg-amber group-hover:border-amber group-hover:rotate-[-45deg]">
                  <span>→</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center reveal">
          <Link
            href="/prestasi"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-ink text-paper text-sm font-medium hover:bg-navy transition-colors group"
          >
            Lihat semua Prestasi
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
