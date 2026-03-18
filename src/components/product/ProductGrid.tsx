"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard from "./ProductCard";
import type { ProductCard as ProductCardType } from "@/types";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  products: ProductCardType[];
}

export default function ProductGrid({ products }: Props) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".product-card");
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, gridRef);

    return () => ctx.revert();
  }, [products]);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
    >
      {products.map((product, i) => (
        <div key={product._id} className="product-card">
          <ProductCard product={product} priority={i < 3} />
        </div>
      ))}
    </div>
  );
}
