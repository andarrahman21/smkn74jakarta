"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import type { ActionResult } from "../actions";

type Props = {
  action: (prev: ActionResult, fd: FormData) => Promise<ActionResult>;
};

export function CategoryForm({ action }: Props) {
  const [state, formAction, isPending] = useActionState(action, { ok: true });

  return (
    <form action={formAction} className="flex items-end gap-3">
      <div className="flex-1">
        <label className="block text-[10px] uppercase tracking-widest text-muted mb-1.5">
          Nama kategori baru
        </label>
        <input
          name="name"
          required
          disabled={isPending}
          placeholder="Contoh: Olimpiade"
          className="w-full h-11 px-4 rounded-xl border border-black/10 bg-white text-base focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition disabled:opacity-60"
        />
        {!state.ok && state.error && (
          <p className="mt-1 text-xs text-rust">{state.error}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="h-11 px-5 rounded-full bg-amber text-navy text-sm font-semibold hover:scale-105 transition-transform disabled:opacity-60 inline-flex items-center gap-2 shrink-0"
      >
        {isPending && <Loader2 size={14} className="animate-spin" />}
        + Tambah
      </button>
    </form>
  );
}
