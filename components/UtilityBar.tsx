import { AGENT } from "@/lib/data";
import { generateWhatsAppLink } from "@/lib/utils";

const ITEMS = [
  {
    icon: "🚗",
    label: "Test Drive",
    sub: "Jadwalkan sekarang",
    waMessage: `Halo ${AGENT.name}, saya ingin menjadwalkan test drive Geely.`,
  },
  {
    icon: "🧮",
    label: "Simulasi Kredit",
    sub: "Hitung cicilan Anda",
    waMessage: `Halo ${AGENT.name}, saya ingin simulasi kredit untuk mobil Geely.`,
  },
];

export default function UtilityBar() {
  return (
    <section id="promo" className="bg-white border-t border-b border-zinc-200">
      <div className="max-w-6xl mx-auto grid grid-cols-2">
        {ITEMS.map((item, i) => {
          const link = generateWhatsAppLink(AGENT.phone, item.waMessage);
          return (
            <a
              key={item.label}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center text-center px-4 py-8 hover:bg-zinc-50 transition-colors group ${
                i < ITEMS.length - 1 ? "border-r border-zinc-200" : ""
              }`}
            >
              <span className="text-[28px] mb-3" role="img" aria-hidden>
                {item.icon}
              </span>
              <span className="text-[14px] font-bold text-zinc-900 mb-1">
                {item.label}
              </span>
              <span className="text-[12px] text-zinc-500">{item.sub}</span>
              <span className="text-[12px] text-cyan-500 font-bold mt-2.5 group-hover:underline">
                Via WhatsApp →
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}