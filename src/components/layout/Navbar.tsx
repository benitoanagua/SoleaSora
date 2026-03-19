// src/components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import ThemeToggle from "@/components/ui/ThemeToggle";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const openCart = useCart((state) => state.openCart);
  const items = useCart((state) => state.items);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  // Detectar scroll con threshold de 80px según spec
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar menú con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Prevenir scroll del body cuando el menú está abierto
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
        className={`navbar ${scrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}
      >
        <div className="navbar__container">
          {/* Logo - Izquierda */}
          <Link
            href="/"
            className="navbar__logo"
          >
            Solea Sora
          </Link>

          {/* Nav desktop - Derecha */}
          <nav className="navbar__nav">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="navbar__link"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Acciones derecha */}
          <div className="navbar__actions">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Icono Shop */}
            <Link
              href="/catalogo"
              className="navbar__button"
              aria-label="Ir a la tienda"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
            </Link>

            {/* Carrito */}
            <button
              onClick={openCart}
              aria-label={`Abrir carrito (${count} productos)`}
              className="navbar__button"
              style={{ position: 'relative' }}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {count > 0 && (
                <span 
                  className="navbar__cart-badge"
                  role="status"
                  aria-live="polite"
                >
                  {count}
                </span>
              )}
            </button>

            {/* Hamburger mobile */}
            <button
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setMenuOpen(!menuOpen)}
              className="navbar__button"
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
        className={`navbar-drawer ${menuOpen ? 'navbar-drawer-open navbar-drawer-visible' : 'navbar-drawer-closed navbar-drawer-hidden'}`}
        aria-hidden={!menuOpen}
      >
        {/* Overlay */}
        <div
          className="navbar-drawer__overlay"
          onClick={() => setMenuOpen(false)}
        />

        {/* Panel deslizante */}
        <nav
          className="navbar-drawer__panel"
          role="navigation"
          aria-label="Menú principal"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="navbar-drawer__link"
            >
              {link.label}
            </Link>
          ))}

          {/* Footer del menú móvil */}
          <div className="navbar-drawer__footer">
            <p className="navbar-drawer__tagline">
              Skincare sensorial
            </p>
            <p className="navbar-drawer__description">
              La luz en tu piel. El cielo en cada gota.
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
