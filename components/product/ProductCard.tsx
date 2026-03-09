"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlist-store";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);

  return (
    <article
      className={cn(
        "group relative flex flex-col",
        className
      )}
    >
      <Link href={`/products/${product.slug}`} className="block overflow-hidden aspect-[3/4] bg-[var(--muted-bg)]">
        <Image
          src={product.images[0] ?? ""}
          alt={product.name}
          width={600}
          height={800}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.isNewArrival && (
          <span className="absolute top-4 left-4 bg-[var(--accent)] text-white text-xs font-medium uppercase tracking-wider px-3 py-1">
            New
          </span>
        )}
        {product.compareAtPrice && (
          <span className="absolute top-4 right-4 bg-foreground text-white text-xs font-medium uppercase tracking-wider px-3 py-1">
            Sale
          </span>
        )}
      </Link>

      <div className="mt-4 flex flex-col gap-1">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-[var(--accent)] transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-base font-medium text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-[var(--foreground-muted)] line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white transition-colors z-10"
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product);
        }}
        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <svg
          className={cn("w-5 h-5 transition-colors", isInWishlist ? "fill-[var(--accent)] text-[var(--accent)]" : "fill-none stroke-current text-foreground/70")}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </article>
  );
}
