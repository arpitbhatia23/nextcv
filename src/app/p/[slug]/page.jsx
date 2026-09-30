import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { getPortfolioBySlug } from "@/modules/portfolio/services/getPortfolio";
import { UserX, Sparkles, Home } from "lucide-react";
import { createSeoMetadata } from "@/shared/utils/seo";

export const dynamicParams = true;

const PublicPortfolioViewer = dynamic(
  () => import("@/modules/portfolio/components/PublicPortfolioViewer"),
  {
    loading: () => (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-slate-600">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />

        <p className="text-sm text-slate-500 animate-pulse">Loading portfolio...</p>
      </div>
    ),
  }
);

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const data = await getPortfolioBySlug(slug);

  if (!data?.resume) {
    return {
      title: "Portfolio Not Found | NextCV",
      description:
        "The requested professional portfolio could not be found or is currently unavailable.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { resume } = data;

  const candidateName = resume.name || "Professional";
  const candidateRole = resume.jobRole || "Professional Portfolio";

  const title = `${candidateName} | ${candidateRole} | Professional Portfolio`;

  const description = `Explore ${candidateName}'s professional portfolio, including work experience, projects, skills, education, certifications, and professional background.`;

  const canonicalUrl = `/p/${slug}`;

  return createSeoMetadata({ title, description, path: canonicalUrl });
}

export default async function PublicPortfolioPage({ params }) {
  const { slug } = await params;

  const data = await getPortfolioBySlug(slug);

  /*
   * Portfolio does not exist / is private / unavailable
   */
  if (!data?.resume) {
    return (
      <main className="min-h-screen bg-white text-slate-900 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full rounded-3xl bg-white border border-slate-200 shadow-xl p-8 flex flex-col items-center gap-5">
          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500">
            <UserX className="w-7 h-7" />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-slate-900">Portfolio Not Available</h1>

            <p className="text-sm text-slate-500 leading-relaxed">
              This portfolio link does not exist, is no longer available, or the owner has made it
              private.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-sm font-medium text-slate-700 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Go to Home</span>
            </Link>

            <Link
              href="/templates"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-lg shadow-indigo-600/20 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create Yours</span>
            </Link>
          </div>
        </div>

        {/* NextCV Branding */}
        <div className="mt-8 flex items-center gap-2 text-xs text-slate-400">
          <Image src="/logos/nextcvlogolight.png" alt="NextCV" width={18} height={18} />

          <span>Professional Portfolio by NextCV</span>
        </div>
      </main>
    );
  }

  /*
   * Public portfolio
   */
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <PublicPortfolioViewer resume={data.resume} slug={slug} />
    </main>
  );
}
