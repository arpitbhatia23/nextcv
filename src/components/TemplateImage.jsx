"use client";

import Image from "next/image";
import { useState } from "react";

export default function TemplateImage({ src, alt, className }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={className}
      height={500}
      width={500}
      loading="lazy"
    />
  );
}
