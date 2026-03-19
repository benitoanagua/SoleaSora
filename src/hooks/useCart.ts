import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, CartStore, ProductCard } from "@/types";

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: ProductCard) => {
        const { items } = get();
        const existing = items.find((i) => i._id === product._id);

        if (existing) {
          set({
            items: items.map((i) =>
              i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i,
            ),
          });
        } else {
          const newItem: CartItem = {
            _id: product._id,
            name: product.name,
            price: product.price,
            quantity: 1,
            mainImage: product.mainImage,
            slug: product.slug,
            stripeProductId: undefined,
          };
          set({ items: [...items, newItem], isOpen: true });
        }
      },

      removeItem: (id: string) => {
        set({ items: get().items.filter((i) => i._id !== id) });
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((i) =>
            i._id === id ? { ...i, quantity } : i,
          ),
        });
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: "solea-sora-cart", // clave en localStorage
      partialize: (state) => ({ items: state.items }), // solo persistir items
    },
  ),
);
