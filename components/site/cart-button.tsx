"use client";

import * as React from "react";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type CartButtonProps = {
  itemCount: number;
  className?: string;
};

export function CartButton({ itemCount, className }: CartButtonProps) {
  const showBadge = itemCount > 0;

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn("relative", className)}
      aria-label={`Cart (${itemCount} items)`}
    >
      <ShoppingCart className="size-5" />
      {showBadge ? (
        <Badge
          className="absolute -right-1 -top-1 min-w-5 justify-center rounded-full px-1.5 py-0 text-[10px]"
          aria-hidden="true"
        >
          {itemCount}
        </Badge>
      ) : null}
    </Button>
  );
}

