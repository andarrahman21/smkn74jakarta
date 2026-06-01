import Link from "next/link";
import { resolveSiteContent } from "@/lib/site-content/get";

const cols = [
  { title: "Profil", links: [
    { l: "Sambutan", h: "/profil/sambutan" },
    { l: "Visi & Misi", h: "/profil/visi-misi" },
    { l: "Struktur", h: "/profil/struktur" },
    { l: "Tenaga Pendidik", h: "/profil/tenaga-pendidik" },
  ]},
  { title: "Akademik", links: [
    { l: "Konsentrasi", h: "/profil/keahlian" },
    { l: "Kurikulum", h: "/profil/kurikulum" },
    { l: "PPDB", h: "/berita/informasi-sekolah/ppdb" },
    { l: "Tentang", h: "/tentang" },
  ]},
  { title: "Berita", links: [
    { l: "Cerita Sekolah", h: "/berita" },
    { l: "Pengumuman", h: "/pengumuman" },
    { l: "Agenda", h: "/berita/agenda" },
    { l: "Prestasi", h: "/prestasi" },
  ]},
  { title: "Lainnya", links: [
    { l: "Mitra DUDI", h: "/mitra-dudi" },
    { l: "Kontak", h: "/kontak" },
  ]},
];

const socials = [
  { name: "Instagram", short: "IG", href: "https://instagram.com" },
  { name: "YouTube",   short: "YT", href: "https://youtube.com" },
  { name: "Facebook",  short: "FB", href: "https://facebook.com" },
  { name: "TikTok",    short: "TT", href: "https://tiktok.com" },
];

function IconInstagram() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4.5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
function IconYouTube() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 5 12 5 12 5s-6 0-7.7.3A2.7 2.7 0 0 0 2.4 7.2 28 28 0 0 0 2 12a28 28 0 0 0 .4 4.8 2.7 2.7 0 0 0 1.9 1.9C6 19 12 19 12 19s6 0 7.7-.3a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z" /></svg>
  );
}
function IconFacebook() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-8H16l.5-3.5h-3v-2c0-1 .3-1.7 1.7-1.7h1.4V2.7a25 25 0 0 0-2.4-.1c-2.4 0-4 1.5-4 4.1V9.5H7.5V13h2.7v8h3.3z" /></svg>
  );
}
function IconTikTok() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3v3.3a4.4 4.4 0 0 0 3.5 1.5v3a7.4 7.4 0 0 1-3.5-.9V15a5.5 5.5 0 1 1-5.5-5.5v3a2.5 2.5 0 1 0 2.5 2.5V3h3z" /></svg>
  );
}
const iconMap: Record<string, () => React.ReactNode> = {
  Instagram: IconInstagram, YouTube: IconYouTube, Facebook: IconFacebook, TikTok: IconTikTok,
};

export async function Footer() {
  const cms = await resolveSiteContent();
  return (
    <footer className="bg-navy-deep text-paper">
      {/* Main */}
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-12 md:py-16 grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-10">
        {/* Brand */}
        <div className="col-span-2 md:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Logo SMK Negeri 74 Jakarta" className="h-11 w-11 rounded-full object-contain" />
            <div className="leading-tight">
              <p className="text-[10px] uppercase tracking-[0.18em] text-amber">SMK Negeri</p>
              <p className="font-display text-lg">74 Jakarta</p>
            </div>
          </div>
          <p data-cms-key="footer.address" data-cms-type="textarea" data-cms-label="Alamat footer" className="text-sm text-paper/60 leading-relaxed max-w-xs whitespace-pre-line">
            {cms["footer.address"] ?? "Jl. Moch. Kahfi II, Jagakarsa\nJakarta Selatan 12640"}
          </p>
          <p data-cms-key="footer.contact" data-cms-type="text" data-cms-label="Kontak footer" className="text-xs text-paper/40 mt-3">
            {cms["footer.contact"] ?? "Telepon (021) 7864-216 · NPSN 20103247"}
          </p>

          {/* Credibility badges */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div data-cms-key="footer.badge_1" data-cms-type="text" data-cms-label="Badge 1" className="px-3 py-1.5 rounded-md border border-amber/30 bg-amber/10 text-amber text-[10px] uppercase tracking-widest font-semibold">
              {cms["footer.badge_1"] ?? "Akreditasi A"}
            </div>
            <div data-cms-key="footer.badge_2" data-cms-type="text" data-cms-label="Badge 2" className="px-3 py-1.5 rounded-md border border-white/15 text-paper/70 text-[10px] uppercase tracking-widest">
              {cms["footer.badge_2"] ?? "Kemendikbudristek"}
            </div>
            <div data-cms-key="footer.badge_3" data-cms-type="text" data-cms-label="Badge 3" className="px-3 py-1.5 rounded-md border border-white/15 text-paper/70 text-[10px] uppercase tracking-widest">
              {cms["footer.badge_3"] ?? "Pemprov DKI"}
            </div>
          </div>
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <p className="text-[10px] uppercase tracking-[0.22em] text-amber mb-4">{c.title}</p>
            <ul className="space-y-2 text-sm">
              {c.links.map((l) => (
                <li key={l.l}>
                  <Link href={l.h} className="text-paper/70 hover:text-amber transition-colors">
                    {l.l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-paper/50">
            <span data-cms-key="footer.copyright" data-cms-type="text" data-cms-label="Teks copyright">
              {cms["footer.copyright"] ?? "© 2026 SMK Negeri 74 Jakarta."}
            </span>
          </p>
          <div className="flex items-center gap-3">
            {socials.map((s) => {
              const Icon = iconMap[s.name];
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="h-8 w-8 rounded-full border border-white/15 text-paper/70 grid place-items-center hover:bg-amber hover:text-navy hover:border-amber transition-colors"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
