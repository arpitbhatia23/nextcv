import Nav from "@/shared/components/ui/navbar";
import { Footer } from "@/shared/components/footer/Footer";

export const metadata = {
  title: "NextCV – Free ATS Resume Builder for Indian Freshers (2026)",
  metadataBase: new URL("https://www.nextcv.in"),
  description:
    "Create ATS-friendly resumes for TCS, Infosys, Wipro, HCL and other top companies. Build professional resumes online using free templates designed for Indian freshers.",

  authors: [{ name: "NextCV" }],
  robots: "index, follow",
  keywords: [
    "ats friendly resume builder india",
    "ai resume builder india",
    "resume builder india free",

    "online resume builder india",
    "resume templates india",
    "latest resume format india",
    "best AI resume builder for tech jobs",
    "AI resume builder with ATS optimization",
    "free AI resume builder online 2026",
    "AI resume builder that auto-saves resumes",
    "AI resume builder for creative industries",
    "AI resume builder with AI-generated summaries",
    "AI resume builder for high-demand tech roles",
    "AI resume builder with drag-and-drop editor",
    "AI resume builder for senior developers",
    "AI-powered resume builder for Indian fresh graduates 2026",
    "tcs resume builder",
    "techncv.com",
    "nest cv",
    "next gen cv",
    "indian ats friendly resume",
    "accenture infographic resume builder",
    "ltimindtree resume format",
    "ats resume india",
    "best ats friendly resume builder india",
    "resume builder for campus placement",
  ],
  // ⚡ Fix for Open Graph / Twitter images

  openGraph: {
    title: "NextCV – Free ATS Resume Builder for Indian Freshers (2026)",
    description:
      "Create ATS-friendly resumes for TCS, Infosys, Wipro, HCL and other top companies. Build professional resumes online using free templates designed for Indian freshers.",
    url: "/", // optional, relative to metadataBase
    type: "website",
    images: ["/opengraph-image.png"], // relative path will resolve correctly
  },
  twitter: {
    card: "summary_large_image",
    title: "NextCV – Free ATS Resume Builder for Indian Freshers (2026)",
    description:
      "Create ATS-friendly resumes for TCS, Infosys, Wipro, HCL and other top companies. Build professional resumes online using free templates designed for Indian freshers.",
    images: ["/opengraph-image.png"], // relative path
  },
  alternates: {
    canonical: "https://www.nextcv.in", // Sets the canonical URL
  },
};
export default function LandingLayout({ children }) {
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
              name: "NextCV – Free ATS Resume Builder for Indian Freshers (2026)",
              operatingSystem: "Web",
              description:
                "Create ATS-friendly resumes for TCS, Infosys, Wipro, HCL and other top companies. Build professional resumes online using free templates designed for Indian freshers.",
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
