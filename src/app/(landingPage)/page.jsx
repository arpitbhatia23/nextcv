import Footer from "@/components/footer/Footer";
import Herosection from "@/components/herosection/Herosection";
import HowitWork from "@/components/herosection/HowitWork";
import Navbar from "@/components/Navbar/Navbar";
import PageContent from "@/components/pageContent/PageContent";
import ProcessWorks from "@/components/processWorks/ProcessWorks";
import Templates from "@/components/templateslanding/Templates";
import TestimonialCarousel from "@/components/testimonial/Testimonial";


export default function Home() {
  return (
    <>
    <Navbar/>
      <Herosection />
      <PageContent />
      <Templates/>
      <HowitWork/>
      <ProcessWorks/>
      <TestimonialCarousel/>
      <Footer/>
    </>
  );
}
