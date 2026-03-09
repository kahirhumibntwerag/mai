"use client";

import Link from "next/link";
import { useWishlistStore } from "@/store/wishlist-store";
import { WishlistProductCard } from "@/components/product/WishlistProductCard";

const columnClasses = "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);

  if (items.length === 0) {
    return (
      <div className="container-luxury py-16 md:py-24">
        <h1 className="font-serif text-3xl md:text-4xl font-medium tracking-wide mb-8">
          Your Wishlist
        </h1>
        <div className="py-24 text-center">
          <p className="text-[var(--foreground-muted)] mb-8">
            Your wishlist is empty. Save items you love for later.
          </p>
          <Link
            href="/collections/dresses"
            className="inline-block px-8 py-4 text-sm font-medium uppercase tracking-wider bg-foreground text-white hover:bg-foreground/90 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-luxury py-12 md:py-16">
      <h1 className="font-serif text-3xl md:text-4xl font-medium tracking-wide mb-12">
        Your Wishlist
      </h1>

      <div className="mb-8">
        <p className="text-[var(--foreground-muted)]">
          {items.length} {items.length === 1 ? "item" : "items"} saved
        </p>
      </div>

      <div className={columnClasses}>
        {items.map((product) => (
          <WishlistProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-12 p-6 bg-[var(--muted-bg)] text-center">
        <p className="text-sm text-[var(--foreground-muted)] mb-4">
          Add items to your cart or remove them from your wishlist.
        </p>
        <Link
          href="/collections/dresses"
          className="text-sm font-medium uppercase tracking-wider text-foreground hover:text-[var(--accent)] transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
