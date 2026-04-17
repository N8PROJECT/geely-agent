"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Models", href: "#katalog" },
  { label: "Promo", href: "#promo" },
  { label: "News", href: "#berita" },
  { label: "Services", href: "#servis" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Clean Text Logo */}
        <Link
          href="/"
          className="flex flex-col items-start justify-center group z-50"
        >
          <div className="font-black text-[20px] md:text-[22px] text-zinc-900 tracking-[-0.05em] leading-none group-hover:text-cyan-600 transition-colors">
            GEELY
          </div>
          <div className="text-[9px] md:text-[10px] font-bold text-zinc-400 tracking-[0.2em] mt-[1px]">
            JAKARTA
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[13px] font-bold text-zinc-500 hover:text-zinc-900 tracking-wide transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-2 -mr-2 z-50 text-zinc-900"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Dropdown Menu */}
        <div
          className={`
          absolute top-16 left-0 right-0 bg-white border-b border-zinc-200 p-6 flex flex-col gap-6 shadow-xl transition-all duration-300 md:hidden
          ${isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"}
        `}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-[16px] font-black text-zinc-900 tracking-wide border-b border-zinc-100 pb-4"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
