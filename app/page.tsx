import { sanityClient } from "@/lib/sanity.client";
import { allCarsQuery, allNewsQuery } from "@/lib/queries";
import { AGENT, getWhatsAppLink } from "@/lib/config";
import { urlFor } from "@/lib/sanity.client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCars from "@/components/FeaturedCars";
import CarCatalogClient from "@/components/CarCatalogClient";
import NewsFeedClient from "@/components/NewsFeedClient";
import UtilityBar from "@/components/UtilityBar";
import Footer from "@/components/Footer";
import FloatingWaButton from "@/components/FloatingWaButton";

export const revalidate = 60; // ISR — revalidate every 60 seconds

export default async function HomePage() {
  const [rawCars, rawNews] = await Promise.all([
    sanityClient.fetch(allCarsQuery),
    sanityClient.fetch(allNewsQuery),
  ]);

  // Normalize Sanity image references → plain URL strings the client components expect
  const cars = rawCars.map((car: any) => ({
    ...car,
    imageUrl: car.coverImage
      ? urlFor(car.coverImage).width(800).quality(85).auto("format").url()
      : "",
    colors: (car.colors ?? []).map((c: any) => ({
      name: c.colorName,
      hex: c.hex,
      imageUrl: c.image
        ? urlFor(c.image).width(1200).quality(90).auto("format").url()
        : "",
    })),
  }));

  const news = rawNews.map((n: any) => ({
    ...n,
    imageUrl: n.thumbnail
      ? urlFor(n.thumbnail).width(600).quality(80).auto("format").url()
      : "",
    date: new Date(n.date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  }));

  return (
    <main>
      <Navbar />
      <Hero cars={cars} />
      {/* <FeaturedCars cars={cars} /> */}
      <NewsFeedClient articles={news} />
      <CarCatalogClient cars={cars} />
      <UtilityBar />
      <Footer />
      <FloatingWaButton />
    </main>
  );
}
