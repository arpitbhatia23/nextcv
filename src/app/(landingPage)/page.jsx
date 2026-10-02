import { createSeoMetadata } from "@/shared/utils/seo";
import LandingHero from "@/shared/components/landing/LandingHero";
import WorkflowSection from "@/shared/components/landing/WorkflowSection";
import ATSKeywordSection from "@/shared/components/landing/ATSKeywordSection";
import AIWritingSection from "@/shared/components/landing/AIWritingSection";
import TemplatesSection from "@/shared/components/landing/TemplatesSection";
import ShareProfileSection from "@/shared/components/landing/ShareProfileSection";
import CoverLetterSection from "@/shared/components/landing/CoverLetterSection";
import PricingSection from "@/shared/components/landing/PricingSection";
import FAQSection from "@/shared/components/landing/FAQSection";
import LandingFinalCTA from "@/shared/components/landing/LandingFinalCTA";

export const revalidate = 3600; // Cache for 1 hour

export const metadata = createSeoMetadata({
  title: "Free ATS Resume Builder & AI Cover Letter for Indian Freshers | NextCV",
  description:
    "Create a professional resume and tailored AI cover letter with NextCV. Choose resume templates, share resume links with Premium or Elite, and prepare for job applications.",
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
    <div className="overflow-hidden bg-[#F8F7F3] text-[#17201C] selection:bg-[#dce4ff] selection:text-[#17201C]">
      <LandingHero />
      <WorkflowSection />
      <ATSKeywordSection />
      <AIWritingSection />
      <TemplatesSection />
      <ShareProfileSection />
      <CoverLetterSection />
      <PricingSection />
      <FAQSection />
      <LandingFinalCTA />
    </div>
  );
}
