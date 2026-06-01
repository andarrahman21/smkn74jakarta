"use client";

import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { ChevronUp, ChevronDown, Clock } from "lucide-react";

type Props = {
  name: string;
  /** Initial time as "HH:MM" */
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function parseTime(s: string | undefined): { h: number; m: number } {
  if (!s) return { h: 8, m: 0 };
  const [h, m] = s.split(":").map(Number);
  return { h: isNaN(h) ? 8 : h, m: isNaN(m) ? 0 : m };
}

export function TimePicker({
  name,
  defaultValue,
  placeholder = "Pilih waktu…",
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);

  const init = parseTime(defaultValue);
  const [hour, setHour] = useState(init.h);
  const [minute, setMinute] = useState(init.m);
  const [value, setValue] = useState(defaultValue ?? "");

  function confirm() {
    const v = `${pad(hour)}:${pad(minute)}`;
    setValue(v);
    setOpen(false);
    onChange?.(v);
  }

  function clear() {
    setValue("");
    setOpen(false);
    onChange?.("");
  }

  const spinnerBtn =
    "h-7 w-7 rounded-lg hover:bg-paper-soft text-muted hover:text-navy transition-colors flex items-center justify-center";

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="w-full h-11 px-4 rounded-xl border border-black/10 bg-white text-base text-left flex items-center justify-between gap-2 focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition data-[state=open]:border-amber data-[state=open]:ring-2 data-[state=open]:ring-amber/20"
        >
          <span className={value ? "text-ink" : "text-muted/70"}>
            {value ? `${value} WIB` : placeholder}
          </span>
          <Clock size={15} className="text-muted shrink-0" />
        </button>
      </Popover.Trigger>

      <input type="hidden" name={name} value={value} />

      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={6}
          className="z-[1000] bg-white border border-black/10 rounded-2xl shadow-2xl shadow-black/15 p-4 outline-none animate-fade-in w-48"
        >
          <p className="text-[10px] uppercase tracking-widest text-muted mb-3 text-center">
            Waktu mulai
          </p>

          {/* Spinner */}
          <div className="flex items-center justify-center gap-2">
            {/* Hours */}
            <div className="flex flex-col items-center gap-0.5">
              <button
                type="button"
                onClick={() => setHour((h) => (h + 1) % 24)}
                className={spinnerBtn}
              >
                <ChevronUp size={14} />
              </button>
              <div className="h-11 w-[3.25rem] rounded-xl bg-paper-soft flex items-center justify-center font-display text-2xl font-medium text-ink select-none">
                {pad(hour)}
              </div>
              <button
                type="button"
                onClick={() => setHour((h) => (h - 1 + 24) % 24)}
                className={spinnerBtn}
              >
                <ChevronDown size={14} />
              </button>
            </div>

            <span className="font-display text-2xl text-muted leading-none pb-0.5 select-none">
              :
            </span>

            {/* Minutes — steps of 5 */}
            <div className="flex flex-col items-center gap-0.5">
              <button
                type="button"
                onClick={() => setMinute((m) => (m + 5) % 60)}
                className={spinnerBtn}
              >
                <ChevronUp size={14} />
              </button>
              <div className="h-11 w-[3.25rem] rounded-xl bg-paper-soft flex items-center justify-center font-display text-2xl font-medium text-ink select-none">
                {pad(minute)}
              </div>
              <button
                type="button"
                onClick={() => setMinute((m) => (m - 5 + 60) % 60)}
                className={spinnerBtn}
              >
                <ChevronDown size={14} />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-3 pt-3 border-t border-black/5 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={clear}
              className="px-2 h-7 rounded text-muted hover:text-rust transition-colors"
            >
              Hapus
            </button>
            <button
              type="button"
              onClick={confirm}
              className="px-3 h-7 rounded-full bg-amber text-navy font-semibold hover:scale-105 transition-transform"
            >
              Pilih
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
