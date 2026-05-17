"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function KotakSaranForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    const form = e.currentTarget;
    setStatus("loading");
    setErrorMsg("");

    try {
      // TODO: replace with real endpoint (Supabase, email, etc).
      // Simulated 1.4s round-trip so loading state is visible.
      await new Promise((res) => setTimeout(res, 1400));
      setStatus("success");
      form.reset();
      // Auto-dismiss success after 4s
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Terjadi kesalahan. Coba lagi.");
    }
  }

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <form onSubmit={handleSubmit} className="lg:col-span-7 reveal bg-paper-soft rounded-2xl p-7 space-y-4" style={{ animationDelay: "0.1s" }} aria-busy={isLoading}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="saran-nama" className="block text-[10px] uppercase tracking-widest text-muted">
            Nama (opsional)
          </label>
          <input
            id="saran-nama"
            name="nama"
            type="text"
            placeholder="Anonim"
            disabled={isLoading}
            className="mt-1.5 w-full h-11 px-4 rounded-xl border border-black/10 bg-white text-base focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition disabled:opacity-60 disabled:cursor-not-allowed"
          />
        </div>
        <div>
          <label htmlFor="saran-email" className="block text-[10px] uppercase tracking-widest text-muted">
            Email (opsional)
          </label>
          <input
            id="saran-email"
            name="email"
            type="email"
            placeholder="kamu@email.com"
            disabled={isLoading}
            className="mt-1.5 w-full h-11 px-4 rounded-xl border border-black/10 bg-white text-base focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition disabled:opacity-60 disabled:cursor-not-allowed"
          />
        </div>
      </div>
      <div>
        <label htmlFor="saran-kategori" className="block text-[10px] uppercase tracking-widest text-muted">
          Kategori
        </label>
        <select
          id="saran-kategori"
          name="kategori"
          disabled={isLoading}
          className="mt-1.5 w-full h-11 px-4 rounded-xl border border-black/10 bg-white text-base focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition disabled:opacity-60 disabled:cursor-not-allowed"
          defaultValue=""
          required
        >
          <option value="" disabled>Pilih kategori</option>
          <option>Akademik</option>
          <option>Kesiswaan</option>
          <option>Sarana & Prasarana</option>
          <option>Layanan / Administrasi</option>
          <option>Apresiasi</option>
          <option>Lainnya</option>
        </select>
      </div>
      <div>
        <label htmlFor="saran-pesan" className="block text-[10px] uppercase tracking-widest text-muted">
          Pesan
        </label>
        <textarea
          id="saran-pesan"
          name="pesan"
          rows={5}
          placeholder="Tulis saran, kritik, atau apresiasi di sini…"
          disabled={isLoading}
          required
          className="mt-1.5 w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-base focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition resize-y disabled:opacity-60 disabled:cursor-not-allowed"
        />
      </div>

      {/* Status banner */}
      {isSuccess && (
        <div role="status" aria-live="polite" className="flex items-start gap-3 p-4 rounded-xl bg-moss/10 border border-moss/30 text-moss animate-fade-in">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
            <path d="M5 12 L10 17 L20 7" />
          </svg>
          <div>
            <p className="font-medium text-sm">Pesan terkirim, terima kasih!</p>
            <p className="text-xs opacity-80 mt-0.5">Kami akan merespons dalam 3–5 hari kerja.</p>
          </div>
        </div>
      )}
      {isError && (
        <div role="alert" className="flex items-start gap-3 p-4 rounded-xl bg-rust/10 border border-rust/30 text-rust">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <div>
            <p className="font-medium text-sm">Gagal mengirim.</p>
            <p className="text-xs opacity-80 mt-0.5">{errorMsg || "Coba lagi sebentar."}</p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <p className="text-[11px] text-muted">
          Dengan mengirim, kamu setuju dengan ketentuan komunitas SMKN 74.
        </p>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-ink text-paper text-sm font-medium hover:bg-navy transition-colors group disabled:opacity-70 disabled:cursor-not-allowed min-w-[140px] justify-center"
        >
          {isLoading ? (
            <>
              {/* Spinner */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="animate-spin">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                <path d="M21 12 a9 9 0 0 0 -9 -9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Mengirim…
            </>
          ) : (
            <>
              Kirim Saran
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
