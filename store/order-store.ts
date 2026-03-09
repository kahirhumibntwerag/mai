"use client";

const ORDER_KEY = "last-order";

export interface PlacedOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  shippingCity: string;
  shippingZip: string;
  shippingCountry: string;
  items: Array<{
    productName: string;
    imageUrl: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
  }>;
  subtotal: number;
  shippingCost: number;
  total: number;
  createdAt: string;
}

export function saveOrder(order: PlacedOrder): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(ORDER_KEY, JSON.stringify(order));
  }
}

export function getOrder(id: string): PlacedOrder | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ORDER_KEY);
    if (!raw) return null;
    const order = JSON.parse(raw) as PlacedOrder;
    return order.id === id ? order : null;
  } catch {
    return null;
  }
}
