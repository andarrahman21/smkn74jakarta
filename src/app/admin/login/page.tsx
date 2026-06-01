import Link from "next/link";
import { LoginForm } from "./_form";

export const metadata = { title: "Login Admin — SMKN 74" };

type Search = { next?: string; error?: string };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const sp = await searchParams;
  const unauthorized = sp.error === "unauthorized";

  return (
    <main className="min-h-screen grid place-items-center bg-navy-deep text-paper p-5">
      <div className="w-full max-w-sm bg-navy rounded-2xl border border-white/10 p-8 shadow-2xl shadow-black/40">
        <div className="flex items-center gap-3 mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Logo SMK Negeri 74" className="h-10 w-10 rounded-full object-contain" />
          <div className="leading-tight">
            <p className="text-[10px] uppercase tracking-[0.22em] text-amber">Admin</p>
            <p className="font-display text-lg">SMKN 74 Jakarta</p>
          </div>
        </div>

        {unauthorized && (
          <div className="mb-4 p-3 rounded-lg border border-rust/40 bg-rust/10 text-rust text-sm">
            Akun Anda tidak terdaftar sebagai admin. Hubungi pengelola.
          </div>
        )}

        <LoginForm next={sp.next} />

        <p className="mt-6 text-xs text-paper/50 leading-relaxed">
          Akses dibatasi untuk staf yang diberi izin. Akun ditambahkan via Supabase Dashboard.
        </p>

        <Link href="/" className="mt-4 inline-block text-xs text-paper/40 hover:text-amber transition-colors">
          ← Kembali ke situs publik
        </Link>
      </div>
    </main>
  );
}
