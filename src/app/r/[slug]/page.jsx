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
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-slate-700">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />

        <p className="text-sm text-slate-500 animate-pulse">Loading resume...</p>
      </div>
    ),
  }
);

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const data = await getSharedResumeBySlug(slug);

  if (!data || !data.resume) {
    return {
      title: "Portfolio Not Found | NextCV",
      description: "The requested portfolio could not be found or is private.",
    };
  }

  const { resume } = data;

  const title = `${resume.name} - ${resume.jobRole || "Professional"} | NextCV`;

  const description = `${resume.name}'s professional portfolio${
    resume.jobRole ? ` as a ${resume.jobRole}` : ""
  }. Built and hosted on NextCV.`;

  return createSeoMetadata({ title, description, path: `/r/${slug}` });
}

export default async function PublicResumePage({ params }) {
  const { slug } = await params;

  const data = await getSharedResumeBySlug(slug);

  /* =====================================================
     PORTFOLIO NOT FOUND
  ====================================================== */

  if (!data || !data.resume) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col items-center gap-5">
          {/* Icon */}

          <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <FileQuestion className="w-7 h-7" />
          </div>

          {/* Message */}

          <div className="space-y-2">
            <h1 className="text-xl font-bold text-slate-900">Portfolio Not Available</h1>

            <p className="text-sm text-slate-500 leading-relaxed">
              This portfolio link does not exist, has expired, or the owner has made it private.
            </p>
          </div>

          {/* Actions */}

          <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />

              <span>Go Home</span>
            </Link>

            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 transition-all"
            >
              <Sparkles className="w-4 h-4" />

              <span>Create Yours</span>
            </Link>
          </div>
        </div>

        {/* NextCV Branding */}

        <div className="mt-8 flex items-center gap-2 text-xs text-slate-400">
          <Image
            src="/logos/nextcvlogolight.png"
            alt="NextCV"
            width={18}
            height={18}
            className="opacity-60"
          />

          <span>Powered by NextCV</span>
        </div>
      </div>
    );
  }

  /* =====================================================
     PUBLIC PORTFOLIO
  ====================================================== */

  return <PublicResumeViewer resume={data.resume} />;
}
