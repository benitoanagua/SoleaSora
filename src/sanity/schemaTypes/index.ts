import { type SchemaTypeDefinition } from "sanity";
import product from "./product";
import siteSettings from "./siteSettings";
import category from "./category";
import skinType from "./skinType";
import homePage from "./page";
import legalPage from "./legalPage";
import aboutPage from "./aboutPage";
import contactPage from "./contactPage";
import faqPage from "./faq";
import blogPost from "./blogPost";
import promotion from "./promotion";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    product,
    siteSettings,
    category,
    skinType,
    homePage,
    legalPage,
    aboutPage,
    contactPage,
    faqPage,
    blogPost,
    promotion,
  ],
};
