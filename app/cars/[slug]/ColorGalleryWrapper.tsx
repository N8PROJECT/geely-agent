"use client";

import { useState, useCallback, useEffect } from "react";
import ColorGallery from "@/components/ColorGallery";
import type { Car, CarColor } from "@/lib/data";
import { AGENT } from "@/lib/data";
import { generateWhatsAppLink } from "@/lib/utils";

interface Props {
  car: Car;
}

export default function ColorGalleryWrapper({ car }: Props) {
  const [selectedColor, setSelectedColor] = useState<CarColor>(car.colors[0]);

  /* Keep the two CTA anchor hrefs updated whenever the color changes.
     We target them by id (set on the server-rendered <a> tags above).
     This is the simplest zero-dependency approach — no context needed. */
  const updateCtaLinks = useCallback(
    (color: CarColor) => {
      const konsultasiEl = document.getElementById(
        "cta-konsultasi",
      ) as HTMLAnchorElement | null;
      const kreditEl = document.getElementById(
        "cta-kredit",
      ) as HTMLAnchorElement | null;

      if (konsultasiEl) {
        konsultasiEl.href = generateWhatsAppLink(
          AGENT.phone,
          `Halo ${AGENT.name}, saya tertarik dengan ${car.name} warna ${color.name}. Boleh minta info lebih lanjut dan jadwal test drive-nya?`,
        );
      }
      if (kreditEl) {
        kreditEl.href = generateWhatsAppLink(
          AGENT.phone,
          `Halo ${AGENT.name}, saya ingin simulasi kredit untuk ${car.name} warna ${color.name}.`,
        );
      }
    },
    [car.name],
  );

  /* Run once on mount so the initial color is reflected even before
     the user clicks anything. */
  useEffect(() => {
    updateCtaLinks(car.colors[0]);
  }, [car.colors, updateCtaLinks]);

  const handleColorChange = useCallback(
    (color: CarColor) => {
      setSelectedColor(color);
      updateCtaLinks(color);
    },
    [updateCtaLinks],
  );

  return (
    <div className="flex flex-col gap-5">
      <ColorGallery
        colors={car.colors}
        carName={car.name}
        onColorChange={handleColorChange}
      />

      {/* Selected color confirmation pill — visible feedback under gallery */}
      <div className="flex items-center gap-2.5 px-1">
        <span
          className="w-4 h-4 rounded-full flex-shrink-0 border border-zinc-200"
          style={{ background: selectedColor.hex }}
        />
        <p className="text-[13px] text-zinc-600">
          Warna dipilih:{" "}
          <span className="font-bold text-zinc-900">{selectedColor.name}</span>
        </p>
      </div>
    </div>
  );
}
