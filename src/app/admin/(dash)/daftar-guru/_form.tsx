"use client";

import { useActionState, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { CoverImageInput } from "@/components/admin/CoverImageInput";
import { Select } from "@/components/admin/Select";
import Link from "next/link";
import type { ActionResult } from "./actions";

export type GuruFormDefaults = {
  id?: string;
  sort_order?: number;
  initials?: string;
  name?: string;
  role?: string;
  photo_url?: string | null;
  bg?: string;
  ink?: string;
  group_label?: string | null;
  status?: "draft" | "published";
};

type Props = {
  action: (prev: ActionResult, fd: FormData) => Promise<ActionResult>;
  defaults?: GuruFormDefaults;
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

export function DaftarGuruForm({ action, defaults }: Props) {
  const [state, formAction, isPending] = useActionState(action, { ok: true });
  const [name, setName] = useState(defaults?.name ?? "");
  const [imgUploading, setImgUploading] = useState(false);

  // Tampilkan error sebagai toast
  useEffect(() => {
    if (!state.ok && state.error) toast.error(state.error);
  }, [state]);

  return (
    <form action={formAction} className="w-full space-y-5">
      {/* Kiri: foto · Kanan: teks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Kolom kiri: foto */}
        <div className="lg:col-span-4">
          <Field label="Foto" hint="Opsional — jika kosong, inisial nama ditampilkan. Rasio potret 4:5.">
            <CoverImageInput
              name="photo_url"
              defaultValue={defaults?.photo_url ?? ""}
              uploadFolder="guru"
              previewHeight="h-80"
              label="Klik untuk pilih foto"
              onUploadingChange={setImgUploading}
            />
          </Field>
        </div>

        {/* Kolom kanan: teks */}
        <div className="lg:col-span-8 space-y-5">
          {/* Urutan + Status */}
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-3">
              <Field label="Urutan">
                <input
                  type="number"
                  name="sort_order"
                  defaultValue={defaults?.sort_order ?? 0}
                  disabled={isPending}
                  className={inputCls}
                  placeholder="0"
                />
              </Field>
            </div>
            <div className="col-span-4">
              <Field label="Status">
                <Select
                  name="status"
                  defaultValue={defaults?.status ?? "draft"}
                  options={[
                    { value: "draft",     label: "Draft" },
                    { value: "published", label: "Tayang" },
                  ]}
                />
              </Field>
            </div>
          </div>

          {/* Nama */}
          <Field label="Nama" required>
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isPending}
              className={inputCls}
              placeholder="Budi Santoso, S.Pd."
            />
          </Field>

          {/* Jabatan */}
          <Field label="Jabatan / Mata Pelajaran">
            <input
              name="role"
              defaultValue={defaults?.role ?? ""}
              disabled={isPending}
              className={inputCls}
              placeholder="Wali Kelas XII TKJ 1"
            />
          </Field>
        </div>
      </div>

      {/* Submit bar */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-black/5">
        {imgUploading && (
          <span className="text-[10px] text-amber flex items-center gap-1">
            <Loader2 size={11} className="animate-spin" /> Mengunggah foto…
          </span>
        )}
        <div className="ml-auto flex gap-3">
          <Link
            href="/admin/daftar-guru"
            className="h-11 px-5 rounded-full text-sm font-medium text-muted border border-black/10 hover:bg-paper-soft transition-colors inline-flex items-center"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={isPending || imgUploading}
            title={imgUploading ? "Menunggu upload foto selesai…" : undefined}
            className="h-11 px-6 rounded-full bg-amber text-navy text-sm font-semibold hover:scale-105 transition-transform disabled:opacity-60 inline-flex items-center gap-2"
          >
            {isPending && <Loader2 size={14} className="animate-spin" />}
            {defaults?.id ? "Simpan perubahan" : "Simpan guru"}
          </button>
        </div>
      </div>
    </form>
  );
}
