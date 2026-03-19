import Link from "next/link";
import { Instagram } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__container">
        {/* Marca */}
        <div className="footer__section">
          <p
            className="footer__brand"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Solea Sora
          </p>
          <p className="footer__description">
            Skincare sensorial inspirado en la luz y el aire. Fórmulas para una
            piel viva.
          </p>
        </div>

        {/* Links */}
        <div className="footer__section">
          <p className="footer__title">Navegación</p>
          <nav className="footer__nav">
            {[
              { label: "Productos", href: "/catalogo" },
              { label: "Nosotras", href: "/nosotras" },
              { label: "Envíos y cambios", href: "/envios" },
              { label: "Preguntas frecuentes", href: "/faq" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="footer__link"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contacto */}
        <div className="footer__section">
          <p className="footer__title">Contacto</p>
          <div className="footer__contact">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__contact-link"
            >
              <Instagram size={16} strokeWidth={1.5} />
              @soleasora
            </a>
            <a
              href="https://wa.me/5491100000000"
              className="footer__contact-link"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-content">
          <p className="footer__copyright">
            {`© ${new Date().getFullYear()} Solea Sora. Todos los derechos reservados.`}
          </p>
          <div className="footer__legal">
            <Link
              href="/privacidad"
              className="footer__legal-link"
            >
              Privacidad
            </Link>
            <Link
              href="/terminos"
              className="footer__legal-link"
            >
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
