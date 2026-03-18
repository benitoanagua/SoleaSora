// src/components/layout/Footer.tsx
import Link from "next/link";
import { Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#EDE8DF] bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Marca */}
        <div className="space-y-4">
          <p
            className="text-xl tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Solea Sora
          </p>
          <p className="text-sm text-[#6B6560] leading-relaxed max-w-xs">
            Skincare sensorial inspirado en la luz y el aire. Fórmulas para una
            piel viva.
          </p>
        </div>

        {/* Links */}
        <div className="space-y-4">
          <p className="text-xs tracking-widest uppercase text-[#6B6560]">
            Navegación
          </p>
          <nav className="flex flex-col gap-3">
            {[
              { label: "Productos", href: "/catalogo" },
              { label: "Nosotras", href: "/nosotras" },
              { label: "Envíos y cambios", href: "/envios" },
              { label: "Preguntas frecuentes", href: "/faq" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#1A1814] hover:text-[#C9A96E] transition-colors w-fit"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contacto */}
        <div className="space-y-4">
          <p className="text-xs tracking-widest uppercase text-[#6B6560]">
            Contacto
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#1A1814] hover:text-[#C9A96E] transition-colors w-fit"
            >
              <Instagram size={16} strokeWidth={1.5} />
              @soleasora
            </a>
            <a
              href="https://wa.me/5491100000000"
              className="text-sm text-[#1A1814] hover:text-[#C9A96E] transition-colors w-fit"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#EDE8DF] px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6B6560]">
            {`© ${new Date().getFullYear()} Solea Sora. Todos los derechos reservados.`}
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacidad"
              className="text-xs text-[#6B6560] hover:text-[#1A1814] transition-colors"
            >
              Privacidad
            </Link>
            <Link
              href="/terminos"
              className="text-xs text-[#6B6560] hover:text-[#1A1814] transition-colors"
            >
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
