import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Zap,
  BatteryCharging,
  Gauge,
  Timer,
  Users,
  Shield,
  ChevronRight,
  Fuel,
  MessageCircle,
} from "lucide-react";
import { sanityClient, urlFor } from "@/lib/sanity.client";
import { carDetailQuery, allSlugsQuery } from "@/lib/queries";
import { AGENT, getWhatsAppLink } from "@/lib/config";
import ColorGalleryWrapper from "./ColorGalleryWrapper";
import DetailAnimations from "./DetailAnimations";

export const revalidate = 10;

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await sanityClient.fetch(allSlugsQuery);
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const raw = await sanityClient.fetch(carDetailQuery, { slug });
  if (!raw) return { title: "Model Not Found" };
  return {
    title: `${raw.name} | Geely Jakarta — ${AGENT.name}`,
    description: `${raw.tagline} Starting from ${raw.priceDisplay}. Contact ${AGENT.name}, Authorized Geely Sales Agent Jakarta.`,
  };
}

/* ── Icon map ── */
const SPEC_ICONS: Record<string, React.ElementType> = {
  "Range (WLTP)": Zap,
  "Total Range": Zap,
  "EV Range": Zap,
  "Battery Capacity": BatteryCharging,
  "Top Speed": Gauge,
  "0–100 km/h": Timer,
  "Motor Power": Zap,
  "System Power": Fuel,
  Seats: Users,
  "Fast Charging": BatteryCharging,
  "Battery Warranty": Shield,
  "Jarak Tempuh": Zap,
  "Kapasitas Baterai": BatteryCharging,
  "Top Speed (km/h)": Gauge,
  Kapasitas: Users,
};

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const raw = await sanityClient.fetch(carDetailQuery, { slug });
  if (!raw) notFound();

  /* Normalize Sanity image references */
  const car = {
    ...raw,
    shortName: raw.shortName || raw.name.replace("Geely ", ""),
    colors: (raw.colors ?? []).map((c: any) => ({
      name: c.colorName,
      hex: c.hex,
      imageUrl: c.image
        ? urlFor(c.image).width(1200).quality(90).auto("format").url()
        : "",
    })),
  };

  /* Fetch other models for "Explore More" strip */
  const allRaw: any[] = await sanityClient.fetch(
    `*[_type == "car" && slug.current != $slug] | order(_createdAt asc) [0...2] {
      name, "slug": slug.current, priceDisplay, type,
      "imageUrl": colors[0].image
    }`,
    { slug },
  );
  const otherCars = allRaw.map((c) => ({
    ...c,
    imageUrl: c.imageUrl
      ? urlFor(c.imageUrl).width(400).quality(80).auto("format").url()
      : "",
  }));

  const baseConsultLink = getWhatsAppLink(
    `Hi ${AGENT.name}, I'm interested in the ${car.name}. Could you share more details?`,
  );
  const baseFinanceLink = getWhatsAppLink(
    `Hi ${AGENT.name}, I'd like a finance simulation for the ${car.name}.`,
  );

  return (
    // PERUBAHAN TEMA: Background super gelap untuk kesan Immersive Showroom
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-cyan-500/30">
      {/* Breadcrumb - Dark Mode */}
      <div className="border-b border-white/5 bg-[#09090b]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/#katalog"
            className="flex items-center gap-1.5 text-[13px] font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={15} />
            All Models
          </Link>
          <div className="flex items-center gap-1.5 text-[12px] text-zinc-500 hidden sm:flex">
            <Link href="/" className="hover:text-zinc-300 transition-colors">
              Home
            </Link>
            <ChevronRight size={12} className="text-zinc-700" />
            <Link
              href="/#katalog"
              className="hover:text-zinc-300 transition-colors"
            >
              Catalog
            </Link>
            <ChevronRight size={12} className="text-zinc-700" />
            <span className="text-zinc-100 font-semibold">{car.name}</span>
          </div>
        </div>
      </div>

      <DetailAnimations>
        <main className="relative overflow-hidden">
          {/* GIANT WATERMARK TEXT BEHIND CAR */}
          <div className="absolute top-20 left-0 right-0 flex justify-center pointer-events-none select-none z-0 overflow-hidden opacity-40">
            <h1 className="text-[18vw] font-black text-white/5 whitespace-nowrap tracking-tighter uppercase transform -translate-y-10">
              {car.shortName}
            </h1>
          </div>

          <div className="max-w-6xl mx-auto px-6 pt-16 pb-20 relative z-10">
            {/* HERO HEADER */}
            <div className="text-center mb-10">
              <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
                {car.badge && (
                  <span
                    className="text-[11px] font-black px-3.5 py-1.5 rounded-full tracking-wider shadow-xl"
                    style={{ background: car.badgeBg, color: car.badgeText }}
                  >
                    {car.badge}
                  </span>
                )}
                <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full tracking-wider uppercase backdrop-blur-md">
                  {car.type}
                </span>
              </div>
              <h2 className="text-[40px] md:text-[56px] lg:text-[72px] font-black text-white tracking-tighter leading-none mb-4 drop-shadow-2xl">
                {car.name}
              </h2>
              <p className="text-[16px] md:text-[20px] text-zinc-400 italic font-light max-w-2xl mx-auto">
                {car.tagline}
              </p>
            </div>

            {/* TWO-COLUMN LAYOUT FOR DARK STAGE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* LEFT STAGE: Car Image & Specs */}
              <div className="lg:col-span-7 flex flex-col gap-8">
                {/* The Color Gallery */}
                <div className="relative rounded-3xl p-1 bg-gradient-to-b from-white/10 to-transparent shadow-2xl">
                  <div className="bg-[#121214] rounded-[22px] overflow-hidden">
                    <ColorGalleryWrapper car={car} />
                  </div>
                </div>

                {/* GLASSMORPHISM SPECS ROW */}
                {car.specs && car.specs.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {car.specs.map((spec: any) => {
                      const Icon = SPEC_ICONS[spec.label] ?? Zap;
                      return (
                        <div
                          key={spec.label}
                          className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl px-4 py-4 flex flex-col items-center text-center transition-colors hover:bg-white/10"
                        >
                          <Icon size={18} className="text-cyan-400 mb-2" />
                          <span className="text-[20px] font-black text-white leading-none tracking-tight mb-1">
                            {spec.value}
                          </span>
                          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                            {spec.label} {spec.unit && `(${spec.unit})`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* RIGHT STAGE: Info & Checkout Panel */}
              <div className="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-24">
                {/* Price Panel */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl">
                  <p className="text-[12px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
                    Starting MSRP
                  </p>
                  <p className="text-[36px] font-black text-white tracking-tighter leading-none mb-4">
                    {car.priceDisplay}
                  </p>

                  {/* Warranty strip */}
                  <div className="flex flex-col gap-2 mt-6 mb-8 border-t border-white/10 pt-6">
                    {[
                      "Lifetime Battery Warranty",
                      "5-Year Free Maintenance",
                      "3-Year Vehicle Warranty",
                    ].map((item) => (
                      <span
                        key={item}
                        className="flex items-center gap-2.5 text-[13px] font-medium text-zinc-300"
                      >
                        <Shield size={14} className="text-cyan-400" />
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col gap-3">
                    <a
                      href={baseConsultLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2.5 bg-cyan-500 hover:bg-cyan-400 text-[#09090b] text-[15px] font-black py-4 rounded-xl w-full transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
                    >
                      <MessageCircle size={18} fill="currentColor" />
                      Consult This Model
                    </a>
                    <a
                      href={baseFinanceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2.5 bg-transparent border border-white/20 hover:bg-white/5 text-white text-[15px] font-bold py-4 rounded-xl w-full transition-colors"
                    >
                      Finance Calculator
                    </a>
                    <p className="text-center text-[11px] text-zinc-500 mt-2">
                      Priority response by{" "}
                      <span className="text-zinc-300">{AGENT.name}</span>
                    </p>
                  </div>
                </div>

                {/* About Section */}
                {car.description && (
                  <div className="px-2">
                    <h3 className="text-[14px] font-bold text-white uppercase tracking-widest mb-3">
                      The Vision
                    </h3>
                    <p className="text-[15px] text-zinc-400 leading-relaxed font-light">
                      {car.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Explore More Strip - Dark Mode */}
          {otherCars.length > 0 && (
            <div className="border-t border-white/5 bg-[#0a0a0c] py-16">
              <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-[20px] font-black text-white tracking-tight mb-8">
                  Continue Exploring
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {otherCars.map((other) => (
                    <Link
                      key={other.slug}
                      href={`/cars/${other.slug}`}
                      className="group flex items-center gap-5 bg-white/5 border border-white/5 rounded-2xl p-4 hover:bg-white/10 hover:border-white/10 transition-all"
                    >
                      <div className="relative w-28 h-16 rounded-xl overflow-hidden bg-white/10">
                        {other.imageUrl && (
                          <img
                            src={other.imageUrl}
                            alt={other.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[15px] font-black text-white truncate">
                          {other.name}
                        </p>
                        <p className="text-[13px] text-cyan-400 font-bold mt-0.5">
                          {other.priceDisplay}
                        </p>
                      </div>
                      <ChevronRight
                        size={20}
                        className="text-zinc-600 group-hover:text-white transition-colors mr-2"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </DetailAnimations>
    </div>
  );
}
