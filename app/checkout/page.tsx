"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { saveOrder } from "@/store/order-store";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
        <p className="text-[var(--foreground-muted)] mb-8">
          Your cart is empty. Add items to checkout.
        </p>
        <Link
          href="/collections/dresses"
          className="inline-block px-8 py-4 text-sm font-medium uppercase tracking-wider bg-foreground text-white hover:bg-foreground/90 transition-colors"
        >
          Continue Shopping
        </Link>
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
                  <label
                    htmlFor="customerName"
                    className="block text-sm font-medium mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    id="customerName"
                    name="customerName"
                    type="text"
                    required
                    value={form.customerName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[var(--border)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] focus:border-[var(--accent)]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="customerEmail"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="customerEmail"
                    name="customerEmail"
                    type="email"
                    required
                    value={form.customerEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[var(--border)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] focus:border-[var(--accent)]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="shippingAddress"
                    className="block text-sm font-medium mb-2"
                  >
                    Address
                  </label>
                  <input
                    id="shippingAddress"
                    name="shippingAddress"
                    type="text"
                    required
                    value={form.shippingAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[var(--border)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] focus:border-[var(--accent)]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="shippingCity"
                      className="block text-sm font-medium mb-2"
                    >
                      City
                    </label>
                    <input
                      id="shippingCity"
                      name="shippingCity"
                      type="text"
                      required
                      value={form.shippingCity}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[var(--border)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] focus:border-[var(--accent)]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="shippingZip"
                      className="block text-sm font-medium mb-2"
                    >
                      ZIP Code
                    </label>
                    <input
                      id="shippingZip"
                      name="shippingZip"
                      type="text"
                      required
                      value={form.shippingZip}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[var(--border)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] focus:border-[var(--accent)]"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="shippingCountry"
                    className="block text-sm font-medium mb-2"
                  >
                    Country
                  </label>
                  <select
                    id="shippingCountry"
                    name="shippingCountry"
                    value={form.shippingCountry}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[var(--border)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] focus:border-[var(--accent)]"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium mb-6">
                Payment
              </h2>
              <div className="p-6 border border-[var(--border)] bg-[var(--muted-bg)]">
                <p className="text-sm text-[var(--foreground-muted)]">
                  This is a mock checkout. No payment is processed. Click &quot;Place Order&quot; to complete.
                </p>
              </div>
            </section>
          </div>

          <div>
            <div className="sticky top-24 p-6 border border-[var(--border)] bg-[var(--muted-bg)]">
              <h2 className="font-serif text-xl font-medium mb-6">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 items-center"
                  >
                    <div className="relative w-16 h-20 flex-shrink-0 bg-white overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={item.productName}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item.productName}
                      </p>
                      <p className="text-xs text-[var(--foreground-muted)]">
                        {item.size} / {item.color} × {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm pt-4 border-t border-[var(--border)]">
                <div className="flex justify-between">
                  <span className="text-[var(--foreground-muted)]">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--foreground-muted)]">Shipping</span>
                  <span>
                    {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between font-medium text-base pt-2">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full py-4 text-sm font-medium uppercase tracking-wider bg-foreground text-white hover:bg-foreground/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
              <Link
                href="/cart"
                className="mt-4 block w-full py-3 text-center text-sm font-medium uppercase tracking-wider border border-[var(--border)] hover:border-foreground/50 transition-colors"
              >
                Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
