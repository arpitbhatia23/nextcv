export const DEFAULT_SEO_KEYWORDS = [
  "free resume builder",
  "resume maker",
  "resume builder",
  "resume format",
  "resume template",
  "ATS friendly resume",
  "ats friendly resume",
  "best resume builder",
  "best resume template",
  "cv builder",
  "free cv builder",
  "ai resume builder",
  "ai resume maker",
  "resume maker online free",
  "resume builder online free",
  "resume maker free",
  "canva resume",
  "resume ground",
  "resume builder for freshers",
  "resume builder in india",
  "best resume template for freshers",
  "resume maker for fresher",
];

export function createSeoMetadata({
  title,
  description,
  path,
  image = "/opengraph-image.png",
  type = "website",
  keywords = DEFAULT_SEO_KEYWORDS,
}) {
  const url = `https://www.nextcv.in${path}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "NextCV",
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
