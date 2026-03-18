import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { QUERIES } from "@/sanity/lib/queries";
import ProductHero from "@/components/product/ProductHero";
import ProductStory from "@/components/product/ProductStory";
import ProductIngredients from "@/components/product/ProductIngredients";
import ProductBenefits from "@/components/product/ProductBenefits";
import ProductHowToUse from "@/components/product/ProductHowToUse";
import type { Product } from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const data = await client.fetch(QUERIES.ALL_SLUGS);
  return data?.map(({ slug }: { slug: string }) => ({ slug })) ?? [];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { data: product } = await sanityFetch({
    query: QUERIES.PRODUCT_BY_SLUG,
    params: { slug },
  });
  if (!product) return {};
  return {
    title: product.seo?.metaTitle ?? product.name,
    description: product.seo?.metaDescription ?? product.shortDescription,
    openGraph: {
      images: product.seo?.ogImage?.asset?.url
        ? [product.seo.ogImage.asset.url]
        : product.mainImage?.asset?.url
          ? [product.mainImage.asset.url]
          : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const { data: product } = await sanityFetch({
    query: QUERIES.PRODUCT_BY_SLUG,
    params: { slug },
  });

  if (!product) notFound();

  return (
    <div className="min-h-screen">
      <ProductHero product={product} />
      <ProductStory sections={product.storySections ?? []} />
      <ProductIngredients ingredients={product.ingredients ?? []} />
      <ProductBenefits benefits={product.benefits ?? []} />
      <ProductHowToUse steps={product.howToUse ?? []} />
    </div>
  );
}
