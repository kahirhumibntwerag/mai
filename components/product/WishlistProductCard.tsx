"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";

interface WishlistProductCardProps {
  product: Product;
}

export function WishlistProductCard({ product }: WishlistProductCardProps) {
  const removeItem = useWishlistStore((s) => s.removeItem);
  const addItem = useCartStore((s) => s.addItem);

  const handleMoveToCart = () => {
    const size = product.sizes[0] ?? "One Size";
    const color = product.colors[0]?.name ?? "Default";
    addItem({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      imageUrl: product.images[0] ?? "",
      price: product.price,
      quantity: 1,
      size,
      color,
    });
    removeItem(product.id);
  };

  return (
    <article className="group relative flex flex-col">
      <Link href={`/products/${product.slug}`} className="block overflow-hidden aspect-[3/4] bg-muted">
        <Image
          src={product.images[0] ?? ""}
          alt={product.name}
          width={600}
          height={800}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="mt-4 flex flex-col gap-2">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-base font-medium">{formatPrice(product.price)}</p>
        <div className="flex gap-2 mt-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1 uppercase tracking-wider"
            onClick={handleMoveToCart}
          >
            Add to Cart
          </Button>
          <Button
            type="button"
            variant="outline"
            className="uppercase tracking-wider text-muted-foreground hover:text-foreground"
            onClick={() => removeItem(product.id)}
          >
            Remove
          </Button>
        </div>
      </div>
    </article>
  );
}
