"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import type { CarColor } from "@/lib/data";

interface ColorGalleryProps {
  colors: CarColor[];
  carName: string;
  /** Called whenever the selected color changes — lets the parent page
   *  build a WhatsApp message that includes the chosen color name.  */
  onColorChange?: (color: CarColor) => void;
}

export default function ColorGallery({
  colors,
  carName,
  onColorChange,
}: ColorGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [imgLoading, setImgLoading] = useState(false);

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

  /* ── Determine whether a swatch hex is too light and needs a dark border ── */
  const isLightColor = (hex: string): boolean => {
    const h = hex.replace("#", "");
    if (h.length < 6) return true;
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    // Relative luminance approximation
    return r * 0.299 + g * 0.587 + b * 0.114 > 186;
  };

  return (
    <div className="flex flex-col gap-5">
      {/* ── Main image ── */}
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100">
        <Image
          key={selected.imageUrl} /* forces re-mount on src change */
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

        {/* Loading shimmer */}
        {imgLoading && (
          <div className="absolute inset-0 animate-pulse bg-zinc-200 rounded-2xl" />
        )}

        {/* Color name tag — bottom-left overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-5 py-3.5 bg-gradient-to-t from-black/55 to-transparent rounded-b-2xl">
          <p className="text-[12px] font-bold text-white/90 tracking-wide">
            {selected.name}
          </p>
        </div>
      </div>

      {/* ── Thumbnail strip ── */}
      <div className="flex gap-2.5 overflow-x-auto pb-1">
        {colors.map((color, idx) => {
          const isSelected = idx === selectedIdx;
          return (
            <button
              key={color.name}
              onClick={() => handleSelect(idx)}
              aria-label={`Select color: ${color.name}`}
              className={`relative flex-shrink-0 w-16 h-11 rounded-lg overflow-hidden transition-all duration-200 ${
                isSelected
                  ? "ring-2 ring-cyan-500 ring-offset-2"
                  : "ring-1 ring-zinc-200 hover:ring-zinc-400"
              }`}
            >
              <Image
                src={color.imageUrl}
                alt={color.name}
                fill
                className="object-cover"
                sizes="64px"
              />
              {isSelected && (
                <div className="absolute inset-0 bg-cyan-500/15 flex items-center justify-center">
                  <Check size={12} className="text-cyan-600 drop-shadow-md" />
                </div>
              )}
            </button>
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
            const needsBorder = isLightColor(color.hex);
            return (
              <button
                key={color.hex}
                onClick={() => handleSelect(idx)}
                title={color.name}
                aria-label={`Select color: ${color.name}`}
                className={`w-5 h-5 rounded-full flex-shrink-0 transition-all duration-200 ${
                  isSelected
                    ? "ring-2 ring-cyan-500 ring-offset-2 scale-110"
                    : "hover:scale-110 hover:ring-1 hover:ring-zinc-400 hover:ring-offset-1"
                }`}
                style={{
                  background: color.hex,
                  border: needsBorder
                    ? "1.5px solid #d1d5db"
                    : "1.5px solid rgba(0,0,0,0.08)",
                }}
              />
            );
          })}
        </div>
        <span className="text-[12px] text-zinc-500 font-medium ml-1">
          {selected.name}
        </span>
      </div>
    </div>
  );
}
