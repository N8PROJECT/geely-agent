"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { AGENT, getWhatsAppLink } from "@/lib/config";

export interface CarCardData {
  slug: string;
  name: string;
  type: string;
  tagline: string;
  priceDisplay: string;
  rangeKm: string;
  seats: string;
  badge?: string;
  badgeBg?: string;
  badgeText?: string;
  imageUrl: string;
  colors: { name: string; hex: string; imageUrl: string }[];
}

interface Props {
  car: CarCardData;
  index?: number;
}

export default function CarCard({ car, index = 0 }: Props) {
  const tdLink = getWhatsAppLink(
    `Hi ${AGENT.name}, I'm interested in a Test Drive for the ${car.name}. Could you share the available schedule?`,
  );
  const krLink = getWhatsAppLink(
    `Hi ${AGENT.name}, I'd like to get a finance simulation for the ${car.name}.`,
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.1,
      }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl overflow-hidden border border-zinc-200 flex flex-col"
      style={{ willChange: "transform" }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-zinc-100">
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.07 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        >
          <Image
            src={car.imageUrl}
            alt={car.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

        {car.badge && (
          <span
            className="absolute top-3 left-3 text-[10px] font-black px-2.5 py-1 rounded-[6px] tracking-wider z-10"
            style={{
              background: car.badgeBg ?? "#fef3c7",
              color: car.badgeText ?? "#92400e",
            }}
          >
            {car.badge}
          </span>
        )}
        <span className="absolute bottom-2.5 right-3 text-[10px] font-semibold text-white/80 tracking-[0.1em] z-10">
          {car.type.toUpperCase()}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1 gap-4">
        <div>
          <h3 className="text-[17px] font-black text-zinc-900 tracking-tight">
            {car.name}
          </h3>
          <p className="text-[12px] text-zinc-400 italic mt-1">{car.tagline}</p>
        </div>

        {/* Specs */}
        <div className="flex gap-2.5">
          {[
            { label: "Range", val: car.rangeKm },
            { label: "Seats", val: car.seats },
          ].map(({ label, val }) => (
            <div
              key={label}
              className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-2.5 py-2 text-center"
            >
              <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">
                {label}
              </p>
              <p className="text-[11px] font-bold text-zinc-700 mt-0.5">
                {val}
              </p>
            </div>
          ))}
        </div>

        {/* Price */}
        <div>
          <p className="text-[10px] text-zinc-400 font-medium">Starting MSRP</p>
          <p className="text-[16px] font-black text-cyan-600 tracking-tight mt-0.5">
            {car.priceDisplay}
          </p>
        </div>

        {/* Color swatches */}
        {car.colors.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-zinc-400">
              Colors:
            </span>
            <div className="flex gap-1.5">
              {car.colors.map((c, i) => (
                <span
                  key={i}
                  title={c.name}
                  className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                  style={{
                    background: c.hex,
                    border:
                      c.hex === "#F5F5F5" || c.hex === "#EFEFEF"
                        ? "1.5px solid #d1d5db"
                        : "1.5px solid rgba(0,0,0,0.1)",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-col gap-2 mt-auto">
          {/* Solid WA button with glow pulse */}
          <motion.a
            href={tdLink}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center gap-2 bg-cyan-500 text-white text-[12px] font-bold py-2.5 rounded-full overflow-hidden"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Glow layer */}
            <motion.span
              className="absolute inset-0 bg-cyan-400 rounded-full"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.35 }}
              transition={{ duration: 0.25 }}
            />
            <MessageCircle size={13} className="relative z-10" />
            <span className="relative z-10">Book a Test Drive</span>
          </motion.a>

          {/* Outline button */}
          <motion.a
            href={krLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border-2 border-cyan-500 text-cyan-600 text-[12px] font-bold py-2.5 rounded-full"
            whileHover={{ backgroundColor: "#ecfeff" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            <MessageCircle size={13} />
            Finance Calculator
          </motion.a>

          {/* Detail link */}
          <motion.div
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link
              href={`/cars/${car.slug}`}
              className="flex items-center justify-center gap-1.5 text-[12px] font-semibold text-zinc-400 hover:text-zinc-700 py-1.5 transition-colors"
            >
              View Details
              <ArrowRight size={13} />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
