"use client";

import { useScrollReveal } from "@/hooks/useGsap";
import type { Ingredient } from "@/types";

interface Props {
  ingredients: Ingredient[];
}

export default function ProductIngredients({ ingredients }: Props) {
  const ref = useScrollReveal();
  if (!ingredients.length) return null;

  return (
    <section className="py-24 bg-[#1A1814] text-[#FAF8F5]">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className="mb-16 space-y-3" data-reveal="up">
          <p className="text-xs tracking-widest uppercase text-[#6B6560]">
            Formulación
          </p>
          <h2
            className="text-4xl md:text-5xl font-light"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ingredientes activos
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ingredients.map((ing, i) => (
            <div
              key={i}
              data-reveal="up"
              data-delay={`${i * 0.08}`}
              className="border border-[#FAF8F5]/10 p-8 space-y-3 hover:border-[#C9A96E]/40 transition-colors duration-300"
            >
              {ing.icon?.asset?.url && (
                <img
                  src={ing.icon.asset.url}
                  alt={ing.name}
                  className="w-12 h-12 object-contain opacity-80"
                />
              )}
              <h3
                className="text-xl font-light"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {ing.name}
              </h3>
              {ing.scientificName && (
                <p className="text-xs text-[#6B6560] italic">
                  {ing.scientificName}
                </p>
              )}
              <p className="text-sm text-[#FAF8F5]/70 leading-relaxed">
                {ing.benefit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
