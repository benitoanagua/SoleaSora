// src/sanity/lib/queries.ts
// Todas las queries GROQ del proyecto

export const QUERIES = {
  // Todos los productos para el catálogo
  ALL_PRODUCTS: /* groq */ `
    *[_type == "product" && inStock == true] | order(order asc) {
      _id,
      name,
      slug,
      tagline,
      category,
      price,
      compareAtPrice,
      inStock,
      isNew,
      isFeatured,
      "mainImage": mainImage{
        asset->{url, metadata{lqip, palette}},
        alt
      },
      shortDescription,
      skinTypes
    }
  `,

  // Producto individual completo
  PRODUCT_BY_SLUG: /* groq */ `
    *[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      tagline,
      category,
      price,
      compareAtPrice,
      inStock,
      volume,
      skinTypes,
      stripeProductId,

      "mainImage": mainImage{
        asset->{url, metadata{lqip, palette, dimensions}},
        alt
      },
      "galleryImages": galleryImages[]{
        asset->{url, metadata{lqip}},
        alt
      },
      "images360": images360[] | order(frame asc) {
        frame,
        "url": asset->url
      },
      videoUrl,

      shortDescription,
      storySections[]{
        headline,
        body,
        "accentImage": accentImage{asset->{url}, alt}
      },

      ingredients[]{
        name,
        scientificName,
        benefit,
        "icon": icon{asset->{url}}
      },
      fullIngredientList,

      benefits[]{ stat, label },

      howToUse[] | order(step asc){ step, instruction },

      seo{
        metaTitle,
        metaDescription,
        "ogImage": ogImage{asset->{url}}
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
      "logo":    logo{asset->{url}},
      "logoAlt": logoAlt{asset->{url}}
    }
  `,

  // Productos destacados para el hero de homepage
  FEATURED_PRODUCTS: /* groq */ `
    *[_type == "product" && isFeatured == true && inStock == true] | order(order asc)[0..2] {
      _id,
      name,
      slug,
      tagline,
      price,
      "mainImage": mainImage{asset->{url, metadata{lqip}}, alt}
    }
  `,

  // Slugs de todos los productos (para generateStaticParams)
  ALL_SLUGS: /* groq */ `
    *[_type == "product"]{ "slug": slug.current }
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
