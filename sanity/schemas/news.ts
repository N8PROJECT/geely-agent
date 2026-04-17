import { defineField, defineType } from "sanity";

export const newsSchema = defineType({
  name: "news",
  title: "News Article",
  type: "document",
  icon: () => "📰", // Saya ganti sedikit agar ikonnya lebih relevan

  preview: {
    select: {
      title: "title",
      subtitle: "source",
      media: "thumbnail",
      isInternal: "isInternalArticle", // Tarik status saklar
    },
    prepare({ title, subtitle, media, isInternal }) {
      return {
        title: title ?? "Untitled Article",
        // Menampilkan label yang berbeda di CMS tergantung sumbernya
        subtitle: isInternal
          ? `Internal Post`
          : subtitle
            ? `via ${subtitle}`
            : "External Link",
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

    // --- TAMBAHAN SAKLAR KITA ---
    defineField({
      name: "isInternalArticle",
      title: "Write Article Internally?",
      type: "boolean",
      description:
        "ON: Tulis isi artikel langsung di sini. OFF: Cukup masukkan link menuju website berita aslinya.",
      initialValue: false, // Default-nya eksternal
    }),
    // ---------------------------

    // Kolom ini HANYA MUNCUL JIKA saklar MATI (External)
    defineField({
      name: "sourceUrl",
      title: "Source URL (External Link)",
      type: "url",
      description: "Link to the original article on the publisher's website.",
      hidden: ({ document }: any) => document?.isInternalArticle === true,
      validation: (Rule) =>
        Rule.custom((url, context) => {
          if (!context.document?.isInternalArticle && !url) {
            return "URL is required if this is not an internal article";
          }
          return true;
        }),
    }),

    // Kolom ini HANYA MUNCUL JIKA saklar NYALA (Internal)
    defineField({
      name: "content",
      title: "Article Content",
      type: "array", // Array of Block = Rich Text di Sanity
      description: "Tulis isi berita Anda di sini.",
      of: [{ type: "block" }],
      hidden: ({ document }: any) => !document?.isInternalArticle,
      validation: (Rule) =>
        Rule.custom((content, context) => {
          if (
            context.document?.isInternalArticle &&
            (!content || content.length === 0)
          ) {
            return "Content is required for internal articles";
          }
          return true;
        }),
    }),

    defineField({
      name: "excerpt",
      title: "Excerpt / Summary",
      type: "text",
      rows: 3,
      description: "Short 1–2 sentence summary shown in the news feed card.",
      validation: (Rule) => Rule.required().min(20).max(400),
    }),

    // Opsional jika internal, tapi wajib jika eksternal
    defineField({
      name: "source",
      title: "Source Name",
      type: "string",
      description:
        'Publisher name. E.g. "Oto.com", "GridOto" (Atau tulis "Geely Jakarta" jika internal)',
      validation: (Rule) => Rule.required().max(80),
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
      description:
        "If true, this article appears as the hero card in the news feed.",
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
