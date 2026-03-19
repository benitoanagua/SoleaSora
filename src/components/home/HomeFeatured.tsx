"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard from "@/components/product/ProductCard";
import type { ProductCard as ProductCardType } from "@/types";
import "./HomeFeatured.css";

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
    <section ref={sectionRef} className="home-featured">
      <div className="container home-featured__container">
        {/* Header */}
        <div ref={titleRef} className="home-featured__header">
          <div className="home-featured__title-wrapper">
            <p className="home-featured__tagline">Destacados</p>
            <h2
              className="home-featured__title"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Rituales esenciales
            </h2>
          </div>
          <Link
            href="/catalogo"
            className="home-featured__link"
          >
            Ver todos
          </Link>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="home-featured__grid"
        >
          {products.map((product, i) => (
            <div key={product._id} className="home-featured__item">
              <ProductCard product={product} priority={i === 0} />
            </div>
          ))}
        </div>

        {/* CTA mobile */}
        <div className="home-featured__mobile-cta">
          <Link
            href="/catalogo"
            className="home-featured__mobile-link"
          >
            Ver todos los productos
          </Link>
        </div>
      </div>
    </section>
  );
}
