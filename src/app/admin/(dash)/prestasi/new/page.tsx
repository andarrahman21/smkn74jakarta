import Link from "next/link";
import { PrestasiForm } from "../_form";
import { createPrestasiItem } from "../actions";

export const metadata = { title: "Prestasi baru — Admin SMKN 74" };

export default async function Page() {
  return (
    <div className="w-full">
      <Link
        href="/admin/prestasi"
        className="inline-flex items-center gap-2 h-9 px-3 -ml-3 mb-4 rounded-lg text-sm text-ink/70 hover:bg-paper-soft hover:text-navy transition-colors"
      >
        <span aria-hidden>←</span>
        Kembali ke daftar prestasi
      </Link>
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.22em] text-muted mb-2">Admin · Prestasi</p>
        <h1 className="font-display headline-section">Prestasi baru.</h1>
      </header>
      <PrestasiForm action={createPrestasiItem} submitLabel="Simpan" />
    </div>
  );
}
