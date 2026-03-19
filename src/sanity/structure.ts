import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Solea Sora")
    .items([
      // ─────────────────────────────────────
      // CONFIGURACIÓN
      // ─────────────────────────────────────
      S.listItem()
        .title("Configuración del sitio")
        .icon(() => "⚙️")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.divider(),

      // ─────────────────────────────────────
      // PÁGINAS
      // ─────────────────────────────────────
      S.listItem()
        .title("Páginas")
        .icon(() => "📄")
        .child(
          S.list()
            .title("Páginas")
            .items([
              S.listItem()
                .title("Inicio")
                .icon(() => "🏠")
                .child(
                  S.document().schemaType("homePage").documentId("homePage"),
                ),
              S.listItem()
                .title("Sobre nosotros")
                .icon(() => "ℹ️")
                .child(
                  S.document().schemaType("aboutPage").documentId("aboutPage"),
                ),
              S.listItem()
                .title("Contacto")
                .icon(() => "📞")
                .child(
                  S.document().schemaType("contactPage").documentId("contactPage"),
                ),
              S.listItem()
                .title("FAQ")
                .icon(() => "❓")
                .child(
                  S.document().schemaType("faqPage").documentId("faqPage"),
                ),
            ]),
        ),
      S.listItem()
        .title("Páginas legales")
        .icon(() => "📜")
        .child(S.documentTypeList("legalPage").title("Páginas legales")),
      S.divider(),

      // ─────────────────────────────────────
      // CONTENIDO
      // ─────────────────────────────────────
      S.listItem()
        .title("Productos")
        .icon(() => "🛍️")
        .child(S.documentTypeList("product").title("Productos")),
      S.listItem()
        .title("Blog")
        .icon(() => "📝")
        .child(S.documentTypeList("blogPost").title("Artículos")),
      S.listItem()
        .title("Promociones")
        .icon(() => "🏷️")
        .child(S.documentTypeList("promotion").title("Promociones")),
      S.divider(),

      // ─────────────────────────────────────
      // TAXONOMÍAS
      // ─────────────────────────────────────
      S.listItem()
        .title("Categorías")
        .icon(() => "📂")
        .child(S.documentTypeList("category").title("Categorías")),
      S.listItem()
        .title("Tipos de piel")
        .icon(() => "✨")
        .child(S.documentTypeList("skinType").title("Tipos de piel")),
    ]);
