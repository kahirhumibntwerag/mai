import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductGrid } from "@/components/product/ProductGrid";
import { products } from "@/data/products";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) notFound();

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug)
    .slice(0, 4);

  return (
    <div className="container-luxury py-12 md:py-16">
      <nav className="mb-8 text-sm text-[var(--foreground-muted)]">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/collections/${product.categorySlug}`}
          className="hover:text-foreground transition-colors capitalize"
        >
          {product.categorySlug}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <ProductDetail product={product} />

      {relatedProducts.length > 0 && (
        <section className="mt-24 pt-16 border-t border-[var(--border)]">
          <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-wide mb-8">
            You May Also Like
          </h2>
          <ProductGrid products={relatedProducts} columns={4} />
        </section>
      )}
    </div>
  );
}
