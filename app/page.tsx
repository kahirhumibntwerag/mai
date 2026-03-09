import Link from "next/link";
import Image from "next/image";
import { ProductGrid } from "@/components/product/ProductGrid";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

const newArrivals = products.filter((p) => p.isNewArrival);
const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8);

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] md:h-[80vh] bg-[var(--muted-bg)]">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920"
          alt="Luxury fashion editorial"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container-luxury text-center text-white">
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium tracking-wide mb-4 md:mb-6">
              Curated Elegance
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 md:mb-12 opacity-90">
              Discover luxury women&apos;s fashion. Timeless pieces for the modern woman.
            </p>
            <Link
              href="/collections/dresses"
              className="inline-block px-8 py-4 text-sm font-medium uppercase tracking-wider bg-white text-foreground hover:bg-[var(--muted-bg)] transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 md:py-24">
        <div className="container-luxury">
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-wide">
              New Arrivals
            </h2>
            <Link
              href="/collections/dresses"
              className="text-sm font-medium uppercase tracking-wider text-foreground/70 hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-1"
            >
              View All
            </Link>
          </div>
          <ProductGrid products={newArrivals} columns={4} />
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16 md:py-24 bg-[var(--muted-bg)]">
        <div className="container-luxury">
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-wide mb-12 text-center">
            Featured Collection
          </h2>
          <ProductGrid products={featuredProducts} columns={4} />
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16 md:py-24">
        <div className="container-luxury">
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-wide mb-12 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/collections/${category.slug}`}
                className="group relative aspect-[4/5] overflow-hidden bg-[var(--muted-bg)]"
              >
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex items-end p-6">
                  <h3 className="font-serif text-2xl font-medium text-white tracking-wide">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Banner */}
      <section className="relative h-[50vh] min-h-[400px] bg-[var(--muted-bg)]">
        <Image
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920"
          alt="Spring collection editorial"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="container-luxury text-center text-white">
            <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-wide mb-4">
              Spring 2025
            </h2>
            <p className="text-lg md:text-xl max-w-xl mx-auto mb-8 opacity-90">
              Discover our latest collection. Timeless elegance, reimagined.
            </p>
            <Link
              href="/collections/tops"
              className="inline-block px-8 py-4 text-sm font-medium uppercase tracking-wider border border-white text-white hover:bg-white hover:text-foreground transition-colors"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
