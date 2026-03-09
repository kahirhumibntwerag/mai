"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore();

  const subtotal = getSubtotal();
  const shippingEstimate = subtotal >= 200 ? 0 : 15;
  const total = subtotal + shippingEstimate;

  if (items.length === 0) {
    return (
      <div className="container-luxury py-16 md:py-24">
        <h1 className="font-serif text-3xl md:text-4xl font-medium tracking-wide mb-8">
          Your Cart
        </h1>
        <div className="py-24 text-center">
          <p className="text-[var(--foreground-muted)] mb-8">
            Your cart is empty.
          </p>
          <Link
            href="/collections/dresses"
            className="inline-block px-8 py-4 text-sm font-medium uppercase tracking-wider bg-foreground text-white hover:bg-foreground/90 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-luxury py-12 md:py-16">
      <h1 className="font-serif text-3xl md:text-4xl font-medium tracking-wide mb-12">
        Your Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 py-6 border-b border-[var(--border)]"
            >
              <div className="relative w-24 h-32 md:w-32 md:h-40 flex-shrink-0 bg-[var(--muted-bg)] overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.productName}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${item.productSlug}`}
                  className="font-serif text-lg font-medium hover:text-[var(--accent)] transition-colors"
                >
                  {item.productName}
                </Link>
                <p className="text-sm text-[var(--foreground-muted)] mt-1">
                  Size: {item.size} | Color: {item.color}
                </p>
                <p className="mt-2 font-medium">{formatPrice(item.price)}</p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center border border-[var(--border)]">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-10 h-10 flex items-center justify-center text-lg hover:bg-[var(--muted-bg)] transition-colors"
                    >
                      −
                    </button>
                    <span className="w-12 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-lg hover:bg-[var(--muted-bg)] transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-sm text-[var(--foreground-muted)] hover:text-foreground underline transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-right font-medium">
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="sticky top-24 p-6 border border-[var(--border)] bg-[var(--muted-bg)]">
            <h2 className="font-serif text-xl font-medium mb-6">
              Order Summary
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--foreground-muted)]">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--foreground-muted)]">Shipping</span>
                <span>
                  {shippingEstimate === 0
                    ? "Free"
                    : formatPrice(shippingEstimate)}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-[var(--border)] font-medium text-base">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-[var(--foreground-muted)]">
              Free shipping on orders over $200
            </p>
            <Link
              href="/checkout"
              className="mt-6 block w-full py-4 text-center text-sm font-medium uppercase tracking-wider bg-foreground text-white hover:bg-foreground/90 transition-colors"
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/collections/dresses"
              className="mt-4 block w-full py-3 text-center text-sm font-medium uppercase tracking-wider border border-[var(--border)] hover:border-foreground/50 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
