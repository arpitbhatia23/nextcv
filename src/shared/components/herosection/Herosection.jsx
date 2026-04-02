import React from "react";
import Image from "next/image";
// import { m } from "framer-motion";
import { Ticket } from "lucide-react";
import SigninButton from "@/modules/auth/components/SigninButton";

function Herosection() {
  const mncLogos = [
    { src: "/logos/TCS.NS_BIG.svg", alt: "TCS company logo" },
    { src: "/logos/INFY_BIG.svg", alt: "Infosys company logo" },
    { src: "/logos/WIT.svg", alt: "Wipro company logo" },
    { src: "/logos/HCLTECH.NS_BIG.svg", alt: "HCL Tech company logo" },
    { src: "/logos/LTIM.NS_BIG.svg", alt: "LTIMindtree company logo" },
    { src: "/logos/TECHM.NS_BIG.svg", alt: "Tech Mahindra company logo" },
    { src: "/logos/google_BIG.svg", alt: "Google company logo" },
  ];

  return (
    <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-125 bg-indigo-50/80 rounded-full blur-3xl opacity-70" />
        <div className="absolute top-0 right-0 w-250 h-125 bg-blue-50/80 rounded-full blur-none md:blur-3xl opacity-60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Top Badge */}
        <div
          // initial={{ opacity: 0, y: 20 }}
          // animate={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium mb-8 hover:bg-indigo-100 transition-colors cursor-default"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          New: AI Resume Analysis Feature
        </div>

        {/* Headline */}
        <h1
          // initial={{ opacity: 0, y: 20 }}
          // animate={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 max-w-4xl mx-auto leading-[1.1]"
        >
          Build a Free ATS-Friendly Resume <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-blue-600">
            That Gets Interviews Faster
          </span>
        </h1>

        {/* Subhead */}
        <p
          // initial={{ opacity: 0, y: 20 }}
          // animate={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          The{" "}
          <span className="font-semibold text-slate-900">
            free resume maker for IT freshers in India
          </span>
          . Use our AI to create a professional, ATS-friendly resume for engineering freshers that
          passes automated screening in minutes.
          <br />
          <span className="text-sm font-medium text-blue-600 mt-2 block">
            ✨ Starting from ₹49 • No subscriptions • Instant Download
          </span>
        </p>

        {/* Coupon Badge */}
        <div
          // initial={{ opacity: 0, y: 10 }}
          // animate={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full text-green-700 shadow-sm hover:shadow-md transition-all duration-300">
            <Ticket className="w-5 h-5 fill-green-700/20" />
            <span className="font-medium text-sm sm:text-base">
              Use code <span className="font-bold">FIRST20</span> for{" "}
              <span className="font-bold">20% off</span>
            </span>
          </div>
        </div>

        {/* Buttons */}
        <SigninButton />

        {/* Trust/Social Proof */}
        <div
          // initial={{ opacity: 0 }}
          // animate={{ opacity: 1 }}
          // transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 pt-10 border-t border-slate-100"
        >
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8">
            Trusted by professionals at top companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {mncLogos.map((logo, index) => (
              <Image
                key={index}
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={40}
                loading="lazy"
                className="h-6 sm:h-8 w-auto object-contain"
              />
            ))}
          </div>
        </div>
        <p className="sr-only">
          NextCV is the best resume maker for freshers in India 2026, offering an AI-powered resume
          builder for Indian fresh graduates. Our ATS-friendly resume templates for India freshers
          2026 are designed for IT jobs, campus placements, and top MNC companies like TCS, Infosys,
          Wipro, and HCL. Whether you need a Python developer resume for freshers, a React JS
          developer resume, or a professional resume format for engineering freshers in India with 0
          years experience, NextCV provides keyword-optimized, single-column layouts that pass
          automated screening. Download your professional PDF resume for campus placements and
          off-campus hiring in India 2026. Use our specialized TCS resume builder, Accenture
          infographic resume builder, and LTIMindtree resume formats to stand out in the 2026 hiring
          season.
        </p>
      </div>
    </section>
  );
}

export default Herosection;
