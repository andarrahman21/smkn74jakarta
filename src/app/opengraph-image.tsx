import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SMKN 74 Jakarta — Menemukan jalanmu dalam komunitas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0f1d3a",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          fontFamily: "serif",
          color: "#f6f4ef",
          position: "relative",
        }}
      >
        {/* Audio-wave bars */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            padding: "0 40px",
            opacity: 0.25,
          }}
        >
          {[280, 320, 240, 360, 220, 320, 280, 300, 260, 320, 240, 300, 280, 340, 240, 300].map((h, i) => (
            <div
              key={i}
              style={{
                width: 36,
                height: h,
                background: "#f0b54a",
                borderRadius: 999,
                opacity: 0.55,
              }}
            />
          ))}
        </div>

        {/* Logo + eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, zIndex: 1 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 999,
              background: "#f0b54a",
              color: "#0c1424",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            74
          </div>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
            <span style={{ fontSize: 16, letterSpacing: 4, color: "#f0b54a", textTransform: "uppercase" }}>SMK</span>
            <span style={{ fontSize: 28, fontWeight: 600 }}>Negeri 74 Jakarta</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", zIndex: 1, gap: 16 }}>
          <span style={{ fontSize: 18, letterSpacing: 4, textTransform: "uppercase", color: "#f0b54a" }}>
            Sekolah seni Jakarta
          </span>
          <span style={{ fontSize: 84, lineHeight: 1.02, fontWeight: 300, maxWidth: 980, display: "flex", flexWrap: "wrap" }}>
            <span>Menemukan jalanmu&nbsp;</span>
            <span style={{ color: "#f0b54a", fontStyle: "italic" }}>dalam komunitas&nbsp;</span>
            <span>yang menghargai siapa dirimu.</span>
          </span>
        </div>

        {/* Footer line */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 1, fontSize: 18, color: "rgba(246,244,239,0.7)" }}>
          <span>smkn74.sch.id</span>
          <span>Tari · Musik · Karawitan · Teater</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
