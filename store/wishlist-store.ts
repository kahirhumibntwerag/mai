"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";

interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleItem: (product: Product) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          if (state.items.some((i) => i.id === product.id)) return state;
          return { items: [...state.items, product] };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== productId),
        })),
      isInWishlist: (productId) =>
        get().items.some((i) => i.id === productId),
      toggleItem: (product) =>
        set((state) => {
          const exists = state.items.some((i) => i.id === product.id);
          if (exists) {
            return {
              items: state.items.filter((i) => i.id !== product.id),
            };
          }
          return { items: [...state.items, product] };
        }),
    }),
    { name: "wishlist-storage" }
  )
);
