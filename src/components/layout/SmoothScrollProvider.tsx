"use client";

import { ReactNode } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

/**
 * Proveedor de Smooth Scroll con Lenis
 * Envuelve la aplicación para habilitar scroll suave en toda la app
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  // Inicializar smooth scroll
  useSmoothScroll();

  return <>{children}</>;
}
