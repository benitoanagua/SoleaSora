import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Configuración del sitio",
  type: "document",

  fields: [
    defineField({
      name: "brandName",
      title: "Nombre de la marca",
      type: "string",
      initialValue: "Solea Sora",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "SVG o PNG con fondo transparente. Mínimo 400px de ancho.",
      options: { hotspot: false },
    }),

    defineField({
      name: "logoAlt",
      title: "Logo versión clara (para fondo oscuro)",
      type: "image",
      options: { hotspot: false },
    }),

    defineField({
      name: "heroVideo",
      title: "Video del hero (homepage)",
      type: "url",
      description: "URL directa al archivo .mp4. No usar YouTube.",
    }),

    defineField({
      name: "heroHeadline",
      title: "Titular del hero",
      type: "string",
      validation: (Rule) => Rule.required().max(60),
    }),

    defineField({
      name: "heroSubline",
      title: "Subtítulo del hero",
      type: "string",
      validation: (Rule) => Rule.max(120),
    }),

    defineField({
      name: "currency",
      title: "Moneda",
      type: "string",
      options: {
        list: [
          { title: "Peso Argentino (ARS)", value: "ARS" },
          { title: "Dólar USD", value: "USD" },
          { title: "Boliviano (BOB)", value: "BOB" },
        ],
        layout: "radio",
      },
      initialValue: "ARS",
    }),

    defineField({
      name: "shippingMessage",
      title: "Mensaje de envío",
      type: "string",
      description: 'Ej: "Envío gratis a partir de $15.000"',
    }),

    defineField({
      name: "instagramUrl",
      title: "Instagram",
      type: "url",
    }),

    defineField({
      name: "whatsappNumber",
      title: "WhatsApp de contacto",
      type: "string",
      description: "Con código de país. Ej: 5491134567890",
    }),
  ],

  preview: {
    select: { title: "brandName", media: "logo" },
  },
});
