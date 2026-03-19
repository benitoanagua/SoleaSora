import { sanityFetch } from "@/sanity/lib/live";
import { QUERIES } from "@/sanity/lib/queries";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import MainContent from "@/components/layout/MainContent";
import PromoBanner from "@/components/home/PromoBanner";

interface PromoBannerData {
  enabled: boolean;
  message: string;
  ctaText?: string;
  ctaUrl?: string;
  backgroundColor?: string;
}

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const result = await sanityFetch({ query: QUERIES.PROMO_BANNER });
  const promoBanner = result.data as PromoBannerData | null;

  return (
    <>
      {promoBanner?.enabled && (
        <PromoBanner
          message={promoBanner.message}
          ctaText={promoBanner.ctaText}
          ctaUrl={promoBanner.ctaUrl}
          backgroundColor={promoBanner.backgroundColor}
        />
      )}
      <Navbar />
      <MainContent hasBanner={promoBanner?.enabled}>
        {children}
      </MainContent>
      <Footer />
      <CartDrawer />
    </>
  );
}
