import dynamic from "next/dynamic";
import { createSeoMetadata } from "@/shared/utils/seo";
import Herosection from "@/shared/components/herosection/Herosection";
import ATSFeatureSection from "@/shared/components/herosection/ATSFeatureSection";
import Link from "next/link";
import careerPages from "@/app/(landingPage)/career-pages.json";
const Templates = dynamic(() => import("@/shared/components/templateslanding/Templates"));
const ResumeSharingSection = dynamic(
  () => import("@/shared/components/herosection/ResumeSharingSection")
);
const CoverLetterSection = dynamic(
  () => import("@/shared/components/herosection/CoverLetterSection")
);
const SEOSection = dynamic(() => import("@/shared/components/herosection/SEOSection"));
const PageContent = dynamic(() => import("@/shared/components/pageContent/PageContent"));
const HowitWork = dynamic(() => import("@/shared/components/herosection/HowitWork"));
const ProcessWorks = dynamic(() => import("@/shared/components/processWorks/ProcessWorks"));
const Testimonial = dynamic(() => import("@/shared/components/testimonial/Testimonial"));

const FAQ = dynamic(() => import("@/shared/components/herosection/FAQ"));
const SEOKeywordCloud = dynamic(() => import("@/shared/components/herosection/SEOKeywordCloud"));

export const revalidate = 3600; // Cache for 1 hour

export const metadata = createSeoMetadata({
  title: "Free ATS Resume Builder & AI Cover Letter for Indian Freshers | NextCV",
  description:
    "Create an ATS-friendly resume and tailored AI cover letter with NextCV. Choose professional templates, share verified live resume links for Premium & Elite tiers, and prepare for Indian job applications.",
  path: "",
  keywords: [
    "resume builder",
    "ats friendly resume",
    "resume sharing link",
    "ai cover letter builder",
    "free resume builder",
    "ai resume builder",
    "resume templates for freshers",
    "online resume maker",
  ],
});

export default function Home() {
  return (
    <>
      <Herosection />
      <ATSFeatureSection />
      <ResumeSharingSection />
      <CoverLetterSection />

      <PageContent />
      <SEOSection />
      <section id="Templates">
        <Templates />
      </section>

      <HowitWork />

      <ProcessWorks />

      <FAQ />

      <Testimonial />

      <SEOKeywordCloud />
    </>
  );
}
