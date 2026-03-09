"use client";

import { useState } from "react";
import { Heart, Minus, Plus } from "lucide-react";
import { ImageGallery } from "./ImageGallery";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { Button } from "@/components/ui/button";
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
          <span className="inline-block mb-4 text-xs font-medium uppercase tracking-wider text-accent">
            New Arrival
          </span>
        )}
        <h1 className="font-serif text-3xl md:text-4xl font-medium tracking-wide mb-4">
          {product.name}
        </h1>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xl font-medium">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-base text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
        <p className="text-muted-foreground mb-8 leading-relaxed max-w-xl">
          {product.description}
        </p>

        <div className="mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
            Size {selectedSize ? `: ${selectedSize}` : ""}
          </h3>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <Button
                key={size}
                type="button"
                variant={selectedSize === size ? "default" : "outline"}
                className={cn(
                  "h-12 min-w-[48px] px-4",
                  selectedSize === size && "bg-primary text-primary-foreground"
                )}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

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
                      ? "border-primary scale-110"
                      : "border-border hover:border-foreground/50"
                  )}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={`Select ${color.name}`}
                >
                  {selectedColor === color.name && (
                    <svg
                      className="size-5 text-white drop-shadow"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
            Quantity
          </h3>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-12 text-lg"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              <Minus className="size-4" />
            </Button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-12 text-lg"
              onClick={() => setQuantity((q) => q + 1)}
            >
              <Plus className="size-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            type="button"
            size="lg"
            className={cn(
              "flex-1 min-h-12 py-4 text-base font-medium uppercase tracking-wider",
              addedToCart && "bg-accent text-accent-foreground hover:bg-accent/90"
            )}
            disabled={!selectedSize}
            onClick={handleAddToCart}
          >
            {addedToCart ? "Added to Cart" : "Add to Cart"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className={cn(
              "min-h-12 py-4 px-8 text-base uppercase tracking-wider gap-2",
              isInWishlist && "border-accent text-accent"
            )}
            onClick={() => toggleWishlist(product)}
          >
            <Heart
              className={cn("size-5", isInWishlist ? "fill-current" : "fill-none")}
              stroke="currentColor"
              strokeWidth={1.5}
            />
            {isInWishlist ? "Saved" : "Wishlist"}
          </Button>
        </div>
      </div>
    </div>
  );
}
