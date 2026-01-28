import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SigninButton from "../SigninButton";

function Herosection() {
  const mncLogos = [
    { src: "/logos/TCS.NS_BIG.svg", alt: "TCS" },
    { src: "/logos/INFY_BIG.svg", alt: "Infosys" },
    { src: "/logos/WIT.svg", alt: "Wipro" },
    { src: "/logos/HCLTECH.NS_BIG.svg", alt: "HCL Tech" },
    { src: "/logos/LTIM.NS_BIG.svg", alt: "LTIMindtree" },
    { src: "/logos/TECHM.NS_BIG.svg", alt: "Tech Mahindra" },
    { src: "/logos/google_BIG.svg", alt: "Google" },
  ];

  return (
    <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-125 bg-indigo-50/80 rounded-full blur-3xl opacity-70" />
        <div className="absolute top-0 right-0 w-250 h-125 bg-blue-50/80 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium mb-8 hover:bg-indigo-100 transition-colors cursor-default"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          New: AI Resume Analysis Feature
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 max-w-4xl mx-auto leading-[1.1]"
        >
          Build a Job-Winning <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-blue-600">
            ATS-Friendly Resume
          </span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Designed specifically for the{" "}
          <span className="font-semibold text-slate-900">
            Indian job market
          </span>
          . Use our AI to create a professional, compliant resume that passes
          automated screening in minutes.
          <br />
          <span className="text-sm font-medium text-emerald-600 mt-2 block">
            ✨ Just ₹100 • No subscriptions • Instant Download
          </span>
        </motion.p>

        {/* Buttons */}
        <SigninButton />

        {/* Trust/Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
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
                className="h-6 sm:h-8 w-auto object-contain"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Herosection;
