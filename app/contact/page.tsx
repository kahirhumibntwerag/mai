"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubjectChange = (value: string | null) => {
    if (value) setForm((prev) => ({ ...prev, subject: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div>
      <section className="relative h-[40vh] min-h-[300px] bg-muted">
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
            <p className="text-muted-foreground mb-8 max-w-md">
              Have a question, feedback, or need assistance? We&apos;d love to hear
              from you. Fill out the form and our team will respond within
              24–48 hours.
            </p>

            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-2">
                  Email
                </h3>
                <a href="mailto:hello@mai.com" className="hover:text-foreground transition-colors">
                  hello@mai.com
                </a>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-2">
                  Phone
                </h3>
                <a href="tel:+15551234567" className="hover:text-foreground transition-colors">
                  +1 (555) 123-4567
                </a>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-2">
                  Store Address
                </h3>
                <p>123 Luxury Avenue<br />New York, NY 10001</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-2">
                  Hours
                </h3>
                <p>
                  Monday – Friday: 10am – 8pm<br />
                  Saturday: 11am – 7pm<br />
                  Sunday: 12pm – 6pm
                </p>
              </div>
            </div>
          </div>

          <div>
            {submitted ? (
              <Card className="border-border bg-muted">
                <CardHeader>
                  <h3 className="font-serif text-xl font-medium">Thank You</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Your message has been sent. We&apos;ll get back to you within
                    24–48 hours.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="mt-2 h-11"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="mt-2 h-11"
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={form.subject} onValueChange={handleSubjectChange}>
                    <SelectTrigger className="mt-2 h-11 w-full">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="order">Order inquiry</SelectItem>
                      <SelectItem value="product">Product question</SelectItem>
                      <SelectItem value="returns">Returns & exchanges</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    className="mt-2 resize-none"
                  />
                </div>
                <Button type="submit" className="w-full uppercase tracking-wider">
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
