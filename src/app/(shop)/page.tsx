import { sanityFetch } from "@/sanity/lib/live";
import { QUERIES } from "@/sanity/lib/queries";
import HomeHero from "@/components/home/HomeHero";
import HomeFeatured from "@/components/home/HomeFeatured";
import HomeNarrativeBlocks from "@/components/home/HomeNarrativeBlocks";
import HomeManifesto from "@/components/home/HomeManifesto";
import HomeBenefits from "@/components/home/HomeBenefits";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import type { ProductCard } from "@/types";

interface HomePageData {
  hero?: {
    headline: string;
    subheadline?: string;
    backgroundImage?: { asset: { url: string } };
    backgroundVideo?: string;
    cta?: { text: string; url: string };
  };
  featuredProducts?: ProductCard[];
  benefitsSection?: {
    title?: string;
    benefits?: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  testimonials?: Array<{
    quote: string;
    author: string;
    role?: string;
    avatar?: { asset: { url: string } };
    rating?: number;
  }>;
}

interface SiteSettingsData {
  heroHeadline?: string;
  heroSubline?: string;
  heroVideo?: string;
}

export default async function HomePage() {
  const [featuredResult, homeResult, siteSettingsResult] = await Promise.all([
    sanityFetch({ query: QUERIES.FEATURED_PRODUCTS }),
    sanityFetch({ query: QUERIES.HOME_PAGE }),
    sanityFetch({ query: QUERIES.SITE_SETTINGS }),
  ]);

  const featured = featuredResult.data as ProductCard[];
  const home = homeResult.data as HomePageData;
  const siteSettings = siteSettingsResult.data as SiteSettingsData;

  const heroHeadline = siteSettings?.heroHeadline || home?.hero?.headline;
  const heroSubline = siteSettings?.heroSubline || home?.hero?.subheadline;
  const heroVideo = siteSettings?.heroVideo || home?.hero?.backgroundVideo;

  return (
    <>
      {/* Hero */}
      <HomeHero
        headline={heroHeadline}
        subheadline={heroSubline}
        backgroundImage={home?.hero?.backgroundImage}
        backgroundVideo={heroVideo}
        cta={home?.hero?.cta}
      />

      {/* Beneficios */}
      {home?.benefitsSection?.benefits && (
        <HomeBenefits
          title={home.benefitsSection.title}
          benefits={home.benefitsSection.benefits}
        />
      )}

      {/* Productos destacados */}
      <HomeFeatured products={featured} />

      {/* Bloques narrativos */}
      <HomeNarrativeBlocks />

      {/* Testimonios */}
      {home?.testimonials && home.testimonials.length > 0 && (
        <HomeTestimonials testimonials={home.testimonials} />
      )}

      {/* Manifesto */}
      <HomeManifesto />
    </>
  );
}
