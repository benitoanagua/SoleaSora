import { defineType, defineField, defineArrayMember } from "sanity";

// Página "Sobre nosotros"
export default defineType({
  name: "aboutPage",
  title: "Sobre nosotros",
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
      initialValue: { current: "nosotras" },
      validation: (Rule) => Rule.required(),
    }),

    // Hero
    defineField({
      name: "heroImage",
      title: "Imagen hero",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "heroText",
      title: "Texto hero",
      type: "text",
      rows: 3,
    }),

    // Historia
    defineField({
      name: "story",
      title: "Nuestra historia",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({ name: "content", title: "Contenido", type: "array", of: [{ type: "block" }] }),
        defineField({ name: "image", title: "Imagen", type: "image", options: { hotspot: true } }),
      ],
    }),

    // Misión y Visión
    defineField({
      name: "mission",
      title: "Misión",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string", initialValue: "Nuestra misión" }),
        defineField({ name: "content", title: "Contenido", type: "text", rows: 3 }),
        defineField({
          name: "icon",
          title: "Ícono",
          type: "string",
          options: {
            list: [
              { title: "Target", value: "Target" },
              { title: "Compass", value: "Compass" },
              { title: "Heart", value: "Heart" },
              { title: "Sparkles", value: "Sparkles" },
            ],
          },
        }),
      ],
    }),

    defineField({
      name: "vision",
      title: "Visión",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string", initialValue: "Nuestra visión" }),
        defineField({ name: "content", title: "Contenido", type: "text", rows: 3 }),
        defineField({
          name: "icon",
          title: "Ícono",
          type: "string",
          options: {
            list: [
              { title: "Eye", value: "Eye" },
              { title: "Lightbulb", value: "Lightbulb" },
              { title: "Sunrise", value: "Sunrise" },
              { title: "Rocket", value: "Rocket" },
            ],
          },
        }),
      ],
    }),

    // Valores
    defineField({
      name: "values",
      title: "Valores",
      type: "array",
      of: [defineArrayMember({
        type: "object",
        name: "value",
        fields: [
          defineField({
            name: "icon",
            title: "Ícono",
            type: "string",
            options: {
              list: [
                { title: "Heart", value: "Heart" },
                { title: "Leaf", value: "Leaf" },
                { title: "Shield", value: "Shield" },
                { title: "Star", value: "Star" },
                { title: "Sparkles", value: "Sparkles" },
                { title: "Award", value: "Award" },
                { title: "Users", value: "Users" },
                { title: "Globe", value: "Globe" },
              ],
            },
          }),
          defineField({ name: "title", title: "Título", type: "string" }),
          defineField({ name: "description", title: "Descripción", type: "text", rows: 2 }),
        ],
      })],
    }),

    // Equipo
    defineField({
      name: "team",
      title: "Equipo",
      type: "array",
      of: [defineArrayMember({
        type: "object",
        name: "member",
        fields: [
          defineField({ name: "name", title: "Nombre", type: "string" }),
          defineField({ name: "role", title: "Cargo", type: "string" }),
          defineField({ name: "photo", title: "Foto", type: "image", options: { hotspot: true } }),
          defineField({ name: "bio", title: "Biografía", type: "text", rows: 2 }),
        ],
      })],
    }),
  ],

  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "Sobre nosotros", subtitle: "Página" };
    },
  },
});
