import { sanityFetch } from "@/sanity/lib/live";
import { QUERIES } from "@/sanity/lib/queries";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Instagram,
  Facebook,
  Send,
} from "lucide-react";
import "./contacto.css";

interface ContactPage {
  title: string;
  intro?: string;
  contactInfo?: {
    items?: Array<{
      icon: string;
      label: string;
      value: string;
      link?: string;
    }>;
  };
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
  formTitle?: string;
}

const iconMap: Record<string, any> = {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
};

const socialIconMap: Record<string, any> = {
  instagram: Instagram,
  facebook: Facebook,
  tiktok: Send,
  twitter: Send,
  youtube: Send,
  linkedin: Send,
  whatsapp: MessageCircle,
};

export const metadata = {
  title: "Contacto | Solea Sora",
  description: "Contactanos por consultas, pedidos o colaboraciones.",
};

export default async function ContactoPage() {
  const { data: page } = await sanityFetch({
    query: QUERIES.CONTACT_PAGE,
  });

  const contact = page as ContactPage;

  return (
    <div className="contact-page">
      <header className="contact-page__header">
        <div className="container">
          <p className="contact-page__label">Contacto</p>
          <h1 className="contact-page__title">{contact?.title || "Contactanos"}</h1>
          {contact?.intro && (
            <p className="contact-page__intro">{contact.intro}</p>
          )}
        </div>
      </header>

      <main className="contact-page__main">
        <div className="container">
          <div className="contact-page__grid">
            {/* Información de contacto */}
            <div className="contact-page__info">
              <h2 className="contact-page__info-title">Información</h2>
              
              <div className="contact-page__items">
                {contact?.contactInfo?.items?.map((item, i) => {
                  const Icon = iconMap[item.icon] || Mail;
                  return (
                    <div key={i} className="contact-page__item">
                      <div className="contact-page__item-icon">
                        <Icon size={20} strokeWidth={1.5} />
                      </div>
                      <div className="contact-page__item-content">
                        <p className="contact-page__item-label">{item.label}</p>
                        {item.link ? (
                          <a href={item.link} className="contact-page__item-value">
                            {item.value}
                          </a>
                        ) : (
                          <p className="contact-page__item-value">{item.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Redes sociales */}
              {contact?.socialLinks && contact.socialLinks.length > 0 && (
                <div className="contact-page__social">
                  <h3 className="contact-page__social-title">Seguinos</h3>
                  <div className="contact-page__social-links">
                    {contact.socialLinks.map((social, i) => {
                      const Icon = socialIconMap[social.platform] || Send;
                      return (
                        <a
                          key={i}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="contact-page__social-link"
                          aria-label={social.platform}
                        >
                          <Icon size={20} strokeWidth={1.5} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Formulario */}
            <div className="contact-page__form-wrapper">
              <h2 className="contact-page__form-title">
                {contact?.formTitle || "Envíanos un mensaje"}
              </h2>
              <form className="contact-page__form">
                <div className="contact-page__form-row">
                  <div className="contact-page__form-field">
                    <label htmlFor="name">Nombre</label>
                    <input type="text" id="name" name="name" required />
                  </div>
                  <div className="contact-page__form-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                  </div>
                </div>
                <div className="contact-page__form-field">
                  <label htmlFor="phone">Teléfono (opcional)</label>
                  <input type="tel" id="phone" name="phone" />
                </div>
                <div className="contact-page__form-field">
                  <label htmlFor="message">Mensaje</label>
                  <textarea id="message" name="message" rows={5} required />
                </div>
                <button type="submit" className="contact-page__form-submit">
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
