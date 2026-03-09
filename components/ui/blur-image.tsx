"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

export function BlurImage({ className, onLoad, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      {...props}
      className={cn(
        "transition-[filter,opacity] duration-500",
        !loaded && "blur-lg opacity-80",
        loaded && "blur-0 opacity-100",
        className
      )}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
    />
  );
}
