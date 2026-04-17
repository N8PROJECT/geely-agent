/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
export interface CarColor {
  name: string;
  hex: string;
  imageUrl: string;
}

export interface CarSpec {
  label: string;
  value: string;
  unit?: string;
}

export interface Car {
  id: number;
  slug: string;
  name: string;
  shortName: string;
  type: string;
  tagline: string;
  description: string;
  priceRaw: number;
  priceDisplay: string;
  rangeKm: string;
  seats: string;
  badge: string;
  badgeBg: string;
  badgeText: string;
  /** Legacy single imageUrl — used in catalog/hero.
   *  Kept for backward compatibility with CarCard & Hero. */
  imageUrl: string;
  /** Full color-variant array used by the detail page. */
  colors: CarColor[];
  specs: CarSpec[];
}

export interface NewsArticle {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  source: string;
  date: string;
  imageUrl: string;
}

export interface Agent {
  name: string;
  shortName: string;
  id: string;
  phone: string;
  location: string;
  hours: string;
  email: string;
  initials: string;
}

export interface UtilityItem {
  icon: string;
  label: string;
  sub: string;
  waMessage: string;
}

/* ─────────────────────────────────────────────
   AGENT
───────────────────────────────────────────── */
export const AGENT: Agent = {
  name: "Iman",
  shortName: "Iman",
  id: "GEL-JKT-087",
  phone: "6285777235291",
  location: "Tangerang Selatan",
  hours: "09.00 – 17.00 WIB",
  email: "iman@geelyjkt.id",
  initials: "IM",
};

/* ─────────────────────────────────────────────
   CAR CATALOG
───────────────────────────────────────────── */
export const CARS: Car[] = [
  {
    id: 1,
    slug: "geely-ex2",
    name: "Geely EX2",
    shortName: "EX2",
    type: "Electric SUV",
    tagline: "Born Electric. Born Beautiful.",
    description:
      "Geely EX2 adalah SUV listrik kompak yang dirancang untuk kehidupan kota modern. Dengan desain aerodinamis, kabin luas, dan teknologi smart driving terdepan, EX2 menawarkan pengalaman berkendara yang bersih, sunyi, dan penuh gaya. Dilengkapi platform SEA (Sustainable Experience Architecture) eksklusif Geely, EX2 menghadirkan performa listrik kelas dunia dengan biaya operasional yang sangat efisien.",
    priceRaw: 359900000,
    priceDisplay: "Rp 359.900.000",
    rangeKm: "500 km",
    seats: "5",
    badge: "Best Seller",
    badgeBg: "#fef3c7",
    badgeText: "#92400e",
    imageUrl:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=85",
    colors: [
      {
        name: "Crystal Pearl White",
        hex: "#F0EDE8",
        imageUrl:
          "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=90",
      },
      {
        name: "Starry Night Black",
        hex: "#1A1A2E",
        imageUrl:
          "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=90",
      },
      {
        name: "Arctic Silver",
        hex: "#A8B2BC",
        imageUrl:
          "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=90",
      },
      {
        name: "Ocean Blue",
        hex: "#3D6B8E",
        imageUrl:
          "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=90",
      },
    ],
    specs: [
      { label: "Jarak Tempuh", value: "500", unit: "km CLTC" },
      { label: "Kapasitas Baterai", value: "65.9", unit: "kWh" },
      { label: "Top Speed", value: "160", unit: "km/h" },
      { label: "0–100 km/h", value: "6.9", unit: "detik" },
      { label: "Daya Motor", value: "200", unit: "hp" },
      { label: "Kapasitas", value: "5", unit: "kursi" },
      { label: "Pengisian Cepat", value: "80%", unit: "dalam 30 menit" },
      { label: "Garansi Baterai", value: "Lifetime", unit: "" },
    ],
  },
  {
    id: 2,
    slug: "geely-ex5",
    name: "Geely EX5",
    shortName: "EX5",
    type: "Electric SUV",
    tagline: "Explore Further. Live Bolder.",
    description:
      "Geely EX5 adalah SUV listrik mid-size yang menggabungkan kemewahan kabin premium dengan teknologi ADAS Level 2+ terlengkap di kelasnya. Dibekali baterai berkapasitas besar dan sistem manajemen termal cerdas, EX5 siap menemani perjalanan jauh maupun aktivitas harian dengan ketenangan pikiran penuh. Desain eksteriornya yang bold dan gagah menjadikannya pernyataan gaya yang kuat di jalan.",
    priceRaw: 449900000,
    priceDisplay: "Rp 449.900.000",
    rangeKm: "450 km",
    seats: "5",
    badge: "New Arrival",
    badgeBg: "#cffafe",
    badgeText: "#0e7490",
    imageUrl:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=85",
    colors: [
      {
        name: "Glacier White",
        hex: "#EFEFEF",
        imageUrl:
          "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=90",
      },
      {
        name: "Obsidian Black",
        hex: "#18181b",
        imageUrl:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=90",
      },
      {
        name: "Forest Green",
        hex: "#3B5240",
        imageUrl:
          "https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?auto=format&fit=crop&w=1200&q=90",
      },
      {
        name: "Champagne Gold",
        hex: "#C9A96E",
        imageUrl:
          "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=90",
      },
    ],
    specs: [
      { label: "Jarak Tempuh", value: "450", unit: "km CLTC" },
      { label: "Kapasitas Baterai", value: "71.5", unit: "kWh" },
      { label: "Top Speed", value: "175", unit: "km/h" },
      { label: "0–100 km/h", value: "5.7", unit: "detik" },
      { label: "Daya Motor", value: "218", unit: "hp" },
      { label: "Kapasitas", value: "5", unit: "kursi" },
      { label: "Pengisian Cepat", value: "80%", unit: "dalam 28 menit" },
      { label: "Garansi Baterai", value: "Lifetime", unit: "" },
    ],
  },
  {
    id: 3,
    slug: "geely-starray-em1",
    name: "Geely Starray EM-1",
    shortName: "Starray",
    type: "Hybrid MPV",
    tagline: "Seven Seats. Zero Compromise.",
    description:
      "Geely Starray EM-1 adalah MPV extended-range hybrid pertama Geely yang hadir untuk segmen keluarga premium Indonesia. Dengan kabin tujuh kursi yang lapang, sistem hybrid cerdas yang mampu menjangkau total 1.300 km, serta fitur hiburan dual-screen layar besar, Starray EM-1 mendefinisikan ulang standar kenyamanan perjalanan keluarga. Ideal untuk mudik, perjalanan bisnis, maupun aktivitas harian.",
    priceRaw: 589900000,
    priceDisplay: "Rp 589.900.000",
    rangeKm: "1.300 km",
    seats: "7",
    badge: "Premium",
    badgeBg: "#18181b",
    badgeText: "#ffffff",
    imageUrl:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=85",
    colors: [
      {
        name: "Lunar Silver",
        hex: "#C2C2C2",
        imageUrl:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=90",
      },
      {
        name: "Midnight Black",
        hex: "#111111",
        imageUrl:
          "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=90",
      },
      {
        name: "Mocha Brown",
        hex: "#8B6F5E",
        imageUrl:
          "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=90",
      },
      {
        name: "Deep Navy",
        hex: "#1B2A4A",
        imageUrl:
          "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=90",
      },
    ],
    specs: [
      { label: "Jarak Tempuh Total", value: "1.300", unit: "km" },
      { label: "Jarak Tempuh Listrik", value: "130", unit: "km CLTC" },
      { label: "Kapasitas Baterai", value: "40", unit: "kWh" },
      { label: "Top Speed", value: "180", unit: "km/h" },
      { label: "0–100 km/h", value: "6.5", unit: "detik" },
      { label: "Daya Sistem", value: "326", unit: "hp" },
      { label: "Kapasitas", value: "7", unit: "kursi" },
      { label: "Garansi Baterai", value: "8 Tahun", unit: "/ 160.000 km" },
    ],
  },
];

/* ─────────────────────────────────────────────
   HELPER — find car by slug
───────────────────────────────────────────── */
export function getCarBySlug(slug: string): Car | undefined {
  return CARS.find((car) => car.slug === slug);
}

/* ─────────────────────────────────────────────
   NEWS FEED
───────────────────────────────────────────── */
export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 1,
    category: "Inovasi",
    title:
      "Geely Smart Cockpit 3.0: Sistem Infotainment AI Paling Canggih di Kelasnya",
    excerpt:
      "Geely memperkenalkan antarmuka kokpit cerdas yang mengintegrasikan AI asisten, navigasi real-time, dan konektivitas 5G penuh untuk pengalaman berkendara yang benar-benar terhubung.",
    source: "Oto.com",
    date: "18 Mar 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    category: "Produk",
    title:
      "EX2 Pro: Baterai 75 kWh Baru Hadirkan Jarak Tempuh Hingga 580 km CLTC",
    excerpt:
      "Varian Pro dari Geely EX2 kini hadir dengan kapasitas baterai yang lebih besar, sistem pengisian cepat DC 150 kW, dan fitur Vehicle-to-Load (V2L) untuk kegiatan outdoor.",
    source: "GridOto",
    date: "12 Mar 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    category: "Promo",
    title:
      "Program 'Switch to EV' — Subsidi Tukar Tambah Hingga Rp 30 Juta dari Geely Indonesia",
    excerpt:
      "Geely Indonesia bekerja sama dengan pemerintah meluncurkan program insentif bagi pemilik kendaraan konvensional yang beralih ke EV.",
    source: "AutoFun ID",
    date: "5 Mar 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=600&q=80",
  },
];

/* ─────────────────────────────────────────────
   UTILITY BAR
───────────────────────────────────────────── */
export const UTILITY_ITEMS: UtilityItem[] = [
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
  {
    icon: "📍",
    label: "Cari Dealer",
    sub: "Temukan showroom terdekat",
    waMessage: `Halo ${AGENT.name}, di mana lokasi showroom Geely Jakarta terdekat?`,
  },
  {
    icon: "🎁",
    label: "Promo Terkini",
    sub: "DP 0% · Bunga 0%",
    waMessage: `Halo ${AGENT.name}, saya ingin info promo terkini Geely.`,
  },
];
