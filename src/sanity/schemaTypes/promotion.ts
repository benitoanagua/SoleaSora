import { defineType, defineField } from "sanity";

// Promoción / Oferta
export default defineType({
  name: "promotion",
  title: "Promoción / Oferta",
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
    }),

    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 2,
    }),

    defineField({
      name: "discountType",
      title: "Tipo de descuento",
      type: "string",
      options: {
        list: [
          { title: "Porcentaje", value: "percentage" },
          { title: "Monto fijo", value: "fixed" },
          { title: "2x1", value: "buy1get1" },
          { title: "Envío gratis", value: "freeShipping" },
          { title: "Regalo", value: "gift" },
        ],
      },
    }),

    defineField({
      name: "discountValue",
      title: "Valor del descuento",
      type: "number",
      description: "Para porcentaje: 20 = 20%. Para monto fijo: valor en ARS",
    }),

    defineField({
      name: "code",
      title: "Código de cupón",
      type: "string",
      description: "Ej: VERANO20, ENVIOGRATIS",
    }),

    defineField({
      name: "image",
      title: "Imagen promocional",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "startDate",
      title: "Fecha de inicio",
      type: "datetime",
    }),

    defineField({
      name: "endDate",
      title: "Fecha de fin",
      type: "datetime",
    }),

    defineField({
      name: "active",
      title: "¿Activa?",
      type: "boolean",
      initialValue: true,
    }),

    defineField({
      name: "minimumPurchase",
      title: "Compra mínima (ARS)",
      type: "number",
    }),

    defineField({
      name: "banner",
      title: "Texto del banner",
      type: "string",
      description: "Texto corto para mostrar en el banner superior",
    }),
  ],

  preview: {
    select: {
      title: "title",
      discountType: "discountType",
      discountValue: "discountValue",
      active: "active",
    },
    prepare({ title, discountType, discountValue, active }) {
      const discountLabels: Record<string, string> = {
        percentage: `${discountValue}%`,
        fixed: `$${discountValue}`,
        buy1get1: "2x1",
        freeShipping: "Envío gratis",
        gift: "Regalo",
      };
      return {
        title,
        subtitle: `${discountLabels[discountType] || ""} ${active ? "✓ Activa" : "✗ Inactiva"}`,
      };
    },
  },
});
