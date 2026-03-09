"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="relative aspect-[3/4] bg-[var(--muted-bg)] overflow-hidden">
        <Image
          src={images[selectedIndex] ?? images[0] ?? ""}
          alt={`${alt} - Image ${selectedIndex + 1}`}
          fill
          className="object-cover object-center"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedIndex(i)}
              className={cn(
                "relative flex-shrink-0 w-20 h-24 md:w-24 md:h-32 border-2 transition-colors overflow-hidden",
                selectedIndex === i
                  ? "border-foreground"
                  : "border-transparent hover:border-[var(--border)]"
              )}
            >
              <Image
                src={src}
                alt={`${alt} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
