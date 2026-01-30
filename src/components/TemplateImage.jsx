"use client";

import { useState } from "react";

export default function TemplateImage({ src, alt, className }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => {
        setImgSrc(
          "https://placehold.co/400x600/e2e8f0/475569?text=Preview+Coming+Soon"
        );
      }}
    />
  );
}
