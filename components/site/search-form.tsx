import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type ProductSearchFormProps = {
  className?: string;
};

export function ProductSearchForm({ className }: ProductSearchFormProps) {
  return (
    <form action="/search" className={cn("relative w-full", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        name="q"
        placeholder="Buscar sobres, boxes, ETBs..."
        className="pl-9"
        aria-label="Buscar productos"
      />
    </form>
  );
}

