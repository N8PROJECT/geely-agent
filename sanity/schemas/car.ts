import { defineField, defineType, defineArrayMember } from "sanity";

/**
 * COLOR VARIANT sub-object
 * Reusable inline object — not a standalone document type.
 * Each car embeds an array of these.
 */
const colorVariantObject = defineArrayMember({
  name: "colorVariant",
  title: "Color Variant",
  type: "object",
  preview: {
    select: {
      title: "colorName",
      media: "image",
    },
  },
  fields: [
    defineField({
      name: "colorName",
      title: "Color Name",
      type: "string",
      description: 'Display name shown to customers. E.g. "Crystal Pearl White"',
      validation: (Rule) => Rule.required().min(2).max(60),
    }),
    defineField({
      name: "hex",
      title: "Color Swatch",
      type: "color", // Berubah dari 'string' ke 'color'
      description: "Pick a color for the circular swatch dot.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Car Image for this Color",
      type: "image",
      description: "Upload a photo of the car in this specific color.",
      options: {
        hotspot: true,
        metadata: ["lqip"], // Low-Quality Image Placeholder for blur-up
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});

/**
 * SPEC ITEM sub-object
 * A single key-value spec row (e.g. "Range" → "500 km CLTC").
 */
const specItemObject = defineArrayMember({
  name: "specItem",
  title: "Spec Item",
  type: "object",
  preview: {
    select: { title: "label", subtitle: "value" },
  },
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: 'The spec name. E.g. "Jarak Tempuh", "Kapasitas Baterai"',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description: 'The numeric or text value. E.g. "500"',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "unit",
      title: "Unit (optional)",
      type: "string",
      description: 'Appended after the value. E.g. "km CLTC", "kWh", "detik"',
    }),
  ],
});

/**
 * CAR document schema
 */
export const carSchema = defineType({
  name: "car",
  title: "Car",
  type: "document",
  icon: () => "+",

  /* Studio list preview — shows name + price + first color image */
  preview: {
    select: {
      title: "name",
      subtitle: "priceDisplay",
      media: "colors.0.image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title ?? "Untitled Car",
        subtitle: subtitle ? `Mulai ${subtitle}` : "",
        media,
      };
    },
  },

  fields: [
    /* ── Identity ── */
    defineField({
      name: "name",
      title: "Model Name",
      type: "string",
      description: 'Full model name as shown to customers. E.g. "Geely EX2"',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: "shortName",
      title: "Short Name",
      type: "string",
      description: 'Used in tabs / compact UI. E.g. "EX2"',
      validation: (Rule) => Rule.required().max(20),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      description:
        "Auto-generated from the model name. Used in the URL: /cars/[slug]",
      options: {
        source: "name",
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "")
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),

    /* ── Taxonomy ── */
    defineField({
      name: "type",
      title: "Vehicle Type",
      type: "string",
      options: {
        list: [
          { title: "Electric SUV", value: "Electric SUV" },
          { title: "Hybrid MPV", value: "Hybrid MPV" },
          { title: "Electric Sedan", value: "Electric Sedan" },
          { title: "Hybrid SUV", value: "Hybrid SUV" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "badge",
      title: "Badge Label",
      type: "string",
      description: 'Short label on the card. E.g. "Best Seller", "New Arrival"',
      validation: (Rule) => Rule.max(30),
    }),
    defineField({
      name: "badgeBg",
      title: "Badge Background Color",
      type: "color", // Berubah dari 'string' ke 'color'
      description: "Visual picker for the badge chip background.",
    }),
    defineField({
      name: "badgeText",
      title: "Badge Text Color",
      type: "color", // Berubah dari 'string' ke 'color'
      description: "Visual picker for the badge chip text.",
    }),

    /* ── Copy ── */
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description:
        "One-line marketing tagline shown below the model name on cards.",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 5,
      description: "Full paragraph description shown on the detail page.",
      validation: (Rule) => Rule.required().min(40).max(1200),
    }),

    /* ── Pricing ── */
    defineField({
      name: "priceRaw",
      title: "Starting Price (IDR, raw number)",
      type: "number",
      description: "e.g. 359900000  — used for sorting and calculations.",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "priceDisplay",
      title: "Starting Price (Display String)",
      type: "string",
      description: 'Formatted string shown to customers. E.g. "Rp 359.900.000"',
      validation: (Rule) => Rule.required(),
    }),

    /* ── Quick stats (used on catalog cards) ── */
    defineField({
      name: "rangeKm",
      title: "Range / Jarak Tempuh",
      type: "string",
      description: 'Short value for the catalog card stat pill. E.g. "500 km CLTC"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seats",
      title: "Seats / Kursi",
      type: "string",
      description: 'Number of seats as string. E.g. "5"',
      validation: (Rule) => Rule.required(),
    }),

    /* ── Color Variants ── */
    defineField({
      name: "colors",
      title: "Color Variants",
      type: "array",
      description:
        "Add one item per color option. The first item is shown by default on the detail page.",
      of: [colorVariantObject],
      validation: (Rule) => Rule.required().min(1).error("At least one color variant is required."),
    }),

    /* ── Full Spec Sheet ── */
    defineField({
      name: "specs",
      title: "Key Specifications",
      type: "array",
      description: "Displayed in the spec grid on the detail page.",
      of: [specItemObject],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});