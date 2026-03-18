import { sanityFetch } from "@/sanity/lib/live";
import { QUERIES } from "@/sanity/lib/queries";
import HomeHero from "@/components/home/HomeHero";
import HomeFeatured from "@/components/home/HomeFeatured";
import HomeManifesto from "@/components/home/HomeManifesto";
import type { ProductCard } from "@/types";

export default async function HomePage() {
  const { data: featured } = await sanityFetch({
    query: QUERIES.FEATURED_PRODUCTS,
  });

  return (
    <main>
      <HomeHero />
      <HomeFeatured products={featured as ProductCard[]} />
      <HomeManifesto />
    </main>
  );
}
