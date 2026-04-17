"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
// Jika CarColor di lib/data tidak cocok dengan struktur Sanity,
// Anda bisa mengganti tipe ini menjadi 'any' sementara di prop jika ada error TS.
import type { CarColor } from "@/lib/data";

interface ColorGalleryProps {
  colors: any[]; // Diubah ke any[] sementara agar fleksibel menerima data dari Sanity
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

  // Fallback aman jika colors kosong
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

  /* ── Fungsi yang sudah diamankan dari error 'replace is not a function' ── */
  const isLightColor = (hex: string): boolean => {
    // Pengamanan: Jika hex bukan string atau kosong, kembalikan false
    if (!hex || typeof hex !== "string") return false;

    const h = hex.replace("#", "");
    if (h.length < 6) return true;
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return r * 0.299 + g * 0.587 + b * 0.114 > 186;
  };

  return (
    <div className="flex flex-col gap-5">
      {/* ── Main image ── */}
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100">
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
        {/* Loading shimmer */}
        {imgLoading && (
          <div className="absolute inset-0 animate-pulse bg-zinc-200 rounded-2xl" />
        )}
        <div className="absolute bottom-0 left-0 right-0 px-5 py-3.5 bg-gradient-to-t from-black/55 to-transparent rounded-b-2xl">
          <p className="text-[12px] font-bold text-white/90 tracking-wide">
            {selected?.name || "Unknown Color"}
          </p>
        </div>
      </div>

      {/* ── Thumbnail strip ── */}
      <div className="flex gap-2.5 overflow-x-auto pb-1">
        {colors.map((color, idx) => {
          const isSelected = idx === selectedIdx;

          // EKSTRAKSI AMAN: Ambil hex dari dalam objek Sanity
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
              className={`w-5 h-5 rounded-full flex-shrink-0 transition-all duration-200 ${
                isSelected
                  ? "ring-2 ring-cyan-500 ring-offset-2 scale-110 ring-offset-[#09090b]" // ring-offset disesuaikan untuk dark mode
                  : "hover:scale-110 hover:ring-1 hover:ring-zinc-400 hover:ring-offset-1 hover:ring-offset-[#09090b]"
              }`}
              style={{
                background: hexValue,
                border: needsBorder
                  ? "1.5px solid #52525b" // Border agak gelap agar terlihat di dark mode
                  : "1.5px solid rgba(255,255,255,0.1)",
              }}
            />
          );
        })}
      </div>

      {/* ── Color swatch dots row ── */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
          Pilihan Warna:
        </span>
        <div className="flex gap-2">
          {colors.map((color, idx) => {
            const isSelected = idx === selectedIdx;

            // EKSTRAKSI HEX AMAN: Cek dari struktur Sanity colorSwatch, lalu fallback ke hex biasa, lalu abu-abu
            const hexValue = color?.colorSwatch?.hex || color?.hex || "#CCCCCC";
            const needsBorder = isLightColor(hexValue);

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                title={color.name}
                aria-label={`Select color: ${color.name}`}
                className={`w-5 h-5 rounded-full flex-shrink-0 transition-all duration-200 ${
                  isSelected
                    ? "ring-2 ring-cyan-500 ring-offset-2 scale-110"
                    : "hover:scale-110 hover:ring-1 hover:ring-zinc-400 hover:ring-offset-1"
                }`}
                style={{
                  background: hexValue,
                  border: needsBorder
                    ? "1.5px solid #d1d5db"
                    : "1.5px solid rgba(0,0,0,0.08)",
                }}
              />
            );
          })}
        </div>
        <span className="text-[12px] text-zinc-500 font-medium ml-1">
          {selected?.name}
        </span>
      </div>
    </div>
  );
}
