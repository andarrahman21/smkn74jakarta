"use client";

import { useState, useTransition } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { AlertTriangle, Loader2 } from "lucide-react";

type Props = {
  action: (fd: FormData) => Promise<void> | void;
  id: string;
  title?: string;
  description?: string;
  confirmLabel?: string;
  triggerLabel?: string;
  triggerClassName?: string;
};

export function DeleteButton({
  action,
  id,
  title = "Hapus item ini?",
  description = "Tindakan ini tidak bisa dibatalkan.",
  confirmLabel = "Ya, hapus",
  triggerLabel = "Hapus",
  triggerClassName = "h-9 px-4 rounded-full border border-rust/30 text-rust text-xs font-medium hover:bg-rust hover:text-paper transition-colors",
}: Props) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const onConfirm = () => {
    startTransition(async () => {
      const fd = new FormData();
      fd.append("id", id);
      await action(fd);
      setOpen(false);
    });
  };

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>
        <button type="button" className={triggerClassName}>
          {triggerLabel}
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-md rounded-2xl bg-white p-6 shadow-xl border border-black/10 data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95">
          <div className="flex gap-3">
            <div className="h-10 w-10 rounded-full bg-rust/10 text-rust grid place-items-center shrink-0">
              <AlertTriangle size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <AlertDialog.Title className="font-display text-lg leading-snug text-ink">
                {title}
              </AlertDialog.Title>
              <AlertDialog.Description className="mt-1.5 text-sm text-ink/65 leading-relaxed">
                {description}
              </AlertDialog.Description>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <AlertDialog.Cancel asChild>
              <button
                type="button"
                disabled={pending}
                className="h-10 px-4 rounded-full text-sm font-medium text-muted hover:bg-paper-soft hover:text-ink transition-colors disabled:opacity-50"
              >
                Batal
              </button>
            </AlertDialog.Cancel>
            <button
              type="button"
              onClick={onConfirm}
              disabled={pending}
              className="h-10 px-5 rounded-full bg-rust text-paper text-sm font-medium hover:bg-rust/90 transition-colors inline-flex items-center gap-2 disabled:opacity-60"
            >
              {pending && <Loader2 size={14} className="animate-spin" />}
              {confirmLabel}
            </button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
