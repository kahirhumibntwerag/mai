import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { FlashSaleSection } from "@/components/home/FlashSaleSection";

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
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
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

      {/* Flash Sale */}
      <FlashSaleSection />
    </div>
  );
}
