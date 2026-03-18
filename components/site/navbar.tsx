import Link from "next/link";
import { Menu } from "lucide-react";

import { CartIcon } from "@/components/site/cart-icon";
import { ProductSearchForm } from "@/components/site/search-form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  return (
    <div className="border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px] sm:w-[360px]">
              <SheetHeader>
                <SheetTitle>PokeStore</SheetTitle>
                <SheetDescription>
                  Busca sealed products y gestiona tu carrito.
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-4">
                <ProductSearchForm />
                <div className="flex items-center justify-between">
                  <CartIcon />
                  <Button variant="secondary">Ingresar</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link
            href="/"
            className="text-base font-semibold tracking-tight text-foreground"
          >
            PokeStore
          </Link>
        </div>

        <div className="hidden flex-1 md:block">
          <ProductSearchForm className="mx-auto max-w-xl" />
        </div>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <CartIcon />
          <Button variant="secondary">Ingresar</Button>
        </div>
      </div>
    </div>
  );
}

