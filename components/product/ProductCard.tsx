"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlist-store";
import { Badge } from "@/components/ui/badge";
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
    <article className={cn("group relative flex flex-col", className)}>
      <Link href={`/products/${product.slug}`} className="block overflow-hidden aspect-[3/4] bg-muted">
        <Image
          src={product.images[0] ?? ""}
          alt={product.name}
          width={600}
          height={800}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.isNewArrival && (
          <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground border-0 uppercase tracking-wider">
            New
          </Badge>
        )}
        {product.compareAtPrice && (
          <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground border-0 uppercase tracking-wider">
            Sale
          </Badge>
        )}
      </Link>

      <div className="mt-4 flex flex-col gap-1">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-base font-medium text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>

      <Button
        type="button"
        variant="secondary"
        size="icon"
        className="absolute top-4 right-4 size-9 bg-background/90 hover:bg-background border-0 shadow-sm z-10"
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product);
        }}
        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          className={cn("size-5 transition-colors", isInWishlist ? "fill-accent text-accent" : "fill-none")}
          stroke="currentColor"
          strokeWidth={1.5}
        />
      </Button>
    </article>
  );
}
