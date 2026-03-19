"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Benefit } from "@/types";
import "./ProductBenefits.css";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  benefits: Benefit[];
}

export default function ProductBenefits({ benefits }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const cards = ref.current.querySelectorAll(".benefit-card");

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        opacity: 0,
        scale: 0.95,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          once: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  if (!benefits.length) return null;

  return (
    <section className="product-benefits">
      <div className="container product-benefits__container">
        <div className="product-benefits__header">
          <p className="product-benefits__tagline">Resultados</p>
          <h2
            className="product-benefits__title"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Lo que dice nuestra comunidad
          </h2>
        </div>

        <div
          ref={ref}
          className="product-benefits__grid"
        >
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="benefit-card product-benefits__card"
            >
              <span
                className="product-benefits__stat"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {benefit.stat}
              </span>
              <p className="product-benefits__label">
                {benefit.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
