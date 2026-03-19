import { defineType, defineField } from "sanity";

// Página legal (privacidad, términos, etc.)
export default defineType({
  name: "legalPage",
  title: "Página legal",
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
      name: "type",
      title: "Tipo de página",
      type: "string",
      options: {
        list: [
          { title: "Política de privacidad", value: "privacy" },
          { title: "Términos y condiciones", value: "terms" },
          { title: "Política de devoluciones", value: "returns" },
          { title: "Política de envíos", value: "shipping" },
          { title: "Otro", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "content",
      title: "Contenido",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
    }),

    defineField({
      name: "lastUpdated",
      title: "Última actualización",
      type: "date",
    }),
  ],

  preview: {
    select: { title: "title", type: "type" },
    prepare({ title, type }) {
      const typeLabels: Record<string, string> = {
        privacy: "Privacidad",
        terms: "Términos",
        returns: "Devoluciones",
        shipping: "Envíos",
        other: "Otro",
      };
      return { title, subtitle: typeLabels[type] || type };
    },
  },
});
