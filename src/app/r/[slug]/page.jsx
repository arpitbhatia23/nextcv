import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { getSharedResumeBySlug } from "@/modules/shared-resume/services/getSharedResumeBySlug";
import { ArrowLeft, FileQuestion, Sparkles } from "lucide-react";
import { createSeoMetadata } from "@/shared/utils/seo";

export const dynamicParams = true;

const PublicResumeViewer = dynamic(
  () => import("@/modules/shared-resume/components/PublicResumeViewer"),
  {
    loading: () => (
      <div className="min-h-screen bg-[#F8F7F3] text-[#17201C] flex flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center">
          <div
            className="w-9 h-9 rounded-full border-[3px] border-[#465B9E] border-t-transparent animate-spin"
            aria-hidden="true"
          />

          <p className="mt-5 text-sm font-medium text-[#5B625C]">Loading resume...</p>

          <p className="mt-1 text-xs text-[#8A908B]">Preparing professional profile</p>
        </div>
      </div>
    ),
  }
);

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getSharedResumeBySlug(slug);

  if (!data?.resume) {
    return {
      title: "Resume Not Available | NextCV",
      description: "The requested resume could not be found or is currently private.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { resume } = data;

  const candidateName = resume.name || "Professional";
  const jobRole = resume.jobRole || "Professional";

  const title = `${candidateName} - ${jobRole} | NextCV`;

  const description = `${candidateName}'s professional resume${
    resume.jobRole ? ` as a ${resume.jobRole}` : ""
  }. Built and shared with NextCV.`;

  return createSeoMetadata({
    title,
    description,
    path: `/r/${slug}`,
  });
}

export default async function PublicResumePage({ params }) {
  const { slug } = await params;
  const data = await getSharedResumeBySlug(slug);

  /*
   * =====================================================
   * RESUME NOT FOUND
   * =====================================================
   */

  if (!data?.resume) {
    return (
      <main className="min-h-screen bg-[#F8F7F3] text-[#17201C] flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4 py-16 sm:px-6">
          <div className="w-full max-w-lg">
            {/* Main card */}
            <div className="relative overflow-hidden rounded-4xl border border-[#E3E2DC] bg-white shadow-[0_20px_60px_rgba(23,32,28,0.07)]">
              {/* Subtle editorial detail */}
              <div className="absolute inset-x-0 top-0 h-1 bg-[#465B9E]" aria-hidden="true" />

              <div className="relative p-7 sm:p-10">
                {/* Icon */}
                <div className="flex justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#DCE1F0] bg-[#EEF0F7] text-[#465B9E]">
                    <FileQuestion className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                </div>

                {/* Message */}
                <div className="mt-7 text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#66706B]">
                    Shared Resume
                  </p>

                  <h1 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#17201C] sm:text-4xl">
                    Resume not available
                  </h1>

                  <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#66706B]">
                    This resume link may no longer exist, may have expired, or the owner may have
                    made it private.
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#E3E2DC] bg-white px-4 py-3 text-sm font-semibold text-[#17201C] transition-all hover:-translate-y-0.5 hover:border-[#C8CDD9] hover:bg-[#FAFAF8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#465B9E]/30"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Go to NextCV
                  </Link>

                  <Link
                    href="/"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#465B9E] px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(70,91,158,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#344B93] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#465B9E]/40 focus-visible:ring-offset-2"
                  >
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Create Your Resume
                  </Link>
                </div>
              </div>
            </div>

            {/* Branding */}
            <div className="mt-7 flex items-center justify-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#E3E2DC] bg-white">
                <Image
                  src="/logos/nextcvlogolight.png"
                  alt="NextCV"
                  width={17}
                  height={17}
                  className="opacity-60"
                />
              </div>

              <span className="text-xs font-medium text-[#8A908B]">Powered by NextCV</span>
            </div>
          </div>
        </div>

        {/* Minimal footer */}
        <footer className="border-t border-[#E3E2DC] px-6 py-5">
          <div className="mx-auto flex max-w-7xl items-center justify-center">
            <p className="text-xs text-[#8A908B]">
              Build a professional resume. Share it anywhere.
            </p>
          </div>
        </footer>
      </main>
    );
  }

  /*
   * =====================================================
   * PUBLIC RESUME
   * =====================================================
   */

  return (
    <main className="min-h-screen bg-[#F8F7F3] text-[#17201C]">
      <PublicResumeViewer resume={data.resume} />
    </main>
  );
}
