"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { ShoppingBag, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import "./checkout.css";

export default function CheckoutPage() {
  const items = useCart((state) => state.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al procesar el checkout");
      }

      // Redirigir a Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-page__empty">
          <ShoppingBag size={48} strokeWidth={1} />
          <h1>Tu carrito está vacío</h1>
          <p>Agrega productos para continuar con la compra.</p>
          <Link href="/catalogo" className="checkout-page__btn">
            Ver productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-page__container">
        <h1 className="checkout-page__title">Resumen de tu compra</h1>

        {/* Lista de productos */}
        <div className="checkout-page__items">
          {items.map((item) => {
            const imageUrl = item.mainImage?.asset?.url
              ? `${item.mainImage.asset.url.startsWith("//") ? "https:" : ""}${item.mainImage.asset.url}?w=120&h=120&fit=crop`
              : null;

            return (
              <div key={item._id} className="checkout-page__item">
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={item.mainImage.alt || item.name}
                    width={80}
                    height={80}
                    className="checkout-page__item-image"
                  />
                )}
                <div className="checkout-page__item-info">
                  <span className="checkout-page__item-name">{item.name}</span>
                  <span className="checkout-page__item-quantity">
                    Cantidad: {item.quantity}
                  </span>
                </div>
                <span className="checkout-page__item-price">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Total */}
        <div className="checkout-page__total">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>

        {/* Error */}
        {error && (
          <div className="checkout-page__error">
            <p>{error}</p>
          </div>
        )}

        {/* Botón de pago */}
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="checkout-page__btn checkout-page__btn--primary"
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Procesando...</span>
            </>
          ) : (
            <>
              <span>Pagar con Stripe</span>
              <span>{formatPrice(total)}</span>
            </>
          )}
        </button>

        {/* Link para volver */}
        <Link href="/catalogo" className="checkout-page__link">
          Seguir comprando
        </Link>
      </div>
    </div>
  );
}
