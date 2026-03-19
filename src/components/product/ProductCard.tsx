"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import type { ProductCard as ProductCardType } from "@/types";
import "./ProductCard.css";

interface Props {
  product: ProductCardType;
  priority?: boolean;
  showQuickAdd?: boolean;
}

export default function ProductCard({ 
  product, 
  priority = false,
  showQuickAdd = true 
}: Props) {
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Detectar si es dispositivo táctil
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    await addItem(product);
    await new Promise((r) => setTimeout(r, 400));
    setAdding(false);
  };

  // Calcular descuento
  const discount = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
      )
    : 0;

  // Generar URL de imagen principal desde asset
  const mainImageUrl = product.mainImage?.asset?.url
    ? `${product.mainImage.asset.url.startsWith('//') ? 'https:' : ''}${product.mainImage.asset.url}?w=800&h=1000&fit=crop`
    : null;

  // Placeholder cuando no hay imagen
  const showPlaceholder = !mainImageUrl && !imageLoaded;

  return (
    <Link
      href={`/producto/${product.slug.current}`}
      className="product-card"
      onMouseEnter={() => !isTouch && setIsHovered(true)}
      onMouseLeave={() => !isTouch && setIsHovered(false)}
    >
      {/* Contenedor de Imagen */}
      <div className={`product-card__image-wrapper ${isHovered && !isTouch ? 'product-card__image-wrapper--hovered' : ''}`}>
        {/* Placeholder cuando no hay imagen */}
        {showPlaceholder && (
          <div className="product-card__skeleton product-card__skeleton--no-anim">
            <div className="product-card__placeholder">
              <svg
                className="product-card__placeholder-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="product-card__placeholder-text">
                Imagen no disponible
              </span>
            </div>
          </div>
        )}

        {/* Skeleton loading cuando hay imagen pero aún no carga */}
        {!imageLoaded && !showPlaceholder && (
          <div className="product-card__skeleton" />
        )}

        {/* Imagen principal */}
        {mainImageUrl && (
          <Image
            src={mainImageUrl}
            alt={product.mainImage?.alt || product.name}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`product-card__image ${isHovered && !isTouch ? 'product-card__image--hovered' : ''}`}
            onLoad={() => setImageLoaded(true)}
          />
        )}

        {/* Badges */}
        <div className="product-card__badges">
          {product.isNew && (
            <span className="product-card__badge product-card__badge--new">
              Nuevo
            </span>
          )}
          {discount > 0 && (
            <span className="product-card__badge product-card__badge--sale">
              -{discount}%
            </span>
          )}
          {!product.inStock && (
            <span className="product-card__badge product-card__badge--out">
              Sin stock
            </span>
          )}
        </div>

        {/* Botón agregar rápido */}
        {showQuickAdd && product.inStock && (
          <button
            onClick={handleAdd}
            aria-label={`Agregar ${product.name} al carrito`}
            className={`product-card__add-btn ${adding ? 'product-card__add-btn--adding' : ''} ${isTouch ? 'product-card__add-btn--touch' : ''}`}
          >
            {adding ? (
              <>
                <span className="product-card__spinner" />
                <span>Agregando...</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} strokeWidth={1.5} />
                <span>Agregar al carrito</span>
              </>
            )}
          </button>
        )}

        {/* Overlay para feedback visual en mobile */}
        {isTouch && (
          <div className={`product-card__overlay ${isHovered ? 'product-card__overlay--visible' : ''}`} />
        )}
      </div>

      {/* Información del producto */}
      <div className="product-card__info">
        {/* Categoría */}
        <p className="product-card__category">
          {product.categories?.[0]?.name ?? (product.categories?.[0]?.value ? CATEGORY_LABELS[product.categories[0].value] : '')}
        </p>

        {/* Nombre */}
        <h3 className={`product-card__name ${isHovered ? 'product-card__name--hovered' : ''}`}>
          {product.name}
        </h3>

        {/* Descripción corta */}
        {product.shortDescription && (
          <p className="product-card__description">
            {product.shortDescription}
          </p>
        )}

        {/* Precios */}
        <div className="product-card__prices">
          <span className="product-card__price">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <>
              <span className="product-card__price-compare">
                {formatPrice(product.compareAtPrice)}
              </span>
              <span className="product-card__discount">
                Ahorrás {discount}%
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

const CATEGORY_LABELS: Record<string, string> = {
  serum: "Sérum",
  cream: "Crema",
  cleanser: "Limpiador",
  sunscreen: "Protector solar",
  mask: "Mascarilla",
  "eye-cream": "Contorno de ojos",
  toner: "Tónico",
  oil: "Aceite",
  moisturizer: "Hidratante",
};
