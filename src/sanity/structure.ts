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
    ]);
