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
    "cv maker india online",
    "best resume format 2026 india",
    "resume for freshers india",
    "ats friendly resume format 2026",
    "professional resume india",
    "job application resume india",
    "online resume builder india",
    "resume templates india",
    "latest resume format india",
    "best AI resume builder for tech jobs",
    "AI resume builder with ATS optimization",
    "free AI resume builder online 2026",
    "AI resume builder for software engineers",
    "AI resume builder for fresh graduates",
    "AI resume builder that writes cover letters",
    "AI resume builder with LinkedIn import",
    "AI resume builder for career changers",
    "AI resume builder for entry-level jobs",
    "AI resume builder with pre-made templates",
    "AI resume builder for creative professionals",
    "AI resume builder that formats PDF resumes",
    "AI resume builder with interview tips",
    "AI resume builder with keyword optimization",
    "AI resume builder for senior executives",
    "AI resume builder for remote job applications",
    "AI resume builder with job-specific suggestions",
    "AI resume builder for startup job seekers",
    "AI resume builder that suggests skills",
    "AI resume builder for marketing professionals",
    "AI resume builder with automatic grammar check",
    "AI resume builder for LinkedIn profile enhancement",
    "AI resume builder that highlights achievements",
    "AI resume builder for finance professionals",
    "AI resume builder with ATS-friendly templates",
    "AI resume builder that generates bullet points",
    "AI resume builder for students and interns",
    "AI resume builder with custom designs",
    "AI resume builder that improves job application success",
    "AI resume builder with real-time AI feedback",
    "AI resume builder for data scientists",
    "AI resume builder with keyword scanning",
    "AI resume builder for healthcare professionals",
    "AI resume builder that recommends certifications",
    "AI resume builder for engineering graduates",
    "AI resume builder with recruiter-approved formats",
    "AI resume builder that adapts to job descriptions",
    "AI resume builder for UX/UI designers",
    "AI resume builder with multilingual support",
    "AI resume builder for IT professionals",
    "AI resume builder with portfolio integration",
    "AI resume builder that boosts interview chances",
    "AI resume builder for project managers",
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
