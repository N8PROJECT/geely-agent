"use client";

import { motion } from "framer-motion";
import CarCard, { CarCardData } from "./CarCard";

export default function CarCatalogClient({ cars }: { cars: CarCardData[] }) {
  return (
    <section id="katalog" className="bg-zinc-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <span className="text-[11px] font-black text-cyan-500 tracking-[0.14em] uppercase">
            Full Lineup
          </span>
          <h2 className="text-[28px] md:text-[32px] font-black text-zinc-900 tracking-tight mt-1.5 mb-2">
            All Geely Models
          </h2>
          <p className="text-[14px] text-zinc-500 max-w-md mx-auto">
            Official pricing. Exclusive offers. Contact Reyna for the best deal
            in Jakarta.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car, i) => (
            <CarCard key={car.slug} car={car} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
