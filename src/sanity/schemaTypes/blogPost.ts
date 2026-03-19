import { defineType, defineField, defineArrayMember } from "sanity";

// Blog post
export default defineType({
  name: "blogPost",
  title: "Artículo de blog",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      options: {
        source: "title",
        slugify: (input: string) =>
          input
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "excerpt",
      title: "Resumen",
      type: "text",
      rows: 2,
      description: "Breve descripción que aparece en las listas",
      validation: (Rule) => Rule.max(160),
    }),

    defineField({
      name: "featuredImage",
      title: "Imagen destacada",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
      ],
    }),

    defineField({
      name: "content",
      title: "Contenido",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
        defineArrayMember({
          type: "object",
          name: "quote",
          title: "Cita destacada",
          fields: [
            defineField({ name: "quote", title: "Cita", type: "text" }),
            defineField({ name: "author", title: "Autor", type: "string" }),
          ],
        }),
      ],
    }),

    defineField({
      name: "author",
      title: "Autor",
      type: "string",
    }),

    defineField({
      name: "publishedAt",
      title: "Fecha de publicación",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "categories",
      title: "Categorías",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: {
        list: [
          { title: "Skincare", value: "skincare" },
          { title: "Ingredientes", value: "ingredients" },
          { title: "Rutinas", value: "routines" },
          { title: "Consejos", value: "tips" },
          { title: "Novedades", value: "news" },
        ],
      },
    }),

    defineField({
      name: "tags",
      title: "Etiquetas",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),

    defineField({
      name: "featured",
      title: "¿Destacado?",
      type: "boolean",
      description: "Mostrar en la página principal",
      initialValue: false,
    }),

    // SEO
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "metaTitle", title: "Meta título", type: "string" }),
        defineField({ name: "metaDescription", title: "Meta descripción", type: "text", rows: 2 }),
      ],
    }),
  ],

  orderings: [
    {
      title: "Más recientes",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],

  preview: {
    select: {
      title: "title",
      author: "author",
      media: "featuredImage",
      date: "publishedAt",
    },
    prepare({ title, author, media, date }) {
      const dateStr = date ? new Date(date).toLocaleDateString("es-AR") : "";
      return {
        title,
        subtitle: `${author ? author + " · " : ""}${dateStr}`,
        media,
      };
    },
  },
});
