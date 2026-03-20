import { sanityFetch } from "@/sanity/lib/live";
import { QUERIES } from "@/sanity/lib/queries";
import { Search } from "lucide-react";
import ProductGrid from "@/components/product/ProductGrid";
import CatalogFilters from "@/components/catalog/CatalogFilters";
import type { ProductCard as ProductCardType, Category } from "@/types";
import "./page.css";

export const metadata = {
  title: "Productos",
  description: "Explorá toda la línea de skincare sensorial Solea Sora.",
};

// Obtener categorías únicas de los productos
function getUniqueCategories(products: ProductCardType[]): Category[] {
  const categoryMap = new Map<string, Category>();
  products.forEach((p) => {
    p.categories?.forEach((cat) => {
      if (cat._id && !categoryMap.has(cat._id)) {
        categoryMap.set(cat._id, cat);
      }
    });
  });
  return Array.from(categoryMap.values());
}

// Obtener rangos de precio
function getPriceRange(products: ProductCardType[]) {
  if (!products.length) return { min: 0, max: 0 };
  const prices = products.map((p) => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

export default async function CatalogoPage() {
  const { data: products } = await sanityFetch({
    query: QUERIES.ALL_PRODUCTS,
  });

  const categories = getUniqueCategories(products as ProductCardType[]);
  const priceRange = getPriceRange(products as ProductCardType[]);

  return (
    <div className="catalog-page">
      {/* Header del catálogo */}
      <header className="catalog-page__header">
        {/* Fondo decorativo */}
        <div
          className="catalog-page__header-bg"
          aria-hidden="true"
        />

        <div className="container catalog-page__header-content">
          <div className="catalog-page__header-texts">
            {/* Línea decorativa */}
            <div className="catalog-page__divider" />

            {/* Tagline */}
            <p className="catalog-page__tagline">
              Colección completa
            </p>

            {/* Título */}
            <h1
              className="catalog-page__title"
            >
              Todos los productos
            </h1>

            {/* Descripción */}
            <p className="catalog-page__description">
              Fórmulas sensoriales pensadas para cada paso de tu ritual.
              Ingredientes naturales que iluminan tu piel.
            </p>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="catalog-page__main">
        <div className="catalog-page__layout">
          {/* Sidebar de filtros (Desktop) */}
          <aside className="catalog-page__sidebar">
            <CatalogFilters
              categories={categories}
              priceRange={priceRange}
              sticky
            />
          </aside>

          {/* Grid de productos */}
          <div className="catalog-page__content">
            {/* Mobile: Filtros como drawer */}
            <div className="catalog-page__mobile-filters">
              <CatalogFilters
                categories={categories}
                priceRange={priceRange}
                mobile
              />
            </div>

            {/* Contador de productos */}
            <div className="catalog-page__header-bar">
              <p className="catalog-page__count">
                <strong>
                  {products?.length || 0}
                </strong>{" "}
                productos
              </p>
            </div>

            {products?.length > 0 ? (
              <ProductGrid 
                products={products as ProductCardType[]} 
                categories={categories}
              />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="catalog-page__empty">
      {/* Icono ilustrativo */}
      <div className="catalog-page__empty-icon-wrapper">
        <Search size={32} strokeWidth={1.5} className="catalog-page__empty-icon" />
      </div>

      <h3
        className="catalog-page__empty-title"
      >
        No encontramos productos
      </h3>
      <p className="catalog-page__empty-description">
        Intentá ajustar los filtros o volvé a intentarlo más tarde.
      </p>
      <button className="catalog-page__empty-btn">
        Ver todos los productos
      </button>
    </div>
  );
}
