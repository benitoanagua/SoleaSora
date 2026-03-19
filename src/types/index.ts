// src/types/index.ts

export interface ImageMetadata {
  _type?: string;
  lqip?: string;
  palette?: any;
  dimensions?: {
    _type?: string;
    aspectRatio?: number;
    height: number;
    width: number;
  };
}

export interface ImageAsset {
  _id: string;
  url: string;
  metadata?: ImageMetadata;
}

export interface ProductImage {
  asset: ImageAsset;
  alt?: string;
}

export interface ProductImage360 {
  frame: number;
  url: string;
}

export interface Ingredient {
  name: string;
  scientificName?: string;
  benefit: string;
  icon?: { asset: ImageAsset };
}

export interface StorySection {
  headline: string;
  body?: string;
  accentImage?: { asset: ImageAsset; alt?: string };
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
  mainImage: {
    asset: ImageAsset;
    alt?: string;
  };
  shortDescription: string;
  skinTypes?: SkinType[];
}

// Producto completo para la página de detalle
export interface Product extends ProductCard {
  volume?: string;
  stripeProductId?: string;
  galleryImages?: Array<{
    asset: ImageAsset;
    alt?: string;
  }>;
  images360?: ProductImage360[];
  videoUrl?: string;
  storySections?: Array<{
    headline: string;
    body?: string;
    accentImage?: {
      asset: ImageAsset;
      alt?: string;
    };
  }>;
  ingredients?: Array<{
    name: string;
    scientificName?: string;
    benefit: string;
    icon?: {
      asset: ImageAsset;
    };
  }>;
  fullIngredientList?: string;
  benefits?: Benefit[];
  howToUse?: HowToUseStep[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: {
      asset: ImageAsset;
    };
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
  logo?: ProductImage;
  logoAlt?: ProductImage;
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
