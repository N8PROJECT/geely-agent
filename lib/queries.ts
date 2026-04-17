import { groq } from "next-sanity";

export const allCarsQuery = groq`
  *[_type == "car"] | order(_createdAt asc) {
    _id,
    name,
    shortName,
    "slug": slug.current,
    type,
    tagline,
    priceDisplay,
    rangeKm,
    seats,
    badge,
    badgeBg,
    badgeText,
    "coverImage": colors[0].image,
    "colors": colors[] {
      colorName,
      hex,
      "image": image
    }
  }
`;

export const allNewsQuery = groq`
  *[_type == "news"] | order(publishedAt desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    source,
    sourceUrl,
    isInternalArticle,
    category,
    "date": publishedAt,
    "imageUrl": thumbnail.asset->url,
    featured
  }
`;

export const carDetailQuery = groq`
  *[_type == "car" && slug.current == $slug][0] {
    _id,
    name,
    shortName,
    "slug": slug.current,
    type,
    tagline,
    description,
    priceDisplay,
    rangeKm,
    seats,
    badge,
    badgeBg,
    badgeText,
    "coverImage": colors[0].image,
    "colors": colors[] {
      colorName,
      hex,
      "image": image
    },
    specs[] {
      label,
      value,
      unit
    }
  }
`;

export const allSlugsQuery = groq`
  *[_type == "car"] { "slug": slug.current }
`;
