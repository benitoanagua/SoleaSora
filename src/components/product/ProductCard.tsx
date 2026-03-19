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

  return (
    <Link
      href={`/producto/${product.slug.current}`}
      className="product-card"
      onMouseEnter={() => !isTouch && setIsHovered(true)}
      onMouseLeave={() => !isTouch && setIsHovered(false)}
    >
      {/* Contenedor de Imagen */}
      <div className={`product-card__image-wrapper ${isHovered && !isTouch ? 'product-card__image-wrapper--hovered' : ''}`}>
        {/* Skeleton loading */}
        {!imageLoaded && (
          <div className="product-card__skeleton" />
        )}

        {/* Imagen principal */}
        {product.mainImage?.asset?.url && (
          <>
            <Image
              src={product.mainImage.asset.url}
              alt={product.mainImage.alt || product.name}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`product-card__image ${isHovered && !isTouch ? 'product-card__image--hovered' : ''}`}
              onLoad={() => setImageLoaded(true)}
            />

            {/* Imagen secundaria en hover (crossfade) */}
            {product.galleryImages?.[0]?.asset?.url && (
              <Image
                src={product.galleryImages[0].asset.url}
                alt={`${product.name} - detalle`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`product-card__image-secondary ${isHovered && !isTouch ? 'product-card__image-secondary--visible' : ''}`}
              />
            )}
          </>
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
          {CATEGORY_LABELS[product.category] ?? product.category}
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
