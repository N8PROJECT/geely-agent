import { MessageCircle } from "lucide-react";
import { AGENT } from "@/lib/data";
import { generateWhatsAppLink } from "@/lib/utils";

export default function FloatingWaButton() {
  const link = generateWhatsAppLink(
    AGENT.phone,
    `Halo ${AGENT.name}, saya ingin tanya tentang mobil Geely.`,
  );

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Pulse ring */}
      <span
        className="absolute inset-0 rounded-full bg-green-500/30 animate-fabPulse"
        style={{ margin: "-6px" }}
      />
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp dengan Reyna"
        className="relative w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 hover:scale-110 flex items-center justify-center shadow-[0_4px_20px_rgba(34,197,94,0.45)] hover:shadow-[0_6px_28px_rgba(34,197,94,0.6)] transition-all duration-200"
      >
        <MessageCircle size={26} className="text-white" fill="white" />
      </a>
    </div>
  );
}
