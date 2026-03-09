"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BlurImage } from "@/components/ui/blur-image";
import { getOrder } from "@/store/order-store";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
        <p className="text-muted-foreground mb-8">
          No order ID provided. Please check your email for order details.
        </p>
        <Button render={<Link href="/" />} nativeButton={false} className="uppercase tracking-wider">
          Continue Shopping
        </Button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container-luxury py-16 md:py-24">
        <h1 className="font-serif text-3xl md:text-4xl font-medium tracking-wide mb-8">
          Order Confirmation
        </h1>
        <p className="text-muted-foreground mb-8">
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
        <p className="text-lg text-muted-foreground mb-2">
          Your order has been placed successfully.
        </p>
        <p className="text-sm font-medium">
          Order number: <span className="text-accent">{order.orderNumber}</span>
        </p>
      </div>

      <div className="max-w-xl mx-auto space-y-8">
        <Card className="border-border">
          <CardHeader>
            <h2 className="font-serif text-lg font-medium">Order Details</h2>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <p className="text-muted-foreground">Items</p>
              <ul className="mt-2 space-y-3">
                {order.items.map((item, i) => (
                  <li key={i} className="flex gap-4 items-center">
                    <div className="relative w-12 h-16 flex-shrink-0 bg-muted overflow-hidden">
                      <BlurImage
                        src={item.imageUrl}
                        alt={item.productName}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-muted-foreground">
                        {item.size} / {item.color} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                  </li>
                ))}
              </ul>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>
                {order.shippingCost === 0 ? "Free" : formatPrice(order.shippingCost)}
              </span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <h2 className="font-serif text-lg font-medium">Shipping Address</h2>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {order.customerName}
              <br />
              {order.shippingAddress}
              <br />
              {order.shippingCity}, {order.shippingZip}
              <br />
              {order.shippingCountry}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Estimated delivery: {estDelivery.toLocaleDateString()}
            </p>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button render={<Link href="/collections/dresses" />} nativeButton={false} className="uppercase tracking-wider">
            Continue Shopping
          </Button>
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
          <p className="text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
