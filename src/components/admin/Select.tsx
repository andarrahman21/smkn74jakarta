"use client";

import { useState } from "react";
import * as RSelect from "@radix-ui/react-select";

type Option = string | { value: string; label: string };

type Props = {
  name: string;
  options: Option[];
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  onValueChange?: (value: string) => void;
};

function norm(o: Option): { value: string; label: string } {
  return typeof o === "string" ? { value: o, label: o } : o;
}

export function Select({ name, options, defaultValue = "", placeholder = "Pilih…", required, onValueChange }: Props) {
  const [value, setValue] = useState<string>(defaultValue);
  const handleChange = (v: string) => {
    setValue(v);
    onValueChange?.(v);
  };

  return (
    <>
      <input type="hidden" name={name} value={value} required={required} />
      <RSelect.Root value={value} onValueChange={handleChange}>
        <RSelect.Trigger
          className="w-full h-11 px-4 rounded-xl border border-black/10 bg-white text-base text-left flex items-center justify-between gap-2 focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition data-[state=open]:border-amber data-[state=open]:ring-2 data-[state=open]:ring-amber/20"
          aria-label={name}
        >
          <RSelect.Value placeholder={<span className="text-muted/70">{placeholder}</span>} />
          <RSelect.Icon className="text-muted shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </RSelect.Icon>
        </RSelect.Trigger>

        <RSelect.Portal>
          <RSelect.Content
            position="popper"
            sideOffset={6}
            className="z-[1000] min-w-[var(--radix-select-trigger-width)] bg-white border border-black/10 rounded-xl shadow-2xl shadow-black/15 overflow-hidden animate-fade-in"
          >
            <RSelect.ScrollUpButton className="h-6 grid place-items-center text-muted hover:bg-paper-soft">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15" /></svg>
            </RSelect.ScrollUpButton>
            <RSelect.Viewport className="p-1">
              {options.map((o) => {
                const opt = norm(o);
                return (
                  <RSelect.Item
                    key={opt.value}
                    value={opt.value}
                    className="relative pl-8 pr-3 h-9 flex items-center text-sm rounded-md text-ink/80 cursor-pointer data-[highlighted]:bg-paper-soft data-[highlighted]:text-navy data-[state=checked]:font-medium data-[state=checked]:text-navy outline-none transition-colors"
                  >
                    <RSelect.ItemIndicator className="absolute left-2 top-1/2 -translate-y-1/2 text-amber">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </RSelect.ItemIndicator>
                    <RSelect.ItemText>{opt.label}</RSelect.ItemText>
                  </RSelect.Item>
                );
              })}
            </RSelect.Viewport>
            <RSelect.ScrollDownButton className="h-6 grid place-items-center text-muted hover:bg-paper-soft">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
            </RSelect.ScrollDownButton>
          </RSelect.Content>
        </RSelect.Portal>
      </RSelect.Root>
    </>
  );
}
