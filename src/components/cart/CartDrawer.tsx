"use client";

import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./CartDrawer.css";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, count } =
    useCart();
  
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Animaciones de entrada/salida del drawer
  useEffect(() => {
    if (!panelRef.current || !overlayRef.current) return;

    if (isOpen) {
      gsap.to(overlayRef.current, {
        opacity: 0.4,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(panelRef.current, {
        x: 0,
        duration: 0.5,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        delay: 0.05,
      });
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });

      gsap.to(panelRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
      });
    }
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const subtotal = total;
  const shippingThreshold = 50000;
  const freeShippingProgress = Math.min((subtotal / shippingThreshold) * 100, 100);
  const needsMoreForFreeShipping = subtotal < shippingThreshold;

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={closeCart}
        className="cart-drawer__overlay"
        aria-hidden="true"
      />

      {/* Panel del carrito */}
      <aside
        ref={panelRef}
        className="cart-drawer__panel"
        role="dialog"
        aria-label="Carrito de compras"
        aria-modal="true"
      >
        {/* Header */}
        <div className="cart-drawer__header">
          <div className="cart-drawer__title-wrapper">
            <ShoppingBag size={20} strokeWidth={1.5} className="cart-drawer__icon" />
            <span className="cart-drawer__title">
              Carrito {count > 0 && `(${count})`}
            </span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="cart-drawer__close-btn"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Barra de progreso para envío gratis */}
        {needsMoreForFreeShipping && items.length > 0 && (
          <div className="cart-drawer__shipping-progress">
            <p className="cart-drawer__shipping-text">
              Te faltan{" "}
              <span className="cart-drawer__shipping-amount">
                {formatPrice(shippingThreshold - subtotal)}
              </span>{" "}
              para tener envío gratis
            </p>
            <div className="cart-drawer__progress-bar">
              <div 
                className="cart-drawer__progress-fill"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Items del carrito */}
        <div className="cart-drawer__items">
          {items.length === 0 ? (
            <EmptyCartState onClose={closeCart} />
          ) : (
            <ul className="cart-drawer__items-list">
              {items.map((item, index) => {
                const imageUrl = item.mainImage?.asset?.url ? `${item.mainImage.asset.url.startsWith('//') ? 'https:' : ''}${item.mainImage.asset.url}?w=96&h=96&fit=crop` : null;
                
                return (
                  <li 
                    key={item._id} 
                    className="cart-drawer__item"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Imagen del producto */}
                    <Link
                      href={`/producto/${item.slug.current}`}
                      onClick={closeCart}
                      className="cart-drawer__item-image-wrapper"
                    >
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={item.mainImage.alt || item.name}
                          width={96}
                          height={96}
                          className="cart-drawer__item-image"
                        />
                      )}
                    </Link>

                    {/* Info del producto */}
                    <div className="cart-drawer__item-info">
                      {/* Header con nombre y botón eliminar */}
                      <div className="cart-drawer__item-header">
                        <Link
                          href={`/producto/${item.slug.current}`}
                          onClick={closeCart}
                          className="cart-drawer__item-name"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item._id)}
                          aria-label={`Eliminar ${item.name} del carrito`}
                          className="cart-drawer__item-remove"
                        >
                          <Trash2 size={14} strokeWidth={1.5} />
                        </button>
                      </div>

                      {/* Precio unitario */}
                      <p className="cart-drawer__item-unit-price">
                        {formatPrice(item.price)} c/u
                      </p>

                      {/* Controles de cantidad y precio total */}
                      <div className="cart-drawer__item-controls">
                        {/* Selector de cantidad */}
                        <div className="cart-drawer__quantity-selector">
                          <button
                            onClick={() =>
                              updateQuantity(item._id, Math.max(1, item.quantity - 1))
                            }
                          aria-label="Reducir cantidad"
                          disabled={item.quantity <= 1}
                          className="cart-drawer__quantity-btn"
                        >
                          <Minus size={12} strokeWidth={2} />
                        </button>
                        <span className="cart-drawer__quantity-value">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                          aria-label="Aumentar cantidad"
                          className="cart-drawer__quantity-btn"
                        >
                          <Plus size={12} strokeWidth={2} />
                        </button>
                      </div>

                      {/* Precio total del item */}
                      <span className="cart-drawer__item-total">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
            </ul>
          )}
        </div>

        {/* Footer con resumen y CTA */}
        {items.length > 0 && (
          <div className="cart-drawer__footer">
            {/* Resumen de precios */}
            <div className="cart-drawer__summary">
              <div className="cart-drawer__summary-row">
                <span className="cart-drawer__summary-label">Subtotal</span>
                <span className="cart-drawer__summary-value">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="cart-drawer__summary-row">
                <span className="cart-drawer__summary-label">Envío</span>
                <span className={`cart-drawer__summary-value ${subtotal >= shippingThreshold ? 'cart-drawer__summary-value--free' : ''}`}>
                  {subtotal >= shippingThreshold 
                    ? "Gratis" 
                    : "Calculado al finalizar"}
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="cart-drawer__total-row">
              <span className="cart-drawer__total-label">Total</span>
              <span
                className="cart-drawer__total-value"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {formatPrice(total)}
              </span>
            </div>

            {/* Disclaimer */}
            <p className="cart-drawer__disclaimer">
              Envío calculado en el checkout. Devolución gratuita dentro de los 30 días.
            </p>

            {/* CTA Principal - Checkout */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="cart-drawer__checkout-btn"
            >
              <span>Finalizar compra</span>
              <ArrowRight size={16} strokeWidth={1.5} />
            </Link>

            {/* CTA Secundario */}
            <button
              onClick={closeCart}
              className="cart-drawer__continue-btn"
            >
              Seguir comprando
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

function EmptyCartState({ onClose }: { onClose: () => void }) {
  return (
    <div className="cart-drawer__empty">
      {/* Ilustración minimalista */}
      <div className="cart-drawer__empty-icon-wrapper">
        <div className="cart-drawer__empty-circle">
          <ShoppingBag
            size={40}
            strokeWidth={1}
            className="cart-drawer__empty-icon"
          />
        </div>
        <div className="cart-drawer__empty-ping" />
      </div>

      {/* Texto principal */}
      <div className="cart-drawer__empty-text">
        <h3
          className="cart-drawer__empty-title"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Tu carrito está vacío
        </h3>
        <p className="cart-drawer__empty-description">
          Tu piel te lo agradecerá, pero tu carrito está vacío. Explorá nuestros productos y encontrá tu ritual.
        </p>
      </div>

      {/* CTA */}
      <Link
        href="/catalogo"
        onClick={onClose}
        className="cart-drawer__empty-link"
      >
        <span>Ver productos</span>
        <svg 
          className="cart-drawer__empty-arrow" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </div>
  );
}
