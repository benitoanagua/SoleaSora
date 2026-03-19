import { sanityFetch } from "@/sanity/lib/live";
import { QUERIES } from "@/sanity/lib/queries";
import ProductGrid from "@/components/product/ProductGrid";
import CatalogFilters from "@/components/catalog/CatalogFilters";
import type { ProductCard as ProductCardType } from "@/types";
import "./page.css";

export const metadata = {
  title: "Productos",
  description: "Explorá toda la línea de skincare sensorial Solea Sora.",
};

// Obtener categorías únicas de los productos
function getUniqueCategories(products: ProductCardType[]) {
  const categories = new Set(products.map((p) => p.category).filter(Boolean));
  return Array.from(categories);
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
                <span className="font-medium">
                  {products?.length || 0}
                </span>{" "}
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
        <svg
          className="catalog-page__empty-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
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
