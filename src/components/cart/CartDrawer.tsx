"use client";

import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { formatPrice, cn } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, count } =
    useCart();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={cn(
          "fixed inset-0 bg-[#1A1814] z-50 transition-opacity duration-500",
          isOpen
            ? "opacity-40 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      />

      {/* Panel */}
      <aside
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-[#FAF8F5] z-50",
          "flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#EDE8DF]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} strokeWidth={1.5} />
            <span className="text-sm tracking-widest uppercase">
              Carrito {count > 0 && `(${count})`}
            </span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="p-2 hover:opacity-60 transition-opacity"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
              <ShoppingBag
                size={40}
                strokeWidth={1}
                className="text-[#EDE8DF]"
              />
              <p
                className="text-2xl font-light text-[#1A1814]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Tu carrito está vacío
              </p>
              <p className="text-sm text-[#6B6560]">
                Explorá nuestros productos y encontrá tu ritual
              </p>
              <button
                onClick={closeCart}
                className="mt-4 text-sm tracking-widest uppercase border-b border-[#1A1814] pb-0.5 hover:text-[#C9A96E] hover:border-[#C9A96E] transition-colors"
              >
                Ver productos
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-6">
              {items.map((item) => (
                <li key={item._id} className="flex gap-4">
                  {/* Imagen */}
                  <Link
                    href={`/producto/${item.slug.current}`}
                    onClick={closeCart}
                    className="shrink-0 w-20 h-20 bg-[#EDE8DF] rounded-lg overflow-hidden"
                  >
                    {item.mainImage?.asset?.url && (
                      <Image
                        src={item.mainImage.asset.url}
                        alt={item.mainImage.alt}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </Link>

                  {/* Info */}
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/producto/${item.slug.current}`}
                        onClick={closeCart}
                        className="text-sm font-medium leading-tight hover:text-[#C9A96E] transition-colors"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item._id)}
                        aria-label="Eliminar producto"
                        className="shrink-0 p-1 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} strokeWidth={1.5} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Cantidad */}
                      <div className="flex items-center gap-3 border border-[#EDE8DF] rounded-full px-3 py-1">
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity - 1)
                          }
                          aria-label="Reducir cantidad"
                          className="hover:text-[#C9A96E] transition-colors"
                        >
                          <Minus size={12} strokeWidth={2} />
                        </button>
                        <span className="text-sm w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                          aria-label="Aumentar cantidad"
                          className="hover:text-[#C9A96E] transition-colors"
                        >
                          <Plus size={12} strokeWidth={2} />
                        </button>
                      </div>

                      {/* Precio */}
                      <span className="text-sm font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer con total y CTA */}
        {items.length > 0 && (
          <div className="px-6 py-6 border-t border-[#EDE8DF] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6B6560] tracking-wide uppercase text-xs">
                Total
              </span>
              <span
                className="text-2xl font-light"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {formatPrice(total)}
              </span>
            </div>

            <p className="text-xs text-[#6B6560] text-center">
              Envío calculado en el checkout
            </p>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-[#1A1814] text-[#FAF8F5] text-sm tracking-widest uppercase text-center py-4 hover:bg-[#C9A96E] transition-colors duration-300"
            >
              Ir al checkout
            </Link>

            <button
              onClick={closeCart}
              className="block w-full text-sm tracking-widest uppercase text-center text-[#6B6560] hover:text-[#1A1814] transition-colors py-2"
            >
              Seguir comprando
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
