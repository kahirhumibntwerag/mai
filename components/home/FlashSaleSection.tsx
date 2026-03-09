"use client";

import { useState, useEffect } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { products } from "@/data/products";

const saleProducts = products.filter((p) => p.compareAtPrice).slice(0, 8);
const categories = ["All", "Jacket", "Shirt", "Pants", "T-Shirt"];

function formatTime(ms: number) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return [h, m, s].map((n) => n.toString().padStart(2, "0")).join(":");
}

export function FlashSaleSection() {
  const [endTime] = useState(() => Date.now() + 2 * 60 * 60 * 1000 + 13 * 60 * 1000 + 36 * 1000);
  const [timeLeft, setTimeLeft] = useState(endTime - Date.now());
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const t = setInterval(() => {
      const left = endTime - Date.now();
      setTimeLeft(left <= 0 ? 0 : left);
    }, 1000);
    return () => clearInterval(t);
  }, [endTime]);

  return (
    <section className="py-12 md:py-16">
      <div className="container-luxury">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            Flash Sale
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Ending in:</span>
            <span className="text-lg font-semibold text-destructive tabular-nums">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {saleProducts.length > 0 ? (
          <ProductGrid products={saleProducts} columns={4} />
        ) : (
          <ProductGrid products={products.slice(0, 4)} columns={4} />
        )}
      </div>
    </section>
  );
}
