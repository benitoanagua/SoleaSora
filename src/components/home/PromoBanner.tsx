"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { useState } from "react";
import "./PromoBanner.css";

interface Props {
  message: string;
  ctaText?: string;
  ctaUrl?: string;
  backgroundColor?: string;
}

export default function PromoBanner({ message, ctaText, ctaUrl, backgroundColor }: Props) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const bgClass = backgroundColor === "gold" 
    ? "promo-banner--gold" 
    : backgroundColor === "dark" 
    ? "promo-banner--dark" 
    : "promo-banner--cream";

  return (
    <div className={`promo-banner ${bgClass}`}>
      <div className="promo-banner__content">
        <p className="promo-banner__message">{message}</p>
        {ctaText && ctaUrl && (
          <Link href={ctaUrl} className="promo-banner__cta">
            <span>{ctaText}</span>
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        )}
      </div>
      <button
        onClick={() => setVisible(false)}
        aria-label="Cerrar banner"
        className="promo-banner__close"
      >
        <X size={16} strokeWidth={1.5} />
      </button>
    </div>
  );
}
