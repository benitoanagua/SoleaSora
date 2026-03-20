"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HomeHero.css";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  headline?: string;
  subheadline?: string;
  backgroundImage?: { asset: { url: string } };
  backgroundVideo?: string;
  cta?: { text: string; url: string };
}

export default function HomeHero({
  headline = "Solea Sora",
  subheadline = "La luz en tu piel.\nEl cielo en cada gota.",
  backgroundImage,
  backgroundVideo,
  cta,
}: Props) {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "power3.out",
      })
        .from(
          titleRef.current,
          {
            opacity: 0,
            y: 80,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .from(
          subRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .from(
          scrollIndicatorRef.current,
          {
            opacity: 0,
            y: 10,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        );

      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 25,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      gsap.to(containerRef.current, {
        opacity: 0.95,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="home-hero"
      aria-label="Hero section"
    >
      {/* Fondo con gradiente radial */}
      <div
        ref={bgRef}
        className="home-hero__bg"
        aria-hidden="true"
      />

      {/* Video de fondo (opcional) */}
      {backgroundVideo && (
        <div className="home-hero__video-container">
          <video
            ref={videoRef}
            src={backgroundVideo}
            autoPlay
            loop
            muted
            playsInline
            className="home-hero__video"
          />
        </div>
      )}

      {/* Imagen de fondo alternativa */}
      {backgroundImage?.asset?.url && !backgroundVideo && (
        <div
          className="home-hero__image-bg"
          style={{
            backgroundImage: `url(${backgroundImage.asset.url})`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Línea decorativa horizontal */}
      <div
        ref={lineRef}
        className="home-hero__line"
      />

      {/* Contenido centrado */}
      <div className="home-hero__content">
        {/* Tagline superior */}
        <p className="home-hero__tagline">
          Skincare sensorial
        </p>

        {/* Título principal */}
        <h1
          ref={titleRef}
          className="home-hero__title"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="home-hero__title-line">{headline.split(" ")[0]}</span>
          <span className="home-hero__title-accent">
            {headline.split(" ")[1] || "Sora"}
          </span>
        </h1>

        {/* Subtítulo narrativo */}
        <p
          ref={subRef}
          className="home-hero__subtitle"
        >
          {subheadline}
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="home-hero__ctas"
        >
          {/* CTA Primario */}
          <Link
            href={cta?.url || "/catalogo"}
            className="home-hero__btn home-hero__btn--primary"
          >
            <span className="home-hero__btn-text">{cta?.text || "Ver productos"}</span>
            <span className="home-hero__btn-overlay" />
          </Link>

          {/* CTA Secundario (Ghost) */}
          <Link
            href="/nosotras"
            className="home-hero__btn home-hero__btn--ghost"
          >
            Nuestra historia
          </Link>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div
        ref={scrollIndicatorRef}
        className="home-hero__scroll-indicator"
      >
        {/* Línea animada */}
        <div className="home-hero__scroll-line">
          <div className="home-hero__scroll-line-fill" />
        </div>
        <p className="home-hero__scroll-text">scroll</p>
      </div>
    </section>
  );
}
