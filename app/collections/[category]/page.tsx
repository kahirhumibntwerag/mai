import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Filters } from "@/components/product/Filters";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

function getUniqueSizes(prods: typeof products) {
  const set = new Set<string>();
  prods.forEach((p) => p.sizes.forEach((s) => set.add(s)));
  return Array.from(set).sort();
}

function getUniqueColors(prods: typeof products) {
  const seen = new Set<string>();
  const result: { name: string; hex: string }[] = [];
  prods.forEach((p) =>
    p.colors.forEach((c) => {
      if (!seen.has(c.name)) {
        seen.add(c.name);
        result.push(c);
      }
    })
  );
  return result;
}

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ size?: string; color?: string; sort?: string }>;
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category: categorySlug } = await params;
  const { size, color, sort = "newest" } = await searchParams;

  const category = categories.find((c) => c.slug === categorySlug);
  if (!category) notFound();

  let filtered = products.filter((p) => p.categorySlug === categorySlug);

  if (size) {
    filtered = filtered.filter((p) => p.sizes.includes(size));
  }
  if (color) {
    filtered = filtered.filter((p) => p.colors.some((c) => c.name === color));
  }

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      case "newest":
      default:
        return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
    }
  });

  const allSizes = getUniqueSizes(
    products.filter((p) => p.categorySlug === categorySlug)
  );
  const allColors = getUniqueColors(
    products.filter((p) => p.categorySlug === categorySlug)
  );

  return (
    <div className="container-luxury py-12 md:py-16">
      <div className="mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-wide capitalize mb-2">
          {category.name}
        </h1>
        <p className="text-[var(--foreground-muted)] max-w-2xl">
          {category.description}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        <Filters
          sizes={allSizes}
          colors={allColors}
        />

        <div className="flex-1 min-w-0">
          <p className="text-sm text-[var(--foreground-muted)] mb-6">
            {sorted.length} {sorted.length === 1 ? "product" : "products"}
          </p>
          {sorted.length > 0 ? (
            <ProductGrid products={sorted} columns={4} />
          ) : (
            <p className="py-16 text-center text-[var(--foreground-muted)]">
              No products match your filters. Try adjusting your selection.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
