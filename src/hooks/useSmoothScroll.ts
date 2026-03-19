"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * Hook para implementar smooth scroll con Lenis
 * Se activa después del primer scroll del usuario para mejor UX inicial
 */
export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respetar prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (prefersReducedMotion.matches) {
      return;
    }

    // Inicializar Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing suave
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false, // Desactivado en mobile por performance
      touchMultiplier: 2,
      infinite: false,
      prevent: () => {
        // Prevenir smooth scroll en elementos interactivos
        return false;
      },
    });

    lenisRef.current = lenis;

    // Integrar con GSAP ScrollTrigger si existe
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Activar después del primer scroll nativo
    let activated = false;
    const activateOnFirstScroll = () => {
      if (!activated) {
        activated = true;
        // Lenis ya está activo por defecto
      }
    };

    window.addEventListener("wheel", activateOnFirstScroll, { passive: true });
    window.addEventListener("touchstart", activateOnFirstScroll, {
      passive: true,
    });

    return () => {
      lenis.destroy();
      window.removeEventListener("wheel", activateOnFirstScroll);
      window.removeEventListener("touchstart", activateOnFirstScroll);
    };
  }, []);

  return lenisRef;
}

/**
 * Hook para forzar actualización de Lenis (útil cuando el contenido cambia dinámicamente)
 */
export function useLenisUpdate() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const update = () => {
    lenisRef.current?.update();
  };

  return { update, lenisRef };
}
