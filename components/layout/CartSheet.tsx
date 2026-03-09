"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BlurImage } from "@/components/ui/blur-image";
import { Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface CartSheetProps {
  children: React.ReactNode;
}

export function CartSheet({ children }: CartSheetProps) {
  const [open, setOpen] = useState(false);
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore();

  const subtotal = getSubtotal();
  const shippingEstimate = subtotal >= 200 ? 0 : 15;
  const total = subtotal + shippingEstimate;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={children as React.ReactElement} />
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-8 sm:max-w-md sm:p-6">
        <SheetHeader>
          <SheetTitle className="font-serif text-xl">Your Cart</SheetTitle>
        </SheetHeader>
        <div className="flex flex-1 flex-col overflow-hidden">
          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center py-16 text-center">
              <p className="text-muted-foreground mb-6">
                Your cart is empty.
              </p>
              <Button
                render={<Link href="/collections/dresses" />}
                nativeButton={false}
                variant="outline"
                className="uppercase tracking-wider"
                onClick={() => setOpen(false)}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4 -mx-4 px-4">
                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 py-4 border-b border-border last:border-0"
                    >
                      <div className="relative w-20 h-24 flex-shrink-0 bg-muted overflow-hidden">
                        <BlurImage
                          src={item.imageUrl}
                          alt={item.productName}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${item.productSlug}`}
                          className="font-serif font-medium hover:text-accent transition-colors line-clamp-2"
                          onClick={() => setOpen(false)}
                        >
                          {item.productName}
                        </Link>
                        <p className="text-xs text-muted-foreground mt-1">
                          Size: {item.size} | Color: {item.color}
                        </p>
                        <p className="mt-2 text-sm font-medium">
                          {formatPrice(item.price)}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex items-center border border-border">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="size-10 min-w-10 min-h-10 md:size-8 md:min-w-8 md:min-h-8 rounded-none"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <Minus className="size-3" />
                            </Button>
                            <span className="w-8 text-center text-xs font-medium min-w-8">
                              {item.quantity}
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="size-10 min-w-10 min-h-10 md:size-8 md:min-w-8 md:min-h-8 rounded-none"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="size-3" />
                            </Button>
                          </div>
                          <Button
                            type="button"
                            variant="link"
                            className="text-xs text-muted-foreground hover:text-foreground h-auto min-h-[44px] py-2 px-0 flex items-center"
                            onClick={() => removeItem(item.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                      <div className="text-right text-sm font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-auto border-t border-border pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shippingEstimate === 0
                      ? "Free"
                      : formatPrice(shippingEstimate)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Free shipping on orders over $200
                </p>
                <Button
                  render={<Link href="/checkout" />}
                  nativeButton={false}
                  className="w-full uppercase tracking-wider"
                  onClick={() => setOpen(false)}
                >
                  Proceed to Checkout
                </Button>
                <Button
                  render={<Link href="/collections/dresses" />}
                  nativeButton={false}
                  variant="outline"
                  className="w-full uppercase tracking-wider"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
