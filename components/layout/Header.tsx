"use client";

import Link from "next/link";
import { Search, Heart, ShoppingBag, Menu } from "lucide-react";
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
  { href: "/collections/dresses", label: "Dresses" },
  { href: "/collections/tops", label: "Tops" },
  { href: "/collections/bottoms", label: "Bottoms" },
  { href: "/collections/outerwear", label: "Outerwear" },
  { href: "/collections/accessories", label: "Accessories" },
  { href: "/collections/shoes", label: "Shoes" },
];

export function Header() {
  const itemCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.items.length);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container-luxury">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4">
          <Link href="/" className="font-serif text-xl md:text-2xl font-medium tracking-wide">
            Celeste
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors tracking-wide uppercase"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/about"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors tracking-wide uppercase"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors tracking-wide uppercase"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <Link
              href="/search"
              className="flex size-8 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Search"
            >
              <Search className="size-5" />
            </Link>

            <Link
              href="/wishlist"
              className="relative flex size-8 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="size-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-0.5 -right-0.5 size-4 min-w-4 p-0 rounded-full flex items-center justify-center text-[10px] bg-accent text-accent-foreground border-0">
                  {wishlistCount}
                </Badge>
              )}
            </Link>

            <CartSheet>
              <button
                type="button"
                className="relative flex size-8 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag className="size-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-0.5 -right-0.5 size-4 min-w-4 p-0 rounded-full flex items-center justify-center text-[10px] bg-accent text-accent-foreground border-0">
                    {itemCount}
                  </Badge>
                )}
              </button>
            </CartSheet>

            <Sheet>
              <SheetTrigger>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Toggle menu">
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-4">
                <SheetHeader>
                  <SheetTitle className="font-serif">Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 pt-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors tracking-wide uppercase"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/about"
                    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors tracking-wide uppercase"
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors tracking-wide uppercase"
                  >
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
