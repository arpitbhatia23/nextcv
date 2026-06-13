import dynamic from "next/dynamic";
import Herosection from "@/shared/components/herosection/Herosection";
import ATSFeatureSection from "@/shared/components/herosection/ATSFeatureSection";
const Templates = dynamic(() => import("@/shared/components/templateslanding/Templates"));
const SEOSection = dynamic(() => import("@/shared/components/herosection/SEOSection"));
const PageContent = dynamic(() => import("@/shared/components/pageContent/PageContent"));
const HowitWork = dynamic(() => import("@/shared/components/herosection/HowitWork"));
const ProcessWorks = dynamic(() => import("@/shared/components/processWorks/ProcessWorks"));
const Testimonial = dynamic(() => import("@/shared/components/testimonial/Testimonial"));

const FAQ = dynamic(() => import("@/shared/components/herosection/FAQ"));
const SEOKeywordCloud = dynamic(() => import("@/shared/components/herosection/SEOKeywordCloud"));

export const revalidate = 3600; // Cache for 1 hour

export default function Home() {
  return (
    <>
      <Herosection />
      <ATSFeatureSection />

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
