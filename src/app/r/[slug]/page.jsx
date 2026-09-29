import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { getSharedResumeBySlug } from "@/modules/shared-resume/services/getSharedResumeBySlug";
import { ArrowLeft, FileQuestion, Sparkles } from "lucide-react";

export const dynamicParams = true;

const PublicResumeViewer = dynamic(
  () => import("@/modules/shared-resume/components/PublicResumeViewer"),
  {
    loading: () => (
      <div className="min-h-screen bg-[#0B0F17] flex flex-col items-center justify-center p-6 text-slate-300">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm text-slate-400 animate-pulse">Loading verified resume...</p>
      </div>
    ),
  }
);

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getSharedResumeBySlug(slug);

  if (!data || !data.resume) {
    return {
      title: "Resume Not Found | NextCV",
      description: "The requested shared resume could not be found or is private.",
    };
  }

  const { resume } = data;
  const title = `${resume.name} - Resume | NextCV`;
  const description = `${resume.name}'s verified professional resume (${resume.jobRole || "Professional"}). Built and hosted on NextCV.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      url: `/r/${slug}`,
      siteName: "NextCV",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function PublicResumePage({ params }) {
  const { slug } = await params;
  const data = await getSharedResumeBySlug(slug);

  if (!data || !data.resume) {
    return (
      <div className="min-h-screen bg-[#0B0F17] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full p-8 rounded-2xl bg-[#0F141C] border border-white/10 shadow-2xl flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <FileQuestion className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold">Resume Not Available</h1>
            <p className="text-sm text-slate-400">
              This resume link does not exist, has expired, or the owner has made it private.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-sm font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Home</span>
            </Link>
            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create Yours</span>
            </Link>
          </div>
        </div>
        <div className="mt-8 flex items-center gap-2 text-xs text-slate-500">
          <Image src="/logos/nextcvlogolight.png" alt="NextCV" width={18} height={18} />
          <span>Powered by NextCV</span>
        </div>
      </div>
    );
  }

  return <PublicResumeViewer resume={data.resume} slug={slug} />;
}
