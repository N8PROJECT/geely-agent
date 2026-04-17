import Link from "next/link";
import Image from "next/image";
import { AGENT, CARS } from "@/lib/data";

interface HeroProps {
  cars?: any[]; // Gunakan any[] sementara agar cepat, nanti bisa diganti dengan tipe data spesifik
}

export default function Hero({ cars }: HeroProps) {
  return (
    <section
      className="relative bg-zinc-950 overflow-hidden"
      style={{ minHeight: 480 }}
    >
      {/* Video background — ganti src ke URL video Geely kamu */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      >
        {/* Ganti dengan video hosting kamu, contoh: Cloudinary, Bunny.net, atau /videos/hero.mp4 di folder /public */}
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/20 to-black/10" />
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-28 md:pt-20 md:pb-32">
        <div className="max-w-xl">
          <h1 className="text-[42px] md:text-[52px] font-black text-white leading-[1.04] tracking-tight mb-4">
            Masa Depan
            <br />
            Hadir Sekarang
          </h1>
          <p className="text-[15px] text-white/65 leading-relaxed max-w-md">
            Geely hadir dengan teknologi EV & Hybrid terdepan. Rasakan
            pengalaman berkendara yang lebih cerdas, lebih efisien, dan lebih
            mewah bersama Reyna Salsabila — Authorized Sales Agent Jakarta.
          </p>
        </div>
      </div>

      {/* Thumbnail strip */}
      {/* <div className="absolute bottom-0 left-0 right-0 z-10 flex border-t border-white/10">
        {CARS.map((car, i) => (
          <Link
            key={car.id}
            href="#katalog"
            className={`flex-1 flex items-center gap-3 px-5 py-3 bg-black/55 hover:bg-black/75 transition-colors ${
              i < CARS.length - 1 ? "border-r border-white/10" : ""
            }`}
          >
            <div className="relative w-16 h-10 rounded overflow-hidden flex-shrink-0">
              <Image
                src={car.imageUrl}
                alt={car.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div>
              <p className="text-[12px] font-bold text-white leading-none">
                {car.name}
              </p>
              <p className="text-[11px] text-white/50 mt-1">
                Mulai {car.priceDisplay.split(".").slice(0, 2).join(".")} Juta
              </p>
            </div>
          </Link>
        ))}
      </div> */}
    </section>
  );
}
