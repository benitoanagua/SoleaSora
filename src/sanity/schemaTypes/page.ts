import { defineType, defineField, defineArrayMember } from "sanity";

// Página de inicio (Home)
export default defineType({
  name: "homePage",
  title: "Página de inicio",
  type: "document",

  fields: [
    // Hero Section
    defineField({
      name: "hero",
      title: "Sección Hero",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "headline",
          title: "Título principal",
          type: "string",
          description: "El mensaje principal que aparece en grande",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "subheadline",
          title: "Subtítulo",
          type: "string",
          description: "Texto secundario debajo del título",
        }),
        defineField({
          name: "backgroundImage",
          title: "Imagen de fondo",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "backgroundVideo",
          title: "Video de fondo (URL)",
          type: "url",
          description: "URL de Vimeo o YouTube",
        }),
        defineField({
          name: "cta",
          title: "Botón de acción",
          type: "object",
          fields: [
            defineField({ name: "text", title: "Texto", type: "string" }),
            defineField({ name: "url", title: "URL", type: "string" }),
          ],
        }),
      ],
    }),

    // Productos destacados
    defineField({
      name: "featuredProducts",
      title: "Productos destacados",
      type: "array",
      of: [defineArrayMember({
        type: "reference",
        to: [{ type: "product" }],
      })],
      description: "Selecciona los productos que aparecerán en el home",
      validation: (Rule) => Rule.max(6),
    }),

    // Sección de beneficios
    defineField({
      name: "benefitsSection",
      title: "Sección de beneficios",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "title",
          title: "Título",
          type: "string",
        }),
        defineField({
          name: "benefits",
          title: "Beneficios",
          type: "array",
          of: [defineArrayMember({
            type: "object",
            name: "benefit",
            fields: [
              defineField({
                name: "icon",
                title: "Ícono (Lucide)",
                type: "string",
                description: "Nombre del ícono de Lucide: Sparkles, Droplets, Leaf, Heart, Shield, etc.",
                options: {
                  list: [
                    { title: "Sparkles ✨", value: "Sparkles" },
                    { title: "Droplets 💧", value: "Droplets" },
                    { title: "Leaf 🌿", value: "Leaf" },
                    { title: "Heart ❤️", value: "Heart" },
                    { title: "Shield 🛡️", value: "Shield" },
                    { title: "Sun ☀️", value: "Sun" },
                    { title: "Moon 🌙", value: "Moon" },
                    { title: "Flower2 🌸", value: "Flower2" },
                    { title: "Star ⭐", value: "Star" },
                    { title: "Award 🏆", value: "Award" },
                  ],
                },
              }),
              defineField({ name: "title", title: "Título", type: "string" }),
              defineField({ name: "description", title: "Descripción", type: "text", rows: 2 }),
            ],
          })],
        }),
      ],
    }),

    // Banner promocional
    defineField({
      name: "promoBanner",
      title: "Banner promocional",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "enabled", title: "Mostrar banner", type: "boolean", initialValue: false }),
        defineField({ name: "message", title: "Mensaje", type: "string" }),
        defineField({ name: "ctaText", title: "Texto del botón", type: "string" }),
        defineField({ name: "ctaUrl", title: "URL del botón", type: "string" }),
        defineField({
          name: "backgroundColor",
          title: "Color de fondo",
          type: "string",
          options: {
            list: [
              { title: "Dorado", value: "gold" },
              { title: "Oscuro", value: "dark" },
              { title: "Crema", value: "cream" },
            ],
          },
        }),
      ],
    }),

    // Testimonios
    defineField({
      name: "testimonials",
      title: "Testimonios",
      type: "array",
      of: [defineArrayMember({
        type: "object",
        name: "testimonial",
        fields: [
          defineField({ name: "quote", title: "Cita", type: "text", rows: 2 }),
          defineField({ name: "author", title: "Autor", type: "string" }),
          defineField({ name: "role", title: "Cargo/Rol", type: "string" }),
          defineField({ name: "avatar", title: "Foto", type: "image", options: { hotspot: true } }),
          defineField({ name: "rating", title: "Rating (1-5)", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
        ],
      })],
    }),
  ],

  preview: {
    select: { title: "hero.headline" },
    prepare({ title }) {
      return { title: title || "Página de inicio", subtitle: "Home" };
    },
  },
});
