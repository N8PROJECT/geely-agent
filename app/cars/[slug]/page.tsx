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
} from "lucide-react";
import { sanityClient, urlFor } from "@/lib/sanity.client";
import { carDetailQuery, allSlugsQuery } from "@/lib/queries";
import { AGENT, getWhatsAppLink } from "@/lib/config";
import ColorGalleryWrapper from "./ColorGalleryWrapper";
import DetailAnimations from "./DetailAnimations";

export const revalidate = 60;

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
  // Indonesian fallbacks (if CMS data hasn't been migrated yet)
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

  /* Normalize Sanity image references → plain URL strings */
  const car = {
    ...raw,
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

  /* Base WA links (color-aware patching is done client-side in ColorGalleryWrapper) */
  const baseConsultLink = getWhatsAppLink(
    `Hi ${AGENT.name}, I'm interested in the ${car.name}. Could you share more details?`,
  );
  const baseFinanceLink = getWhatsAppLink(
    `Hi ${AGENT.name}, I'd like a finance simulation for the ${car.name}.`,
  );

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Breadcrumb */}
      <div className="border-b border-zinc-100 bg-white sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
          <Link
            href="/#katalog"
            className="flex items-center gap-1.5 text-[13px] font-semibold text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft size={15} />
            All Models
          </Link>
          <div className="flex items-center gap-1.5 text-[12px] text-zinc-400">
            <Link href="/" className="hover:text-zinc-700 transition-colors">
              Home
            </Link>
            <ChevronRight size={12} className="text-zinc-300" />
            <Link
              href="/#katalog"
              className="hover:text-zinc-700 transition-colors"
            >
              Catalog
            </Link>
            <ChevronRight size={12} className="text-zinc-300" />
            <span className="text-zinc-700 font-semibold">{car.name}</span>
          </div>
        </div>
      </div>

      <DetailAnimations>
        <main className="max-w-6xl mx-auto px-6 py-10 md:py-14">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            {car.badge && (
              <span
                className="text-[11px] font-black px-3 py-1 rounded-full tracking-wider"
                style={{ background: car.badgeBg, color: car.badgeText }}
              >
                {car.badge}
              </span>
            )}
            <span className="text-[11px] font-bold text-cyan-600 bg-cyan-50 border border-cyan-200 px-3 py-1 rounded-full tracking-wider uppercase">
              {car.type}
            </span>
          </div>

          <h1 className="text-[32px] md:text-[42px] font-black text-zinc-900 tracking-tight leading-tight mb-2">
            {car.name}
          </h1>
          <p className="text-[15px] md:text-[16px] text-zinc-500 italic mb-8">
            {car.tagline}
          </p>

          {/* Two-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            {/* LEFT: Color Gallery */}
            <ColorGalleryWrapper car={car} />

            {/* RIGHT: Info */}
            <div className="flex flex-col gap-8">
              {/* Price */}
              <div className="bg-zinc-50 rounded-2xl px-6 py-5 border border-zinc-200">
                <p className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                  Starting MSRP
                </p>
                <p className="text-[30px] font-black text-zinc-900 tracking-tight leading-none">
                  {car.priceDisplay}
                </p>
                <p className="text-[12px] text-zinc-400 mt-2">
                  *Pricing subject to change. Contact your sales agent for the
                  latest offers.
                </p>
              </div>

              {/* Description */}
              {car.description && (
                <div>
                  <h2 className="text-[16px] font-black text-zinc-900 mb-3 tracking-tight">
                    About the {car.shortName}
                  </h2>
                  <p className="text-[14px] text-zinc-500 leading-[1.75]">
                    {car.description}
                  </p>
                </div>
              )}

              {/* Specs grid — dynamic, driven entirely by CMS */}
              {car.specs && car.specs.length > 0 && (
                <div>
                  <h2 className="text-[16px] font-black text-zinc-900 mb-4 tracking-tight">
                    Key Specifications
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {car.specs.map(
                      (spec: {
                        label: string;
                        value: string;
                        unit?: string;
                      }) => {
                        const Icon = SPEC_ICONS[spec.label] ?? Zap;
                        return (
                          <div
                            key={spec.label}
                            className="bg-white border border-zinc-200 rounded-xl px-4 py-3.5 hover:border-zinc-300 hover:shadow-sm transition-all"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Icon
                                size={13}
                                className="text-cyan-500 flex-shrink-0"
                              />
                              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                                {spec.label}
                              </p>
                            </div>
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-[18px] font-black text-zinc-900 leading-none tracking-tight">
                                {spec.value}
                              </span>
                              {spec.unit && (
                                <span className="text-[11px] font-semibold text-zinc-400">
                                  {spec.unit}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
              )}

              {/* Warranty strip */}
              <div className="flex flex-wrap gap-2">
                {[
                  "Lifetime Battery Warranty",
                  "5-Year Free Maintenance",
                  "3-Year Vehicle Warranty",
                ].map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-600 bg-zinc-100 px-3 py-1.5 rounded-full"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                    {item}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3 pt-2">
                <a
                  href={baseConsultLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="cta-konsultasi"
                  className="flex items-center justify-center gap-2.5 bg-cyan-500 hover:bg-cyan-600 text-white text-[14px] font-black py-4 rounded-full w-full transition-colors shadow-sm hover:shadow-md"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="white"
                    style={{ flexShrink: 0 }}
                  >
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.55 4.1 1.507 5.826L.057 23.887l6.244-1.437A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  </svg>
                  Consult This Model (WhatsApp)
                </a>
                <a
                  href={baseFinanceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="cta-kredit"
                  className="flex items-center justify-center gap-2.5 border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50 text-[14px] font-black py-4 rounded-full w-full transition-colors"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ flexShrink: 0 }}
                  >
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.55 4.1 1.507 5.826L.057 23.887l6.244-1.437A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  </svg>
                  Finance Calculator
                </a>
                <p className="text-center text-[11px] text-zinc-400">
                  Quick response · No consultation fee ·{" "}
                  <span className="font-semibold text-zinc-600">
                    {AGENT.name}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Explore More strip */}
          {otherCars.length > 0 && (
            <div className="mt-16 pt-10 border-t border-zinc-100">
              <h2 className="text-[18px] font-black text-zinc-900 tracking-tight mb-6">
                Explore Other Models
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {otherCars.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/cars/${other.slug}`}
                    className="group flex items-center gap-4 bg-zinc-50 border border-zinc-200 rounded-2xl p-4 hover:border-zinc-300 hover:shadow-md transition-all"
                  >
                    <div className="relative w-20 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-zinc-100">
                      {other.imageUrl && (
                        <img
                          src={other.imageUrl}
                          alt={other.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-black text-zinc-900 truncate">
                        {other.name}
                      </p>
                      <p className="text-[12px] text-cyan-600 font-bold mt-0.5">
                        {other.priceDisplay}
                      </p>
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        {other.type}
                      </p>
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-zinc-300 group-hover:text-zinc-500 flex-shrink-0 ml-auto transition-colors"
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>
      </DetailAnimations>
    </div>
  );
}
