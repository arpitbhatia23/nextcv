'use client';
import Footer from "@/components/footer/Footer";
import Herosection from "@/components/herosection/Herosection";
import HowitWork from "@/components/herosection/HowitWork";
import PageContent from "@/components/pageContent/PageContent";
import ProcessWorks from "@/components/processWorks/ProcessWorks";
import Templates from "@/components/templateslanding/Templates";
import TestimonialCarousel from "@/components/testimonial/Testimonial";
import Nav from "@/components/ui/navbar";
import { Element } from "react-scroll";


export default function Home() {
  return (
    <>
    <Nav/>
    <Element name="Home">
        <Herosection />
         </Element>
      <Element name="Why Choose Us">
      <PageContent />
</Element>
<Element name="Templates">

      <Templates/>
</Element>
<Element name="How it work">

      <HowitWork/>
</Element>
      <Element name="Get Started">

      <ProcessWorks/>
</Element>
      <Element name="Testimonial">

      <TestimonialCarousel/>
</Element>
<Element>

      <Footer/>
</Element>
    </>
  );
}
