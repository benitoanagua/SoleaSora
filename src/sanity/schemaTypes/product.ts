import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "product",
  title: "Producto",
  type: "document",

  orderings: [
    {
      title: "Nombre A→Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Precio mayor→menor",
      name: "priceDesc",
      by: [{ field: "price", direction: "desc" }],
    },
    {
      title: "Orden manual",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],

  fields: [
    // ─────────────────────────────────────────
    // IDENTIDAD
    // ─────────────────────────────────────────

    defineField({
      name: "name",
      title: "Nombre del producto",
      type: "string",
      description: "Ej: Sérum Hidratante Nocturno",
      validation: (Rule) => Rule.required().min(3).max(80),
    }),

    defineField({
      name: "slug",
      title: "URL del producto",
      type: "slug",
      description: "Se genera automáticamente desde el nombre",
      options: {
        source: "name",
        maxLength: 96,
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
      name: "tagline",
      title: "Tagline corto",
      type: "string",
      description: 'Ej: "Tu piel, renovada mientras dormís"',
      validation: (Rule) => Rule.required().max(120),
    }),

    defineField({
      name: "categories",
      title: "Categorías",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "category" }] })],
      description: "Selecciona las categorías del producto (puede ser varias)",
      validation: (Rule) => Rule.min(1).error("Selecciona al menos una categoría"),
    }),

    defineField({
      name: "isNew",
      title: "¿Es nuevo lanzamiento?",
      type: "boolean",
      description: 'Muestra badge "Nuevo" en el catálogo',
      initialValue: false,
    }),

    defineField({
      name: "isFeatured",
      title: "¿Destacado en homepage?",
      type: "boolean",
      description: "Aparece en la sección hero del catálogo",
      initialValue: false,
    }),

    defineField({
      name: "order",
      title: "Orden en catálogo",
      type: "number",
      description: "Número menor = aparece primero. Ej: 1, 2, 3...",
      validation: (Rule) => Rule.integer().positive(),
    }),

    // ─────────────────────────────────────────
    // PRECIO Y STOCK
    // ─────────────────────────────────────────

    defineField({
      name: "price",
      title: "Precio (ARS)",
      type: "number",
      description: "Precio en pesos argentinos sin puntos ni comas",
      validation: (Rule) => Rule.required().positive(),
    }),

    defineField({
      name: "compareAtPrice",
      title: "Precio anterior (opcional)",
      type: "number",
      description: "Precio tachado. Dejar vacío si no aplica.",
      validation: (Rule) => Rule.positive(),
    }),

    defineField({
      name: "inStock",
      title: "¿En stock?",
      type: "boolean",
      description: 'Desactivar para mostrar "Sin stock"',
      initialValue: true,
    }),

    defineField({
      name: "stripeProductId",
      title: "ID de Stripe",
      type: "string",
      description: "No editar manualmente. Se sincroniza automáticamente.",
      hidden: true,
    }),

    // ─────────────────────────────────────────
    // IMÁGENES
    // ─────────────────────────────────────────

    defineField({
      name: "mainImage",
      title: "Imagen principal",
      type: "image",
      description: "Mínimo 1200×1200px. Fondo blanco o neutro.",
      options: {
        hotspot: true,
        metadata: ["blurhash", "lqip", "palette"],
      },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
          description: 'Ej: "Sérum en envase de vidrio ámbar"',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "galleryImages",
      title: "Galería de imágenes",
      type: "array",
      description: "Fotos adicionales: detalle, textura, resultado. Máx 8.",
      of: [
        defineArrayMember({
          type: "image",
          options: {
            hotspot: true,
            metadata: ["blurhash", "lqip"],
          },
          fields: [
            defineField({
              name: "alt",
              title: "Texto alternativo",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.max(8),
    }),

    defineField({
      name: "images360",
      title: "Imágenes para vista 360°",
      type: "array",
      description:
        "Secuencia ordenada para el viewer 360°. Recomendado: 36 imágenes (cada 10°).",
      of: [
        defineArrayMember({
          type: "image",
          options: { metadata: ["lqip"] },
          fields: [
            defineField({
              name: "frame",
              title: "Número de frame",
              type: "number",
              description: "Orden en la rotación: 1, 2, 3...",
              validation: (Rule) => Rule.required().integer().positive(),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.min(12).max(72),
    }),

    defineField({
      name: "videoUrl",
      title: "Video del producto (opcional)",
      type: "url",
      description: "URL de Vimeo o YouTube.",
    }),

    // ─────────────────────────────────────────
    // DESCRIPCIÓN Y STORYTELLING
    // ─────────────────────────────────────────

    defineField({
      name: "shortDescription",
      title: "Descripción corta",
      type: "text",
      description: "Máx 2 líneas. Aparece en las cards del catálogo.",
      rows: 2,
      validation: (Rule) => Rule.required().max(160),
    }),

    defineField({
      name: "storySections",
      title: "Secciones de scroll storytelling",
      type: "array",
      description:
        "Cada sección aparece al scrollear en la página de producto. Recomendado: 3 a 5.",
      of: [
        defineArrayMember({
          type: "object",
          name: "storySection",
          title: "Sección",
          fields: [
            defineField({
              name: "headline",
              title: "Titular",
              type: "string",
              validation: (Rule) => Rule.required().max(80),
            }),
            defineField({
              name: "body",
              title: "Texto",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.max(300),
            }),
            defineField({
              name: "accentImage",
              title: "Imagen de acento (opcional)",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: "headline" },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).max(5),
    }),

    // ─────────────────────────────────────────
    // INGREDIENTES
    // ─────────────────────────────────────────

    defineField({
      name: "ingredients",
      title: "Ingredientes destacados",
      type: "array",
      description: "Se muestran con animación en la página de producto. Máx 6.",
      of: [
        defineArrayMember({
          type: "object",
          name: "ingredient",
          title: "Ingrediente",
          fields: [
            defineField({
              name: "name",
              title: "Nombre",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "scientificName",
              title: "Nombre científico (opcional)",
              type: "string",
            }),
            defineField({
              name: "benefit",
              title: "Beneficio principal",
              type: "string",
              description:
                'Una línea. Ej: "Estimula la producción de colágeno"',
              validation: (Rule) => Rule.required().max(100),
            }),
            defineField({
              name: "icon",
              title: "Ícono / imagen",
              type: "image",
              description: "Fondo transparente preferido.",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "benefit" },
          },
        }),
      ],
      validation: (Rule) => Rule.max(6),
    }),

    defineField({
      name: "fullIngredientList",
      title: "Lista INCI completa",
      type: "text",
      description: "Ej: Aqua, Glycerin, Niacinamide...",
      rows: 4,
    }),

    // ─────────────────────────────────────────
    // BENEFICIOS / STATS
    // ─────────────────────────────────────────

    defineField({
      name: "benefits",
      title: "Beneficios con estadísticas",
      type: "array",
      description: 'Contadores animados. Ej: "98% satisfacción". Máx 4.',
      of: [
        defineArrayMember({
          type: "object",
          name: "benefit",
          title: "Beneficio",
          fields: [
            defineField({
              name: "stat",
              title: "Número o porcentaje",
              type: "string",
              description: "Ej: 98%, 30 días, 3x",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Descripción",
              type: "string",
              validation: (Rule) => Rule.required().max(60),
            }),
          ],
          preview: {
            select: { title: "stat", subtitle: "label" },
          },
        }),
      ],
      validation: (Rule) => Rule.max(4),
    }),

    // ─────────────────────────────────────────
    // USO E INSTRUCCIONES
    // ─────────────────────────────────────────

    defineField({
      name: "howToUse",
      title: "Modo de uso",
      type: "array",
      description: "Pasos de aplicación numerados. Máx 6.",
      of: [
        defineArrayMember({
          type: "object",
          name: "step",
          fields: [
            defineField({
              name: "step",
              title: "Número de paso",
              type: "number",
              validation: (Rule) => Rule.required().integer().positive(),
            }),
            defineField({
              name: "instruction",
              title: "Instrucción",
              type: "string",
              validation: (Rule) => Rule.required().max(120),
            }),
          ],
          preview: {
            select: { title: "instruction", subtitle: "step" },
            prepare({ title, subtitle }) {
              return { title: `${subtitle}. ${title}` };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.max(6),
    }),

    defineField({
      name: "skinTypes",
      title: "Tipos de piel",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "skinType" }] })],
      description: "Selecciona los tipos de piel para los que está recomendado",
    }),

    defineField({
      name: "volume",
      title: "Contenido / Volumen",
      type: "string",
      description: "Ej: 30ml, 50g",
    }),

    // ─────────────────────────────────────────
    // SEO
    // ─────────────────────────────────────────

    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta título",
          type: "string",
          description: "Si se deja vacío, se usa el nombre del producto.",
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: "metaDescription",
          title: "Meta descripción",
          type: "text",
          rows: 2,
          validation: (Rule) => Rule.max(160),
        }),
        defineField({
          name: "ogImage",
          title: "Imagen para redes sociales",
          type: "image",
          description: "Tamaño recomendado: 1200×630px",
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "tagline",
      media: "mainImage",
      price: "price",
      inStock: "inStock",
    },
    prepare({ title, subtitle, media, price, inStock }) {
      return {
        title,
        subtitle: `$${price?.toLocaleString("es-AR")} · ${inStock ? "✓ En stock" : "✗ Sin stock"} · ${subtitle ?? ""}`,
        media,
      };
    },
  },
});
