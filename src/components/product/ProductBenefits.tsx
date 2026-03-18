"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Benefit } from "@/types";

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
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 space-y-3 text-center">
          <p className="text-xs tracking-widest uppercase text-[#6B6560]">
            Resultados
          </p>
          <h2
            className="text-4xl md:text-5xl font-light"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Lo que dice nuestra comunidad
          </h2>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1"
        >
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="benefit-card bg-[#EDE8DF] p-12 flex flex-col items-center text-center space-y-3"
            >
              <span
                className="text-5xl md:text-6xl font-light text-[#C9A96E]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {benefit.stat}
              </span>
              <p className="text-sm text-[#6B6560] leading-relaxed max-w-[20ch]">
                {benefit.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
