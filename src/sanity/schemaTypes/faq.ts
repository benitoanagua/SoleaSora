import { defineType, defineField, defineArrayMember } from "sanity";

// Página de FAQ
export default defineType({
  name: "faqPage",
  title: "Preguntas frecuentes (FAQ)",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      initialValue: "Preguntas frecuentes",
    }),

    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      options: { source: "title" },
      initialValue: { current: "faq" },
    }),

    defineField({
      name: "intro",
      title: "Introducción",
      type: "text",
      rows: 2,
    }),

    // Categorías de preguntas
    defineField({
      name: "categories",
      title: "Categorías de preguntas",
      type: "array",
      of: [defineArrayMember({
        type: "object",
        name: "faqCategory",
        fields: [
          defineField({
            name: "icon",
            title: "Ícono",
            type: "string",
            options: {
              list: [
                { title: "ShoppingBag", value: "ShoppingBag" },
                { title: "Truck", value: "Truck" },
                { title: "CreditCard", value: "CreditCard" },
                { title: "Package", value: "Package" },
                { title: "RefreshCw", value: "RefreshCw" },
                { title: "HelpCircle", value: "HelpCircle" },
              ],
            },
          }),
          defineField({ name: "title", title: "Título", type: "string" }),
          defineField({
            name: "questions",
            title: "Preguntas",
            type: "array",
            of: [defineArrayMember({
              type: "object",
              name: "question",
              fields: [
                defineField({ name: "question", title: "Pregunta", type: "string" }),
                defineField({ name: "answer", title: "Respuesta", type: "text", rows: 3 }),
              ],
            })],
          }),
        ],
      })],
    }),
  ],

  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "FAQ", subtitle: "Preguntas frecuentes" };
    },
  },
});
