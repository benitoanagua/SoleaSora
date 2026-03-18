"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard from "@/components/product/ProductCard";
import type { ProductCard as ProductCardType } from "@/types";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  products: ProductCardType[];
}

export default function HomeFeatured({ products }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Título
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Cards con stagger
      const cards = gridRef.current?.querySelectorAll(".product-card");
      if (cards?.length) {
        gsap.from(cards, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [products]);

  if (!products?.length) return null;

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="flex items-end justify-between mb-16">
          <div className="space-y-3">
            <p className="text-xs tracking-widest uppercase text-[#6B6560]">
              Destacados
            </p>
            <h2
              className="text-4xl md:text-5xl font-light"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Rituales esenciales
            </h2>
          </div>
          <Link
            href="/catalogo"
            className="hidden md:block text-sm tracking-widest uppercase border-b border-[#1A1814] pb-0.5 hover:text-[#C9A96E] hover:border-[#C9A96E] transition-colors"
          >
            Ver todos
          </Link>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
        >
          {products.map((product, i) => (
            <div key={product._id} className="product-card">
              <ProductCard product={product} priority={i === 0} />
            </div>
          ))}
        </div>

        {/* CTA mobile */}
        <div className="mt-12 text-center md:hidden">
          <Link
            href="/catalogo"
            className="text-sm tracking-widest uppercase border-b border-[#1A1814] pb-0.5"
          >
            Ver todos los productos
          </Link>
        </div>
      </div>
    </section>
  );
}
