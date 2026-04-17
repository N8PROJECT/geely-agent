import { MessageCircle, MapPin, Mail } from "lucide-react";
import { AGENT } from "@/lib/data";
import { generateWhatsAppLink } from "@/lib/utils";

const FOOTER_LINKS = [
  { label: "Privasi", href: "#" },
  { label: "Syarat & Ketentuan", href: "#" },
  { label: "Sitemap", href: "#" },
];

export default function Footer() {
  const chatLink = generateWhatsAppLink(
    AGENT.phone,
    `Halo, saya ingin tanya tentang Geely.`
  );

  return (
    <footer className="bg-zinc-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-10">

          {/* Brand + contact info — no name prefix, no hours */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="12" stroke="white" strokeWidth="2" fill="none" />
                  <ellipse cx="14" cy="14" rx="8" ry="5.5" stroke="white" strokeWidth="1.5" fill="none" />
                  <line x1="6" y1="14" x2="22" y2="14" stroke="white" strokeWidth="1" />
                  <line x1="14" y1="6" x2="14" y2="22" stroke="white" strokeWidth="1" />
                </svg>
              </div>
              <div>
                <div className="font-black text-[14px] tracking-tight leading-none">GEELY</div>
                <div className="text-[9px] font-semibold text-white/40 tracking-[0.12em] mt-0.5">JAKARTA</div>
              </div>
            </div>

            <p className="text-[13px] text-white/50 leading-relaxed mb-5">
              Authorized Geely Sales Agent. Melayani pembelian unit baru, test
              drive, dan simulasi kredit di wilayah Jabodetabek.
            </p>

            <div className="flex flex-col gap-2.5">
              {[
                {
                  Icon: MessageCircle,
                  text: "0857-7723-5291", 
                  href: chatLink,
                  isLink: true,
                },
                {
                  Icon: MapPin,
                  text: AGENT.location,
                  href: null,
                  isLink: false,
                },
                {
                  Icon: Mail,
                  text: AGENT.email,
                  href: `mailto:${AGENT.email}`,
                  isLink: true,
                },
              ].map(({ Icon, text, href, isLink }) =>
                isLink && href ? (
                  <a
                    key={text}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-[12px] text-white/50 hover:text-white transition-colors"
                  >
                    <Icon size={13} className="text-cyan-500 flex-shrink-0" />
                    {text}
                  </a>
                ) : (
                  <div
                    key={text}
                    className="flex items-center gap-2.5 text-[12px] text-white/50"
                  >
                    <Icon size={13} className="text-white/30 flex-shrink-0" />
                    {text}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h4 className="text-[12px] font-black text-white/40 tracking-[0.12em] uppercase mb-4">
              Navigasi
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "Katalog Mobil", href: "#katalog" },
                { label: "Test Drive", href: "#promo" },
                { label: "Simulasi Kredit", href: "#promo" },
                { label: "Berita & Promo", href: "#berita" },
                { label: "Hubungi Kami", href: chatLink },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-[13px] text-white/45 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.08] px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[11px] text-white/25">
            © 2026 Geely Jakarta · {AGENT.name}. Authorized Geely Sales Agent.
          </p>
          <div className="flex gap-5">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[11px] text-white/30 hover:text-white/60 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}