import Image from "next/image";

import { AddToCartButton } from "@/components/site/add-to-cart-button";
import { cn } from "@/lib/utils";

export type Product = {
  id: string;
  name: string;
  price: number | string;
  image_url: string;
  category?: string;
};

export type ProductCardProps = {
  product: Product;
  className?: string;
};

function formatPriceUSD(price: number | string): string {
  const numericPrice = typeof price === "number" ? price : Number(price);
  const safePrice = Number.isFinite(numericPrice) ? numericPrice : 0;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(safePrice);
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm",
        className,
      )}
    >
      <div className="relative aspect-[4/3] w-full bg-muted">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="space-y-2 p-4">
        <div className="space-y-1">
          <h3 className="line-clamp-1 text-base font-semibold tracking-tight">
            {product.name}
          </h3>
          <p className="text-sm font-medium text-foreground">
            {formatPriceUSD(product.price)}
          </p>
        </div>

        <AddToCartButton
          product={{
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.image_url,
          }}
        />
      </div>
    </article>
  );
}

