"use client";

import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { DayPicker } from "react-day-picker";
import { id as idLocale } from "date-fns/locale";
import "react-day-picker/style.css";

type Props = {
  name: string;
  /** Initial date as YYYY-MM-DD */
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
  /** Called with YYYY-MM-DD string when date changes */
  onChange?: (value: string) => void;
};

function toISO(d: Date | undefined): string {
  if (!d) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function fromISO(s: string | undefined): Date | undefined {
  if (!s) return undefined;
  const [y, m, d] = s.split("-").map(Number);
  if (!y || !m || !d) return undefined;
  return new Date(y, m - 1, d);
}

function formatHuman(d: Date | undefined): string {
  if (!d) return "";
  return new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "long", year: "numeric" }).format(d);
}

export function DatePicker({ name, defaultValue, required, placeholder = "Pilih tanggal…", onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(fromISO(defaultValue));
  const [month, setMonth] = useState<Date>(date ?? new Date());

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="w-full h-11 px-4 rounded-xl border border-black/10 bg-white text-base text-left flex items-center justify-between gap-2 focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition data-[state=open]:border-amber data-[state=open]:ring-2 data-[state=open]:ring-amber/20"
        >
          <span className={date ? "text-ink" : "text-muted/70"}>
            {date ? formatHuman(date) : placeholder}
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-muted shrink-0">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </button>
      </Popover.Trigger>

      <input type="hidden" name={name} value={toISO(date)} required={required} />

      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={6}
          className="z-[1000] bg-white border border-black/10 rounded-2xl shadow-2xl shadow-black/15 p-3 outline-none animate-fade-in"
        >
          <DayPicker
            mode="single"
            locale={idLocale}
            selected={date}
            month={month}
            onMonthChange={setMonth}
            onSelect={(d) => {
              setDate(d);
              if (d) {
                setOpen(false);
                onChange?.(toISO(d));
              }
            }}
            weekStartsOn={1}
            showOutsideDays
            className="admin-rdp"
          />
          <div className="mt-2 pt-2 border-t border-black/5 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => {
                setDate(undefined);
              }}
              className="px-2 h-7 rounded text-muted hover:text-rust transition-colors"
            >
              Hapus
            </button>
            <button
              type="button"
              onClick={() => {
                const t = new Date();
                setDate(t);
                setMonth(t);
                setOpen(false);
              }}
              className="px-2 h-7 rounded text-navy hover:text-amber transition-colors font-medium"
            >
              Hari ini
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
