"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { products } from "@/data/products";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(queryParam);

  useEffect(() => {
    setQuery(queryParam);
  }, [queryParam]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categorySlug.toLowerCase().includes(q)
    );
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = (e.target as HTMLFormElement).querySelector("input")?.value ?? "";
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="container-luxury py-12 md:py-16">
      <h1 className="font-serif text-3xl md:text-4xl font-medium tracking-wide mb-8">
        Search
      </h1>

      <form onSubmit={handleSubmit} className="mb-12 max-w-xl">
        <div className="flex gap-2">
          <Input
            type="search"
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 h-11"
          />
          <Button type="submit" className="uppercase tracking-wider">
            Search
          </Button>
        </div>
      </form>

      {query && (
        <p className="text-muted-foreground mb-8">
          {results.length} {results.length === 1 ? "result" : "results"} for &quot;{query}&quot;
        </p>
      )}

      {!query.trim() ? (
        <p className="py-16 text-center text-muted-foreground">
          Enter a search term to find products.
        </p>
      ) : results.length > 0 ? (
        <ProductGrid products={results} columns={4} />
      ) : (
        <div className="py-16 text-center">
          <p className="text-muted-foreground mb-6">
            No products found for &quot;{query}&quot;. Try a different search term.
          </p>
          <Button render={<Link href="/collections/dresses" />} nativeButton={false} variant="outline" className="uppercase tracking-wider">
            Browse All Products
          </Button>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container-luxury py-12 md:py-16">
          <h1 className="font-serif text-3xl md:text-4xl font-medium tracking-wide mb-8">
            Search
          </h1>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
