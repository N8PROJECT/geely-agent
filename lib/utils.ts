/**
 * Generates a properly encoded WhatsApp deep-link URL.
 * @param phone  - Phone number in international format WITHOUT leading '+' (e.g. "6288899001097")
 * @param message - Plain-text message to pre-fill in the WA chat box
 * @returns      - Full WhatsApp URL string
 */
export function generateWhatsAppLink(phone: string, message: string): string {
  const encodedMessage = encodeURIComponent(message.trim());
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

/**
 * Formats a numeric price into Indonesian Rupiah display format.
 * @param amount - Raw number (e.g. 359900000)
 * @returns      - Formatted string (e.g. "Rp 359.900.000")
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace("IDR", "Rp")
    .trim();
}

/**
 * Clamps a number between min and max (inclusive).
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
