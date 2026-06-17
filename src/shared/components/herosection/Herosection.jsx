import Image from "next/image";
import { Ticket } from "lucide-react";
import SigninButton from "@/modules/auth/components/SigninButton";

const mncLogos = [
  { src: "/logos/TCS.NS_BIG.svg", alt: "TCS company logo" },
  { src: "/logos/INFY_BIG.svg", alt: "Infosys company logo" },
  { src: "/logos/WIT.svg", alt: "Wipro company logo" },
  { src: "/logos/HCLTECH.NS_BIG.svg", alt: "HCL Tech company logo" },
  { src: "/logos/LTIM.NS_BIG.svg", alt: "LTIMindtree company logo" },
  { src: "/logos/TECHM.NS_BIG.svg", alt: "Tech Mahindra company logo" },
  { src: "/logos/google_BIG.svg", alt: "Google company logo" },
  { src: "/logos/deloitte.png", alt: "Deloitte company logo" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-20 lg:pt-32 lg:pb-28">
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:px-8">
        {/* Same text sizes */}
        <h1 className="mx-auto mb-6 max-w-4xl text-xl leading-[1.1] font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
          Build a Free ATS-Friendly Resume
          <br />
          <span className="bg-linear-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            That Gets Interviews Faster
          </span>
        </h1>
        {/* Same text sizes */}
        <p className="mx-auto mb-10 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-lg">
          Build an ATS-friendly resume in minutes with AI. Designed for IT freshers and engineering
          students in India.
          <span className="mt-2 block text-xs font-medium text-blue-600">
            ✨ Starting at ₹49 • No subscriptions • Instant download
          </span>
        </p>
        {/* Coupon */}
        <div className="mb-4 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700 sm:text-xl">
            <Ticket aria-hidden="true" className="h-5 w-5 shrink-0" strokeWidth={2} />

            <span className="text-sm font-medium sm:text-base">
              Use code <strong>FIRST20</strong> for <strong>20% off</strong>
            </span>
          </div>
        </div>
        <SigninButton />
        {/* Delay rendering this lower-priority area until needed */}
        <div className="mt-8 border-t border-slate-100 pt-10 [content-visibility:auto] [contain-intrinsic-size:auto_180px]">
          <p className="mb-2 text-sm font-semibold tracking-wider text-slate-900 uppercase">
            Inspired by resume formats used at top tech companies
          </p>

          <p className="mb-8 text-[8px] text-slate-500">
            We are not affiliated with these companies. Logos are used for illustrative purposes
            only.
          </p>

          <div className="grid grid-cols-8 place-items-center gap-x-3 gap-y-4 opacity-60 sm:grid-cols-8 sm:gap-x-7">
            {mncLogos.map(logo => (
              <div key={logo.src} className="flex h-14 w-full max-w-28 items-center justify-center">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={75}
                  priority
                  sizes="(max-width: 640px) 84px, 112px"
                  className="max-h-16 w-auto max-w-full object-contain grayscale"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
