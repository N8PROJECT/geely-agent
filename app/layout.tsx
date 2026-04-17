import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Geely Alam Sutera | Iman",
  description:
    "Beli mobil Geely terbaru — EX2, EX5, Starray EM-1 — dengan promo DP 0%, bunga 0%, dan free maintenance 5 tahun. Hubungi Iman, Authorized Geely Sales Agent Tangerang Selatan.",
  keywords: [
    "Geely",
    "Geely Tangerang",
    "Geely EX2",
    "Geely EX5",
    "Geely Starray",
    "EV Indonesia",
  ],
  openGraph: {
    title: "Geely Tangerang | Iman",
    description:
      "Authorized Geely Sales Agent Tangerang Selatan. DP 0% · Bunga 0% · Free Maintenance 5 Tahun.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}
