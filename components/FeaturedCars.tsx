"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { CARS, AGENT } from "@/lib/data";
import { generateWhatsAppLink } from "@/lib/utils";

interface FeaturedCarsProps {
  cars: any[];
}

export default function FeaturedCars({ cars }: FeaturedCarsProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  const car = CARS[activeIdx];

  const prev = () => setActiveIdx((i) => (i - 1 + CARS.length) % CARS.length);
  const next = () => setActiveIdx((i) => (i + 1) % CARS.length);

  const tdLink = generateWhatsAppLink(
    AGENT.phone,
    `Halo ${AGENT.name}, saya tertarik untuk Test Drive ${car.name}. Mohon info jadwalnya.`,
  );
  const krLink = generateWhatsAppLink(
    AGENT.phone,
    `Halo ${AGENT.name}, saya ingin tanya simulasi kredit untuk ${car.name}.`,
  );

  return (
    <section className="bg-white" id="featured">
      {/* Section header */}
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-0">
        <h2 className="text-center text-[26px] md:text-[30px] font-black text-zinc-900 tracking-tight">
          Temukan Geely Anda
        </h2>
        <p className="text-center text-[14px] text-zinc-500 mt-2 mb-6">
          Pilih kategori dan eksplorasi model yang paling sesuai dengan gaya
          hidup Anda.
        </p>

        {/* Tab bar — exact Chevrolet underline style */}
        <div className="flex justify-center border-b-2 border-zinc-200">
          {CARS.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActiveIdx(i)}
              className={`px-7 py-3 text-[13px] font-bold tracking-tight transition-all -mb-0.5 border-b-[3px] ${
                activeIdx === i
                  ? "text-zinc-900 border-cyan-500"
                  : "text-zinc-400 border-transparent hover:text-zinc-600"
              }`}
            >
              {c.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* Main car feature — asymmetric layout */}
      <div className="flex flex-col md:flex-row min-h-[320px]">
        {/* Car image: ~68% width on desktop, full on mobile */}
        <div className="relative w-full md:flex-[0_0_68%] h-60 md:h-auto overflow-hidden bg-zinc-100">
          <Image
            key={car.imageUrl}
            src={car.imageUrl}
            alt={car.name}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, 68vw"
            priority
          />
        </div>

        {/* Detail sidebar */}
        <div className="flex-1 bg-white border-t md:border-t-0 md:border-l border-zinc-200 px-8 py-8 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-black text-cyan-500 tracking-[0.14em] uppercase block mb-2">
              {car.type}
            </span>
            <h3 className="text-[26px] font-black text-zinc-900 tracking-tight leading-tight mb-2">
              {car.name}
            </h3>
            <p className="text-[13px] text-zinc-500 leading-relaxed mb-5">
              {car.tagline}
            </p>

            {/* Spec pills */}
            <div className="flex gap-3 mb-5">
              {[
                { label: "Jangkauan", val: car.rangeKm },
                { label: "Kapasitas", val: car.seats },
              ].map(({ label, val }) => (
                <div
                  key={label}
                  className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 text-center"
                >
                  <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                    {label}
                  </p>
                  <p className="text-[12px] font-bold text-zinc-700 mt-1">
                    {val}
                  </p>
                </div>
              ))}
            </div>

            {/* Price */}
            <div>
              <span className="text-[11px] text-zinc-400 font-medium">
                Harga mulai dari
              </span>
              <p className="text-[22px] font-black text-zinc-900 tracking-tight mt-0.5">
                {car.priceDisplay}
              </p>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col gap-2.5 mt-6">
            <a
              href={tdLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white text-[13px] font-bold py-2.5 rounded-full transition-colors"
            >
              <MessageCircle size={14} />
              Request Test Drive
            </a>
            <a
              href={krLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50 text-[13px] font-bold py-2.5 rounded-full transition-colors"
            >
              <MessageCircle size={14} />
              Simulasi Kredit
            </a>
          </div>

          {/* Prev / Next arrows */}
          <div className="flex gap-2.5 mt-5">
            {[
              { fn: prev, Icon: ChevronLeft, label: "Previous" },
              { fn: next, Icon: ChevronRight, label: "Next" },
            ].map(({ fn, Icon, label }) => (
              <button
                key={label}
                onClick={fn}
                aria-label={label}
                className="w-9 h-9 rounded-full border border-zinc-300 hover:border-zinc-500 hover:bg-zinc-50 flex items-center justify-center transition-all"
              >
                <Icon size={16} className="text-zinc-600" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
