"use client";

import { useState } from "react";

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const url = typeof window !== "undefined" ? window.location.href : "";
  const text = encodeURIComponent(`${title} — SMKN 74 Jakarta`);
  const enc = encodeURIComponent(url);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // fallback ignored
    }
  };

  const item = "h-10 w-10 rounded-full border border-black/10 grid place-items-center text-ink/70 hover:bg-amber hover:text-navy hover:border-amber transition-colors";

  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] uppercase tracking-widest text-muted mr-1">Bagikan</span>
      <a
        href={`https://wa.me/?text=${text}%20${enc}`}
        target="_blank" rel="noopener noreferrer"
        aria-label="Bagikan ke WhatsApp"
        className={item}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4A11 11 0 0 0 2.6 17l-1.6 5.8 5.9-1.6A11 11 0 1 0 20 4zM12 20a8 8 0 0 1-4.1-1.1l-.3-.2-3.5 1 .9-3.4-.2-.3A8 8 0 1 1 20 12a8 8 0 0 1-8 8zm4.5-5.6l-1.6-.7c-.2-.1-.4-.1-.6.2l-.8.9c-.2.2-.3.2-.5.1-1.6-.6-3-2-3.5-3.2-.1-.2 0-.4.1-.6l.7-.8c.2-.2.2-.4.1-.6L9.6 8c-.1-.2-.3-.3-.5-.3-.4 0-.8 0-1.1.2-.3.2-1.2 1.1-1.2 2.7s1.2 3.1 1.4 3.4c.1.2 2.5 4 6.2 5.4 3.1 1.2 3.7.8 4.3.7s2-.8 2.3-1.6c.2-.7.2-1.4.2-1.6-.1-.2-.4-.3-.7-.4z"/></svg>
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${text}&url=${enc}`}
        target="_blank" rel="noopener noreferrer"
        aria-label="Bagikan ke X / Twitter"
        className={item}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${enc}`}
        target="_blank" rel="noopener noreferrer"
        aria-label="Bagikan ke Facebook"
        className={item}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-8H16l.5-3.5h-3v-2c0-1 .3-1.7 1.7-1.7h1.4V2.7a25 25 0 0 0-2.4-.1c-2.4 0-4 1.5-4 4.1V9.5H7.5V13h2.7v8h3.3z"/></svg>
      </a>
      <button
        onClick={onCopy}
        aria-label={copied ? "Tautan tersalin" : "Salin tautan"}
        className={`${item} relative`}
      >
        {copied ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12 L10 17 L20 7" /></svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15V5a2 2 0 0 1 2-2h10" />
          </svg>
        )}
      </button>
      {copied && (
        <span className="text-xs text-amber font-medium animate-fade-in">Tersalin!</span>
      )}
    </div>
  );
}
