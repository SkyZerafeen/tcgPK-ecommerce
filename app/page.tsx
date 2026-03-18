import { ProductCard, type Product } from "@/components/site/product-card";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type ProductsQueryResult = Pick<
  Product,
  "id" | "name" | "price" | "image_url" | "category"
>;

async function getProducts(): Promise<ProductsQueryResult[]> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("id,name,price,image_url,category")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch products from Supabase:", error);
    return [];
  }

  return data ?? [];
}

export default async function Home() {
  const products = await getProducts();

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Sealed products de Pokémon TCG
        </h1>
        <p className="max-w-2xl text-pretty text-muted-foreground">
          Productos cargados desde Supabase (lectura pública con RLS).
        </p>
      </div>

      {products.length === 0 ? (
        <div className="rounded-xl border bg-card p-6 text-card-foreground">
          <p className="text-sm text-muted-foreground">
            No hay productos para mostrar (o falló la conexión con Supabase).
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
