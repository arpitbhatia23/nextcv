"use client";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Element } from "react-scroll";

const Herosection = dynamic(() =>
  import("@/components/herosection/Herosection")
);
const HowitWork = dynamic(() => import("@/components/herosection/HowitWork"));
const PageContent = dynamic(() =>
  import("@/components/pageContent/PageContent")
);
const ProcessWorks = dynamic(() =>
  import("@/components/processWorks/ProcessWorks")
);
const Templates = dynamic(() =>
  import("@/components/templateslanding/Templates")
);
const TestimonialCarousel = dynamic(() =>
  import("@/components/testimonial/Testimonial")
);

export default function Home() {
  return (
    <>
      <Element name="Home">
        <Herosection />
      </Element>
      <Element name="Why Choose Us">
        <PageContent />
      </Element>
      <Element name="Templates">
        <Templates />
      </Element>
      <Element name="How it work">
        <HowitWork />
      </Element>
      <Element name="Get Started">
        <ProcessWorks />
      </Element>
      <Element name="Testimonial">
        <TestimonialCarousel />
      </Element>
    </>
  );
}
