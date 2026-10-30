import Link from "next/link";
import {
  ArrowDownRight,
  Check,
  FileText,
  Sparkles,
  WandSparkles,
  Download,
  ShieldCheck,
} from "lucide-react";

import BuildButton from "./BuildButton";

const proofPoints = ["Built for freshers", "ATS-friendly templates", "One-time payment"];

const sidebarSkills = [
  "Leadership",
  "Communication",
  "Problem Solving",
  "Teamwork",
  "Time Management",
  "Adaptability",
];

// Shared dimensions for all three resume pages.
// 480px maximum width with A4 proportions.
const resumePageDimensions = "w-full max-w-[480px] min-w-0 aspect-[210/297]";

function ResumePageThree() {
  return (
    <div
      className={`absolute left-1/2 top-8 ${resumePageDimensions} -translate-x-[43%] rotate-[8deg] border border-[#deded7] bg-[#fafaf7] shadow-md`}
    >
      <div className="h-full overflow-hidden p-6 opacity-75">
        <h3 className="font-serif text-[17px] font-semibold text-[#17201C]">Jordan Smith</h3>

        <p className="mt-1 text-[7px] uppercase tracking-[0.15em] text-[#646A64]">
          Business Marketing Manager
        </p>

        <div className="mt-4 h-px bg-[#344b93]" />

        <p className="mt-5 border-b border-[#deded7] pb-1 text-[8px] font-bold uppercase tracking-widest text-[#465b9e]">
          Certifications
        </p>

        <div className="mt-3">
          <p className="text-[9px] font-semibold text-[#303a32]">Digital Marketing Certification</p>
          <p className="mt-1 text-[7px] text-[#777e77]">Google · 2024</p>
        </div>

        <div className="mt-3">
          <p className="text-[9px] font-semibold text-[#303a32]">Business Analytics</p>
          <p className="mt-1 text-[7px] text-[#777e77]">Example Institute · 2023</p>
        </div>

        <p className="mt-6 border-b border-[#deded7] pb-1 text-[8px] font-bold uppercase tracking-widest text-[#465b9e]">
          Achievements
        </p>

        <div className="mt-3 space-y-2">
          <p className="text-[8px] leading-relaxed text-[#606861]">
            • Led a marketing campaign reaching over 1 million users.
          </p>
          <p className="text-[8px] leading-relaxed text-[#606861]">
            • Recognized for successful team project delivery.
          </p>
        </div>

        <p className="mt-6 border-b border-[#deded7] pb-1 text-[8px] font-bold uppercase tracking-widest text-[#465b9e]">
          Additional Information
        </p>

        <p className="mt-3 text-[8px] leading-relaxed text-[#606861]">
          Digital strategy · Analytics · Brand development
        </p>

        <div className="mt-8 border-t border-[#deded7] pt-3 text-[8px] text-[#888d85]">PAGE 03</div>
      </div>
    </div>
  );
}

function ResumePageTwo() {
  return (
    <div
      className={`absolute left-1/2 top-5 ${resumePageDimensions} -translate-x-[51%] rotate-[4deg] border border-[#deded7] bg-white shadow-lg`}
    >
      <div className="h-full overflow-hidden p-6 opacity-80">
        <div className="border-b border-[#e5e5df] pb-3 text-center">
          <h3 className="text-[15px] font-bold tracking-tight text-[#17201C]">Jordan Smith</h3>

          <p className="mt-1 text-[7px] tracking-wide text-[#646A64]">BUSINESS MARKETING MANAGER</p>

          <p className="mt-2 text-[7px] text-[#777e77]">New York · jordan.smith@email.com</p>
        </div>

        <p className="mt-5 text-[8px] font-bold uppercase tracking-widest text-[#465b9e]">
          Professional Experience
        </p>

        <div className="mt-3">
          <p className="text-[10px] font-semibold text-[#303a32]">Marketing Manager</p>

          <p className="mt-1 text-[8px] text-[#777e77]">Business Corp · 2018–Present</p>

          <div className="mt-2 space-y-1.5">
            <div className="h-1.5 w-full bg-[#e8eae6]" />
            <div className="h-1.5 w-[90%] bg-[#e8eae6]" />
            <div className="h-1.5 w-[75%] bg-[#e8eae6]" />
          </div>
        </div>

        <p className="mt-6 text-[8px] font-bold uppercase tracking-widest text-[#465b9e]">
          Education
        </p>

        <div className="mt-3">
          <p className="text-[10px] font-semibold text-[#303a32]">
            Bachelor of Business Administration
          </p>

          <p className="mt-1 text-[8px] text-[#777e77]">State University · 2014–2018</p>
        </div>

        <p className="mt-6 text-[8px] font-bold uppercase tracking-widest text-[#465b9e]">
          Projects
        </p>

        <div className="mt-3">
          <p className="text-[10px] font-semibold text-[#303a32]">Marketing Campaign 2023</p>

          <p className="mt-1 text-[8px] text-[#777e77]">Digital Marketing</p>

          <div className="mt-2 space-y-1.5">
            <div className="h-1.5 w-full bg-[#e8eae6]" />
            <div className="h-1.5 w-[85%] bg-[#e8eae6]" />
          </div>
        </div>

        <div className="mt-6 border-t border-[#deded7] pt-3 text-[8px] text-[#888d85]">PAGE 02</div>
      </div>
    </div>
  );
}

function ResumePageOne() {
  return (
    <article className="relative z-10 w-full max-w-120 min-w-60 border border-[#e5e5e5] bg-white px-3 py-2 shadow-[0_20px_45px_-18px_rgba(30,40,32,0.3)] transition-transform duration-500 hover:-translate-y-1 sm:max-w-120 sm:px-18 sm:py-8">
      <header className="border-b border-[#e5e5e5] pb-4 text-center">
        <h2 className="font-sans text-[22px] font-bold tracking-[0.07em] text-[#252525] sm:text-[25px]">
          Jordan Smith
        </h2>

        <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.12em] text-[#444]">
          Business Marketing Manager
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[7px] text-[#555]">
          <span>New York, USA</span>
          <span>·</span>
          <span>jordan.smith@email.com</span>
          <span>·</span>
          <span className="text-[#344b93]">LinkedIn</span>
        </div>
      </header>

      <div className="mt-4 grid grid-cols-[34%_66%]">
        {/* LEFT COLUMN */}
        <aside className="border-r border-[#d4d4d4] pr-3">
          <section>
            <h3 className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#292929]">
              Details
            </h3>

            <div className="mt-2 space-y-1 text-[7px] leading-relaxed text-[#444]">
              <p>New York, USA</p>
              <p>jordan.smith@email.com</p>
              <p>linkedin.com/in/jordan</p>
              <p>+1 234 567 890</p>
            </div>
          </section>

          <section className="mt-6">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#292929]">
              Skills
            </h3>

            <div className="mt-2 space-y-1 text-[8px] text-[#444]">
              {sidebarSkills.map(skill => (
                <p key={skill} className="border-b border-[#ededed] pb-1">
                  {skill}
                </p>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#292929]">
              Languages
            </h3>

            <div className="mt-2 space-y-1 text-[8px] text-[#444]">
              <p>English</p>
              <p>Hindi</p>
            </div>
          </section>

          <section className="mt-6">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#292929]">
              Interests
            </h3>

            <div className="mt-2 space-y-1 text-[8px] text-[#444]">
              <p>Marketing</p>
              <p>Research</p>
              <p>Technology</p>
            </div>
          </section>
        </aside>

        {/* RIGHT COLUMN */}
        <main className="min-w-0 pl-3">
          <section>
            <h3 className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#292929]">
              Profile
            </h3>

            <p className="mt-2 text-[8px] leading-[1.65] text-[#333]">
              A versatile professional with a background in business strategy and marketing.
              Innovative thinker with a drive for results, strong communication skills and a passion
              for continuous improvement.
            </p>
          </section>

          <section className="mt-5">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#292929]">
              Employment History
            </h3>

            <div className="mt-2">
              <p className="text-[8px] font-bold text-[#292929]">
                Marketing Manager at Business Corp
              </p>

              <p className="text-[7px] text-[#888]">Jan 2018 — Present</p>

              <ul className="mt-1 list-disc space-y-0.5 pl-3 text-[8px] leading-normal text-[#333]">
                <li>Led marketing campaigns effectively.</li>
                <li>Managed a team of five professionals.</li>
                <li>Increased campaign revenue by 20%.</li>
              </ul>
            </div>

            <div className="mt-3">
              <p className="text-[8px] font-bold text-[#292929]">
                Marketing Executive at Creative Agency
              </p>

              <p className="text-[7px] text-[#888]">Jun 2016 — Dec 2017</p>

              <ul className="mt-1 list-disc space-y-0.5 pl-3 text-[8px] leading-normal text-[#333]">
                <li>Supported digital marketing campaigns.</li>
                <li>Prepared reports on campaign performance.</li>
              </ul>
            </div>
          </section>

          <section className="mt-5">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#292929]">
              Education
            </h3>

            <div className="mt-2">
              <p className="text-[8px] font-bold text-[#292929]">
                Bachelor of Business Administration
              </p>

              <p className="text-[7px] text-[#777]">State University</p>

              <p className="text-[7px] text-[#888]">Jan 2014 — Jan 2018</p>
            </div>
          </section>

          <section className="mt-5">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#292929]">
              Projects
            </h3>

            <div className="mt-2">
              <p className="text-[8px] font-bold text-[#292929]">Marketing Campaign 2023</p>

              <p className="text-[7px] text-[#888]">Jan 2023</p>

              <p className="text-[7px] italic text-[#465b9e]">Tech: Digital Marketing, Analytics</p>

              <ul className="mt-1 list-disc pl-3 text-[8px] leading-normal text-[#333]">
                <li>Successful campaign that reached 1M users.</li>
                <li>Improved audience engagement through targeted content.</li>
              </ul>
            </div>
          </section>

          <section className="mt-5">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#292929]">
              Certificates
            </h3>

            <div className="mt-2">
              <p className="text-[8px] font-bold text-[#292929]">Digital Marketing Certified</p>

              <p className="text-[7px] text-[#465b9e]">Google | Jan 2020</p>
            </div>
          </section>
        </main>
      </div>

      <div className="mt-4 border-t border-[#e5e5e5] pt-2 text-center text-[6px] tracking-wider text-[#999]">
        PROFESSIONAL RESUME
      </div>
    </article>
  );
}

function AIImprovementCard() {
  return (
    <div className="absolute left-1 top-[17%] z-20 w-39.5 border border-[#dcded6] bg-white p-3 shadow-[0_15px_35px_-15px_rgba(31,42,35,0.3)] sm:-left-3 sm:w-46.25">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center bg-[#eef0f7]">
          <WandSparkles className="h-3.5 w-3.5 text-[#465b9e]" />
        </div>

        <p className="text-[10px] font-semibold text-[#29352e]">AI improvement</p>
      </div>

      <p className="mt-3 text-[8px] text-[#93978f]">BEFORE</p>

      <p className="mt-1 text-[9px] leading-4 text-[#81867f]">Made a website using React.</p>

      <div className="my-2 border-t border-dashed border-[#deded7]" />

      <p className="text-[8px] font-semibold text-[#5268a8]">AFTER</p>

      <p className="mt-1 text-[9px] font-medium leading-4 text-[#303a32]">
        Built a responsive web application using React.
      </p>

      <div className="mt-2 flex items-center gap-1 text-[8px] font-semibold text-[#5268a8]">
        <Sparkles className="h-3 w-3" />
        AI writing assistant
      </div>
    </div>
  );
}

function ATSPreviewCard() {
  return (
    <div className="absolute bottom-[12%] right-1 z-20 w-36.25 border border-[#dcded6] bg-white p-3 shadow-[0_15px_35px_-15px_rgba(31,42,35,0.3)] sm:-right-3 sm:w-41.5">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-[#465b9e]" />

        <p className="text-[10px] font-semibold text-[#29352e]">ATS checker</p>
      </div>

      <div className="mt-3 flex items-end justify-between">
        <p className="text-[8px] text-[#81867f]">Example score</p>

        <p className="text-lg font-semibold leading-none text-[#344b93]">
          82<span className="text-[9px] text-[#81867f]">/100</span>
        </p>
      </div>

      <div className="mt-2 h-1.5 bg-[#eaede8]">
        <div className="h-full w-[82%] bg-[#526b9a]" />
      </div>

      <p className="mt-2 text-[8px] leading-3 text-[#777e77]">
        Example only · Match your resume to a job description
      </p>
    </div>
  );
}

function TemplateToolbar() {
  return (
    <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#dcdcd4] pt-4">
      <div>
        <p className="text-[9px] font-semibold text-[#29352e]">Make it yours</p>

        <p className="mt-0.5 text-[8px] text-[#81867f]">Choose a design for your career</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex h-9 w-7 items-center justify-center border border-[#465b9e] bg-white">
          <span className="h-5 w-3 border-l-2 border-t-2 border-[#465b9e]" />
        </div>

        <div className="flex h-9 w-7 items-center justify-center border border-[#d2d2ca] bg-white">
          <span className="h-5 w-3 border-t-2 border-[#8a8e87]" />
        </div>

        <div className="flex h-9 w-7 items-center justify-center border border-[#d2d2ca] bg-white">
          <span className="h-5 w-3 border-l-2 border-[#8a8e87]" />
        </div>

        <span className="text-[9px] font-semibold text-[#465b9e]">+ More</span>
      </div>
    </div>
  );
}

export default function LandingHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-[#e7e5df] bg-[#F8F7F3] pt-28 sm:pt-32 lg:pt-36">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(#b9b7ae_0.65px,transparent_0.65px)] bg-size-[20px_20px] opacity-30 mask-[linear-gradient(to_bottom,black,transparent_80%)]" />

      <div className="pointer-events-none absolute -right-40 top-20 -z-10 h-125 w-125 rounded-full bg-[#465b9e]/[0.07] blur-[100px]" />

      <div className="mx-auto grid w-full max-w-340 items-center gap-8 px-5 pb-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-6 lg:px-12 lg:pb-24">
        {/* LEFT CONTENT */}
        <div className="relative z-10 max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 border border-[#deded7] bg-white/70 px-3 py-2">
            <Sparkles className="h-3.5 w-3.5 text-[#465b9e]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#465b9e]">
              Your career starts here
            </span>
          </div>

          <h1 className="font-serif text-[2.8rem] leading-[1.04] tracking-tight text-[#17201C] sm:text-6xl lg:text-[3.65rem] xl:text-[4rem]">
            Your Skills Deserve a{" "}
            <span className="relative inline-block text-[#344b93]">
              Better Resume.
              <span className="absolute -bottom-1 left-0 h-0.75 w-full bg-[#465b9e]/20" />
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-[#5b625c] sm:text-lg">
            Turn your skills, college projects and experience into a professional, ATS-friendly
            resume. Let AI help you write better, choose your design and get ready to apply.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BuildButton className="w-full sm:w-auto" />

            <Link
              href="/ats-resume-checker"
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#c9cbc8] bg-white/70 px-5 py-3 text-sm font-semibold text-[#26342c] transition-all hover:border-[#8995bd] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5268b6] focus-visible:ring-offset-2"
            >
              Check My Resume
              <ArrowDownRight className="h-4 w-4" />
            </Link>
          </div>

          <p className="mt-4 text-xs text-[#646a64]">
            Free to build and edit
            <span className="mx-1.5">·</span>
            Download from ₹49
            <span className="mx-1.5">·</span>
            No subscription
          </p>

          {/* PROOF POINTS */}
          <div className="mt-10 border-t border-[#dfddd6] pt-5">
            <p className="text-xs font-semibold text-[#29352e]">
              Everything you need to prepare your application
            </p>

            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#666d66]">
              {proofPoints.map(point => (
                <li key={point} className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-[#5268a8]" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT PRODUCT SHOWCASE */}
        <div className="relative mx-auto w-full max-w-170 lg:ml-auto">
          <div className="pointer-events-none absolute -right-8 top-12 h-64 w-64 rounded-full border border-[#465b9e]/10" />

          <div className="pointer-events-none absolute -right-14 top-20 h-64 w-64 rounded-full border border-[#465b9e]/10" />

          {/* WORKSPACE */}
          <div className="relative w-full border border-[#deded7] bg-[#eeede7] p-3 shadow-[0_30px_80px_-45px_rgba(31,42,35,0.4)] sm:p-5">
            {/* WORKSPACE HEADER */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center bg-white">
                  <FileText className="h-4 w-4 text-[#465b9e]" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#29352e]">Resume Studio</p>

                  <p className="text-[9px] text-[#81867f]">Your professional profile</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 border border-[#d9ddd4] bg-[#f9faf7] px-2.5 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#719478]" />

                <span className="text-[9px] font-medium text-[#5e735f]">Live preview</span>
              </div>
            </div>

            {/* DOCUMENT STAGE */}
            <div className="relative flex min-h-122.5 items-center justify-center overflow-hidden bg-[#e5e5df] px-3 py-6 sm:min-h-132.5 sm:px-8">
              <ResumePageThree />
              <ResumePageTwo />
              <ResumePageOne />

              <AIImprovementCard />
              <ATSPreviewCard />
            </div>

            <TemplateToolbar />
          </div>

          {/* BOTTOM CAPTION */}
          <div className="mt-5 flex items-center justify-center gap-2 text-[10px] text-[#777e77]">
            <Download className="h-3.5 w-3.5" />

            <span>Build, customize and download your resume</span>
          </div>
        </div>
      </div>
    </section>
  );
}
