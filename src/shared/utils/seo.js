export const DEFAULT_SEO_KEYWORDS = [
  "free resume builder",
  "ATS friendly resume",
  "ai resume builder",
  "resume builder for freshers",
  "resume builder India",
  "resume templates for freshers",
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
