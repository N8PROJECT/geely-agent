"use client";

import Link from "next/link";
import Image from "next/image"; // <-- Tambahkan import Image
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
        {/* Left: Image Logo */}
        <Link href="/" className="flex items-center justify-center group z-50">
          {/* Ubah src="/logo.png" sesuai dengan nama file gambar Anda di folder public */}
          <Image
            src="/logo.png"
            alt="Geely Logo"
            width={120}
            height={32}
            className="w-auto h-5 md:h-6 object-contain transition-transform duration-300 group-hover:scale-105"
            priority
          />
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
          className="md:hidden p-2 -mr-2 z-50 text-zinc-900 transition-transform active:scale-95"
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
