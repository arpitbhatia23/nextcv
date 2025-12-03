"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Zap,
  Target,
  DollarSign,
  Users,
  Clock,
  Award,
} from "lucide-react";
// Removed Next.js Image import
import { signIn } from "next-auth/react";
import { scroller } from "react-scroll";

function AnimatedHeroSection() {
  const scrollTo = (section) => {
    scroller.scrollTo(section, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  const mncLogos = [
    { src: "/logos/TCS.NS_BIG.svg", alt: "TCS Logo" },
    { src: "/logos/INFY_BIG.svg", alt: "Infosys Logo" },
    { src: "/logos/WIT.svg", alt: "Wipro Logo" },
    { src: "/logos/HCLTECH.NS_BIG.svg", alt: "HCL Tech Logo" },
    { src: "/logos/LTIM.NS_BIG.svg", alt: "LTIMindtree Logo" },
    { src: "/logos/TECHM.NS_BIG.svg", alt: "Tech Mahindra Logo" },
    { src: "/logos/google_BIG.svg", alt: "google Logo" },
  ];

  return (
    // Centering the content vertically and horizontally
    <section className="relative min-h-screen  backdrop-blur-4xl bg-gradient-to-br from-gray-900 via-indigo-900 to-black text-white py-20 px-4 overflow-hidden z-0 flex flex-col justify-end">
      {" "}
      <div className="relative z-10 max-w-6xl mx-auto  text-center">
        <div className="space-y-10 mt-10 lg:mt-20">
          {/* Main Content Area */}
          <div className="flex flex-col items-center justify-items-end h-full">
            {/* H1: Increased size dramatically for impact */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tighter leading-tight drop-shadow-2xl drop-shadow-black">
              Build the{" "}
              <span className="bg-gradient-to-r from-teal-300 via-sky-400 to-indigo-500 bg-clip-text text-transparent max-w-6xl">
                Perfect ATS Friendly Resume{" "}
              </span>
              <br />
              with AI in Minutes
            </h1>

            <p className="tezt-sm sm:text-lg lg:text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto font-light sm:font-medium mt-1">
              Our AI-powered platform is optimized specifically for the{" "}
              <span className="text-yellow-300 font-extrabold">
                Indian job market.
              </span>{" "}
              <br />
              Try the{" "}
              <span className="text-yellow-300 font-extrabold">
                free demo
              </span>{" "}
              today and get your professional, ATS-optimized resume for just
              ₹100. No subscriptions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold py-3 px-4 rounded-2xl text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-yellow-500/25 flex items-center justify-center gap-2 z-10 relative"
                onClick={() => signIn("google")}
              >
                Create Your Resume Now
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold py-3 px-4 rounded-2xl text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 z-10 relative"
                onClick={() => scrollTo("Templates")}
              >
                View Templates
              </button>
            </div>

            <div className="flex flex-wrap  gap-2 sm:gap-6 pt-8 justify-center">
              {[
                { icon: <Zap className="w-5 h-5" />, text: "AI-Powered" },
                { icon: <Target className="w-5 h-5" />, text: "ATS-Optimized" },
                { icon: <DollarSign className="w-5 h-5" />, text: "Just ₹100" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-md bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 hover:scale-105 transition duration-300"
                >
                  {/* MODIFIED: Added rounded background, padding, and gradient for visual distinction */}
                  <span className="text-white p-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-400 flex items-center justify-center">
                    {React.cloneElement(item.icon, {
                      className: "w-4 h-4 text-gray-900",
                    })}
                  </span>
                  {/* MODIFIED: Increased text size for balance */}
                  <span className="text-base font-medium pr-1">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
          <div className="space-y-10">
            <div className="flex flex-col items-center">
              <div className="pt-16 pb-8 max-w-5xl mx-auto w-full">
                <p className="text-sm font-semibold text-blue-200 uppercase tracking-wider mb-8">
                  TRUSTED BY PROFESSIONALS WORKING AT TOP INDIAN MNCS:
                </p>

                {/* Logo Container */}
                <div className="flex flex-wrap items-center justify-center  gap-x-2 sm:gap-x-6 gap-y-6 drop-shadow-2xl drop-shadow-black ">
                  {mncLogos.map((logo, index) => (
                    <img
                      key={index}
                      src={logo.src}
                      alt={logo.alt}
                      // Centralized and clean styling
                      className="h-3 sm:h-8 hover:opacity-100 transition-all duration-300"
                    />
                    /* NOTE: If you decide to re-import Next.js Image component, replace <img> with <Image> here */
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AnimatedHeroSection;
