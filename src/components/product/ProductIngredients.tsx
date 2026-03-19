"use client";

import { useScrollReveal } from "@/hooks/useGsap";
import type { Ingredient } from "@/types";
import "./ProductIngredients.css";

interface Props {
  ingredients: Ingredient[];
}

export default function ProductIngredients({ ingredients }: Props) {
  const ref = useScrollReveal();
  if (!ingredients.length) return null;

  return (
    <section className="product-ingredients">
      <div ref={ref} className="container product-ingredients__container">
        <div className="product-ingredients__header" data-reveal="up">
          <p className="product-ingredients__tagline">Formulación</p>
          <h2
            className="product-ingredients__title"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ingredientes activos
          </h2>
        </div>

        <div className="product-ingredients__grid">
          {ingredients.map((ing, i) => (
            <div
              key={i}
              data-reveal="up"
              data-delay={`${i * 0.08}`}
              className="product-ingredients__card"
            >
              {ing.icon?.asset?.url && (
                <img
                  src={ing.icon.asset.url}
                  alt={ing.name}
                  className="product-ingredients__icon"
                />
              )}
              <h3
                className="product-ingredients__name"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {ing.name}
              </h3>
              {ing.scientificName && (
                <p className="product-ingredients__scientific">
                  {ing.scientificName}
                </p>
              )}
              <p className="product-ingredients__benefit">
                {ing.benefit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
