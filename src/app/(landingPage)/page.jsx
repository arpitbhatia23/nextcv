import dynamic from "next/dynamic";

const Herosection = dynamic(
  () => import("@/components/herosection/Herosection"),
);
const HowitWork = dynamic(() => import("@/components/herosection/HowitWork"));
const Templates = dynamic(
  () => import("@/components/templateslanding/Templates"),
);
const ProcessWorks = dynamic(
  () => import("@/components/processWorks/ProcessWorks"),
);
const Testimonial = dynamic(
  () => import("@/components/testimonial/Testimonial"),
);
const PageContent = dynamic(
  () => import("@/components/pageContent/PageContent"),
);
const ATSFeatureSection = dynamic(
  () => import("@/components/herosection/ATSFeatureSection"),
);
const FAQ = dynamic(() => import("@/components/herosection/FAQ"));

export default function Home() {
  return (
    <>
      <Herosection />
      <ATSFeatureSection />

      <PageContent />
      <section id="Templates">
        <Templates />
      </section>

      <HowitWork />

      <ProcessWorks />

      <FAQ />

      <Testimonial />
    </>
  );
}
