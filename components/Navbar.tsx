"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { AGENT } from "@/lib/data";
import { generateWhatsAppLink } from "@/lib/utils";

export default function Navbar() {
  const consultLink = generateWhatsAppLink(
    AGENT.phone,
    `Hi ${AGENT.name}, I would like to consult about purchasing a Geely car.`,
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Clean Text Logo */}
        <Link
          href="/"
          className="flex flex-col items-start justify-center group"
        >
          {/* Typographic Logo using standard sans-serif but stylized */}
          <div className="font-black text-[20px] md:text-[22px] text-zinc-900 tracking-[-0.05em] leading-none group-hover:text-cyan-600 transition-colors">
            GEELY
          </div>
          <div className="text-[9px] md:text-[10px] font-bold text-zinc-400 tracking-[0.2em] mt-[1px]">
            JAKARTA
          </div>
        </Link>

        {/* Right: Agent + Minimalist CTA */}
        <div className="flex items-center gap-4">
          <span className="text-[12px] text-zinc-500 font-medium hidden md:block">
            Authorized Agent{" "}
            <span className="text-zinc-900 font-bold">{AGENT.shortName}</span>
          </span>
          <a
            href={consultLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-zinc-900 hover:bg-cyan-600 text-white text-[12px] md:text-[13px] font-bold px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg"
          >
            <MessageCircle size={15} />
            <span className="hidden sm:inline">Contact Sales</span>
            <span className="inline sm:hidden">Contact</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
