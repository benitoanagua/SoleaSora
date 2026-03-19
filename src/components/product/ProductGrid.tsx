"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search } from "lucide-react";
import ProductCard from "./ProductCard";
import type { ProductCard as ProductCardType, Category } from "@/types";
import "./ProductGrid.css";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  products: ProductCardType[];
  categories?: Category[];
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
        products.filter((p) => p.categories?.some(c => c.value === selectedCategory))
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
            <Search size={32} strokeWidth={1.5} className="product-grid__empty-icon" />
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
