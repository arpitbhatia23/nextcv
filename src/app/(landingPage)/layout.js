import Nav from "@/shared/components/ui/navbar";
import { Footer } from "@/shared/components/footer/Footer";

export const metadata = {
  metadataBase: new URL("https://www.nextcv.in"),
  title: "AI Resume Builder for Freshers & Professionals | NextCV",
  description:
    "Build an ATS-friendly resume with AI. Match your resume to a job description, find missing skills, and create a tailored cover letter. Free to build, with one-time pricing.",

  applicationName: "NextCV",
  authors: [{ name: "NextCV" }],
  creator: "NextCV",
  publisher: "NextCV",

  robots: "index, follow",

  alternates: {
    canonical: "https://www.nextcv.in/",
  },

  openGraph: {
    title: "AI Resume Builder for Freshers & Professionals | NextCV",
    description:
      "Build an ATS-friendly resume with AI. Match your resume to a job description, find missing skills, and create a tailored cover letter. Free to build, with one-time pricing.",
    url: "https://www.nextcv.in/",
    siteName: "NextCV",
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Resume Builder for Freshers & Professionals | NextCV",
    description:
      "Build an ATS-friendly resume with AI. Match your resume to a job description, find missing skills, and create a tailored cover letter. Free to build, with one-time pricing.",
    creator: "@aurpitaurpit",
  },
};
export default function LandingLayout({ children }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-900 focus:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
      >
        Skip to content
      </a>
      <div className="landing-theme antialiased">
        {/* JSON-LD for LocalBusiness/SoftwareApplication */}

        <Nav />
        <main id="main-content">{children}</main>
        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              operatingSystem: "Web",
              name: "Get Job-Ready with AI | ATS Resume, Cover Letter & Career Tools | NextCV",
              description:
                "Everything you need to apply with confidence. Build an ATS resume, improve your content with AI, create tailored cover letters, and prepare for your next job.",
              applicationCategory: "Productivity",
              url: "https://www.nextcv.in",
              screenshot: "https://www.nextcv.in/opengraph-image.png",
            }),
          }}
        />
      </div>
    </>
  );
}
