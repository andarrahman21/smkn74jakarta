"use client";

import { useEffect, useRef, useState } from "react";

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "") // strip diakritik
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

type Props = {
  defaultTitle?: string;
  defaultSlug?: string;
};

const inputCls =
  "w-full h-11 px-4 rounded-xl border border-black/10 bg-white text-base focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition";

/**
 * Title input → auto-generate slug.
 * Auto-sync mati saat user mengedit slug manual; nyala lagi via tombol "Reset".
 */
export function TitleSlugFields({ defaultTitle = "", defaultSlug = "" }: Props) {
  const [title, setTitle] = useState(defaultTitle);
  const [slug, setSlug] = useState(defaultSlug);
  // Auto-sync aktif kalau slug awal kosong (mode "create") atau persis match title (belum dikustom)
  const [auto, setAuto] = useState(() => !defaultSlug || defaultSlug === slugify(defaultTitle));
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (auto) setSlug(slugify(title));
  }, [title, auto]);

  return (
    <>
      <label className="block">
        <span className="block text-[10px] uppercase tracking-widest text-muted mb-1.5">
          Judul <span className="text-rust">*</span>
        </span>
        <input
          ref={titleRef}
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={inputCls}
        />
      </label>

      <label className="block">
        <span className="flex items-center justify-between text-[10px] uppercase tracking-widest text-muted mb-1.5">
          <span>Slug (URL)</span>
          <span className="flex items-center gap-2 normal-case tracking-normal">
            {auto ? (
              <span className="text-amber text-[10px] font-medium uppercase tracking-widest">● Auto dari judul</span>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAuto(true);
                  setSlug(slugify(title));
                }}
                className="text-[10px] font-medium uppercase tracking-widest text-navy hover:text-amber transition-colors"
              >
                ↻ Auto dari judul
              </button>
            )}
          </span>
        </span>
        <input
          name="slug"
          value={slug}
          onChange={(e) => {
            setAuto(false);
            setSlug(e.target.value);
          }}
          className={inputCls}
          placeholder="otomatis dari judul"
        />
        <span className="block text-[11px] text-muted mt-1">
          Tampil di URL: <code className="px-1 py-0.5 rounded bg-paper-soft text-ink/70">/pengumuman/{slug || "<slug>"}</code>
        </span>
      </label>
    </>
  );
}
