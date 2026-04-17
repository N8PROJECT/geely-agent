"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

interface ColorGalleryProps {
  colors: any[];
  carName: string;
  onColorChange?: (color: any) => void;
}

export default function ColorGallery({
  colors,
  carName,
  onColorChange,
}: ColorGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [imgLoading, setImgLoading] = useState(false);

  if (!colors || colors.length === 0) return null;

  const selected = colors[selectedIdx];

  const handleSelect = useCallback(
    (idx: number) => {
      if (idx === selectedIdx) return;
      setImgLoading(true);
      setSelectedIdx(idx);
      onColorChange?.(colors[idx]);
    },
    [selectedIdx, colors, onColorChange],
  );

  const isLightColor = (hex: string): boolean => {
    if (!hex || typeof hex !== "string") return false;
    const h = hex.replace("#", "");
    if (h.length < 6) return true;
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return r * 0.299 + g * 0.587 + b * 0.114 > 186;
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {" "}
      {/* Menambahkan padding dalam panel */}
      {/* ── Main image ── */}
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100 shadow-inner">
        {selected?.imageUrl && (
          <Image
            key={selected.imageUrl}
            src={selected.imageUrl}
            alt={`${carName} — ${selected.name}`}
            fill
            priority
            className={`object-cover transition-opacity duration-400 ${
              imgLoading ? "opacity-0" : "opacity-100"
            }`}
            sizes="(max-width: 768px) 100vw, 55vw"
            onLoad={() => setImgLoading(false)}
          />
        )}
        {imgLoading && (
          <div className="absolute inset-0 animate-pulse bg-zinc-200" />
        )}
      </div>
      {/* ── Color swatch dots row ── */}
      {/* MENGUBAH GAP MENJADI gap-6 AGAR LEBIH LEGA */}
      <div className="flex flex-wrap items-center gap-6 pb-2">
        <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
          PILIHAN WARNA:
        </span>
        <div className="flex gap-3">
          {" "}
          {/* Jarak antar titik diperbesar sedikit */}
          {colors.map((color, idx) => {
            const isSelected = idx === selectedIdx;

            // EKSTRAKSI AMAN
            const rawHex =
              color?.colorSwatch?.hex || color?.hex?.hex || color?.hex;
            const hexValue = typeof rawHex === "string" ? rawHex : "#CCCCCC";
            const needsBorder = isLightColor(hexValue);

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                title={color?.name}
                aria-label={`Select color: ${color?.name}`}
                className={`w-6 h-6 rounded-full flex-shrink-0 transition-all duration-300 ${
                  isSelected
                    ? "ring-2 ring-cyan-500 ring-offset-2 scale-125 ring-offset-[#121214]"
                    : "hover:scale-110 hover:ring-1 hover:ring-zinc-500 hover:ring-offset-1 hover:ring-offset-[#121214]"
                }`}
                style={{
                  background: hexValue,
                  border: needsBorder
                    ? "1.5px solid #52525b"
                    : "1.5px solid rgba(255,255,255,0.05)",
                }}
              />
            );
          })}
        </div>
        {/* Menampilkan nama warna yang aktif */}
        <span className="text-[12px] text-zinc-300 font-medium ml-auto">
          {selected?.name}
        </span>
      </div>
    </div>
  );
}
