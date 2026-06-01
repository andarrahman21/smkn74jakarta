"use client";

import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { ChevronUp, ChevronDown, Clock } from "lucide-react";

const ALL_DAY = "Sepanjang hari";

type Props = {
  /** Hidden field name for start time "HH:MM" — used to build scheduled_at */
  nameStart: string;
  /** Hidden field name for display range string "HH:MM – HH:MM" */
  nameRange: string;
  /** "HH:MM" */
  defaultStart?: string;
  /** "HH:MM" */
  defaultEnd?: string;
  /** full stored range string — used to detect "Sepanjang hari" */
  defaultRange?: string;
  placeholder?: string;
  onChange?: (start: string, end: string) => void;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function parseTime(s: string | undefined, fallbackH: number): { h: number; m: number } {
  if (!s) return { h: fallbackH, m: 0 };
  const [h, m] = s.split(":").map(Number);
  return { h: isNaN(h) ? fallbackH : h, m: isNaN(m) ? 0 : m };
}

function Spinner({
  label,
  hour,
  minute,
  onHour,
  onMinute,
}: {
  label: string;
  hour: number;
  minute: number;
  onHour: (h: number) => void;
  onMinute: (m: number) => void;
}) {
  const btn =
    "h-7 w-7 rounded-lg hover:bg-paper-soft text-muted hover:text-navy transition-colors flex items-center justify-center";
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-[10px] uppercase tracking-widest text-muted">{label}</p>
      <div className="flex items-center gap-1.5">
        {/* Hours */}
        <div className="flex flex-col items-center gap-0.5">
          <button type="button" onClick={() => onHour((hour + 1) % 24)} className={btn}>
            <ChevronUp size={13} />
          </button>
          <div className="h-10 w-12 rounded-xl bg-paper-soft flex items-center justify-center font-display text-xl font-medium text-ink select-none">
            {pad(hour)}
          </div>
          <button type="button" onClick={() => onHour((hour - 1 + 24) % 24)} className={btn}>
            <ChevronDown size={13} />
          </button>
        </div>
        <span className="font-display text-xl text-muted leading-none select-none pb-0.5">:</span>
        {/* Minutes */}
        <div className="flex flex-col items-center gap-0.5">
          <button type="button" onClick={() => onMinute((minute + 5) % 60)} className={btn}>
            <ChevronUp size={13} />
          </button>
          <div className="h-10 w-12 rounded-xl bg-paper-soft flex items-center justify-center font-display text-xl font-medium text-ink select-none">
            {pad(minute)}
          </div>
          <button type="button" onClick={() => onMinute((minute - 5 + 60) % 60)} className={btn}>
            <ChevronDown size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function TimeRangePicker({
  nameStart,
  nameRange,
  defaultStart,
  defaultEnd,
  defaultRange,
  placeholder = "Pilih waktu…",
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);

  const initStart = parseTime(defaultStart, 8);
  const initEnd = parseTime(defaultEnd, 16);

  const [startH, setStartH] = useState(initStart.h);
  const [startM, setStartM] = useState(initStart.m);
  const [endH, setEndH] = useState(initEnd.h);
  const [endM, setEndM] = useState(initEnd.m);
  const [allDay, setAllDay] = useState(defaultRange === ALL_DAY);

  const [startVal, setStartVal] = useState(defaultStart ?? "");
  const [rangeVal, setRangeVal] = useState(() => {
    if (defaultRange === ALL_DAY) return ALL_DAY;
    if (defaultStart && defaultEnd)
      return `${defaultStart} – ${defaultEnd}`;
    return "";
  });

  function confirm() {
    if (allDay) {
      setStartVal("");
      setRangeVal(ALL_DAY);
      setOpen(false);
      onChange?.("", "");
      return;
    }
    const s = `${pad(startH)}:${pad(startM)}`;
    const e = `${pad(endH)}:${pad(endM)}`;
    const range = `${s} – ${e}`;
    setStartVal(s);
    setRangeVal(range);
    setOpen(false);
    onChange?.(s, e);
  }

  function clear() {
    setAllDay(false);
    setStartVal("");
    setRangeVal("");
    setOpen(false);
    onChange?.("", "");
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="w-full h-11 px-4 rounded-xl border border-black/10 bg-white text-base text-left flex items-center justify-between gap-2 focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition data-[state=open]:border-amber data-[state=open]:ring-2 data-[state=open]:ring-amber/20"
        >
          <span className={rangeVal ? "text-ink" : "text-muted/70"}>
            {rangeVal ? (rangeVal === ALL_DAY ? ALL_DAY : `${rangeVal} WIB`) : placeholder}
          </span>
          <Clock size={15} className="text-muted shrink-0" />
        </button>
      </Popover.Trigger>

      <input type="hidden" name={nameStart} value={startVal} />
      <input type="hidden" name={nameRange} value={rangeVal} />

      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={6}
          className="z-[1000] bg-white border border-black/10 rounded-2xl shadow-2xl shadow-black/15 p-5 outline-none animate-fade-in"
        >
          {/* Sepanjang hari toggle */}
          <label className="flex items-center gap-2 mb-4 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={allDay}
              onChange={(e) => {
                const on = e.target.checked;
                setAllDay(on);
                if (on) {
                  // live update trigger title
                  setStartVal("");
                  setRangeVal(ALL_DAY);
                  onChange?.("", "");
                } else {
                  const s = `${pad(startH)}:${pad(startM)}`;
                  const en = `${pad(endH)}:${pad(endM)}`;
                  setStartVal(s);
                  setRangeVal(`${s} – ${en}`);
                  onChange?.(s, en);
                }
              }}
              className="h-4 w-4 rounded accent-amber cursor-pointer"
            />
            <span className="text-sm text-ink">Sepanjang hari</span>
          </label>

          <div className={`flex items-start gap-5 transition-opacity ${allDay ? "opacity-40 pointer-events-none" : ""}`}>
            <Spinner
              label="Mulai"
              hour={startH}
              minute={startM}
              onHour={setStartH}
              onMinute={setStartM}
            />
            <div className="mt-9 text-muted font-display text-lg select-none">–</div>
            <Spinner
              label="Selesai"
              hour={endH}
              minute={endM}
              onHour={setEndH}
              onMinute={setEndM}
            />
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-xs">
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
