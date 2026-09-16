"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Check, CircleCheck, Download, FileText, Sparkles, Zap } from "lucide-react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

function Herosection() {
  const mncLogos = [
    {
      src: "/logos/TCS.NS_BIG.svg",
      alt: "Tata Consultancy Services",
    },
    {
      src: "/logos/INFY_BIG.svg",
      alt: "Infosys",
    },
    {
      src: "/logos/WIT.svg",
      alt: "Wipro",
    },
    {
      src: "/logos/TECHM.NS_BIG.svg",
      alt: "Tech Mahindra",
    },
    {
      src: "/logos/google_BIG.svg",
      alt: "Google",
    },
    {
      src: "/logos/deloitte.png",
      alt: "Deloitte",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white text-slate-950 pt-28">
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* very subtle top glow */}
        <div
          className="
            absolute
            left-[28%]
            -top-45
            h-150
            w-190
            rounded-full
            bg-[#eef2ff]
            opacity-60
            blur-[100px]
          "
        />

        {/* right glow */}
        <div
          className="
            absolute
            -right-45
            top-32.5
            h-162
            w-162
            rounded-full
            bg-[#eef4ff]
            opacity-80
            blur-[110px]
          "
        />

        {/* bottom glow */}
        <div
          className="
            absolute
            -bottom-70
            left-[35%]
            h-137.5
            w-175
            rounded-full
            bg-[#f2f4ff]
            opacity-60
            blur-[100px]
          "
        />
      </div>

      {/* =========================================================
          HERO
      ========================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-5
          sm:px-6
          lg:px-0
        "
      >
        <div
          className="
            grid
            min-h-158.75
            grid-cols-1
            items-center-safe
            gap-2
            lg:grid-cols-2
            lg:gap-6
          "
        >
          {/* =====================================================
              LEFT CONTENT
          ====================================================== */}

          <div
            className="
              relative
              z-20
              pt-8
              lg:pt-0
            "
          >
            {/* Badge */}

            <div
              className="
                mb-5.5
                inline-flex
                h-8.75
                items-center
                gap-2
                rounded-full
                border
                border-[#e4e7ff]
                bg-[#f2f3ff]
                px-3.5
                text-[13px]
                font-semibold
                text-[#3730d8]
              "
            >
              <Sparkles className="h-3.75 w-3.75" />

              <span>AI-Powered Resume Builder</span>
            </div>

            {/* Heading */}

            <h1
              className="
                max-w-xl
                text-3xl
                font-bold
                leading-[1.08]
                tracking-[-1.7px]
                text-[#071644]
                sm:text-3xl
                lg:text-4xl
              "
            >
              Build an ATS-Friendly
              <br />
              Resume for Your Next Job
              <span
                className="
                  block
                  bg-linear-to-r
                  from-[#4338f4]
                  to-[#2563eb]
                  bg-clip-text
                  text-transparent
                "
              >
                with AI
              </span>
            </h1>

            {/* Description */}

            <p
              className="
                mt-5
                max-w-118
                text-sm
                leading-[1.55]
                text-[#365184]
              "
            >
              Create a professional resume in minutes with AI-powered writing and ATS-friendly
              templates — built for freshers and experienced professionals in India.
            </p>

            {/* Benefits */}

            <div
              className="
                mt-6.25
                flex
                flex-wrap
                items-start
                gap-x-5
                gap-y-4
                sm:gap-x-7.5
              "
            >
              {/* ATS */}

              <div className="flex items-start gap-2.25">
                <span
                  className="
                    mt-px
                    flex
                    h-5.75
                    w-5.75
                    shrink-0
                    items-center
                    justify-center
                    rounded-[6px]
                    bg-[#d9f7ed]
                  "
                >
                  <Check className="h-3 w-3 text-[#12ad78]" strokeWidth={3} />
                </span>

                <span
                  className="
                    max-w-20
                    text-[13px]
                    leading-[1.35]
                    text-[#0d234f]
                  "
                >
                  ATS-friendly
                  <br />
                  formatting
                </span>
              </div>

              {/* AI */}

              <div className="flex items-start gap-2.25">
                <span
                  className="
                    mt-px
                    flex
                    h-5.75
                    w-5.75
                    shrink-0
                    items-center
                    justify-center
                    rounded-[6px]
                    bg-[#eceaff]
                  "
                >
                  <Sparkles className="h-3.75 w-3.75 text-[#4338f4]" />
                </span>

                <span
                  className="
                    max-w-18.5
                    text-[13px]
                    leading-[1.35]
                    text-[#0d234f]
                  "
                >
                  AI-powered
                  <br />
                  writing
                </span>
              </div>

              {/* Templates */}

              <div className="flex items-start gap-2.25">
                <span
                  className="
                    mt-px
                    flex
                    h-5.75
                    w-5.75
                    shrink-0
                    items-center
                    justify-center
                    rounded-[6px]
                    bg-[#e5efff]
                  "
                >
                  <FileText className="h-3.5 w-3.5 text-[#3b82f6]" />
                </span>

                <span
                  className="
                    max-w-21
                    text-[13px]
                    leading-[1.35]
                    text-[#0d234f]
                  "
                >
                  Professional
                  <br />
                  templates
                </span>
              </div>
            </div>

            {/* =================================================
                PRIMARY CTA
            ================================================== */}

            <div className="mt-6.75">
              <Button
                className={"w-full bg-indigo-600 p-3 px-8 font-semibold sm:w-auto"}
                onClick={() => signIn("google", { callbackUrl: "/dashboard/builder" })}
              >
                Build My Resume With AI <ArrowRight />{" "}
              </Button>
            </div>

            {/* Trust */}

            <div
              className="
                mt-4
                flex
                flex-wrap
                items-center
                gap-x-3
                gap-y-2
                text-[11px]
                text-[#5370a2]
                sm:gap-x-3.75
              "
            >
              <span className="flex items-center gap-1.25">
                <Zap className="h-3 w-3 text-[#4338f4]" />
                No credit card required
              </span>

              <span className="text-[#b4bfd2]">•</span>

              <span className="flex items-center gap-1.25">
                <CircleCheck className="h-3.5 w-3.5 text-[#4338f4]" />
                Start in minutes
              </span>

              <span className="text-[#b4bfd2]">•</span>

              <span className="flex items-center gap-1.25">
                <Download className="h-3.5 w-3.5 text-[#4338f4]" />
                Download as PDF
              </span>
            </div>

            {/* =================================================
                CREATE → OPTIMIZE → DOWNLOAD
            ================================================== */}

            <div
              className="
                mt-8.5
                flex
                flex-wrap
                items-center
                gap-3.25
                text-[13px]
              "
            >
              <span className="font-medium text-[#071644]">Create</span>

              <ArrowRight className="h-3.5 w-3.5 text-[#526b9d]" />

              <span className="font-medium text-[#071644]">Optimize</span>

              <ArrowRight className="h-3.5 w-3.5 text-[#526b9d]" />

              <span className="font-medium text-[#071644]">Download</span>
            </div>

            {/* Step indicators */}

            <div
              className="
                mt-3.25
                flex
                items-center
                gap-3.75
              "
            >
              <div className="flex items-center gap-2">
                <span
                  className="
                    flex
                    h-5.75
                    w-5.75
                    items-center
                    justify-center
                    rounded-full
                    bg-linear-to-br
                    from-[#b9b5ff]
                    to-[#e2e1ff]
                    text-[11px]
                    font-semibold
                    text-[#4338f4]
                  "
                >
                  1
                </span>

                <span className="text-[10px] text-[#526b9d]">Choose a template</span>
              </div>

              <ArrowRight className="h-3.25 w-3.25 text-[#9ba9c4]" />

              <div className="flex items-center gap-2">
                <span
                  className="
                    flex
                    h-5.75
                    w-5.75
                    items-center
                    justify-center
                    rounded-full
                    bg-linear-to-br
                    from-[#b9b5ff]
                    to-[#e2e1ff]
                    text-[11px]
                    font-semibold
                    text-[#4338f4]
                  "
                >
                  2
                </span>

                <span className="text-[10px] text-[#526b9d]">Add your details</span>
              </div>

              <ArrowRight className="h-3.25 w-3.25 text-[#9ba9c4]" />

              <div className="flex items-center gap-2">
                <span
                  className="
                    flex
                    h-5.75
                    w-5.75
                    items-center
                    justify-center
                    rounded-full
                    bg-linear-to-br
                    from-[#b9b5ff]
                    to-[#e2e1ff]
                    text-[11px]
                    font-semibold
                    text-[#4338f4]
                  "
                >
                  3
                </span>

                <span className="text-[10px] text-[#526b9d]">Get your ATS-friendly resume</span>
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT PRODUCT PREVIEW
          ====================================================== */}
          <div
            className="
    relative
    flex
    h-105
    w-full
    items-center
    justify-center
    overflow-visible
    sm:h-125
    lg:-ml-1.25
    lg:h-137.5
    lg:justify-end
  "
          >
            {/* =================================================
      LARGE BLURRED BLUE / GRAY BACKGROUND BLOB
  ================================================== */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 600 600"
              className="pointer-events-none absolute -right-60 top-1/2 z-0 h-200 w-6xl -translate-y-1/2 blur-md hidden sm:block"
              style={{
                opacity: 0.48,
              }}
            >
              <path
                d="M558.0143432617188,500.4186706542969C625.299035102129,413.1728572845459,407.96950629353523,70.69377899169922,268.24163818359375,43.77989959716797C128.51377007365227,16.86602001953125,-73.34030544757843,278.60346031188965,-0.8971291780471802,392.7631539916992C71.54604709148407,506.9228458404541,490.7296514213085,587.6644840240479,558.0143432617188,500.4186706542969C625.299035102129,413.1728572845459,407.96950629353523,70.69377899169922,268.24163818359375,43.77989959716797"
                fill="hsl(215, 55%, 55%)"
                stroke="hsl(215, 15%, 45%)"
                strokeWidth="2"
                transform="matrix(
        0.6518737537615832,
        -0.5469870263554935,
        0.5469870263554935,
        0.6518737537615832,
        -34.899750220507826,
        268.84045505243995
      )"
              />
            </svg>

            {/* =================================================
      SECOND SOFT GRAY / BLUE GLOW
      Helps the color appear around the dashboard
  ================================================== */}
            <div
              className="
      pointer-events-none
      absolute
      right-5
      top-1/2
      z-0
      h-120
      w-155
      -translate-y-1/2
      rounded-full
      bg-slate-400/20
      blur-[70px]
    "
            />

            {/* =================================================
      DASHBOARD
  ================================================== */}
            <div
              className="
      relative
      z-10
      overflow-hidden
      rounded-md
     
    "
            >
              <Image
                src="/herosection.png"
                alt="NextCV AI resume builder dashboard"
                width={1400}
                height={1200}
                priority
                className="
        h-120
        w-full
        max-w-3xl
        aspect-video
        object-contain
      "
              />
            </div>

            {/* =================================================
      AI SUGGESTION CARD
  ================================================== */}
            <div
              className="
      absolute
      right-0
      top-11.25
      z-20
      flex
      items-center
      gap-2.25
      rounded-[12px]
      border
      border-[#e4e6ff]
      bg-white
      px-4
      py-3
      shadow-[0_12px_30px_-12px_rgba(67,56,244,0.28)]
    "
            >
              <div
                className="
        flex
        h-8
        w-8
        items-center
        justify-center
        rounded-xl
        bg-[#f0efff]
      "
              >
                <Sparkles className="h-4 w-4 text-[#4338f4]" />
              </div>

              <div>
                <div className="text-[11px] font-semibold text-[#4338f4]">AI Suggests</div>

                <div className="text-[10px] text-[#5b6f98]">better wording</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          TRUST SECTION
      ========================================================== */}

      <section
        className="
          relative
          z-10
          border-t
          border-[#edf0f6]
          bg-white/70
        "
      >
        <div
          className="
            mx-auto
            max-w-262
            px-5
            pb-10
            pt-8
            sm:px-6
            lg:px-0
          "
        >
          {/* heading */}

          <div className="text-center">
            <h2
              className="
                text-[21px]
                font-bold
                tracking-[-0.5px]
                text-[#071644]
              "
            >
              Trusted by 1,200+ job seekers
            </h2>

            <p
              className="
                mt-2
                text-[12px]
                text-[#304b7b]
              "
            >
              Professional templates
              <span className="mx-2.5 text-[#a5afc1]">•</span>
              AI resume writing
              <span className="mx-2.5 text-[#a5afc1]">•</span>
              ATS-friendly formatting
            </p>

            {/* View templates */}

            <a
              href="/templates"
              className="
                mt-4
                inline-flex
                h-8.5
                items-center
                gap-1.75
                rounded-full
                border
                border-[#aaa6ff]
                bg-white
                px-3.75
                text-[11px]
                font-semibold
                text-[#4338f4]
                shadow-[0_3px_12px_rgba(67,56,244,0.06)]
                transition-all
                hover:bg-[#f7f7ff]
              "
            >
              View Templates
              <ArrowRight className="h-3.25 w-3.25" />
            </a>
          </div>

          {/* =====================================================
              COMPANY LOGOS
          ====================================================== */}

          <div
            className="
              mt-6.75
              flex justify-between
              grayscale hover:grayscale-0

            "
          >
            {mncLogos.map((logo, index) => (
              <div
                key={`${logo.alt}-${index}`}
                className="
                  flex
                  h-4 sm:h-7
                  items-stretch
                  justify-center
                "
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={125}
                  height={40}
                  className="
                    max-h-8
                    w-auto
                    max-w-31.25
                    object-contain
                  "
                />
              </div>
            ))}
          </div>

          {/* disclaimer */}

          <p
            className="
              mt-4.25
              text-center
              text-[9px]
              text-[#9ba7bb]
            "
          >
            Resume formats inspired by modern hiring standards. Clean, professional layouts designed
            for ATS readability.
          </p>
        </div>
      </section>
    </section>
  );
}

export default Herosection;
