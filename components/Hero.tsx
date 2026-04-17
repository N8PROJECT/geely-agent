import Link from "next/link";
import Image from "next/image";

interface HeroProps {
  cars?: any[];
}

export default function Hero({ cars }: HeroProps) {
  return (
    <section
      className="relative bg-zinc-950 overflow-hidden"
      // Mengubah minHeight statis menjadi 60vh (60% layar) atau minimal 500px
      style={{ minHeight: "clamp(500px, 60vh, 800px)" }}
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Gradasi agar teks tetap terbaca */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-black/10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#09090b] to-transparent" />

      {/* Content - Posisi disesuaikan agar tidak menutupi plat nomor tengah */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="max-w-6xl w-full mx-auto px-6">
          <div className="max-w-xl">
            <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-[11px] font-bold tracking-widest mb-4">
              THE ALL-NEW GEELY
            </span>
            <h1 className="text-[50px] md:text-[68px] font-black text-white leading-[1.05] tracking-tighter drop-shadow-2xl">
              THE FUTURE
              <br />
              IS NOW.
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
