"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HomeManifesto.css";

gsap.registerPlugin(ScrollTrigger);

const WORDS = [
  "Luminosidad",
  "Pureza",
  "Ligereza",
  "Expansión",
  "Ritual",
  "Presencia",
];

export default function HomeManifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const lines = textRef.current?.querySelectorAll("[data-line]");
      if (lines?.length) {
        gsap.from(lines, {
          opacity: 0,
          y: 30,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }

      const words = wordsRef.current?.querySelectorAll("[data-word]");
      if (words?.length) {
        gsap.from(words, {
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          ease: "back.out(1.4)",
          stagger: 0.08,
          scrollTrigger: {
            trigger: wordsRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="home-manifesto"
    >
      <div className="container home-manifesto__container">
        {/* Manifesto */}
        <div ref={textRef} className="home-manifesto__content">
          <p
            data-line
            className="home-manifesto__tagline"
          >
            Nuestra filosofía
          </p>
          <h2
            data-line
            className="home-manifesto__title"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Solea es la luz.
            <br />
            <em className="home-manifesto__accent">Sora es el cielo.</em>
          </h2>
          <p
            data-line
            className="home-manifesto__description"
          >
            Cada fórmula nace de la convicción de que el cuidado de la piel es
            un ritual sensorial. No una rutina. Una experiencia de luminosidad,
            ligereza y presencia.
          </p>
          <div data-line>
            <Link
              href="/nosotras"
              className="home-manifesto__link"
            >
              Conocé nuestra historia
            </Link>
          </div>
        </div>

        {/* Palabras clave */}
        <div ref={wordsRef} className="home-manifesto__words">
          {WORDS.map((word) => (
            <span
              key={word}
              data-word
              className="home-manifesto__word"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
