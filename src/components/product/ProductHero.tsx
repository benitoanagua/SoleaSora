"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ShoppingBag, ChevronLeft } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { useCart } from "@/hooks/useCart";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/types";

interface Props {
  product: Product;
}

export default function ProductHero({ product }: Props) {
  const { addItem, openCart } = useCart();
  const [adding, setAdding] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const infoRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  const images = [product.mainImage, ...(product.galleryImages ?? [])].filter(
    Boolean,
  );

  // Animación de entrada
  useEffect(() => {
    if (!infoRef.current || !imgRef.current) return;

    const ctx = gsap.context(() => {
      // Imagen entra desde la izquierda
      gsap.from(imgRef.current, {
        opacity: 0,
        x: -30,
        duration: 1,
        ease: "power2.out",
      });

      // Elementos del info entran escalonados
      const items = infoRef.current!.querySelectorAll("[data-anim]");
      gsap.from(items, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.1,
        delay: 0.2,
      });
    });

    return () => ctx.revert();
  }, [product._id]);

  const handleAdd = async () => {
    setAdding(true);
    addItem(product as any);
    await new Promise((r) => setTimeout(r, 800));
    setAdding(false);
    openCart();
  };

  return (
    <section className="min-h-screen pt-16 grid grid-cols-1 lg:grid-cols-2">
      {/* Columna imágenes */}
      <div ref={imgRef} className="relative bg-[#EDE8DF] flex flex-col">
        <div className="relative flex-1 min-h-[60vw] lg:min-h-0">
          {images[activeImg]?.asset?.url && (
            <Image
              src={images[activeImg].asset.url}
              alt={images[activeImg].alt ?? product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-opacity duration-500"
            />
          )}
        </div>

        {images.length > 1 && (
          <div className="flex gap-2 p-4 overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={cn(
                  "shrink-0 w-16 h-16 overflow-hidden transition-all duration-200",
                  activeImg === i
                    ? "ring-2 ring-[#1A1814] opacity-100"
                    : "opacity-50 hover:opacity-80",
                )}
              >
                {img?.asset?.url && (
                  <Image
                    src={img.asset.url}
                    alt={img.alt ?? ""}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Columna info */}
      <div
        ref={infoRef}
        className="flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-24 space-y-8"
      >
        <div data-anim>
          <Link
            href="/catalogo"
            className="flex items-center gap-1 text-xs tracking-widest uppercase text-[#6B6560] hover:text-[#1A1814] transition-colors w-fit"
          >
            <ChevronLeft size={14} strokeWidth={1.5} />
            Productos
          </Link>
        </div>

        <div data-anim className="flex items-center gap-3">
          <span className="text-xs tracking-widest uppercase text-[#6B6560]">
            {product.category}
          </span>
          {product.isNew && (
            <span className="bg-[#1A1814] text-[#FAF8F5] text-[10px] tracking-widest uppercase px-2.5 py-1">
              Nuevo
            </span>
          )}
        </div>

        <h1
          data-anim
          className="text-4xl md:text-5xl font-light leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {product.name}
        </h1>

        <p
          data-anim
          className="text-xl font-light italic text-[#6B6560]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {product.tagline}
        </p>

        <p
          data-anim
          className="text-sm text-[#6B6560] leading-relaxed max-w-md"
        >
          {product.shortDescription}
        </p>

        <div data-anim className="flex items-baseline gap-3">
          <span
            className="text-3xl font-light"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-lg text-[#6B6560] line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>

        {product.volume && (
          <p
            data-anim
            className="text-xs tracking-widest uppercase text-[#6B6560]"
          >
            Contenido: {product.volume}
          </p>
        )}

        <div data-anim>
          {product.inStock ? (
            <button
              onClick={handleAdd}
              className={cn(
                "flex items-center justify-center gap-3 w-full max-w-md py-4",
                "text-sm tracking-widest uppercase transition-colors duration-300",
                adding
                  ? "bg-[#C9A96E] text-[#FAF8F5]"
                  : "bg-[#1A1814] text-[#FAF8F5] hover:bg-[#C9A96E]",
              )}
            >
              <ShoppingBag size={16} strokeWidth={1.5} />
              {adding ? "Agregado al carrito ✓" : "Agregar al carrito"}
            </button>
          ) : (
            <div className="w-full max-w-md py-4 text-center text-sm tracking-widest uppercase bg-[#EDE8DF] text-[#6B6560]">
              Sin stock
            </div>
          )}
        </div>

        {product.skinTypes && product.skinTypes.length > 0 && (
          <div data-anim className="space-y-2 pt-4 border-t border-[#EDE8DF]">
            <p className="text-xs tracking-widest uppercase text-[#6B6560]">
              Apto para
            </p>
            <div className="flex flex-wrap gap-2">
              {product.skinTypes.map((type) => (
                <span
                  key={type}
                  className="text-xs border border-[#EDE8DF] px-3 py-1 text-[#6B6560]"
                >
                  {SKIN_TYPE_LABELS[type] ?? type}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

const SKIN_TYPE_LABELS: Record<string, string> = {
  all: "Todo tipo de piel",
  dry: "Piel seca",
  oily: "Piel grasa",
  combination: "Piel mixta",
  sensitive: "Piel sensible",
  mature: "Piel madura",
  acne: "Piel con acné",
};
