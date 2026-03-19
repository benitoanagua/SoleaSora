import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Solea Sora")
    .items([
      S.listItem()
        .title("Configuración del sitio")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.divider(),
      S.listItem()
        .title("Productos")
        .child(S.documentTypeList("product").title("Productos")),
      S.divider(),
      S.listItem()
        .title("Categorías")
        .child(S.documentTypeList("category").title("Categorías")),
      S.listItem()
        .title("Tipos de piel")
        .child(S.documentTypeList("skinType").title("Tipos de piel")),
    ]);
