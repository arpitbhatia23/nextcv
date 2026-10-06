import Link from "next/link";
import BuildButton from "./BuildButton";

export default function LandingFinalCTA() {
  return (
    <section className="bg-[#17231f] py-16 text-[#f6f6f0] sm:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 sm:px-8 md:flex-row md:items-end md:justify-between lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#b8c5a8]">
            Your next application starts here
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
            Build a resume you can actually apply with.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[#c0c9c2]">
            Create it, improve it against the job, and get the rest of your application ready. Free
            to build; no subscription.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <BuildButton className="bg-[#e8e9db] text-[#1d2b24] hover:bg-white active:bg-[#d8dbc8] focus-visible:ring-white focus-visible:ring-offset-[#17231f]" />
          <Link
            href="/ats-resume-checker"
            className="inline-flex min-h-12 items-center justify-center  border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#17231f]"
          >
            Check ATS Score
          </Link>
        </div>
      </div>
    </section>
  );
}
