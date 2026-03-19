import { defineType, defineField, defineArrayMember } from "sanity";

// Página de contacto
export default defineType({
  name: "contactPage",
  title: "Página de contacto",
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
      options: { source: "title" },
      initialValue: { current: "contacto" },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "intro",
      title: "Introducción",
      type: "text",
      rows: 2,
      description: "Texto de bienvenida en la página de contacto",
    }),

    // Información de contacto
    defineField({
      name: "contactInfo",
      title: "Información de contacto",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "items",
          title: "Datos de contacto",
          type: "array",
          of: [defineArrayMember({
            type: "object",
            name: "contactItem",
            fields: [
              defineField({
                name: "icon",
                title: "Ícono",
                type: "string",
                options: {
                  list: [
                    { title: "Mail ✉️", value: "Mail" },
                    { title: "Phone 📞", value: "Phone" },
                    { title: "MapPin 📍", value: "MapPin" },
                    { title: "Clock 🕐", value: "Clock" },
                    { title: "MessageCircle 💬", value: "MessageCircle" },
                  ],
                },
              }),
              defineField({ name: "label", title: "Etiqueta", type: "string" }),
              defineField({ name: "value", title: "Valor", type: "string" }),
              defineField({ name: "link", title: "Link (opcional)", type: "string" }),
            ],
          })],
        }),
      ],
    }),

    // Redes sociales
    defineField({
      name: "socialLinks",
      title: "Redes sociales",
      type: "array",
      of: [defineArrayMember({
        type: "object",
        name: "socialLink",
        fields: [
          defineField({
            name: "platform",
            title: "Plataforma",
            type: "string",
            options: {
              list: [
                { title: "Instagram", value: "instagram" },
                { title: "Facebook", value: "facebook" },
                { title: "Twitter/X", value: "twitter" },
                { title: "TikTok", value: "tiktok" },
                { title: "YouTube", value: "youtube" },
                { title: "LinkedIn", value: "linkedin" },
                { title: "WhatsApp", value: "whatsapp" },
              ],
            },
          }),
          defineField({ name: "url", title: "URL", type: "string" }),
        ],
      })],
    }),

    // Formulario
    defineField({
      name: "formTitle",
      title: "Título del formulario",
      type: "string",
      initialValue: "Envíanos un mensaje",
    }),

    defineField({
      name: "formFields",
      title: "Campos del formulario",
      type: "array",
      of: [defineArrayMember({
        type: "object",
        name: "formField",
        fields: [
          defineField({
            name: "name",
            title: "Nombre del campo",
            type: "string",
            description: "Nombre técnico: name, email, phone, message",
          }),
          defineField({
            name: "label",
            title: "Etiqueta visible",
            type: "string",
          }),
          defineField({
            name: "type",
            title: "Tipo",
            type: "string",
            options: {
              list: [
                { title: "Texto", value: "text" },
                { title: "Email", value: "email" },
                { title: "Teléfono", value: "tel" },
                { title: "Texto largo", value: "textarea" },
              ],
            },
          }),
          defineField({ name: "required", title: "Requerido", type: "boolean" }),
        ],
      })],
    }),
  ],

  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "Contacto", subtitle: "Página" };
    },
  },
});
