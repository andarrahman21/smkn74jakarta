"use client";

import { useActionState } from "react";
import Link from "next/link";
import { AlertCircle, Loader2 } from "lucide-react";
import { DatePicker } from "@/components/admin/DatePicker";
import { TimeRangePicker } from "@/components/admin/TimeRangePicker";
import { Select } from "@/components/admin/Select";
import { type ActionResult } from "./actions";

export type AgendaFormDefaults = {
  title?: string;
  scheduled_at?: string;   // ISO timestamp — split into date + time start
  time_range?: string | null; // "HH:MM – HH:MM" display string
  location?: string | null;
  category?: string | null;
};

type Props = {
  action: (prev: ActionResult, fd: FormData) => Promise<ActionResult>;
  categories: string[];
  defaults?: AgendaFormDefaults;
  submitLabel?: string;
};

const inputCls =
  "w-full h-11 px-4 rounded-xl border border-black/10 bg-white text-base focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition disabled:opacity-60";

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="block">
      <span className="block text-[10px] uppercase tracking-widest text-muted mb-1.5">
        {label} {required && <span className="text-rust">*</span>}
      </span>
      {children}
      {hint && <span className="block text-[11px] text-muted mt-1">{hint}</span>}
    </div>
  );
}

export function AgendaForm({ action, categories, defaults, submitLabel = "Simpan" }: Props) {
  const [state, formAction, isPending] = useActionState(action, { ok: true });

  // Split ISO timestamp into date (YYYY-MM-DD) and start time (HH:MM)
  const scheduledDate = defaults?.scheduled_at
    ? defaults.scheduled_at.slice(0, 10)
    : "";
  const scheduledTimeStart = defaults?.scheduled_at
    ? new Date(defaults.scheduled_at).toTimeString().slice(0, 5)
    : "";
  // Parse end time from "HH:MM – HH:MM" range string
  const scheduledTimeEnd = defaults?.time_range
    ? (defaults.time_range.split("–")[1] ?? "").trim()
    : "";

  return (
    <form action={formAction} className="w-full space-y-5">
      {!state.ok && state.error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-rust/8 border border-rust/20 text-rust text-sm">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      {/* Judul */}
      <Field label="Judul" required>
        <input
          name="title"
          defaultValue={defaults?.title ?? ""}
          required
          disabled={isPending}
          className={inputCls}
          placeholder="Contoh: Upacara Hari Kemerdekaan"
        />
      </Field>

      {/* Row: Tanggal + Waktu + Rentang + Lokasi */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        <div className="md:col-span-3">
          <Field label="Tanggal" required>
            <DatePicker
              name="scheduled_date"
              defaultValue={scheduledDate}
              required
              placeholder="Pilih tanggal…"
            />
          </Field>
        </div>
        <div className="md:col-span-3">
          <Field label="Waktu" hint="Opsional">
            <TimeRangePicker
              nameStart="scheduled_time"
              nameRange="time_range"
              defaultStart={scheduledTimeStart}
              defaultEnd={scheduledTimeEnd}
              defaultRange={defaults?.time_range ?? ""}
              placeholder="Pilih waktu…"
            />
          </Field>
        </div>
        <div className="md:col-span-3">
          <Field label="Lokasi">
            <input
              name="location"
              defaultValue={defaults?.location ?? ""}
              disabled={isPending}
              className={inputCls}
              placeholder="Contoh: Aula Sekolah"
            />
          </Field>
        </div>
        <div className="md:col-span-3">
          <Field label="Kategori">
            <Select
              name="category"
              options={categories}
              defaultValue={defaults?.category ?? ""}
              placeholder="— Pilih kategori —"
            />
          </Field>
        </div>
      </div>

      {/* Submit bar */}
      <div className="flex items-center gap-3 pt-4 border-t border-black/5">
        <div className="ml-auto flex gap-3">
          <Link
            href="/admin/agenda"
            className="h-11 px-5 rounded-full text-sm font-medium text-muted border border-black/10 hover:bg-paper-soft transition-colors inline-flex items-center"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="h-11 px-8 rounded-full bg-amber text-navy text-sm font-semibold hover:scale-105 transition-transform disabled:opacity-60 inline-flex items-center gap-2"
          >
            {isPending && <Loader2 size={14} className="animate-spin" />}
            {submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
