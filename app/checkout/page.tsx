"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { saveOrder } from "@/store/order-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    shippingAddress: "",
    shippingCity: "",
    shippingZip: "",
    shippingCountry: "United States",
  });

  const subtotal = getSubtotal();
  const shippingCost = subtotal >= 200 ? 0 : 15;
  const total = subtotal + shippingCost;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCountryChange = (value: string | null) => {
    if (value) setForm((prev) => ({ ...prev, shippingCountry: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setLoading(true);

    const orderId = `order-${Date.now()}`;
    const orderNumber = `MAI-${1000 + Math.floor(Math.random() * 9000)}`;

    const order = {
      id: orderId,
      orderNumber,
      customerName: form.customerName,
      customerEmail: form.customerEmail,
      shippingAddress: form.shippingAddress,
      shippingCity: form.shippingCity,
      shippingZip: form.shippingZip,
      shippingCountry: form.shippingCountry,
      items: items.map((i) => ({
        productName: i.productName,
        imageUrl: i.imageUrl,
        price: i.price,
        quantity: i.quantity,
        size: i.size,
        color: i.color,
      })),
      subtotal,
      shippingCost,
      total,
      createdAt: new Date().toISOString(),
    };

    saveOrder(order);
    clearCart();
    router.push(`/order-confirmation?id=${orderId}`);
  };

  if (items.length === 0 && !loading) {
    return (
      <div className="container-luxury py-16 md:py-24">
        <h1 className="font-serif text-3xl md:text-4xl font-medium tracking-wide mb-8">
          Checkout
        </h1>
        <p className="text-muted-foreground mb-8">
          Your cart is empty. Add items to checkout.
        </p>
        <Button render={<Link href="/collections/dresses" />} nativeButton={false} className="uppercase tracking-wider">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container-luxury py-12 md:py-16">
      <h1 className="font-serif text-3xl md:text-4xl font-medium tracking-wide mb-12">
        Checkout
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="font-serif text-xl font-medium mb-6">
                Shipping Information
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="customerName">Full Name</Label>
                  <Input
                    id="customerName"
                    name="customerName"
                    type="text"
                    required
                    value={form.customerName}
                    onChange={handleChange}
                    className="mt-2 h-11"
                  />
                </div>
                <div>
                  <Label htmlFor="customerEmail">Email</Label>
                  <Input
                    id="customerEmail"
                    name="customerEmail"
                    type="email"
                    required
                    value={form.customerEmail}
                    onChange={handleChange}
                    className="mt-2 h-11"
                  />
                </div>
                <div>
                  <Label htmlFor="shippingAddress">Address</Label>
                  <Input
                    id="shippingAddress"
                    name="shippingAddress"
                    type="text"
                    required
                    value={form.shippingAddress}
                    onChange={handleChange}
                    className="mt-2 h-11"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="shippingCity">City</Label>
                    <Input
                      id="shippingCity"
                      name="shippingCity"
                      type="text"
                      required
                      value={form.shippingCity}
                      onChange={handleChange}
                      className="mt-2 h-11"
                    />
                  </div>
                  <div>
                    <Label htmlFor="shippingZip">ZIP Code</Label>
                    <Input
                      id="shippingZip"
                      name="shippingZip"
                      type="text"
                      required
                      value={form.shippingZip}
                      onChange={handleChange}
                      className="mt-2 h-11"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="shippingCountry">Country</Label>
                  <Select value={form.shippingCountry} onValueChange={handleCountryChange}>
                    <SelectTrigger className="mt-2 h-11 w-full">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            <Card className="border-border bg-muted">
              <CardHeader>
                <h2 className="font-serif text-xl font-medium">
                  Payment
                </h2>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This is a mock checkout. No payment is processed. Click &quot;Place Order&quot; to complete.
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24 border-border bg-muted">
              <CardHeader>
                <h2 className="font-serif text-xl font-medium">
                  Order Summary
                </h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="relative w-16 h-20 flex-shrink-0 bg-background overflow-hidden">
                        <Image
                          src={item.imageUrl}
                          alt={item.productName}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.productName}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.size} / {item.color} × {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium text-base">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="mt-6 w-full uppercase tracking-wider"
                >
                  {loading ? "Processing..." : "Place Order"}
                </Button>
                <Button
                  render={<Link href="/cart" />}
                  nativeButton={false}
                  variant="outline"
                  className="mt-4 w-full uppercase tracking-wider"
                >
                  Back to Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
