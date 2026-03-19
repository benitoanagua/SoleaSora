"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HomeHero.css";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  videoUrl?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function HomeHero({
  title = "Solea Sora",
  subtitle = "La luz en tu piel.\nEl cielo en cada gota.",
  backgroundImage,
  videoUrl,
  ctaText = "Ver productos",
  ctaLink = "/catalogo",
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
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, #EDE8DF 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Video de fondo (opcional) */}
      {videoUrl && (
        <div className="home-hero__video-container">
          <video
            ref={videoRef}
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="home-hero__video"
          />
        </div>
      )}

      {/* Imagen de fondo alternativa */}
      {backgroundImage && !videoUrl && (
        <div
          className="home-hero__image-bg"
          style={{
            backgroundImage: `url(${backgroundImage})`,
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
          <span className="home-hero__title-line">{title.split(" ")[0]}</span>
          <span className="home-hero__title-accent">
            {title.split(" ")[1] || "Sora"}
          </span>
        </h1>

        {/* Subtítulo narrativo */}
        <p
          ref={subRef}
          className="home-hero__subtitle"
        >
          {subtitle}
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="home-hero__ctas"
        >
          {/* CTA Primario */}
          <Link
            href={ctaLink}
            className="home-hero__btn home-hero__btn--primary"
          >
            <span className="home-hero__btn-text">{ctaText}</span>
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
