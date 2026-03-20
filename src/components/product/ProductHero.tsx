"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ShoppingBag, ChevronLeft, RotateCcw, Minus, Plus, Check } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { useCart } from "@/hooks/useCart";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/types";
import "./ProductHero.css";

interface Props {
  product: Product;
}

export default function ProductHero({ product }: Props) {
  const { addItem, openCart } = useCart();
  const [adding, setAdding] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  
  const infoRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileCTARef = useRef<HTMLDivElement>(null);

  // Combine main image and gallery images into a single array
  const images = [
    { asset: product.mainImage?.asset, alt: product.mainImage?.alt },
    ...(product.galleryImages?.map((img) => ({
      asset: img.asset,
      alt: img.alt
    })) ?? [])
  ].filter(Boolean);

  // Detectar si tiene imágenes 360 (múltiples imágenes en secuencia)
  const has360 = images.length >= 8;

  // Generar URLs de imágenes desde asset
  const imageUrls = images.map((img, i) => ({
    url: img?.asset?.url ? `${img.asset.url.startsWith('//') ? 'https:' : ''}${img.asset.url}?w=1200&h=1200&fit=crop` : null,
    alt: img?.alt || product.name
  }));

  // Animación de entrada
  useEffect(() => {
    if (!infoRef.current || !imgRef.current) return;

    const ctx = gsap.context(() => {
      // Imagen entra desde la izquierda
      gsap.from(imgRef.current, {
        opacity: 0,
        x: -30,
        duration: 1.2,
        ease: "power3.out",
      });

      // Elementos del info entran escalonados
      const items = infoRef.current!.querySelectorAll("[data-anim]");
      gsap.from(items, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.12,
        delay: 0.2,
      });

      // Mobile CTA slide up
      if (mobileCTARef.current) {
        gsap.from(mobileCTARef.current, {
          y: "100%",
          duration: 0.8,
          ease: "power3.out",
          delay: 0.5,
        });
      }
    });

    return () => ctx.revert();
  }, [product._id]);

  const handleAdd = async () => {
    setAdding(true);
    await addItem(product as any);
    await new Promise((r) => setTimeout(r, 400));
    setAdding(false);
    openCart();
  };

  // Manejo del viewer 360
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!has360) return;
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !has360) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const delta = clientX - dragStartX;
    
    // Calcular rotación basada en el movimiento
    const sensitivity = 0.5;
    const newAngle = rotationAngle + delta * sensitivity;
    setRotationAngle(newAngle);
    setDragStartX(clientX);

    // Calcular índice de imagen basado en rotación
    const imageIndex = Math.round(
      ((newAngle % 360) / 360) * images.length
    );
    const normalizedIndex = ((imageIndex % images.length) + images.length) % images.length;
    setActiveImg(normalizedIndex);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <section 
      ref={containerRef}
      className="product-hero"
    >
      {/* Columna de imágenes */}
      <div 
        ref={imgRef} 
        className={cn(
          "product-hero__image-column",
          has360 && "product-hero__image-column--draggable"
        )}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {/* Visor principal */}
        <div className="product-hero__main-image-wrapper">
          {imageUrls[activeImg]?.url && (
            <Image
              src={imageUrls[activeImg].url}
              alt={imageUrls[activeImg].alt ?? product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="product-hero__main-image"
              draggable={false}
            />
          )}

          {/* Indicador 360 (solo si hay suficientes imágenes) */}
          {has360 && (
            <>
              {/* Overlay indicador inicial */}
              <div 
                className={cn(
                  "product-hero__360-indicator",
                  isDragging ? "product-hero__360-indicator--hidden" : "product-hero__360-indicator--visible"
                )}
              >
                <div className="product-hero__360-overlay">
                  <RotateCcw size={18} strokeWidth={1.5} />
                  <span className="product-hero__360-text">
                    Arrastrá para girar
                  </span>
                </div>
              </div>

              {/* Indicador de rotación actual */}
              {isDragging && (
                <div className="product-hero__rotation-display">
                  <span className="product-hero__rotation-value">{Math.round(rotationAngle % 360)}°</span>
                </div>
              )}
            </>
          )}

          {/* Badges */}
          <div className="product-hero__badges">
            {product.isNew && (
              <span className="product-hero__badge">
                Nuevo
              </span>
            )}
            {product.compareAtPrice && (
              <span className="product-hero__badge product-hero__badge--gold">
                Oferta
              </span>
            )}
          </div>
        </div>

        {/* Thumbnails (solo desktop) */}
        {images.length > 1 && !has360 && (
          <div className="product-hero__thumbnails-desktop">
            {imageUrls.map((imageUrl, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={cn(
                  "product-hero__thumbnail-button",
                  activeImg === i
                    ? "product-hero__thumbnail-button--active"
                    : "product-hero__thumbnail-button--inactive"
                )}
              >
                {imageUrl?.url && (
                  <Image
                    src={imageUrl.url}
                    alt={imageUrl.alt ?? ""}
                    width={80}
                    height={80}
                    className="product-hero__thumbnail-image"
                  />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Thumbnails mobile */}
        {images.length > 1 && !has360 && (
          <div className="product-hero__thumbnails-mobile">
            {imageUrls.map((imageUrl, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={cn(
                  "product-hero__thumbnail-button--mobile",
                  activeImg === i
                    ? "product-hero__thumbnail-button--active"
                    : "product-hero__thumbnail-button--inactive"
                )}
              >
                {imageUrl?.url && (
                  <Image
                    src={imageUrl.url}
                    alt={imageUrl.alt ?? ""}
                    width={64}
                    height={64}
                    className="product-hero__thumbnail-image"
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Columna de información */}
      <div
        ref={infoRef}
        className="product-hero__info-column"
      >
        {/* Breadcrumb */}
        <div data-anim>
          <Link
            href="/catalogo"
            className="product-hero__breadcrumb"
          >
            <ChevronLeft 
              size={14} 
              strokeWidth={1.5} 
              className="product-hero__breadcrumb-icon" 
            />
            Volver a productos
          </Link>
        </div>

        {/* Categoría y badges */}
        <div data-anim className="product-hero__category">
          <span className="product-hero__category-label">
            {product.categories?.map(c => c.name).join(' · ') ?? ''}
          </span>
        </div>

        {/* Título del producto */}
        <h1
          data-anim
          className="product-hero__title"
        >
          {product.name}
        </h1>

        {/* Tagline */}
        {product.tagline && (
          <p
            data-anim
            className="product-hero__tagline"
          >
            {product.tagline}
          </p>
        )}

        {/* Descripción corta */}
        <p
          data-anim
          className="product-hero__description"
        >
          {product.shortDescription}
        </p>

        {/* Precio */}
        <div data-anim className="product-hero__price-wrapper">
          <span
            className="product-hero__price"
          >
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <>
              <span className="product-hero__compare-price">
                {formatPrice(product.compareAtPrice)}
              </span>
              <span className="product-hero__discount">
                Ahorrás {Math.round((1 - product.price / product.compareAtPrice) * 100)}%
              </span>
            </>
          )}
        </div>

        {/* Volumen / Contenido */}
        {product.volume && (
          <p
            data-anim
            className="product-hero__volume"
          >
            Contenido: {product.volume}
          </p>
        )}

        {/* Selector de cantidad (opcional) */}
        <div data-anim className="product-hero__quantity">
          <div className="product-hero__quantity-controls">
            <button
              className="product-hero__quantity-button"
              aria-label="Reducir cantidad"
            >
              <Minus size={12} strokeWidth={2} />
            </button>
            <span className="product-hero__quantity-value">1</span>
            <button
              className="product-hero__quantity-button"
              aria-label="Aumentar cantidad"
            >
              <Plus size={12} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* CTA Principal */}
        <div data-anim>
          {product.inStock ? (
            <button
              onClick={handleAdd}
              className={cn(
                "product-hero__cta",
                adding
                  ? "product-hero__cta--adding"
                  : "product-hero__cta--primary"
              )}
            >
              {adding ? (
                <>
                  <span className="product-hero__cta-spinner" />
                  <span>Agregando...</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={18} strokeWidth={1.5} />
                  <span>Agregar al carrito</span>
                </>
              )}
            </button>
          ) : (
            <div className="product-hero__cta--out-of-stock">
              Sin stock
            </div>
          )}
        </div>

        {/* Tipo de piel */}
        {product.skinType && (
          <div
            data-anim
            className="product-hero__skin-types"
          >
            <p className="product-hero__skin-types-label">
              Apto para
            </p>
            <div className="product-hero__skin-types-list">
              <span className="product-hero__skin-type-tag">
                {product.skinType.name ?? (product.skinType.value ? SKIN_TYPE_LABELS[product.skinType.value] : '')}
              </span>
            </div>
          </div>
        )}

        {/* Información de envío */}
        <div data-anim className="product-hero__shipping">
          <p className="product-hero__shipping-item">
            <Check size={18} strokeWidth={1.5} className="product-hero__shipping-icon" />
            Envío gratis en compras superiores a $50.000
          </p>
          <p className="product-hero__shipping-item">
            <RotateCcw size={18} strokeWidth={1.5} className="product-hero__shipping-icon" />
            Devolución gratuita dentro de los 30 días
          </p>
        </div>
      </div>

      {/* Mobile: CTA Persistente en la parte inferior */}
      <div
        ref={mobileCTARef}
        className="product-hero__mobile-cta"
      >
        {/* Precio */}
        <div className="product-hero__mobile-price-wrapper">
          <p className="product-hero__mobile-price-label">Total</p>
          <p 
            className="product-hero__mobile-price"
          >
            {formatPrice(product.price)}
          </p>
        </div>

        {/* Botón agregar */}
        {product.inStock ? (
          <button
            onClick={handleAdd}
            disabled={adding}
            className={cn(
              "product-hero__mobile-button",
              adding
                ? "product-hero__mobile-button--adding"
                : "product-hero__mobile-button--primary"
            )}
          >
            {adding ? (
              <span className="product-hero__mobile-spinner" />
            ) : (
              <ShoppingBag size={14} strokeWidth={1.5} />
            )}
            <span>{adding ? "Agregado" : "Agregar"}</span>
          </button>
        ) : (
          <button
            disabled
            className="product-hero__mobile-button--out-of-stock"
          >
            Sin stock
          </button>
        )}
      </div>

      {/* Spacer para el CTA móvil */}
      <div className="product-hero__spacer" />
    </section>
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

const SKIN_TYPE_LABELS: Record<string, string> = {
  all: "Todo tipo de piel",
  dry: "Piel seca",
  oily: "Piel grasa",
  combination: "Piel mixta",
  sensitive: "Piel sensible",
  mature: "Piel madura",
  acne: "Piel con acné",
};
