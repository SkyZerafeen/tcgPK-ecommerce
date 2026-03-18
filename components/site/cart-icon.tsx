"use client";

import { CartButton } from "@/components/site/cart-button";
import { selectCartItemCount, useCartStore } from "@/store/useCartStore";

export type CartIconProps = {
  className?: string;
};

export function CartIcon({ className }: CartIconProps) {
  const itemCount = useCartStore(selectCartItemCount);
  return <CartButton itemCount={itemCount} className={className} />;
}

