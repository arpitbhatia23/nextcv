export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.nextcv.in").replace(/\/$/, "");

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
  path = "",
  image = "/opengraph-image.png",
  type = "website",
  keywords = DEFAULT_SEO_KEYWORDS,
  robots,
}) {
  const normalizedPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  const url = `${SITE_URL}${normalizedPath}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;

  const metadata = {
    metadataBase: new URL(SITE_URL),
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
          url: imageUrl,
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
      images: [imageUrl],
    },
  };

  if (robots) {
    metadata.robots = robots;
  }

  return metadata;
}
