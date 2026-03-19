import { type SchemaTypeDefinition } from "sanity";
import product from "./product";
import siteSettings from "./siteSettings";
import category from "./category";
import skinType from "./skinType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, siteSettings, category, skinType],
};
