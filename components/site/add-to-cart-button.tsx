"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";

export type AddToCartButtonProps = {
  product: {
    id: string;
    name: string;
    price: number | string;
    imageUrl: string;
  };
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addProduct = useCartStore((state) => state.addProduct);

  return (
    <Button
      type="button"
      className="w-full"
      onClick={() => {
        addProduct({
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
        });
      }}
    >
      Agregar al carrito
    </Button>
  );
}

