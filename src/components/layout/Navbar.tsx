// src/components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { openCart, count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EDE8DF]"
            : "bg-transparent",
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Solea Sora
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-widest uppercase text-[#6B6560] hover:text-[#1A1814] transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Acciones derecha */}
          <div className="flex items-center gap-4">
            {/* Carrito */}
            <button
              onClick={openCart}
              aria-label="Abrir carrito"
              className="relative p-2 hover:opacity-60 transition-opacity"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#C9A96E] text-[#FAF8F5] text-[10px] rounded-full flex items-center justify-center font-medium">
                  {count}
                </span>
              )}
            </button>

            {/* Hamburger mobile */}
            <button
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:opacity-60 transition-opacity"
            >
              {menuOpen ? (
                <X size={20} strokeWidth={1.5} />
              ) : (
                <Menu size={20} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Drawer mobile */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-500",
          menuOpen ? "visible" : "invisible",
        )}
      >
        {/* Overlay */}
        <div
          onClick={() => setMenuOpen(false)}
          className={cn(
            "absolute inset-0 bg-[#1A1814] transition-opacity duration-500",
            menuOpen ? "opacity-40" : "opacity-0",
          )}
        />

        {/* Panel */}
        <nav
          className={cn(
            "absolute top-0 right-0 h-full w-72 bg-[#FAF8F5]",
            "flex flex-col pt-24 px-8 gap-8",
            "transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
            menuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-light tracking-wide text-[#1A1814] hover:text-[#C9A96E] transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-auto pb-12 border-t border-[#EDE8DF] pt-8">
            <p className="text-xs tracking-widest uppercase text-[#6B6560]">
              Skincare sensorial
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Productos", href: "/catalogo" },
  { label: "Nosotras", href: "/nosotras" },
];
