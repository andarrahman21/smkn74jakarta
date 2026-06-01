import Link from "next/link";
import { PAGES, PAGE_GROUPS } from "@/lib/site-content/pages";

export const metadata = { title: "Halaman Website — Admin SMKN 74" };

export default function Page() {
  return (
    <div className="w-full">
      <header className="mb-6 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted mb-2">Admin · Halaman Website</p>
          <h1 className="font-display headline-section">Halaman Website.</h1>
          <p className="text-sm text-muted mt-2 max-w-2xl">
            Pilih halaman lalu klik <span className="font-medium text-ink">Edit</span> untuk mengubah teks &amp; gambar
            langsung di preview. Halaman dinamis (berita, prestasi, agenda, event, pengumuman) dikelola lewat menunya
            masing-masing.
          </p>
        </div>
        <Link
          href="/admin/halaman-website/layanan"
          className="h-11 px-5 rounded-full bg-navy text-paper text-sm font-medium hover:bg-navy-deep transition-colors inline-flex items-center gap-2"
        >
          Kelola Link Layanan
        </Link>
      </header>

      <div className="bg-white border border-black/5 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-paper-soft">
            <tr>
              <th className="text-left p-3 text-[10px] uppercase tracking-widest text-muted font-medium">Halaman</th>
              <th className="text-left p-3 text-[10px] uppercase tracking-widest text-muted font-medium hidden sm:table-cell">URL</th>
              <th className="text-left p-3 text-[10px] uppercase tracking-widest text-muted font-medium hidden md:table-cell">Tipe</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {PAGE_GROUPS.map((group) => {
              const rows = PAGES.filter((p) => p.group === group);
              if (rows.length === 0) return null;
              return (
                <GroupRows key={group} group={group} rows={rows} />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GroupRows({
  group,
  rows,
}: {
  group: string;
  rows: typeof PAGES;
}) {
  return (
    <>
      <tr className="bg-paper/60">
        <td colSpan={4} className="px-3 py-2 text-[10px] uppercase tracking-widest text-muted font-semibold">
          {group}
        </td>
      </tr>
      {rows.map((p) => (
        <tr key={p.path} className="border-t border-black/5 hover:bg-paper-soft/50 transition-colors">
          <td className="p-3 align-middle">
            <p className="font-display text-sm leading-snug">{p.title}</p>
            {p.note && <p className="text-[11px] text-muted mt-0.5">{p.note}</p>}
          </td>
          <td className="p-3 align-middle text-xs text-muted hidden sm:table-cell">{p.path}</td>
          <td className="p-3 align-middle hidden md:table-cell">
            {p.editable ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-moss/10 text-moss text-[10px] font-semibold uppercase tracking-widest">
                <span className="h-1.5 w-1.5 rounded-full bg-moss" />
                Statik
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/5 text-muted text-[10px] font-semibold uppercase tracking-widest">
                <span className="h-1.5 w-1.5 rounded-full bg-muted" />
                Dinamis
              </span>
            )}
          </td>
          <td className="p-3 align-middle text-right">
            <div className="flex items-center gap-1.5 justify-end">
              {p.manage && (
                <Link
                  href={p.manage.href}
                  className="h-8 px-3 rounded-full border border-navy/30 text-navy text-xs font-medium hover:bg-navy hover:text-paper transition-colors inline-flex items-center"
                >
                  {p.manage.label}
                </Link>
              )}
              <Link
                href={p.path}
                target="_blank"
                className="h-8 px-3 rounded-full border border-black/10 text-xs font-medium hover:bg-paper-soft transition-colors inline-flex items-center gap-1"
              >
                Lihat ↗
              </Link>
              {p.editable ? (
                <Link
                  href={`/admin/halaman-website/edit?path=${encodeURIComponent(p.path)}`}
                  className="h-8 px-4 rounded-full bg-amber text-navy text-xs font-semibold hover:scale-105 transition-transform inline-flex items-center"
                >
                  Edit
                </Link>
              ) : (
                <span className="h-8 px-4 rounded-full border border-transparent text-xs text-muted/50 inline-flex items-center cursor-not-allowed">
                  Dinamis
                </span>
              )}
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}
