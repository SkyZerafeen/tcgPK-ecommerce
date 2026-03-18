"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

type AddProductInput = {
  id: string;
  name: string;
  price: number | string;
  imageUrl: string;
  quantity?: number;
};

type CartState = {
  items: Record<string, CartItem>;
};

type CartComputed = {
  totalItems: number;
  totalPrice: number;
};

type CartActions = {
  addProduct: (input: AddProductInput) => void;
  removeProduct: (productId: string) => void;
  clearCart: () => void;
};

const initialState: CartState = {
  items: {},
};

function normalizeQuantity(quantity: number | undefined): number {
  if (typeof quantity !== "number") return 1;
  if (!Number.isFinite(quantity)) return 1;
  return Math.max(1, Math.floor(quantity));
}

function normalizePrice(price: number | string): number {
  const numeric = typeof price === "number" ? price : Number(price);
  if (!Number.isFinite(numeric)) return 0;
  return Math.max(0, numeric);
}

function computeTotals(items: Record<string, CartItem>): CartComputed {
  return Object.values(items).reduce<CartComputed>(
    (acc, item) => {
      acc.totalItems += item.quantity;
      acc.totalPrice += item.quantity * item.price;
      return acc;
    },
    { totalItems: 0, totalPrice: 0 },
  );
}

export const useCartStore = create<CartState & CartComputed & CartActions>()(
  persist(
    (set) => ({
      ...initialState,
      ...computeTotals(initialState.items),

      addProduct: (input) => {
        const quantityToAdd = normalizeQuantity(input.quantity);
        const unitPrice = normalizePrice(input.price);

        set((state) => {
          const existing = state.items[input.id];
          const nextQuantity = (existing?.quantity ?? 0) + quantityToAdd;

          const nextItems: Record<string, CartItem> = {
            ...state.items,
            [input.id]: {
              id: input.id,
              name: input.name,
              price: unitPrice,
              imageUrl: input.imageUrl,
              quantity: nextQuantity,
            },
          };

          return {
            items: nextItems,
            ...computeTotals(nextItems),
          };
        });
      },

      removeProduct: (productId) => {
        set((state) => {
          if (!state.items[productId]) return state;

          const nextItems: Record<string, CartItem> = { ...state.items };
          delete nextItems[productId];

          return {
            items: nextItems,
            ...computeTotals(nextItems),
          };
        });
      },

      clearCart: () => {
        set(() => ({
          ...initialState,
          ...computeTotals(initialState.items),
        }));
      },
    }),
    {
      name: "pokestore-cart",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (state) => ({ items: state.items }),
      merge: (persisted, current) => {
        const persistedItems =
          typeof persisted === "object" &&
          persisted !== null &&
          "items" in persisted
            ? (persisted as { items?: Record<string, CartItem> }).items
            : undefined;

        const mergedItems = persistedItems ?? current.items;
        return {
          ...current,
          items: mergedItems,
          ...computeTotals(mergedItems),
        };
      },
    },
  ),
);

export function selectCartItemCount(state: CartState & CartComputed): number {
  return state.totalItems;
}

export function selectCartTotalPrice(state: CartState & CartComputed): number {
  return state.totalPrice;
}

