"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import type { ProductCard as ProductCardType } from "@/types";

interface Props {
  product: ProductCardType;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: Props) {
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    addItem(product);
    await new Promise((r) => setTimeout(r, 800));
    setAdding(false);
  };

  return (
    <Link
      href={`/producto/${product.slug.current}`}
      className="group relative flex flex-col"
    >
      {/* Imagen */}
      <div className="relative aspect-[3/4] bg-[#EDE8DF] overflow-hidden rounded-lg">
        {product.mainImage?.asset?.url && (
          <Image
            src={product.mainImage.asset.url}
            alt={product.mainImage.alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-[#1A1814] text-[#FAF8F5] text-[10px] tracking-widest uppercase px-2.5 py-1">
              Nuevo
            </span>
          )}
          {product.compareAtPrice && (
            <span className="bg-[#C9A96E] text-[#FAF8F5] text-[10px] tracking-widest uppercase px-2.5 py-1">
              Oferta
            </span>
          )}
          {!product.inStock && (
            <span className="bg-[#6B6560] text-[#FAF8F5] text-[10px] tracking-widest uppercase px-2.5 py-1">
              Sin stock
            </span>
          )}
        </div>

        {/* Botón agregar — aparece en hover */}
        {product.inStock && (
          <button
            onClick={handleAdd}
            aria-label={`Agregar ${product.name} al carrito`}
            className={cn(
              "absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2",
              "bg-[#FAF8F5]/95 backdrop-blur-sm text-[#1A1814]",
              "text-xs tracking-widest uppercase py-3",
              "transition-all duration-300",
              "md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100",
              adding && "bg-[#1A1814] text-[#FAF8F5]",
            )}
          >
            <ShoppingBag size={14} strokeWidth={1.5} />
            {adding ? "Agregado ✓" : "Agregar al carrito"}
          </button>
        )}
      </div>

      {/* Info */}
      <div className="pt-4 flex flex-col gap-1">
        <p className="text-xs tracking-widest uppercase text-[#6B6560]">
          {CATEGORY_LABELS[product.category] ?? product.category}
        </p>

        <h3
          className="text-lg font-light leading-snug group-hover:text-[#C9A96E] transition-colors"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {product.name}
        </h3>

        <p className="text-xs text-[#6B6560] line-clamp-2 leading-relaxed">
          {product.shortDescription}
        </p>

        {/* Precios */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-sm font-medium">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-xs text-[#6B6560] line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
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
};
