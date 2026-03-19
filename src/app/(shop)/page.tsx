import { sanityFetch } from "@/sanity/lib/live";
import { QUERIES } from "@/sanity/lib/queries";
import HomeHero from "@/components/home/HomeHero";
import HomeFeatured from "@/components/home/HomeFeatured";
import HomeNarrativeBlocks from "@/components/home/HomeNarrativeBlocks";
import HomeManifesto from "@/components/home/HomeManifesto";
import HomeBenefits from "@/components/home/HomeBenefits";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import PromoBanner from "@/components/home/PromoBanner";
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
  promoBanner?: {
    enabled: boolean;
    message: string;
    ctaText?: string;
    ctaUrl?: string;
    backgroundColor?: string;
  };
  testimonials?: Array<{
    quote: string;
    author: string;
    role?: string;
    avatar?: { asset: { url: string } };
    rating?: number;
  }>;
}

export default async function HomePage() {
  const [featuredResult, homeResult] = await Promise.all([
    sanityFetch({ query: QUERIES.FEATURED_PRODUCTS }),
    sanityFetch({ query: QUERIES.HOME_PAGE }),
  ]);

  const featured = featuredResult.data as ProductCard[];
  const home = homeResult.data as HomePageData;

  return (
    <main>
      {/* Banner promocional */}
      {home?.promoBanner?.enabled && (
        <PromoBanner
          message={home.promoBanner.message}
          ctaText={home.promoBanner.ctaText}
          ctaUrl={home.promoBanner.ctaUrl}
          backgroundColor={home.promoBanner.backgroundColor}
        />
      )}

      {/* Hero */}
      <HomeHero
        headline={home?.hero?.headline}
        subheadline={home?.hero?.subheadline}
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
    </main>
  );
}
