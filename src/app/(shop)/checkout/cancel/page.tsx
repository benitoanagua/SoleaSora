"use client";

import Link from "next/link";
import { X, ArrowRight, ShoppingBag } from "lucide-react";
import "../checkout.css";

export default function CancelPage() {
  return (
    <div className="checkout-result">
      <div className="checkout-result__icon checkout-result__icon--cancel">
        <X size={40} strokeWidth={1.5} />
      </div>

      <h1 className="checkout-result__title">Pago cancelado</h1>

      <p className="checkout-result__message">
        Tu pago no se completó. Tu carrito sigue guardado y puedes intentar
        nuevamente cuando estés listo.
      </p>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <Link href="/checkout" className="checkout-result__btn">
          <ShoppingBag size={16} strokeWidth={1.5} />
          <span>Volver al checkout</span>
        </Link>

        <Link
          href="/catalogo"
          className="checkout-result__btn"
          style={{
            backgroundColor: "transparent",
            color: "var(--color-dark)",
            border: "1px solid var(--color-outline)",
          }}
        >
          <span>Ver productos</span>
          <ArrowRight size={16} strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  );
}
