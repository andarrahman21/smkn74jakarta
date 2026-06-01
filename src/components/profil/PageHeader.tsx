import Link from "next/link";

const WAVE_BARS = [240, 280, 320, 220, 300, 260, 320, 280, 300, 260, 340, 240, 300, 280];

type Crumb = { label: string; href?: string };

export function PageHeader({
  crumbs,
  eyebrow,
  title,
  accent,
  trailing,
  subtitle,
  tagline,
  taglineKey,
  titleKey,
  accentKey,
  subtitleKey,
  cms,
  cmsPrefix,
  wide,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  accent?: string; // appears as amber-highlighted phrase inside title rendering
  trailing?: string;
  subtitle?: string;
  tagline?: string;
  taglineKey?: string;
  titleKey?: string;
  accentKey?: string;
  subtitleKey?: string;
  /** Merged site_content map — bila diberikan bersama cmsPrefix, header jadi editable & memakai override. */
  cms?: Record<string, string>;
  /** Prefix key konten, mis. "tentang" → header_title/header_tagline/dst. */
  cmsPrefix?: string;
  /** Judul lebih lebar (untuk judul panjang agar muat satu baris). */
  wide?: boolean;
}) {
  // Resolusi key: eksplisit (legacy) > turunan dari cmsPrefix.
  const tKey = taglineKey ?? (cmsPrefix ? `${cmsPrefix}.header_tagline` : undefined);
  const hKey = titleKey ?? (cmsPrefix ? `${cmsPrefix}.header_title` : undefined);
  const aKey = accentKey ?? (cmsPrefix ? `${cmsPrefix}.header_accent` : undefined);
  const sKey = subtitleKey ?? (cmsPrefix ? `${cmsPrefix}.header_subtitle` : undefined);

  // Nilai efektif: override dari cms jika ada.
  const v = (key: string | undefined, fallback: string | undefined) =>
    (key && cms?.[key] != null && cms[key] !== "" ? cms[key] : fallback);

  const taglineVal = v(tKey, tagline);
  const titleVal = v(hKey, title) ?? title;
  const accentVal = v(aKey, accent);
  const subtitleVal = v(sKey, subtitle ?? eyebrow);

  return (
    <section className="relative bg-navy text-paper overflow-hidden">
      <div aria-hidden className="absolute inset-0 flex items-end justify-between px-2 sm:px-6 opacity-25">
        {WAVE_BARS.map((h, i) => (
          <span
            key={i}
            className="block w-[4vw] max-w-[60px] bg-amber/60 rounded-full animate-wave"
            style={{
              height: `${h}px`,
              animationDelay: `${(i % 6) * 0.18}s`,
              animationDuration: `${1.4 + (i % 4) * 0.18}s`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/70 to-navy" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 pt-10 pb-14 md:pt-16 md:pb-20">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-paper/60 animate-fade-up">
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-2">
              {c.href ? (
                <Link href={c.href} className="hover:text-amber transition-colors">{c.label}</Link>
              ) : (
                <span className={i === crumbs.length - 1 ? "text-amber" : "text-paper/60"}>{c.label}</span>
              )}
              {i < crumbs.length - 1 && <span className="text-paper/30">/</span>}
            </span>
          ))}
        </nav>

        {taglineVal && (
          <p data-cms-key={tKey} data-cms-type={tKey ? "text" : undefined} data-cms-label={tKey ? "Label header" : undefined} className="mt-6 md:mt-10 text-xs sm:text-sm uppercase tracking-[0.22em] text-amber/90 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            {taglineVal}
          </p>
        )}

        <h1
          className={`mt-3 md:mt-4 font-display headline-page font-light animate-fade-up ${wide ? "max-w-none lg:whitespace-nowrap" : "max-w-3xl"}`}
          style={{ animationDelay: "0.2s" }}
        >
          <span data-cms-key={hKey} data-cms-type={hKey ? "text" : undefined} data-cms-label={hKey ? "Judul header" : undefined}>{titleVal}</span>
          {accentVal && (
            <>
              {" "}
              <em data-cms-key={aKey} data-cms-type={aKey ? "text" : undefined} data-cms-label={aKey ? "Aksen judul" : undefined} className="not-italic text-amber">{accentVal}</em>
            </>
          )}
          {trailing && <> {trailing}</>}
        </h1>

        {subtitleVal && (
          <p
            data-cms-key={sKey}
            data-cms-type={sKey ? "text" : undefined}
            data-cms-label={sKey ? "Subjudul header" : undefined}
            className="mt-5 md:mt-6 max-w-2xl text-base md:text-lg text-paper/75 leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            {subtitleVal}
          </p>
        )}
      </div>
    </section>
  );
}
