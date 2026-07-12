"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Avatar({
  src,
  alt = "",
  fallback,
  size = "md",
  className,
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-16 w-16 text-lg",
  };

  const initials = fallback
    ? fallback
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : alt
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

  if (src && !imgError) {
    return (
      <div className={cn("relative rounded-full overflow-hidden", sizeClasses[size], className)}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-full bg-brand-100 text-brand-700 font-medium flex items-center justify-center",
        sizeClasses[size],
        className
      )}
    >
      {initials || "?"}
    </div>
  );
}
