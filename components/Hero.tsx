import Link from "next/link";
import Image from "next/image";

interface HeroProps {
  cars?: any[];
}

export default function Hero({ cars }: HeroProps) {
  return (
    <section
      className="relative bg-zinc-950 overflow-hidden flex items-center justify-center"
      style={{ minHeight: "clamp(500px, 65vh, 800px)" }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />

      {/* Content wrapper with flex column and center alignment */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col justify-center">
        <div className="max-w-xl -mt-10">
          {" "}
          {/* Negative margin to slightly lift it from exact dead center, keeping it balanced */}
          <span className="inline-block py-1.5 px-3.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-[10px] font-black tracking-[0.2em] mb-5">
            THE ALL-NEW GEELY
          </span>
          <h1 className="text-[52px] md:text-[72px] font-black text-white leading-[1.05] tracking-tighter drop-shadow-2xl">
            THE FUTURE
            <br />
            IS NOW.
          </h1>
        </div>
      </div>
    </section>
  );
}
