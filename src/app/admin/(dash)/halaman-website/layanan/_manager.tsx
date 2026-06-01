"use client";

import { useState } from "react";
import { Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import type { LayananGroup } from "@/lib/site-content/layanan";
import { updateSiteContentKey } from "../actions";

export function LayananLinksManager({
  groups,
  values,
}: {
  groups: LayananGroup[];
  values: Record<string, string>;
}) {
  return (
    <div className="space-y-8">
      {groups.map((g) => (
        <div key={g.label}>
          <h2 className="font-display text-lg mb-3">{g.label}</h2>
          <div className="bg-white border border-black/5 rounded-2xl divide-y divide-black/5 overflow-hidden">
            {g.items.map((it) => (
              <LinkRow key={it.key} k={it.key} label={it.label} initial={values[it.key] ?? ""} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function LinkRow({ k, label, initial }: { k: string; label: string; initial: string }) {
  const [url, setUrl] = useState(initial);
  const [baseline, setBaseline] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const dirty = url !== baseline;

  const save = async () => {
    setSaving(true);
    const res = await updateSiteContentKey(k, url);
    setSaving(false);
    if (res.ok) {
      setBaseline(url);
      setSaved(true);
      toast.success("Link disimpan.");
      setTimeout(() => setSaved(false), 1500);
    } else {
      toast.error(res.error ?? "Gagal menyimpan.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 p-4">
      <div className="md:w-2/5 min-w-0">
        <p className="text-sm font-medium text-ink truncate">{label}</p>
      </div>
      <div className="flex-1 flex items-center gap-2">
        <input
          type="url"
          value={url}
          onChange={(e) => { setUrl(e.target.value); setSaved(false); }}
          placeholder="https://… (link Google Form / halaman tujuan)"
          className="w-full h-10 px-3 rounded-xl border border-black/10 bg-white text-sm focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition"
        />
        <button
          type="button"
          onClick={save}
          disabled={saving || !dirty}
          className="shrink-0 h-10 px-4 rounded-full bg-amber text-navy text-xs font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 inline-flex items-center gap-1.5"
        >
          {saving ? <Loader2 size={13} className="animate-spin" /> : saved ? <Check size={13} /> : null}
          Simpan
        </button>
      </div>
    </div>
  );
}
