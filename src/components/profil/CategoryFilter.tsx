"use client";

import { useMemo, useState } from "react";

export function CategoryFilter<T extends { id: string }>({
  items,
  categoryOf,
  render,
  searchOf,
  searchPlaceholder = "Cari…",
}: {
  items: T[];
  categoryOf: (item: T) => string;
  searchOf?: (item: T) => string;
  render: (filtered: T[]) => React.ReactNode;
  searchPlaceholder?: string;
}) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => set.add(categoryOf(i)));
    return ["Semua", ...Array.from(set)];
  }, [items, categoryOf]);

  const [active, setActive] = useState("Semua");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return items.filter((i) => {
      const matchesCategory = active === "Semua" || categoryOf(i) === active;
      const matchesSearch = !term || (searchOf ? searchOf(i).toLowerCase().includes(term) : true);
      return matchesCategory && matchesSearch;
    });
  }, [items, active, q, categoryOf, searchOf]);

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 md:items-center reveal">
        {/* Search */}
        {searchOf && (
          <div className="relative md:w-72">
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={searchPlaceholder}
              aria-label="Cari"
              className="w-full h-11 pl-10 pr-4 rounded-full border border-black/10 bg-white text-sm focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition"
            />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </div>
        )}
        {/* Category chips */}
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`h-9 px-4 rounded-full text-xs uppercase tracking-widest font-medium transition-all ${
                active === c
                  ? "bg-navy text-paper"
                  : "border border-black/10 text-ink/70 hover:border-amber hover:text-navy"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <span className="md:ml-auto text-xs text-muted">{filtered.length} item</span>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="reveal text-center py-16 bg-white rounded-2xl border border-black/5">
          <p className="text-sm text-muted">Tidak ada hasil. Coba kata kunci lain.</p>
        </div>
      ) : (
        render(filtered)
      )}
    </div>
  );
}
