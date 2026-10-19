"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ImageOff, Sparkles } from "lucide-react";

/**
 * ProductScreenshot
 *
 * Reusable screenshot display component that renders a real image when available,
 * or an accessible, aesthetic placeholder box adhering to NextCV's design system:
 * - Neutral borders (#E3E2DC / #E7E7E1)
 * - Subtle background surfaces (#F8F7F3 / #F4F5F8)
 * - Brand accent icons (#465B9E)
 * - Stable aspect-ratio container to prevent Cumulative Layout Shift (CLS)
 */
export default function ProductScreenshot({
  src,
  alt = "NextCV product screenshot",
  caption,
  aspectRatio = "aspect-16/10",
  label,
  priority = false,
  className = "",
}) {
  const [hasError, setHasError] = useState(false);

  // Derive a user-friendly filename from src
  const filename = src ? src.split("/").pop() : "screenshot.webp";

  return (
    <figure className={`group my-4 w-full ${className}`}>
      <div
        className={`relative w-full overflow-hidden border border-[#E3E2DC] bg-[#F8F7F3] shadow-[0_12px_36px_-20px_rgba(23,32,28,0.12)] transition-all duration-300 ${aspectRatio}`}
      >
        {/* Subtle browser/window bar */}
        <div className="flex h-8 w-full items-center justify-between border-b border-[#E3E2DC] bg-[#F1F0EB] px-3.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#E0DDD5]" />
            <span className="h-2 w-2 rounded-full bg-[#E0DDD5]" />
            <span className="h-2 w-2 rounded-full bg-[#E0DDD5]" />
          </div>
          <span className="truncate px-2 font-mono text-[10px] tracking-wider text-[#8A908B]">
            {label || "NextCV Workspace"}
          </span>
          <div className="w-10" />
        </div>

        {/* Content area */}
        <div className="relative h-[calc(100%-2rem)] w-full">
          {!hasError && src ? (
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1100px"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
              onError={() => setHasError(true)}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center border border-[#D9DCE5] bg-[#EEF0F7] text-[#465B9E]">
                <ImageOff className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="font-mono text-xs font-semibold text-[#17201C]">{filename}</p>
              <p className="mt-1 max-w-sm text-xs leading-5 text-[#5B625C]">
                Application capture placeholder. Replace with actual screenshot of{" "}
                <span className="font-medium text-[#465B9E]">{label || filename}</span>.
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 border border-[#E3E2DC] bg-white px-2.5 py-1 text-[10px] font-medium text-[#8A908B]">
                <Sparkles className="h-3 w-3 text-[#465B9E]" />
                NextCV Product Interface
              </div>
            </div>
          )}
        </div>
      </div>

      {caption && (
        <figcaption className="mt-2 text-center text-xs text-[#5B625C]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

