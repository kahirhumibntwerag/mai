"use client";

import Link from "next/link";
import { useWishlistStore } from "@/store/wishlist-store";
import { WishlistProductCard } from "@/components/product/WishlistProductCard";
import { Button } from "@/components/ui/button";

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
          <p className="text-muted-foreground mb-8">
            Your wishlist is empty. Save items you love for later.
          </p>
          <Button render={<Link href="/collections/dresses" />} nativeButton={false} className="uppercase tracking-wider">
            Browse Products
          </Button>
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
        <p className="text-muted-foreground">
          {items.length} {items.length === 1 ? "item" : "items"} saved
        </p>
      </div>

      <div className={columnClasses}>
        {items.map((product) => (
          <WishlistProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-12 p-6 bg-muted text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Add items to your cart or remove them from your wishlist.
        </p>
        <Button render={<Link href="/collections/dresses" />} nativeButton={false} variant="link" className="text-accent hover:text-accent/90">
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
