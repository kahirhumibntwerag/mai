"use client";

import Link from "next/link";
import { Search, Heart, ShoppingBag, Menu, Star } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartSheet } from "@/components/layout/CartSheet";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/collections/dresses", label: "Shop" },
  { href: "/collections/dresses", label: "Categories" },
  { href: "/search?q=sale", label: "Sale" },
];

export function Header() {
  const itemCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.items.length);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container-luxury">
        <div className="flex h-14 md:h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-1.5 font-semibold text-lg uppercase tracking-wider text-foreground">
            <Star className="size-5 fill-destructive text-destructive" aria-hidden />
            Celeste
          </Link>

          <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="text-sm font-medium text-foreground/90 hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 md:gap-3">
            <Link
              href="/search"
              className="flex size-11 min-w-11 min-h-11 md:size-9 md:min-w-0 md:min-h-0 items-center justify-center text-foreground hover:text-foreground/80 transition-colors -my-1 md:my-0"
              aria-label="Search"
            >
              <Search className="size-5" />
            </Link>
            <Link
              href="/wishlist"
              className="relative flex size-11 min-w-11 min-h-11 md:size-9 md:min-w-0 md:min-h-0 items-center justify-center text-foreground hover:text-foreground/80 transition-colors -my-1 md:my-0"
              aria-label="Wishlist"
            >
              <Heart className="size-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 md:-top-0.5 md:-right-0.5 flex size-5 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <CartSheet>
              <button
                type="button"
                className="relative flex size-11 min-w-11 min-h-11 md:size-9 md:min-w-0 md:min-h-0 items-center justify-center text-foreground hover:text-foreground/80 transition-colors -my-1 md:my-0"
                aria-label="Cart"
              >
                <ShoppingBag className="size-5" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 md:-top-0.5 md:-right-0.5 flex size-5 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-white">
                    {itemCount}
                  </span>
                )}
              </button>
            </CartSheet>

            <Sheet>
              <SheetTrigger>
                <Button variant="ghost" size="icon" className="md:hidden size-11 min-w-11 min-h-11 md:size-8 md:min-w-0 md:min-h-0" aria-label="Toggle menu">
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-4">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 pt-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      className="text-sm font-medium text-foreground/90 hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link href="/about" className="text-sm font-medium text-foreground/90 hover:text-foreground transition-colors">
                    About
                  </Link>
                  <Link href="/contact" className="text-sm font-medium text-foreground/90 hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
