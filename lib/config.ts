export const AGENT = {
  name: "Iman",
  shortName: "Iman",
  id: "GEL-JKT-087",
  phone: "6285777235291",
  location: "Tangerang Selatan",
  hours: "09:00 – 17:00 WIB",
  email: "iman@geelyjkt.id",
  initials: "IM",
} as const;

export function getWhatsAppLink(message: string): string {
  return `https://wa.me/${AGENT.phone}?text=${encodeURIComponent(message.trim())}`;
}
