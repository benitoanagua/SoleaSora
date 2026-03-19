"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import "../checkout.css";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    if (!cleared) {
      clearCart();
      setCleared(true);
    }
  }, [clearCart, cleared]);

  return (
    <div className="checkout-result">
      <div className="checkout-result__icon checkout-result__icon--success">
        <Check size={40} strokeWidth={1.5} />
      </div>

      <h1 className="checkout-result__title">¡Gracias por tu compra!</h1>

      <p className="checkout-result__message">
        Tu pedido ha sido procesado exitosamente. Recibirás un correo de
        confirmación con los detalles de tu orden y el seguimiento del envío.
      </p>

      <Link href="/catalogo" className="checkout-result__btn">
        <span>Seguir comprando</span>
        <ArrowRight size={16} strokeWidth={1.5} />
      </Link>

      {sessionId && (
        <p className="checkout-result__order-id">
          ID de sesión: {sessionId.slice(0, 20)}...
        </p>
      )}
    </div>
  );
}
