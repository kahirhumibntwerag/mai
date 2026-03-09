"use client";

import { useState } from "react";
import Image from "next/image";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] bg-[var(--muted-bg)]">
        <Image
          src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920"
          alt="Customer service"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-wide text-white">
            Contact Us
          </h1>
        </div>
      </section>

      <div className="container-luxury py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-serif text-2xl font-medium tracking-wide mb-6">
              Get in Touch
            </h2>
            <p className="text-[var(--foreground-muted)] mb-8 max-w-md">
              Have a question, feedback, or need assistance? We&apos;d love to hear
              from you. Fill out the form and our team will respond within
              24–48 hours.
            </p>

            <div className="space-y-6 text-[var(--foreground-muted)]">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-2">
                  Email
                </h3>
                <a
                  href="mailto:hello@mai.com"
                  className="hover:text-foreground transition-colors"
                >
                  hello@mai.com
                </a>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-2">
                  Phone
                </h3>
                <a
                  href="tel:+15551234567"
                  className="hover:text-foreground transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-2">
                  Store Address
                </h3>
                <p>
                  123 Luxury Avenue
                  <br />
                  New York, NY 10001
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-2">
                  Hours
                </h3>
                <p>
                  Monday – Friday: 10am – 8pm
                  <br />
                  Saturday: 11am – 7pm
                  <br />
                  Sunday: 12pm – 6pm
                </p>
              </div>
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="p-8 border border-[var(--border)] bg-[var(--muted-bg)]">
                <h3 className="font-serif text-xl font-medium mb-4">
                  Thank You
                </h3>
                <p className="text-[var(--foreground-muted)]">
                  Your message has been sent. We&apos;ll get back to you within
                  24–48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[var(--border)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] focus:border-[var(--accent)]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[var(--border)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] focus:border-[var(--accent)]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[var(--border)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] focus:border-[var(--accent)]"
                  >
                    <option value="">Select a subject</option>
                    <option value="order">Order inquiry</option>
                    <option value="product">Product question</option>
                    <option value="returns">Returns & exchanges</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[var(--border)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] focus:border-[var(--accent)] resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 text-sm font-medium uppercase tracking-wider bg-foreground text-white hover:bg-foreground/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
