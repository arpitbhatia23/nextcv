"use client";

import React from "react";
import { Button } from "@/shared/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Smartphone, Palette, ShieldCheck } from "lucide-react";

const Templates = () => {
  const handleTemplateSelection = () => {
    signIn("google", { callbackUrl: "/dashboard/builder" });
  };

  const cards = [
    {
      img: "/classic.webp",
      width: 446,
      height: 587,
      title: "Classic Professional",
      description: "Timeless and structured. Suitable for corporate and traditional roles.",
      isATS: true,
    },
    {
      img: "/milimalist.webp",
      width: 351,
      height: 451,
      title: "Clean Minimalist",
      description: "Simple and content-focused design for modern professional roles.",
      isATS: true,
    },
    {
      img: "/modern.webp",
      width: 446,
      height: 587,
      title: "Modern Edge",
      description: "Contemporary layout with subtle accents for a modern professional look.",
      isATS: true,
    },
    {
      img: "/ModernSideBar.webp",
      width: 351,
      height: 451,
      title: "Sidebar Executive",
      description: "Structured sidebar layout designed for information-rich resumes.",
      isATS: true,
    },
    {
      img: "/professionalclean.webp",
      width: 446,
      height: 587,
      title: "Professional Clean",
      description: "Polished and organized design for a clean professional presentation.",
      isATS: true,
    },
    {
      img: "/creativeteal.webp",
      width: 446,
      height: 587,
      title: "Creative Teal",
      description: "Expressive design with a modern visual style for creative professionals.",
      isATS: true,
    },
    {
      img: "/executivegray.webp",
      width: 446,
      height: 587,
      title: "Executive Gray",
      description: "Refined and authoritative layout for experienced professionals.",
      isATS: true,
    },
    {
      img: "/techdark.webp",
      width: 446,
      height: 587,
      title: "Tech Dark",
      description: "Sleek, modern layout suited to technology and digital roles.",
      isATS: true,
    },
    {
      img: "/compactmodern.webp",
      width: 446,
      height: 587,
      title: "Compact Modern",
      description: "Space-efficient layout for candidates with detailed experience.",
      isATS: true,
    },
    {
      img: "/boldheader.webp",
      width: 446,
      height: 587,
      title: "Bold Header",
      description: "Strong visual hierarchy with a prominent professional header.",
      isATS: true,
    },
    {
      img: "/sidebarleft.webp",
      width: 446,
      height: 587,
      title: "Left Sidebar",
      description: "Classic sidebar layout for clear organization and easy scanning.",
      isATS: true,
    },
    {
      img: "/infografhic.webp",
      width: 446,
      height: 587,
      title: "Infographic",
      description: "Visual layout with timelines and structured skill presentation.",
      isATS: true,
    },

    // Tech & Digital
    {
      img: "/googletech.webp",
      width: 446,
      height: 587,
      title: "Tech Modern",
      description: "Clean and contemporary layout for technology professionals.",
      isATS: true,
    },
    {
      img: "/microsoft.webp",
      width: 446,
      height: 587,
      title: "Corporate Modern",
      description: "Structured and polished design for corporate professionals.",
      isATS: true,
    },
    {
      img: "/amazon.webp",
      width: 446,
      height: 587,
      title: "Operations Professional",
      description: "Concise and structured format for operations and business roles.",
      isATS: true,
    },
    {
      img: "/applecreative.webp",
      width: 446,
      height: 587,
      title: "Creative Professional",
      description: "Minimal and refined design for creative and design-focused roles.",
      isATS: true,
    },
    {
      img: "/metasocial.webp",
      width: 446,
      height: 587,
      title: "Social Media",
      description: "Modern layout suited to marketing, social media, and digital roles.",
      isATS: true,
    },

    // Indian Professional
    {
      img: "/tcs.webp",
      width: 446,
      height: 587,
      title: "Digital Professional",
      description: "Structured resume design for IT and digital professionals.",
      isATS: true,
    },
    {
      img: "/infosys.webp",
      width: 446,
      height: 587,
      title: "Structured Professional",
      description: "Detailed and organized layout for technical and professional roles.",
      isATS: true,
    },
    {
      img: "/wipro.webp",
      width: 446,
      height: 587,
      title: "Modern Professional",
      description: "Fresh and structured design for early-career professionals.",
      isATS: true,
    },
    {
      img: "/hcl.webp",
      width: 446,
      height: 587,
      title: "Technology Professional",
      description: "Modern and results-focused layout for technology roles.",
      isATS: true,
    },
    {
      img: "/mahindra.webp",
      width: 446,
      height: 587,
      title: "Executive Professional",
      description: "Bold and polished format for leadership and business roles.",
      isATS: true,
    },

    // Global Corporate
    {
      img: "/ibm.webp",
      width: 446,
      height: 587,
      title: "Professional Classic",
      description: "Traditional professional structure with a modern presentation.",
      isATS: true,
    },
    {
      img: "/accenture.webp",
      width: 446,
      height: 587,
      title: "Consulting Professional",
      description: "Structured layout suited to consulting and business roles.",
      isATS: true,
    },
    {
      img: "/deloitte.webp",
      width: 446,
      height: 587,
      title: "Corporate Professional",
      description: "Precise and organized design for corporate professionals.",
      isATS: true,
    },
    {
      img: "/capgenine.webp",
      width: 446,
      height: 587,
      title: "Professional Flow",
      description: "Balanced layout with a smooth visual hierarchy.",
      isATS: true,
    },
    {
      img: "/cisco.webp",
      width: 446,
      height: 587,
      title: "Technical Grid",
      description: "Clean grid-based structure for technical professionals.",
      isATS: true,
    },

    // Finance & Enterprise
    {
      img: "/oracle.webp",
      width: 446,
      height: 587,
      title: "Technical Enterprise",
      description: "Structured and reliable layout for enterprise technology roles.",
      isATS: true,
    },
    {
      img: "/sap.webp",
      width: 446,
      height: 587,
      title: "Enterprise Professional",
      description: "Organized design suited to enterprise and business professionals.",
      isATS: true,
    },
    {
      img: "/goldman.webp",
      width: 446,
      height: 587,
      title: "Finance Professional",
      description: "Refined and structured format for finance and analytical roles.",
      isATS: true,
    },
    {
      img: "/jpmorgan.webp",
      width: 446,
      height: 587,
      title: "Finance Executive",
      description: "Professional layout for banking, finance, and business roles.",
      isATS: true,
    },
    {
      img: "/netflix.webp",
      width: 446,
      height: 587,
      title: "Creative Culture",
      description: "Bold and expressive layout for modern creative professionals.",
      isATS: true,
    },

    // Role-Specific
    {
      img: "/medical.webp",
      width: 446,
      height: 587,
      title: "Healthcare Professional",
      description: "Clean and structured design for healthcare professionals.",
      isATS: true,
    },
    {
      img: "/teacher.webp",
      width: 446,
      height: 587,
      title: "Academic Professional",
      description: "Professional layout suited to education and academic roles.",
      isATS: true,
    },
    {
      img: "/sales.webp",
      width: 446,
      height: 587,
      title: "Sales Professional",
      description: "Achievement-focused design for sales and business professionals.",
      isATS: true,
    },
    {
      img: "/legal.webp",
      width: 446,
      height: 587,
      title: "Legal Professional",
      description: "Conservative and structured format for legal professionals.",
      isATS: true,
    },
    {
      img: "/modern.webp",
      width: 446,
      height: 587,
      title: "Marketing Creative",
      description: "Modern visual layout for marketing and creative professionals.",
      isATS: true,
    },
    {
      img: "/classic.webp",
      width: 446,
      height: 587,
      title: "Research Professional",
      description: "Structured format suited to research and clinical roles.",
      isATS: true,
    },
  ];

  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: "ATS-Friendly",
      description: "Structured layouts designed for readable resumes.",
    },
    {
      icon: <Smartphone className="w-6 h-6 text-indigo-600" />,
      title: "Mobile Ready",
      description: "Looks great across desktop and mobile devices.",
    },
    {
      icon: <Palette className="w-6 h-6 text-purple-600" />,
      title: "Customizable",
      description: "Adjust colors and fonts to match your style.",
    },
  ];

  return (
    <section name="Templates" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
            Professional Templates for <span className="text-indigo-600">Every Career Path</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600">
            Choose from professional resume designs built for different industries, roles, and
            career stages.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {cards.map(({ img, width, height, title, description, isATS }, index) => (
            <div
              key={index}
              className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-indigo-900/10 transition-all duration-300 border border-slate-100 hover:border-indigo-100 hover:-translate-y-1"
            >
              {/* Browser Window Frame */}
              <div className="relative overflow-hidden bg-slate-50 rounded-t-xl border-b border-slate-200">
                <div className="flex items-center gap-1.5 px-4 py-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                </div>
              </div>

              {/* Image Container */}
              <div className="relative aspect-3/4 overflow-hidden bg-slate-100 group-hover:bg-slate-50 transition-colors">
                <Image
                  src={img}
                  width={width}
                  height={height}
                  className="w-full h-full object-cover object-top"
                  alt={`${title} resume template`}
                  priority={index < 4}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-white/90 to-transparent pointer-events-none" />

                {/* Badge */}
                {isATS && (
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-slate-800 text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full shadow-sm border border-slate-100 flex items-center gap-1.5 z-10 transition-transform group-hover:scale-105">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    ATS Friendly
                  </div>
                )}

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-white text-slate-900 font-bold px-6 py-3 rounded-lg shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    Preview Template
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col grow">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-2">{title}</h3>

                <p className="text-xs text-slate-500 mb-6 grow leading-relaxed">{description}</p>

                <Button
                  className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-semibold rounded-lg transition-colors group-hover:shadow-lg group-hover:shadow-indigo-500/20"
                  onClick={handleTemplateSelection}
                >
                  Use Template
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Features Strip */}
        <div className="bg-white rounded-2xl border border-slate-100 p-8 sm:p-12 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-sm sm:text-lg font-bold text-slate-900 mb-1">
                Why choose our templates?
              </h3>

              <p className="text-slate-500 text-xs">
                Built for professionals, designed for clarity.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 sm:gap-12">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 rounded-lg">{feature.icon}</div>

                  <div className="text-left">
                    <h4 className="font-semibold text-slate-900 text-sm">{feature.title}</h4>

                    <p className="text-xs text-slate-500 hidden sm:block">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={handleTemplateSelection}
              variant="outline"
              className="whitespace-nowrap border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800"
            >
              View All
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Templates;
