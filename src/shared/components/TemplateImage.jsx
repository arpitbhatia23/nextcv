"use client";

import Image from "next/image";

export default function TemplateImage({ src, alt, className }) {
  return (
    <Image src={src} alt={alt} className={className} fill sizes="(max-width: 768px) 100vw, 411px" />
  );
}
