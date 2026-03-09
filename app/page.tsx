import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FlashSaleSection } from "@/components/home/FlashSaleSection";

const newArrivals = products.filter((p) => p.isNewArrival);
const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8);

export default function Home() {
  return (
    <div className="bg-background">
      {/* Hero - left-aligned text, image on right */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-muted/30" />
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920"
          alt="New collection"
          fill
          className="object-cover object-right opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        <div className="container-luxury relative z-10 py-16">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6">
              New Collection
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Discount 50% for the first transaction. Elevate your everyday style.
            </p>
            <Link
              href="/collections/dresses"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3.5 md:py-3.5 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Shop Now
              <ArrowRight className="size-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories - horizontal circular icons */}
      <section className="py-12 md:py-16 border-t border-border">
        <div className="container-luxury">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-foreground">Categories</h2>
            <Link
              href="/collections/dresses"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              See All
            </Link>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-start gap-6 md:gap-10">
            {categories.map((category, i) => (
              <Link
                key={category.id}
                href={`/collections/${category.slug}`}
                className={`flex flex-col items-center gap-3 group ${
                  i === 1 ? "ring-2 ring-accent rounded-full" : ""
                }`}
              >
                <div
                  className={`size-20 md:size-24 rounded-full overflow-hidden border border-border bg-muted ${
                    i === 1 ? "ring-2 ring-accent" : "group-hover:border-foreground/30"
                  }`}
                >
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-foreground">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12 md:py-24 border-t border-border">
        <div className="container-luxury">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              New Arrivals
            </h2>
            <Link
              href="/collections/dresses"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-1"
            >
              View All
            </Link>
          </div>
          <ProductGrid products={newArrivals} columns={4} />
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-12 md:py-24 bg-muted/30 border-t border-border">
        <div className="container-luxury">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8 text-center">
            Featured Collection
          </h2>
          <ProductGrid products={featuredProducts} columns={4} />
        </div>
      </section>

      {/* Shop by Category - grid */}
      <section className="py-12 md:py-24 border-t border-border">
        <div className="container-luxury">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/collections/${category.slug}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-lg border border-border bg-muted"
              >
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex items-end p-6">
                  <h3 className="font-semibold text-xl text-white tracking-wide">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Banner */}
      <section className="relative h-[50vh] min-h-[400px] border-t border-border">
        <Image
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920"
          alt="Spring collection editorial"
          fill
          className="object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="container-luxury text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold tracking-wide mb-4">
              Spring 2025
            </h2>
            <p className="text-lg md:text-xl max-w-xl mx-auto mb-8 opacity-90">
              Discover our latest collection. Timeless elegance, reimagined.
            </p>
            <Link
              href="/collections/tops"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3.5 border border-white text-white font-medium hover:bg-white hover:text-foreground transition-colors rounded-lg"
            >
              Explore Collection
              <ArrowRight className="size-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Flash Sale */}
      <FlashSaleSection />
    </div>
  );
}
