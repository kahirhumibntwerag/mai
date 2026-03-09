import Image from "next/image";

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] bg-[var(--muted-bg)]">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920"
          alt="MAI store interior"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-wide text-white">
            Our Story
          </h1>
        </div>
      </section>

      {/* Content */}
      <div className="container-luxury py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-[var(--foreground-muted)] leading-relaxed mb-8">
            MAI was founded with a simple mission: to curate luxury women&apos;s fashion
            that embodies timeless elegance and modern sophistication. We believe
            in quality over quantity, and every piece in our collection is chosen
            for its craftsmanship, design, and ability to elevate your wardrobe.
          </p>
          <p className="text-lg text-[var(--foreground-muted)] leading-relaxed mb-8">
            Our team travels the world to discover emerging designers and
            established houses alike. We partner only with brands that share our
            commitment to sustainable practices and ethical production, so you
            can shop with confidence knowing your purchase supports a better
            fashion industry.
          </p>
          <p className="text-lg text-[var(--foreground-muted)] leading-relaxed">
            Thank you for being part of our story. We hope you find pieces here
            that inspire you, empower you, and become treasured parts of your
            own narrative.
          </p>

          <div className="mt-16 pt-16 border-t border-[var(--border)]">
            <h2 className="font-serif text-2xl font-medium tracking-wide mb-8">
              Our Values
            </h2>
            <ul className="space-y-6 text-[var(--foreground-muted)]">
              <li>
                <span className="font-medium text-foreground">Quality</span> —
                We select only the finest materials and construction for every
                piece we offer.
              </li>
              <li>
                <span className="font-medium text-foreground">Sustainability</span> —
                We prioritize brands that minimize environmental impact and
                support fair labor practices.
              </li>
              <li>
                <span className="font-medium text-foreground">Timelessness</span> —
                Our pieces are designed to last seasons and beyond, not just
                trends.
              </li>
              <li>
                <span className="font-medium text-foreground">Service</span> —
                Personal, attentive service is at the heart of everything we do.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
