import { defineType, defineField } from "sanity";

export default defineType({
  name: "skinType",
  title: "Tipo de piel",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      description: "Ej: Seca, Grasa, Mixta...",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        slugify: (input: string) =>
          input
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .slice(0, 50),
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "value",
      title: "Valor interno",
      type: "string",
      description: "Identificador para código: dry, oily, combination...",
      validation: (Rule) => Rule.required().lowercase(),
    }),

    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 2,
      description: "Breve descripción del tipo de piel",
    }),

    defineField({
      name: "order",
      title: "Orden",
      type: "number",
      description: "Orden de aparición en listas",
      initialValue: 0,
    }),
  ],

  orderings: [
    {
      title: "Orden manual",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Nombre A→Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "value",
    },
  },
});
