"use client";

import { useState } from "react";
import { BlurImage } from "@/components/ui/blur-image";
import { Button } from "@/components/ui/button";
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
      <div className="relative aspect-[3/4] bg-muted overflow-hidden">
        <BlurImage
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
            <Button
              key={i}
              type="button"
              variant="outline"
              className={cn(
                "relative flex-shrink-0 w-20 h-24 md:w-24 md:h-32 p-0 overflow-hidden rounded-none",
                selectedIndex === i ? "border-foreground ring-2 ring-foreground" : "border-border"
              )}
              onClick={() => setSelectedIndex(i)}
            >
              <BlurImage
                src={src}
                alt={`${alt} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
