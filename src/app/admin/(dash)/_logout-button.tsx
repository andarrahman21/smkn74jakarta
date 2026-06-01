"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        const supabase = createClient();
        await supabase.auth.signOut();
        router.replace("/admin/login");
        router.refresh();
      }}
      className="inline-flex items-center gap-2 h-9 px-3 rounded-lg bg-white/5 hover:bg-rust/20 text-xs text-paper/80 hover:text-rust transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span className="text-rust/70">→</span>
      {busy ? "Keluar…" : "Keluar"}
    </button>
  );
}
