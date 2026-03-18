// src/types/index.ts

export interface ProductImage {
  asset: { url: string; metadata?: { lqip?: string; palette?: any } };
  alt: string;
}

export interface ProductImage360 {
  frame: number;
  url: string;
}

export interface Ingredient {
  name: string;
  scientificName?: string;
  benefit: string;
  icon?: { asset: { url: string } };
}

export interface StorySection {
  headline: string;
  body?: string;
  accentImage?: { asset: { url: string }; alt?: string };
}

export interface Benefit {
  stat: string;
  label: string;
}

export interface HowToUseStep {
  step: number;
  instruction: string;
}

export type SkinType =
  | "all"
  | "dry"
  | "oily"
  | "combination"
  | "sensitive"
  | "mature"
  | "acne";

export type ProductCategory =
  | "serum"
  | "cream"
  | "cleanser"
  | "sunscreen"
  | "mask"
  | "eye-cream"
  | "toner"
  | "oil";

// Producto para el catálogo (campos mínimos)
export interface ProductCard {
  _id: string;
  name: string;
  slug: { current: string };
  tagline: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  mainImage: ProductImage;
  shortDescription: string;
  skinTypes?: SkinType[];
}

// Producto completo para la página de detalle
export interface Product extends ProductCard {
  volume?: string;
  stripeProductId?: string;
  galleryImages?: ProductImage[];
  images360?: ProductImage360[];
  videoUrl?: string;
  storySections?: StorySection[];
  ingredients?: Ingredient[];
  fullIngredientList?: string;
  benefits?: Benefit[];
  howToUse?: HowToUseStep[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: { asset: { url: string } };
  };
}

export interface SiteSettings {
  brandName: string;
  heroHeadline: string;
  heroSubline?: string;
  heroVideo?: string;
  currency: "ARS" | "USD" | "BOB";
  shippingMessage?: string;
  instagramUrl?: string;
  whatsappNumber?: string;
  logo?: { asset: { url: string } };
  logoAlt?: { asset: { url: string } };
}

// Carrito
export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  mainImage: ProductImage;
  slug: { current: string };
  stripeProductId?: string;
}

export interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: ProductCard) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  total: number;
  count: number;
}
