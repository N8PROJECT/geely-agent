import { defineField, defineType } from "sanity";

export const newsSchema = defineType({
  name: "news",
  title: "News Article",
  type: "document",
  icon: () => "+",

  preview: {
    select: {
      title: "title",
      subtitle: "source",
      media: "thumbnail",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title ?? "Untitled Article",
        subtitle: subtitle ? `via ${subtitle}` : "",
        media,
      };
    },
  },

  fields: [
    defineField({
      name: "title",
      title: "Article Title",
      type: "string",
      description: "Full headline of the news article.",
      validation: (Rule) => Rule.required().min(10).max(200),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt / Summary",
      type: "text",
      rows: 3,
      description: "Short 1–2 sentence summary shown in the news feed card.",
      validation: (Rule) => Rule.required().min(20).max(400),
    }),
    defineField({
      name: "source",
      title: "Source Name",
      type: "string",
      description: 'Publisher name. E.g. "Oto.com", "GridOto", "AutoFun ID"',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "sourceUrl",
      title: "Source URL",
      type: "url",
      description: "Link to the original article on the publisher's website.",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"] }).warning(
          "It is recommended to provide a valid URL."
        ),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Inovasi", value: "Inovasi" },
          { title: "Produk", value: "Produk" },
          { title: "Promo", value: "Promo" },
          { title: "Review", value: "Review" },
          { title: "Event", value: "Event" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      description: "Date the article was published. Used for sorting.",
      options: {
        dateFormat: "DD MMM YYYY",
        timeStep: 60,
      },
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      description: "Displayed in the news feed card. Recommended: 600×400px.",
      options: {
        hotspot: true,
        metadata: ["lqip"],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured?",
      type: "boolean",
      description: "If true, this article appears as the hero card in the news feed.",
      initialValue: false,
    }),
  ],

  /* Default ordering in the Studio list view: newest first */
  orderings: [
    {
      title: "Published Date (Newest First)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Published Date (Oldest First)",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
  ],
});