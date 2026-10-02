import Link from "next/link";
import { ArrowUpRight, Globe2, Linkedin, Mail, Smartphone } from "lucide-react";

export default function ShareProfileSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5268a8]">
            Beyond the attachment
          </p>
          <h2 className="mt-3 max-w-lg font-serif text-3xl leading-tight text-[#17201C] sm:text-4xl">
            Your resume shouldn’t stop at a PDF.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-6 text-[#626962]">
            Turn your experience into a professional online profile and share it in an application,
            message, or email. Resume sharing and portfolio features are available with selected
            plans.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-xs text-[#555e56]">
            <li className="flex items-center gap-2">
              <Linkedin aria-hidden="true" className="h-4 w-4 text-[#5268a8]" /> LinkedIn
            </li>
            <li className="flex items-center gap-2">
              <Smartphone aria-hidden="true" className="h-4 w-4 text-[#5268a8]" /> WhatsApp
            </li>
            <li className="flex items-center gap-2">
              <Mail aria-hidden="true" className="h-4 w-4 text-[#5268a8]" /> Email
            </li>
          </ul>
          <Link
            href="/pricing"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#344b93] underline decoration-[#aeb8d5] underline-offset-4 hover:text-[#26366d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5268b6]"
          >
            Compare plans <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -left-2 top-6 h-[82%] w-[90%] rounded-3xl border border-[#e5e4dd] bg-[#f3f2ed] sm:-left-5" />
          <article className="relative ml-auto w-[94%] overflow-hidden rounded-3xl border border-[#dbded8] bg-[#f8f8f4] shadow-[0_22px_60px_-44px_rgba(31,42,35,0.55)]">
            <div className="flex items-center justify-between border-b border-[#e2e4de] px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#29352e]">
                <Globe2 aria-hidden="true" className="h-4 w-4 text-[#5268a8]" /> Example profile
              </div>
              <span className="text-[10px] text-[#767d75]">Public profile preview</span>
            </div>
            <div className="grid gap-5 p-5 sm:grid-cols-[0.72fr_1.28fr] sm:p-7">
              <div className="flex flex-row items-center gap-3 sm:flex-col sm:items-start">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#dce2ef] font-serif text-xl text-[#344b75]">
                  JL
                </div>
                <div>
                  <p className="font-serif text-lg text-[#202a23]">Jordan Lee</p>
                  <p className="mt-1 text-xs text-[#6c746b]">Software Engineer</p>
                  <span className="mt-2 inline-flex rounded-md border border-[#dcdfd8] bg-white px-2 py-1 text-[9px] text-[#626a62]">
                    Example profile
                  </span>
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#5268a8]">
                  About
                </p>
                <p className="mt-2 text-xs leading-5 text-[#59625b]">
                  A concise profile can bring your experience, projects, and skills together in one
                  link.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {["Experience", "Projects", "Skills", "Education"].map(item => (
                    <div
                      key={item}
                      className="rounded-lg border border-[#e1e3dd] bg-white px-3 py-2 text-[10px] font-medium text-[#525b53]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#e2e4de] bg-white/70 px-4 py-3 text-[10px] text-[#737a72] sm:px-5">
              <span>Resume → Online profile → Portfolio</span>
              <span>Share by link</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
