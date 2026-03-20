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
      compareAtPrice,
      inStock,
      isNew,
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

  // Página de inicio
  HOME_PAGE: /* groq */ `
    *[_type == "homePage"][0] {
      hero {
        headline,
        subheadline,
        backgroundImage {
          asset-> {
            _id,
            url
          }
        },
        backgroundVideo,
        cta {
          text,
          url
        }
      },
      featuredProducts[]-> {
        _id,
        name,
        slug,
        tagline,
        price,
        mainImage {
          asset-> {
            _id,
            url,
            metadata {
              lqip
            }
          },
          alt
        }
      },
      benefitsSection {
        title,
        benefits[] {
          icon,
          title,
          description
        }
      },
      promoBanner {
        enabled,
        message,
        ctaText,
        ctaUrl,
        backgroundColor
      },
      testimonials[] {
        quote,
        author,
        role,
        avatar {
          asset-> {
            _id,
            url
          }
        },
        rating
      }
    }
  `,

  // Página sobre nosotros
  ABOUT_PAGE: /* groq */ `
    *[_type == "aboutPage"][0] {
      title,
      heroImage {
        asset-> { _id, url }
      },
      heroText,
      story {
        title,
        content,
        image {
          asset-> { _id, url }
        }
      },
      mission {
        title,
        content,
        icon
      },
      vision {
        title,
        content,
        icon
      },
      values[] {
        icon,
        title,
        description
      },
      team[]{
        name,
        role,
        photo {
          asset-> { _id, url }
        },
        bio
      }
    }
  `,

  // Página de contacto
  CONTACT_PAGE: /* groq */ `
    *[_type == "contactPage"][0] {
      title,
      intro,
      contactInfo {
        items[] {
          icon,
          label,
          value,
          link
        }
      },
      socialLinks[] {
        platform,
        url
      },
      formTitle,
      formFields[]{
        name,
        label,
        type,
        required
      }
    }
  `,

  // Página FAQ
  FAQ_PAGE: /* groq */ `
    *[_type == "faqPage"][0] {
      title,
      intro,
      categories[] {
        icon,
        title,
        questions[] {
          question,
          answer
        }
      }
    }
  `,

  // Artículos de blog
  BLOG_POSTS: /* groq */ `
    *[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      featuredImage {
        asset-> { _id, url },
        alt
      },
      author,
      publishedAt,
      categories,
      tags,
      featured
    }
  `,

  // Artículo de blog por slug
  BLOG_POST_BY_SLUG: /* groq */ `
    *[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      featuredImage {
        asset-> { _id, url },
        alt
      },
      content,
      author,
      publishedAt,
      categories,
      tags,
      seo {
        metaTitle,
        metaDescription
      }
    }
  `,

  // Páginas legales
  LEGAL_PAGES: /* groq */ `
    *[_type == "legalPage"] | order(title asc) {
      _id,
      title,
      slug,
      type,
      lastUpdated
    }
  `,

  // Página legal por slug
  LEGAL_PAGE_BY_SLUG: /* groq */ `
    *[_type == "legalPage" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      type,
      content,
      lastUpdated
    }
  `,

  // Promociones activas
  ACTIVE_PROMOTIONS: /* groq */ `
    *[_type == "promotion" && active == true] {
      _id,
      title,
      description,
      discountType,
      discountValue,
      code,
      image {
        asset-> { _id, url }
      },
      minimumPurchase,
      banner
    }
  `,

  // Banner promocional global
  PROMO_BANNER: /* groq */ `
    *[_type == "homePage"][0] {
      promoBanner {
        enabled,
        message,
        ctaText,
        ctaUrl,
        backgroundColor
      }
    }.promoBanner
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
