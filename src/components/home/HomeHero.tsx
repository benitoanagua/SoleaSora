"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomeHero() {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Timeline de entrada
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1,
        ease: "power3.out",
      })
        .from(
          titleRef.current,
          {
            opacity: 0,
            y: 60,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6",
        )
        .from(
          subRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5",
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            y: 16,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.4",
        );

      // Parallax del fondo al scrollear
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FAF8F5]"
    >
      {/* Fondo con parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-[20%]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #EDE8DF 0%, transparent 70%)",
        }}
      />

      {/* Línea decorativa horizontal */}
      <div
        ref={lineRef}
        className="absolute top-1/3 left-0 w-1/3 h-px bg-[#C9A96E]/40"
      />

      {/* Contenido */}
      <div className="relative z-10 text-center px-6 space-y-8 max-w-4xl mx-auto">
        <p className="text-xs tracking-[0.4em] uppercase text-[#6B6560]">
          Skincare sensorial
        </p>

        <h1
          ref={titleRef}
          className="text-7xl sm:text-8xl md:text-[10rem] font-light leading-none tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Solea
          <br />
          <em className="not-italic text-[#C9A96E]">Sora</em>
        </h1>

        <p
          ref={subRef}
          className="text-lg md:text-xl text-[#6B6560] font-light max-w-sm mx-auto leading-relaxed"
        >
          La luz en tu piel.
          <br />
          El cielo en cada gota.
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
        >
          <Link
            href="/catalogo"
            className="bg-[#1A1814] text-[#FAF8F5] text-sm tracking-widest uppercase px-10 py-4 hover:bg-[#C9A96E] transition-colors duration-300"
          >
            Ver productos
          </Link>
          <Link
            href="/nosotras"
            className="text-sm tracking-widest uppercase text-[#6B6560] border-b border-[#6B6560]/40 pb-0.5 hover:text-[#1A1814] hover:border-[#1A1814] transition-colors duration-300"
          >
            Nuestra historia
          </Link>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-8 bg-[#C9A96E]/50" />
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#6B6560]">
          scroll
        </p>
      </div>
    </section>
  );
}
