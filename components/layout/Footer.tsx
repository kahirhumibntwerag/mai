"use client";

import Link from "next/link";
import { useState } from "react";

const footerLinks = {
  shop: [
    { href: "/collections/dresses", label: "Dresses" },
    { href: "/collections/tops", label: "Tops" },
    { href: "/collections/bottoms", label: "Bottoms" },
    { href: "/collections/outerwear", label: "Outerwear" },
    { href: "/collections/accessories", label: "Accessories" },
    { href: "/collections/shoes", label: "Shoes" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[var(--muted-bg)] mt-24">
      <div className="container-luxury py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-serif text-2xl font-medium tracking-wide">
              MAI
            </Link>
            <p className="mt-4 text-sm text-[var(--foreground-muted)] max-w-xs">
              Luxury women&apos;s fashion. Curated pieces for the modern woman.
            </p>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              Shop
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--foreground-muted)] hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--foreground-muted)] hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              Newsletter
            </h3>
            <p className="text-sm text-[var(--foreground-muted)] mb-4">
              Subscribe for exclusive offers and new arrivals.
            </p>
            {subscribed ? (
              <p className="text-sm text-[var(--accent)] font-medium">
                Thank you for subscribing.
              </p>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 min-w-0 px-4 py-2 text-sm bg-white border border-[var(--border)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] focus:border-[var(--accent)]"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium bg-foreground text-white hover:bg-foreground/90 transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--foreground-muted)]">
            &copy; {new Date().getFullYear()} MAI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-[var(--foreground-muted)] hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-[var(--foreground-muted)] hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
