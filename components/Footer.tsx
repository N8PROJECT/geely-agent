import Link from "next/link";
import { AGENT } from "@/lib/data"; // Sesuaikan path jika berbeda

export default function Footer() {
  return (
    <footer className="bg-[#09090b] pt-16 pb-8 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 mb-16">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-8 flex flex-col items-start">
            <Link
              href="/"
              className="flex flex-col items-start justify-center mb-6"
            >
              <div className="font-black text-[24px] text-white tracking-[-0.05em] leading-none">
                GEELY
              </div>
              <div className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] mt-[2px]">
                JAKARTA
              </div>
            </Link>

            <p className="text-[13px] text-zinc-400 leading-relaxed max-w-sm mb-6">
              Authorized Geely Sales Agent. Serving new unit purchases, test
              drives, and financing simulations in the Greater Jakarta area.
            </p>

            <div className="flex flex-col gap-2.5 text-[13px] text-zinc-400">
              <span className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-cyan-500 font-bold">
                  P
                </span>
                {AGENT.phone}
              </span>
              <span className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-cyan-500 font-bold">
                  L
                </span>
                South Tangerang, Indonesia
              </span>
            </div>
          </div>

          {/* Navigation Sync */}
          <div className="col-span-1 md:col-span-4">
            <h4 className="text-[11px] font-black text-white uppercase tracking-widest mb-5">
              Navigation
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Vehicle Models", href: "#katalog" },
                { label: "Book Test Drive", href: "#" }, // Ganti dengan link WA jika perlu
                { label: "Latest Offers", href: "#promo" },
                { label: "News & Updates", href: "#berita" },
                { label: "Contact Us", href: "#" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[13px] font-medium text-zinc-500 hover:text-cyan-400 transition-colors w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5 text-[11px] text-zinc-600">
          <p>
            &copy; 2026 Geely Jakarta - {AGENT.name}. Authorized Geely Sales
            Agent.
          </p>
        </div>
      </div>
    </footer>
  );
}
