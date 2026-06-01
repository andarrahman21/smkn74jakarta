"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function LoginForm({ next }: { next?: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);

    const supabase = createClient();
    const { error: signErr } = await supabase.auth.signInWithPassword({ email, password });

    if (signErr) {
      setError(signErr.message || "Login gagal.");
      setBusy(false);
      return;
    }

    router.replace(next || "/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-[10px] uppercase tracking-widest text-paper/60 mb-1.5">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={busy}
          className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/15 text-base text-paper placeholder:text-paper/30 focus:outline-none focus:border-amber focus:bg-white/10 transition disabled:opacity-60"
          placeholder="admin@smkn74.sch.id"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-[10px] uppercase tracking-widest text-paper/60 mb-1.5">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={busy}
          className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/15 text-base text-paper placeholder:text-paper/30 focus:outline-none focus:border-amber focus:bg-white/10 transition disabled:opacity-60"
          placeholder="••••••••"
        />
      </div>

      {error && (
        <div role="alert" className="p-3 rounded-lg border border-rust/40 bg-rust/10 text-rust text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={busy}
        className="w-full h-11 rounded-full bg-amber text-navy text-sm font-semibold hover:scale-[1.02] transition-transform disabled:opacity-70 inline-flex items-center justify-center gap-2"
      >
        {busy ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="animate-spin">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
              <path d="M21 12 a9 9 0 0 0 -9 -9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Masuk…
          </>
        ) : (
          "Masuk"
        )}
      </button>
    </form>
  );
}
