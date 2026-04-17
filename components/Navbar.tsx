"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { AGENT } from "@/lib/data";
import { generateWhatsAppLink } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Tipe Mobil", href: "#katalog" },
  { label: "Promo", href: "#promo" },
  { label: "Berita", href: "#berita" },
  { label: "Servis", href: "#servis" },
];

export default function Navbar() {
  const consultLink = generateWhatsAppLink(
    AGENT.phone,
    `Halo ${AGENT.name}, saya ingin konsultasi pembelian mobil Geely.`,
  );

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Left: nav links */}
        <div className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[13px] font-semibold text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Center: Logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5"
        >
          <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <circle
                cx="14"
                cy="14"
                r="12"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
              <ellipse
                cx="14"
                cy="14"
                rx="8"
                ry="5.5"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
              />
              <line
                x1="6"
                y1="14"
                x2="22"
                y2="14"
                stroke="white"
                strokeWidth="1"
              />
              <line
                x1="14"
                y1="6"
                x2="14"
                y2="22"
                stroke="white"
                strokeWidth="1"
              />
            </svg>
          </div>
          <div>
            <div className="font-black text-[14px] text-zinc-900 tracking-tight leading-none">
              GEELY
            </div>
            <div className="text-[9px] font-semibold text-zinc-400 tracking-[0.12em] mt-0.5">
              JAKARTA
            </div>
          </div>
        </Link>

        {/* Right: agent + CTA */}
        <div className="flex items-center gap-3">
          <span className="text-[12px] text-zinc-400 font-medium hidden sm:block">
            {AGENT.shortName}
          </span>
          <a
            href={consultLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-cyan-500 hover:bg-cyan-600 text-white text-[12px] font-bold px-4 py-2 rounded-full transition-colors"
          >
            <MessageCircle size={13} />
            Hubungi Saya
          </a>
        </div>
      </div>
    </nav>
  );
}
