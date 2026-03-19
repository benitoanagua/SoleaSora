"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard from "./ProductCard";
import type { ProductCard as ProductCardType } from "@/types";
import "./ProductGrid.css";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  products: ProductCardType[];
  categories?: string[];
}

export default function ProductGrid({ products, categories = [] }: Props) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [visibleProducts, setVisibleProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedCategory) {
      setVisibleProducts(products);
    } else {
      setVisibleProducts(
        products.filter((p) => p.category === selectedCategory)
      );
    }
  }, [products, selectedCategory]);

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".product-card");
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.set(cards, { opacity: 0, y: 30 });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }, gridRef);

    return () => ctx.revert();
  }, [visibleProducts]);

  return (
    <div ref={gridRef} className="product-grid">
      {/* Grid responsive */}
      <div className="container product-grid__container">
        {visibleProducts.map((product, i) => (
          <div key={product._id} className="product-grid__item">
            <ProductCard 
              product={product} 
              priority={i < 6}
              showQuickAdd
            />
          </div>
        ))}
      </div>

      {/* Empty state */}
      {visibleProducts.length === 0 && (
        <div className="product-grid__empty">
          <div className="product-grid__empty-icon-wrapper">
            <svg
              className="product-grid__empty-icon"
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
            className="product-grid__empty-title"
            style={{ fontFamily: "var(--font-display)" }}
          >
            No hay productos en esta categoría
          </h3>
          <p className="product-grid__empty-description">
            Intentá seleccionar otra categoría o volvé a la vista de todos los
            productos.
          </p>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="product-grid__empty-btn"
            >
              Ver todos
            </button>
          )}
        </div>
      )}
    </div>
  );
}
