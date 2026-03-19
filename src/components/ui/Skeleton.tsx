import { cn } from "@/lib/utils";
import "./Skeleton.css";

interface Props {
  className?: string;
  variant?: "rect" | "circle" | "rounded";
  animation?: "pulse" | "wave" | "none";
  width?: string | number;
  height?: string | number;
}

/**
 * Skeleton loading placeholder
 * Según spec: "Uso de Skeleton Screens en lugar de spinners giratorios"
 */
export default function Skeleton({
  className,
  variant = "rect",
  animation = "pulse",
  width,
  height,
}: Props) {
  return (
    <div
      className={cn(
        "skeleton",
        variant === "rect" && "skeleton--rect",
        variant === "rounded" && "skeleton--rounded",
        variant === "circle" && "skeleton--circle",
        animation === "pulse" && "skeleton--pulse",
        animation === "wave" && "skeleton--wave",
        className
      )}
      style={{
        width,
        height,
      }}
      aria-hidden="true"
    />
  );
}

/**
 * Skeleton para ProductCard
 */
export function ProductCardSkeleton() {
  return (
    <div className="product-card-skeleton">
      {/* Imagen */}
      <Skeleton 
        variant="rect" 
        className="product-card-skeleton__image" 
        animation="wave"
      />
      
      {/* Información */}
      <div className="product-card-skeleton__info">
        {/* Categoría */}
        <Skeleton className="product-card-skeleton__category" />
        
        {/* Título */}
        <Skeleton className="product-card-skeleton__title" />
        
        {/* Descripción */}
        <Skeleton className="product-card-skeleton__description" />
        <Skeleton className="product-card-skeleton__description-short" />
        
        {/* Precio */}
        <Skeleton className="product-card-skeleton__price" />
      </div>
    </div>
  );
}

/**
 * Skeleton para lista de productos (grid)
 */
export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="product-grid-skeleton">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * Skeleton para página de producto
 */
export function ProductPageSkeleton() {
  return (
    <div className="product-page-skeleton">
      <div className="product-page-skeleton__container">
        {/* Grid layout */}
        <div className="product-page-skeleton__grid">
          {/* Columna imagen */}
          <div className="product-page-skeleton__images">
            <Skeleton 
              variant="rect" 
              className="product-page-skeleton__main-image" 
              animation="wave"
            />
            {/* Thumbnails */}
            <div className="product-page-skeleton__thumbnails">
              <Skeleton variant="rounded" className="product-page-skeleton__thumbnail" />
              <Skeleton variant="rounded" className="product-page-skeleton__thumbnail" />
              <Skeleton variant="rounded" className="product-page-skeleton__thumbnail" />
            </div>
          </div>

          {/* Columna info */}
          <div className="product-page-skeleton__info">
            {/* Breadcrumb */}
            <Skeleton className="product-page-skeleton__breadcrumb" />
            
            {/* Categoría */}
            <Skeleton className="product-page-skeleton__category" />
            
            {/* Título */}
            <Skeleton className="product-page-skeleton__title" />
            
            {/* Tagline */}
            <Skeleton className="product-page-skeleton__tagline" />
            
            {/* Descripción */}
            <Skeleton className="product-page-skeleton__description" />
            <Skeleton className="product-page-skeleton__description-short" />
            
            {/* Precio */}
            <Skeleton className="product-page-skeleton__price" />
            
            {/* CTA */}
            <Skeleton className="product-page-skeleton__cta" />
            
            {/* Skin types */}
            <div className="product-page-skeleton__skin-types">
              <Skeleton variant="rounded" className="product-page-skeleton__skin-type-tag" />
              <Skeleton variant="rounded" className="product-page-skeleton__skin-type-tag" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton para el carrito
 */
export function CartSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="cart-skeleton">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="cart-skeleton__item">
          {/* Imagen */}
          <Skeleton variant="rounded" className="cart-skeleton__image" />
          
          {/* Info */}
          <div className="cart-skeleton__info">
            <Skeleton className="cart-skeleton__title" />
            <Skeleton className="cart-skeleton__subtitle" />
            <div className="cart-skeleton__controls">
              <Skeleton variant="rounded" className="cart-skeleton__quantity" />
              <Skeleton className="cart-skeleton__price" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
