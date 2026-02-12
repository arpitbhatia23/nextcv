import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Smartphone, Palette, ShieldCheck } from "lucide-react";

const Templates = () => {
  const handleTemplateSelection = () => {
    signIn("google");
  };

  const cards = [
    {
      img: "/classic.webp",
      width: 446,
      height: 587,
      title: "Classic Professional",
      description:
        "Timeless elegance. Perfect for corporate and traditional industries.",
      isATS: true,
    },
    {
      img: "/minalmalist.webp",
      width: 351,
      height: 451,
      title: "Clean Minimalist",
      description:
        "Focus purely on content. Ideal for creative and tech roles.",
      isATS: true,
    },
    {
      img: "/modern.webp",
      width: 446,
      height: 587,
      title: "Modern Edge",
      description: "Contemporary layout with subtle accents to stand out.",
      isATS: true,
    },
    {
      img: "/ModernSideBar.webp",
      width: 351,
      height: 451,
      title: "Sidebar Executive",
      description: "High information density with a structured sidebar layout.",
      isATS: true,
    },

    {
      img: "/professional-clean.webp",
      width: 446,
      height: 587,
      title: "Professional Clean",
      description: "Polished and structured for corporate roles.",
      isATS: true,
    },
    {
      img: "/creative-teal.webp",
      width: 446,
      height: 587,
      title: "Creative Teal",
      description: "Vibrant and expressive for creative fields.",
      isATS: true,
    },
    {
      img: "/executive-gray.webp",
      width: 446,
      height: 587,
      title: "Executive Gray",
      description: "Commanding and authoritative for leadership roles.",
      isATS: true,
    },
    {
      img: "/tech-dark.webp",
      width: 446,
      height: 587,
      title: "Tech Dark",
      description: "Sleek and modern for technology professionals.",
      isATS: true,
    },
    {
      img: "/compact-modern.webp",
      width: 446,
      height: 587,
      title: "Compact Modern",
      description: "Efficient use of space for experienced candidates.",
      isATS: true,
    },
    {
      img: "/bold-header.webp",
      width: 446,
      height: 587,
      title: "Bold Header",
      description: "Make a strong first impression with a bold header.",
      isATS: true,
    },
    {
      img: "/sidebar-left.webp",
      width: 446,
      height: 587,
      title: "Sidebar Left",
      description: "Classic sidebar layout for easy scanning.",
      isATS: true,
    },
    {
      img: "/infographich-lite.webp",
      width: 446,
      height: 587,
      title: "Infographic Lite",
      description: "Visual flair with timeline and skill bars.",
      isATS: true,
    },
  ];

  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: "ATS Optimized",
      description: "Guaranteed to pass formatting checks.",
    },
    {
      icon: <Smartphone className="w-6 h-6 text-indigo-600" />,
      title: "Mobile Ready",
      description: "Looks perfect on any device.",
    },
    {
      icon: <Palette className="w-6 h-6 text-purple-600" />,
      title: "Customizable",
      description: "Change colors and fonts easily.",
    },
  ];

  return (
    <section
      name="Templates"
      className="py-24 bg-slate-50 border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Professional Templates for{" "}
            <span className="text-indigo-600">Every Career Path</span>
          </h2>
          <p className="text-lg text-slate-600">
            Choose from our collection of ATS-optimized designs. proven to get
            results.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {cards.map(
            ({ img, width, height, title, description, isATS }, index) => (
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

                {/* Image Container with Inner Shadow */}
                <div className="relative aspect-3/4 overflow-hidden bg-slate-100 group-hover:bg-slate-50 transition-colors">
                  <Image
                    src={img}
                    width={width}
                    height={height}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02] group-hover:shadow-lg"
                    alt={`${title} resume template`}
                    loading="lazy"
                  />

                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-white/90 to-transparent pointer-events-none" />

                  {/* Badge */}
                  {isATS && (
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-slate-800 text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full shadow-sm border border-slate-100 flex items-center gap-1.5 z-10 transition-transform group-hover:scale-105">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" />
                      ATS Verified
                    </div>
                  )}

                  {/* Hover Action Overlay */}
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-white text-slate-900 font-bold px-6 py-3 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Preview Template
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col grow">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-6 grow leading-relaxed">
                    {description}
                  </p>

                  <Button
                    className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors group-hover:shadow-lg group-hover:shadow-indigo-500/20"
                    onClick={handleTemplateSelection}
                  >
                    Use Template
                  </Button>
                </div>
              </div>
            ),
          )}
        </div>

        {/* Features Strip */}
        <div className="bg-white rounded-2xl border border-slate-100 p-8 sm:p-12 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                Why choose our templates?
              </h3>
              <p className="text-slate-500 text-sm">
                Built by recruiters, optimized by AI.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 sm:gap-12">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    {feature.icon}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-900 text-sm">
                      {feature.title}
                    </p>
                    <p className="text-xs text-slate-500 hidden sm:block">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={handleTemplateSelection}
              variant="outline"
              className=" whitespace-nowrap border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800"
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
