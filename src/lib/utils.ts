// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";

/**
 * Utility para combinar clases CSS condicionalmente
 * Reemplaza a twMerge ya que no usamos Tailwind
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Formatea un número como precio en ARS
 */
export function formatPrice(amount: number, currency = "ARS"): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Convierte texto a slug URL-safe
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}
