// Todas las queries GROQ del proyecto

export const QUERIES = {
  // Todos los productos para el catálogo (incluye sin stock)
  ALL_PRODUCTS: /* groq */ `
    *[_type == "product"] | order(order asc) {
      _id,
      name,
      slug,
      tagline,
      categories[]-> {
        _id,
        name,
        slug,
        value
      },
      price,
      compareAtPrice,
      inStock,
      isNew,
      isFeatured,
      mainImage {
        asset-> {
          _id,
          url,
          metadata {
            lqip,
            palette,
            dimensions
          }
        },
        alt
      },
      shortDescription,
      skinType-> {
        _id,
        name,
        slug,
        value
      }
    }
  `,

  // Producto individual completo
  PRODUCT_BY_SLUG: /* groq */ `
    *[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      tagline,
      categories[]-> {
        _id,
        name,
        slug,
        value,
        description,
        icon {
          asset-> {
            _id,
            url
          }
        }
      },
      price,
      compareAtPrice,
      inStock,
      volume,
      skinType-> {
        _id,
        name,
        slug,
        value,
        description
      },
      stripeProductId,

      mainImage {
        asset-> {
          _id,
          url,
          metadata {
            lqip,
            palette,
            dimensions
          }
        },
        alt
      },
      galleryImages[] {
        asset-> {
          _id,
          url,
          metadata {
            lqip,
            dimensions
          }
        },
        alt
      },
      images360[] | order(frame asc) {
        frame,
        "url": asset->url
      },
      videoUrl,

      shortDescription,
      storySections[] {
        headline,
        body,
        accentImage {
          asset-> {
            _id,
            url,
            metadata {
              lqip,
              dimensions
            }
          },
          alt
        }
      },

      ingredients[] {
        name,
        scientificName,
        benefit,
        icon {
          asset-> {
            _id,
            url,
            metadata {
              lqip,
              dimensions
            }
          }
        }
      },
      fullIngredientList,

      benefits[]{ stat, label },

      howToUse[] | order(step asc){ step, instruction },

      seo{
        metaTitle,
        metaDescription,
        ogImage {
          asset-> {
            _id,
            url,
            metadata {
              lqip,
              dimensions
            }
          }
        }
      }
    }
  `,

  // Configuración global del sitio
  SITE_SETTINGS: /* groq */ `
    *[_type == "siteSettings"][0] {
      brandName,
      heroHeadline,
      heroSubline,
      heroVideo,
      currency,
      shippingMessage,
      instagramUrl,
      whatsappNumber,
      logo {
        asset-> {
          _id,
          url,
          metadata {
            lqip,
            dimensions
          }
        }
      },
      logoAlt {
        asset-> {
          _id,
          url,
          metadata {
            lqip,
            dimensions
          }
        }
      }
    }
  `,

  // Productos destacados para el hero de homepage
  FEATURED_PRODUCTS: /* groq */ `
    *[_type == "product" && isFeatured == true && inStock == true] | order(order asc)[0..2] {
      _id,
      name,
      slug,
      tagline,
      categories[]-> {
        _id,
        name,
        value
      },
      price,
      mainImage {
        asset-> {
          _id,
          url,
          metadata {
            lqip,
            dimensions
          }
        },
        alt
      }
    }
  `,

  // Slugs de todos los productos (para generateStaticParams)
  ALL_SLUGS: /* groq */ `
    *[_type == "product"]{ "slug": slug.current }
  `,

  // Todas las categorías
  ALL_CATEGORIES: /* groq */ `
    *[_type == "category"] | order(order asc) {
      _id,
      name,
      slug,
      value,
      description,
      icon {
        asset-> {
          _id,
          url
        }
      }
    }
  `,

  // Todos los tipos de piel
  ALL_SKIN_TYPES: /* groq */ `
    *[_type == "skinType"] | order(order asc) {
      _id,
      name,
      slug,
      value,
      description
    }
  `,
};

// ─────────────────────────────────────────────────────────────
// src/sanity/structure.ts — reemplazar el contenido generado
// ─────────────────────────────────────────────────────────────
//
// import type { StructureResolver } from 'sanity/structure'
//
// export const structure: StructureResolver = (S) =>
//   S.list()
//     .title('Solea Sora')
//     .items([
//       // Singleton: Configuración del sitio
//       S.listItem()
//         .title('Configuración del sitio')
//         .child(
//           S.document()
//             .schemaType('siteSettings')
//             .documentId('siteSettings')
//         ),
//       S.divider(),
//       // Lista de productos
//       S.listItem()
//         .title('Productos')
//         .child(
//           S.documentTypeList('product').title('Productos')
//         ),
//     ])
