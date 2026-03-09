"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

interface FiltersProps {
  sizes: string[];
  colors: { name: string; hex: string }[];
  priceMin?: number;
  priceMax?: number;
}

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name A–Z" },
];

export function Filters({ sizes, colors }: FiltersProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const buildHref = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      const qs = params.toString();
      return qs ? `${pathname}?${qs}` : pathname;
    },
    [searchParams, pathname]
  );

  const selectedSize = searchParams.get("size");
  const selectedColor = searchParams.get("color");
  const selectedSort = searchParams.get("sort") ?? "newest";

  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
      {/* Size */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => {
            const isActive = selectedSize === size;
            const href = buildHref("size", isActive ? null : size);
            return (
              <Link
                key={size}
                href={href}
                className={cn(
                  "inline-flex h-10 min-w-[40px] items-center justify-center border px-4 text-sm font-medium transition-colors",
                  isActive
                    ? "border-foreground bg-foreground text-white"
                    : "border-[var(--border)] hover:border-foreground/50 text-foreground"
                )}
              >
                {size}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Color */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Color</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => {
            const isActive = selectedColor === color.name;
            const href = buildHref("color", isActive ? null : color.name);
            return (
              <Link
                key={color.name}
                href={href}
                className={cn(
                  "block w-10 h-10 rounded-full border-2 transition-all",
                  isActive ? "border-foreground scale-110" : "border-[var(--border)] hover:border-foreground/50"
                )}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Filter by ${color.name}`}
              />
            );
          })}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Sort by</h3>
        <select
          value={selectedSort}
          onChange={(e) => {
            const href = buildHref("sort", e.target.value);
            window.location.href = href;
          }}
          className="w-full px-4 py-3 text-sm bg-white border border-[var(--border)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] focus:border-[var(--accent)]"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}
