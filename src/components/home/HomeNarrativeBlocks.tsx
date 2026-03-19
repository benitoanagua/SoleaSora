"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HomeNarrativeBlocks.css";

gsap.registerPlugin(ScrollTrigger);

interface NarrativeBlock {
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  imagePosition?: "left" | "right";
  accentColor?: string;
}

interface Props {
  blocks?: NarrativeBlock[];
}

export default function HomeNarrativeBlocks({
  blocks = DEFAULT_BLOCKS,
}: Props) {
  return (
    <section className="home-narrative" aria-label="Nuestra esencia">
      {blocks.map((block, index) => (
        <NarrativeBlockItem
          key={index}
          block={block}
          index={index}
          isEven={index % 2 === 0}
        />
      ))}
    </section>
  );
}

function NarrativeBlockItem({
  block,
  index,
  isEven,
}: {
  block: NarrativeBlock;
  index: number;
  isEven: boolean;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      });

      if (imageRef.current) {
        tl.from(
          imageRef.current,
          {
            opacity: 0,
            scale: 1.05,
            duration: 1.4,
            ease: "power3.out",
          },
          "-=0.3"
        );
      }

      tl.from(
        titleRef.current,
        {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.8"
      ).from(
        descRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.6"
      );

      if (imageRef.current) {
        const imgElement = imageRef.current.querySelector("img");
        if (imgElement) {
          gsap.to(imgElement, {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <article
      ref={containerRef}
      className="home-narrative__block"
    >
      {/* Fondo decorativo */}
      <div
        className="home-narrative__bg"
        style={{
          background: `radial-gradient(ellipse ${isEven ? "60% 40% at 80% 50%" : "60% 40% at 20% 50%"}, #EDE8DF 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div className="container home-narrative__container">
        <div
          className={`home-narrative__grid ${isEven ? '' : 'home-narrative__grid--reversed'}`}
        >
          {/* Columna de Imagen */}
          <div
            ref={imageRef}
            className={`home-narrative__image-wrapper ${isEven ? 'home-narrative__image-wrapper--right' : 'home-narrative__image-wrapper--left'}`}
          >
            <div className="home-narrative__image-content">
              {block.image ? (
                <Image
                  src={block.image}
                  alt={block.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="home-narrative__image"
                  priority={index === 0}
                />
              ) : (
                <div className="home-narrative__placeholder">
                  <div className="home-narrative__placeholder-icon">
                    <div className="home-narrative__placeholder-dot" />
                  </div>
                  <p className="home-narrative__placeholder-text">
                    {block.subtitle || "Esencia"}
                  </p>
                </div>
              )}
            </div>
            <div className="home-narrative__overlay" />
          </div>

          {/* Columna de Contenido */}
          <div
            ref={contentRef}
            className={`home-narrative__content ${isEven ? 'home-narrative__content--right' : 'home-narrative__content--left'}`}
          >
            <div className="home-narrative__line" />
            <h2
              ref={titleRef}
              className="home-narrative__title"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {block.title}
            </h2>
            <p
              ref={descRef}
              className="home-narrative__description"
            >
              {block.description}
            </p>
            {index === 0 && (
              <div className="home-narrative__cta-wrapper">
                <button className="home-narrative__cta">
                  <span>Descubrí más</span>
                  <span className="home-narrative__cta-arrow">→</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

const DEFAULT_BLOCKS: NarrativeBlock[] = [
  {
    title: "Nuestra esencia",
    subtitle: "Origen",
    description:
      "Creemos en la belleza que nace de la simplicidad. Nuestras fórmulas están inspiradas en la luz natural y los elementos esenciales de la naturaleza.",
    imagePosition: "left",
  },
  {
    title: "Ingredientes naturales",
    subtitle: "Pureza",
    description:
      "Seleccionamos cuidadosamente ingredientes botánicos de origen sostenible. Cada fórmula es un ritual sensorial que conecta tu piel con la naturaleza.",
    imagePosition: "right",
  },
];
