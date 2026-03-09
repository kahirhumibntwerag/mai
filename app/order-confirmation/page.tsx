"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getOrder } from "@/store/order-store";
import { formatPrice } from "@/lib/utils";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const [order, setOrder] = useState<ReturnType<typeof getOrder>>(null);

  useEffect(() => {
    if (orderId) {
      setOrder(getOrder(orderId));
    }
  }, [orderId]);

  if (!orderId) {
    return (
      <div className="container-luxury py-16 md:py-24">
        <h1 className="font-serif text-3xl md:text-4xl font-medium tracking-wide mb-8">
          Order Confirmation
        </h1>
        <p className="text-[var(--foreground-muted)] mb-8">
          No order ID provided. Please check your email for order details.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 text-sm font-medium uppercase tracking-wider bg-foreground text-white hover:bg-foreground/90 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container-luxury py-16 md:py-24">
        <h1 className="font-serif text-3xl md:text-4xl font-medium tracking-wide mb-8">
          Order Confirmation
        </h1>
        <p className="text-[var(--foreground-muted)] mb-8">
          Loading order details...
        </p>
      </div>
    );
  }

  const estDelivery = new Date();
  estDelivery.setDate(estDelivery.getDate() + 5);

  return (
    <div className="container-luxury py-16 md:py-24">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="font-serif text-3xl md:text-4xl font-medium tracking-wide mb-4">
          Thank You
        </h1>
        <p className="text-lg text-[var(--foreground-muted)] mb-2">
          Your order has been placed successfully.
        </p>
        <p className="text-sm font-medium">
          Order number: <span className="text-[var(--accent)]">{order.orderNumber}</span>
        </p>
      </div>

      <div className="max-w-xl mx-auto space-y-8">
        <section className="p-6 border border-[var(--border)]">
          <h2 className="font-serif text-lg font-medium mb-4">Order Details</h2>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-[var(--foreground-muted)]">Items</p>
              <ul className="mt-2 space-y-3">
                {order.items.map((item, i) => (
                  <li key={i} className="flex gap-4 items-center">
                    <div className="relative w-12 h-16 flex-shrink-0 bg-[var(--muted-bg)] overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={item.productName}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-[var(--foreground-muted)]">
                        {item.size} / {item.color} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 border-t border-[var(--border)] flex justify-between">
              <span className="text-[var(--foreground-muted)]">Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--foreground-muted)]">Shipping</span>
              <span>
                {order.shippingCost === 0 ? "Free" : formatPrice(order.shippingCost)}
              </span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </section>

        <section className="p-6 border border-[var(--border)]">
          <h2 className="font-serif text-lg font-medium mb-4">Shipping Address</h2>
          <p className="text-sm text-[var(--foreground-muted)]">
            {order.customerName}
            <br />
            {order.shippingAddress}
            <br />
            {order.shippingCity}, {order.shippingZip}
            <br />
            {order.shippingCountry}
          </p>
          <p className="mt-4 text-sm text-[var(--foreground-muted)]">
            Estimated delivery: {estDelivery.toLocaleDateString()}
          </p>
        </section>

        <div className="text-center">
          <Link
            href="/collections/dresses"
            className="inline-block px-8 py-4 text-sm font-medium uppercase tracking-wider bg-foreground text-white hover:bg-foreground/90 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="container-luxury py-16 md:py-24">
          <h1 className="font-serif text-3xl md:text-4xl font-medium tracking-wide mb-8">
            Order Confirmation
          </h1>
          <p className="text-[var(--foreground-muted)]">Loading...</p>
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
