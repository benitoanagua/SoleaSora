"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      // Texto principal
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

      // Palabras flotantes
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
      className="py-32 px-6 bg-[#1A1814] text-[#FAF8F5] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto space-y-24">
        {/* Manifesto */}
        <div ref={textRef} className="space-y-6 max-w-3xl">
          <p
            data-line
            className="text-xs tracking-widest uppercase text-[#6B6560]"
          >
            Nuestra filosofía
          </p>
          <h2
            data-line
            className="text-4xl md:text-6xl font-light leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Solea es la luz.
            <br />
            <em className="text-[#C9A96E]">Sora es el cielo.</em>
          </h2>
          <p
            data-line
            className="text-lg text-[#FAF8F5]/60 leading-relaxed max-w-xl"
          >
            Cada fórmula nace de la convicción de que el cuidado de la piel es
            un ritual sensorial. No una rutina. Una experiencia de luminosidad,
            ligereza y presencia.
          </p>
          <div data-line>
            <Link
              href="/nosotras"
              className="text-sm tracking-widest uppercase border-b border-[#FAF8F5]/30 pb-0.5 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors duration-300"
            >
              Conocé nuestra historia
            </Link>
          </div>
        </div>

        {/* Palabras clave */}
        <div ref={wordsRef} className="flex flex-wrap gap-3">
          {WORDS.map((word) => (
            <span
              key={word}
              data-word
              className="border border-[#FAF8F5]/10 text-[#FAF8F5]/50 text-sm tracking-widest uppercase px-5 py-2.5 hover:border-[#C9A96E]/40 hover:text-[#C9A96E] transition-colors duration-300 cursor-default"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
