import { sanityFetch } from "@/sanity/lib/live";
import { QUERIES } from "@/sanity/lib/queries";
import ProductGrid from "@/components/product/ProductGrid";
import type { ProductCard as ProductCardType } from "@/types";

export const metadata = {
  title: "Productos",
  description: "Explorá toda la línea de skincare sensorial Solea Sora.",
};

export default async function CatalogoPage() {
  const { data: products } = await sanityFetch({
    query: QUERIES.ALL_PRODUCTS,
  });

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 space-y-3">
          <p className="text-xs tracking-widest uppercase text-[#6B6560]">
            Colección
          </p>
          <h1
            className="text-5xl md:text-6xl font-light"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Todos los productos
          </h1>
          <p className="text-[#6B6560] max-w-md leading-relaxed">
            Fórmulas sensoriales pensadas para cada paso de tu ritual.
          </p>
        </div>

        {products?.length > 0 ? (
          <ProductGrid products={products as ProductCardType[]} />
        ) : (
          <div className="flex items-center justify-center py-32">
            <p className="text-[#6B6560]">No hay productos disponibles.</p>
          </div>
        )}
      </div>
    </div>
  );
}
