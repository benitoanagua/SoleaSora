"use client";

import { useScrollReveal } from "@/hooks/useGsap";
import type { StorySection } from "@/types";

interface Props {
  sections: StorySection[];
}

export default function ProductStory({ sections }: Props) {
  const ref = useScrollReveal();
  if (!sections.length) return null;

  return (
    <section ref={ref} className="py-24 px-6 max-w-4xl mx-auto space-y-24">
      {sections.map((section, i) => (
        <div
          key={i}
          data-reveal="up"
          data-delay={`${i * 0.1}`}
          className={`flex flex-col md:flex-row gap-12 items-center ${
            i % 2 !== 0 ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className="flex-1 space-y-4">
            <span className="text-xs tracking-widest uppercase text-[#6B6560]">
              0{i + 1}
            </span>
            <h2
              className="text-3xl md:text-4xl font-light leading-snug"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {section.headline}
            </h2>
            {section.body && (
              <p className="text-[#6B6560] leading-relaxed">{section.body}</p>
            )}
          </div>

          {section.accentImage?.asset?.url && (
            <div className="flex-1 aspect-square bg-[#EDE8DF] overflow-hidden rounded-lg">
              <img
                src={section.accentImage.asset.url}
                alt={section.accentImage.alt ?? section.headline}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
