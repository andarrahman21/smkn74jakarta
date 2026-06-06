"use client";

import { useRef, useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";

// Worker pdf.js dari CDN sesuai versi terpasang (hindari masalah bundler).
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function Flipbook({ url }: { url: string }) {
  const bookRef = useRef<{ pageFlip: () => { flipNext: () => void; flipPrev: () => void } } | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Ukuran halaman dibatasi tinggi DAN lebar viewport (spread = 2 halaman),
  // rasio A4 ~ 1:1.414, agar tidak terpotong saat fullscreen.
  const [dim, setDim] = useState({ w: 420, h: 594 });
  useEffect(() => {
    const calc = () => {
      const maxH = window.innerHeight * 0.82;       // sisakan ruang untuk header & kontrol
      const maxW = (window.innerWidth * 0.94) / 2;  // 2 halaman berdampingan
      const w = Math.round(Math.min(maxH / 1.414, maxW));
      const h = Math.round(w * 1.414);
      setDim({ w, h });
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <Document
        file={url}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        onLoadError={(e) => setError(e.message)}
        loading={
          <div className="grid place-items-center text-paper/70 gap-2 py-20">
            <Loader2 className="animate-spin" /> Memuat modul…
          </div>
        }
        error={<p className="text-paper/70 py-20">Gagal memuat PDF.</p>}
      >
        {numPages > 0 && (
          // @ts-expect-error — props react-pageflip longgar
          <HTMLFlipBook
            ref={bookRef}
            width={dim.w}
            height={dim.h}
            size="fixed"
            showCover
            usePortrait={false}
            maxShadowOpacity={0.4}
            onFlip={(e: { data: number }) => setPage(e.data)}
            className="shadow-2xl shadow-black/50"
          >
            {Array.from({ length: numPages }, (_, i) => (
              <div key={i} className="bg-white overflow-hidden">
                <Page
                  pageNumber={i + 1}
                  width={dim.w}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  loading={<div style={{ width: dim.w, height: dim.h }} className="bg-white grid place-items-center"><Loader2 className="animate-spin text-muted" /></div>}
                />
              </div>
            ))}
          </HTMLFlipBook>
        )}
      </Document>

      {error && <p className="text-paper/70 text-sm">{error}</p>}

      {numPages > 0 && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => bookRef.current?.pageFlip().flipPrev()}
            className="h-10 w-10 rounded-full bg-white/10 text-paper grid place-items-center hover:bg-white/20 transition-colors"
            aria-label="Halaman sebelumnya"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-xs text-paper/70 uppercase tracking-widest tabular-nums">
            {page === 0
              ? `Sampul · ${numPages} hal.`
              : `Hal. ${page + 1}${page + 1 < numPages ? `–${Math.min(page + 2, numPages)}` : ""} / ${numPages}`}
          </span>
          <button
            type="button"
            onClick={() => bookRef.current?.pageFlip().flipNext()}
            className="h-10 w-10 rounded-full bg-white/10 text-paper grid place-items-center hover:bg-white/20 transition-colors"
            aria-label="Halaman berikutnya"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
