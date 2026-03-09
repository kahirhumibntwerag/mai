"use client";

import Link from "next/link";
import { BlurImage } from "@/components/ui/blur-image";
import { Heart } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlist-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);

  return (
    <article className={cn("group relative flex flex-col rounded-lg border border-border bg-card overflow-hidden", className)}>
      <Link href={`/products/${product.slug}`} className="block overflow-hidden aspect-[3/4] bg-muted relative">
        <BlurImage
          src={product.images[0] ?? ""}
          alt={product.name}
          width={600}
          height={800}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.isNewArrival && (
          <span className="absolute top-3 left-3 rounded bg-accent px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-accent-foreground">
            New
          </span>
        )}
      </Link>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-3 right-3 z-10 size-9 rounded-full bg-background/80 hover:bg-background text-foreground"
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product);
        }}
        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          className={cn("size-5 transition-colors", isInWishlist ? "fill-destructive text-destructive" : "fill-none")}
          stroke="currentColor"
          strokeWidth={1.5}
        />
      </Button>

      <div className="p-4 flex flex-col gap-1">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-medium text-foreground group-hover:text-foreground/80 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          {product.compareAtPrice ? (
            <>
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
              <span className="text-base font-semibold text-foreground">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-base font-semibold text-foreground">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
