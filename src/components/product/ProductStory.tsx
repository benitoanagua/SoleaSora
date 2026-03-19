"use client";

import { useScrollReveal } from "@/hooks/useGsap";
import type { StorySection } from "@/types";
import "./ProductStory.css";

interface Props {
  sections: StorySection[];
}

export default function ProductStory({ sections }: Props) {
  const ref = useScrollReveal();
  if (!sections.length) return null;

  return (
    <section ref={ref} className="product-story">
      {sections.map((section, i) => (
        <div
          key={i}
          data-reveal="up"
          data-delay={`${i * 0.1}`}
          className={`product-story__section ${
            i % 2 !== 0 ? "product-story__section--reversed" : ""
          }`}
        >
          <div className="product-story__content">
            <span className="product-story__number">
              0{i + 1}
            </span>
            <h2 className="product-story__headline">
              {section.headline}
            </h2>
            {section.body && (
              <p className="product-story__body">{section.body}</p>
            )}
          </div>

          {section.accentImage?.asset?.url && (
            <div className="product-story__image-wrapper">
              <img
                src={section.accentImage.asset.url}
                alt={section.accentImage.alt ?? section.headline}
                className="product-story__image"
              />
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
