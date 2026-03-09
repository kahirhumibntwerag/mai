"use client";

import { useState } from "react";
import { ImageGallery } from "./ImageGallery";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { cn } from "@/lib/utils";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes[0] ?? null
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors[0]?.name ?? null
  );
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);

  const handleAddToCart = () => {
    const size = selectedSize ?? product.sizes[0];
    const color = selectedColor ?? product.colors[0]?.name ?? "Default";

    if (!size) return;

    addItem({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      imageUrl: product.images[0] ?? "",
      price: product.price,
      quantity,
      size,
      color,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
      <ImageGallery images={product.images} alt={product.name} />

      <div>
        {product.isNewArrival && (
          <span className="inline-block mb-4 text-xs font-medium uppercase tracking-wider text-[var(--accent)]">
            New Arrival
          </span>
        )}
        <h1 className="font-serif text-3xl md:text-4xl font-medium tracking-wide mb-4">
          {product.name}
        </h1>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xl font-medium">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-base text-[var(--foreground-muted)] line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
        <p className="text-[var(--foreground-muted)] mb-8 leading-relaxed max-w-xl">
          {product.description}
        </p>

        {/* Size */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
            Size {selectedSize ? `: ${selectedSize}` : ""}
          </h3>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "h-12 min-w-[48px] px-4 border text-sm font-medium transition-colors",
                  selectedSize === size
                    ? "border-foreground bg-foreground text-white"
                    : "border-[var(--border)] hover:border-foreground/50"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color */}
        {product.colors.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Color {selectedColor ? `: ${selectedColor}` : ""}
            </h3>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color.name)}
                  className={cn(
                    "w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center",
                    selectedColor === color.name
                      ? "border-foreground scale-110"
                      : "border-[var(--border)] hover:border-foreground/50"
                  )}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={`Select ${color.name}`}
                >
                  {selectedColor === color.name && (
                    <svg
                      className="w-5 h-5 text-white drop-shadow"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
            Quantity
          </h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-12 h-12 border border-[var(--border)] flex items-center justify-center text-lg hover:border-foreground/50 transition-colors"
            >
              −
            </button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-12 h-12 border border-[var(--border)] flex items-center justify-center text-lg hover:border-foreground/50 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className={cn(
              "flex-1 h-14 px-8 text-sm font-medium uppercase tracking-wider transition-colors",
              addedToCart
                ? "bg-[var(--accent)] text-white"
                : "bg-foreground text-white hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {addedToCart ? "Added to Cart" : "Add to Cart"}
          </button>
          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            className={cn(
              "h-14 px-8 border border-[var(--border)] text-sm font-medium uppercase tracking-wider transition-colors flex items-center justify-center gap-2",
              isInWishlist
                ? "border-[var(--accent)] text-[var(--accent)]"
                : "hover:border-foreground/50"
            )}
          >
            <svg
              className={cn("w-5 h-5", isInWishlist ? "fill-current" : "fill-none stroke-current")}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            {isInWishlist ? "Saved" : "Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
}
