"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

// Hook para animaciones en un contenedor
export function useGsapContext(scope: React.RefObject<HTMLElement | null>) {
  const ctx = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctx.current = gsap.context(() => {}, scope);
    return () => ctx.current?.revert();
  }, [scope]);

  return ctx;
}

// Hook para reveal on scroll — el más usado en el proyecto
export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll("[data-reveal]");
    if (!elements.length) return;

    const ctx = gsap.context(() => {
      elements.forEach((el) => {
        const direction = el.getAttribute("data-reveal") ?? "up";
        const delay = parseFloat(el.getAttribute("data-delay") ?? "0");

        const from: gsap.TweenVars = {
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          delay,
        };

        if (direction === "up") from.y = 40;
        if (direction === "down") from.y = -40;
        if (direction === "left") from.x = 40;
        if (direction === "right") from.x = -40;

        gsap.from(el, {
          ...from,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}
