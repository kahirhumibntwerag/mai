"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const router = useRouter();

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

  const handleSortChange = (value: string | null) => {
    if (value) router.push(buildHref("sort", value));
  };

  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
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
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-foreground/50 text-foreground"
                )}
              >
                {size}
              </Link>
            );
          })}
        </div>
      </div>

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
                  isActive ? "border-primary scale-110" : "border-border hover:border-foreground/50"
                )}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Filter by ${color.name}`}
              />
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Sort by</h3>
        <Select value={selectedSort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </aside>
  );
}
