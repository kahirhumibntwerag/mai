"use client";

import Link from "next/link";
import { BlurImage } from "@/components/ui/blur-image";
import { Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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
          <p className="text-muted-foreground mb-8">
            Your cart is empty.
          </p>
          <Button render={<Link href="/collections/dresses" />} nativeButton={false} className="uppercase tracking-wider">
            Continue Shopping
          </Button>
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
            <div key={item.id} className="flex gap-6 py-6 border-b border-border">
              <div className="relative w-24 h-32 md:w-32 md:h-40 flex-shrink-0 bg-muted overflow-hidden">
                <BlurImage
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
                  className="font-serif text-lg font-medium hover:text-accent transition-colors"
                >
                  {item.productName}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Size: {item.size} | Color: {item.color}
                </p>
                <p className="mt-2 font-medium">{formatPrice(item.price)}</p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center border border-border">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-10 rounded-none"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="size-4" />
                    </Button>
                    <span className="w-12 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-10 rounded-none"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="size-4" />
                    </Button>
                  </div>
                  <Button
                    type="button"
                    variant="link"
                    className="text-sm text-muted-foreground hover:text-foreground h-auto p-0"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
              <div className="text-right font-medium">
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="sticky top-24 p-6 border border-border bg-muted">
            <h2 className="font-serif text-xl font-medium mb-6">
              Order Summary
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>
                  {shippingEstimate === 0 ? "Free" : formatPrice(shippingEstimate)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium text-base pt-2">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Free shipping on orders over $200
            </p>
            <Button render={<Link href="/checkout" />} nativeButton={false} className="mt-6 w-full uppercase tracking-wider">
              Proceed to Checkout
            </Button>
            <Button render={<Link href="/collections/dresses" />} nativeButton={false} variant="outline" className="mt-4 w-full uppercase tracking-wider">
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
