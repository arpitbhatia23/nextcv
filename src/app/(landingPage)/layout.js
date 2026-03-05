import Nav from "@/components/ui/navbar";
import { Footer } from "@/components/footer/Footer";

export const metadata = {
  title:
    "Free AI Resume Builder for India – ATS Friendly in 60 Seconds | NextCV",
  metadataBase: new URL("https://www.nextcv.in"),
  description:
    "Create a professional ATS-friendly resume in under 1 minute. Built for Indian job seekers. No subscriptions. Pay once and download instantly.",

  authors: [{ name: "NextCV" }],
  robots: "index, follow",

  // ⚡ Fix for Open Graph / Twitter images

  openGraph: {
    title:
      "Free AI Resume Builder for India – ATS Friendly in 60 Seconds | NextCV",
    description:
      "Create a professional ATS-friendly resume in under 1 minute. Built for Indian job seekers. No subscriptions. Pay once and download instantly.",
    url: "/", // optional, relative to metadataBase
    type: "website",
    images: ["/opengraph-image.png"], // relative path will resolve correctly
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Free AI Resume Builder for India – ATS Friendly in 60 Seconds | NextCV",
    description:
      "Create a professional ATS-friendly resume in under 1 minute. Built for Indian job seekers. No subscriptions. Pay once and download instantly..",
    images: ["/opengraph-image.png"], // relative path
  },
  alternates: {
    canonical: "https://www.nextcv.in", // Sets the canonical URL
  },
};
export default function RootLayout({ children }) {
  return (
    <>
      <section className={`antialiased`}>
        {/* JSON-LD for LocalBusiness/SoftwareApplication */}

        <Nav />
        {children}
        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Free AI Resume Builder for India – ATS Friendly in 60 Seconds | NextCV",
              operatingSystem: "Web",
              description:
                "Create a professional ATS-friendly resume in under 1 minute. Built for Indian job seekers. No subscriptions. Pay once and download instantly.",
              applicationCategory: "Productivity",
              url: "https://www.nextcv.in",
              screenshot: "https://www.nextcv.in/opengraph-image.png",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "250",
              },
              offers: {
                "@type": "Offer",
                price: "100",
                priceCurrency: "INR",
                description: "One-time fee for AI resume generation",
              },
            }),
          }}
        />
      </section>
    </>
  );
}
