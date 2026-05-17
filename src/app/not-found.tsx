import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative min-h-[70vh] bg-navy text-paper overflow-hidden flex items-center">
      <div aria-hidden className="absolute inset-0 flex items-end justify-between px-8 opacity-30">
        {[280, 320, 240, 360, 220, 320, 280, 300, 260, 320, 240, 300, 280, 340, 240].map((h, i) => (
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

      <div className="relative mx-auto max-w-3xl px-5 md:px-5 md:px-8 py-16 md:py-24 text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-amber animate-fade-up">Error 404</p>
        <h1
          className="mt-4 font-display text-[80px] md:text-[120px] leading-none font-light animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          Tersesat.
        </h1>
        <p
          className="mt-6 text-lg text-paper/75 max-w-xl mx-auto animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          Halaman yang kamu cari tidak ada — mungkin sudah dipindah, atau alamatnya salah ketik.
        </p>
        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <Link href="/" className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-amber text-navy text-sm font-semibold hover:scale-105 transition-transform">
            Kembali ke Beranda →
          </Link>
          <Link href="/kontak" className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-paper/30 text-sm font-medium hover:bg-white/5 transition-colors">
            Hubungi kami
          </Link>
        </div>
      </div>
    </section>
  );
}
