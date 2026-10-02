import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { getPortfolioBySlug } from "@/modules/portfolio/services/getPortfolio";
import { UserX, Sparkles, ArrowLeft } from "lucide-react";
import { createSeoMetadata } from "@/shared/utils/seo";

export const dynamicParams = true;

const PublicPortfolioViewer = dynamic(
  () => import("@/modules/portfolio/components/PublicPortfolioViewer"),
  {
    loading: () => (
      <main className="min-h-screen bg-[#F8F7F3] text-[#17201C] flex items-center justify-center px-6">
        <div className="w-full max-w-md flex flex-col items-center text-center">
          {/* Loading mark */}
          <div className="relative mb-6">
            <div className="w-12 h-12 rounded-2xl border border-[#E3E2DC] bg-white shadow-sm flex items-center justify-center">
              <div className="w-5 h-5 rounded-full border-2 border-[#465B9E] border-t-transparent animate-spin" />
            </div>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#17201C]">
            Loading portfolio
          </h1>

          <p className="mt-2 text-sm sm:text-base text-[#66706B]">
            Preparing the professional profile for you.
          </p>
        </div>
      </main>
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

  const candidateName = resume?.name || "Professional";
  const candidateRole = resume?.jobRole || "Professional Portfolio";

  const title = `${candidateName} | ${candidateRole} | Professional Portfolio`;

  const description = `Explore ${candidateName}'s professional portfolio, including work experience, projects, skills, education, certifications, and professional background.`;

  const canonicalUrl = `/p/${slug}`;

  return createSeoMetadata({
    title,
    description,
    path: canonicalUrl,
  });
}

export default async function PublicPortfolioPage({ params }) {
  const { slug } = await params;

  const data = await getPortfolioBySlug(slug);

  /*
   * Portfolio does not exist / is private / unavailable
   */
  if (!data?.resume) {
    return (
      <main className="min-h-screen bg-[#F8F7F3] text-[#17201C] flex flex-col">
        {/* Subtle background texture */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.28]"
            style={{
              backgroundImage: "radial-gradient(#17201C 0.7px, transparent 0.7px)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-5 py-16 sm:px-6">
          <div className="w-full max-w-lg">
            {/* Brand */}
            <div className="flex justify-center mb-8">
              <Link href="/" className="inline-flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-white border border-[#E3E2DC] shadow-sm flex items-center justify-center overflow-hidden">
                  <Image
                    src="/logos/nextcvlogolight.png"
                    alt="NextCV"
                    width={22}
                    height={22}
                    className="object-contain"
                  />
                </div>

                <span className="text-sm font-semibold tracking-tight text-[#17201C]">NextCV</span>
              </Link>
            </div>

            {/* Main card */}
            <div className="rounded-3xl border border-[#E3E2DC] bg-white shadow-[0_20px_60px_rgba(23,32,28,0.07)] overflow-hidden">
              <div className="p-7 sm:p-10">
                {/* Icon */}
                <div className="flex justify-center mb-7">
                  <div className="w-16 h-16 rounded-2xl bg-[#F1F0EB] border border-[#E3E2DC] flex items-center justify-center">
                    <UserX className="w-7 h-7 text-[#66706B]" strokeWidth={1.7} />
                  </div>
                </div>

                {/* Heading */}
                <div className="text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#465B9E] mb-3">
                    Portfolio unavailable
                  </p>

                  <h1 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#17201C]">
                    This portfolio isn&apos;t available
                  </h1>

                  <p className="mt-4 text-sm sm:text-base leading-7 text-[#66706B] max-w-md mx-auto">
                    This portfolio link may not exist, may have been removed, or its owner may have
                    made it private.
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link
                    href="/"
                    className="
                      inline-flex items-center justify-center gap-2
                      min-h-11 px-5
                      rounded-xl
                      border border-[#E3E2DC]
                      bg-[#F8F7F3]
                      text-[#17201C]
                      text-sm font-semibold
                      transition-all duration-200
                      hover:bg-[#F1F0EB]
                      hover:border-[#D8D6CF]
                      active:scale-[0.98]
                    "
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Go to Home
                  </Link>

                  <Link
                    href="/templates"
                    className="
                      inline-flex items-center justify-center gap-2
                      min-h-11 px-5
                      rounded-xl
                      bg-[#465B9E]
                      hover:bg-[#344B93]
                      text-white
                      text-sm font-semibold
                      shadow-[0_8px_24px_rgba(70,91,158,0.20)]
                      transition-all duration-200
                      hover:-translate-y-0.5
                      active:translate-y-0
                    "
                  >
                    <Sparkles className="w-4 h-4" />
                    Create Your Portfolio
                  </Link>
                </div>
              </div>

              {/* Bottom brand strip */}
              <div className="border-t border-[#E3E2DC] bg-[#F8F7F3] px-6 py-4">
                <div className="flex items-center justify-center gap-2 text-xs text-[#66706B]">
                  <Image
                    src="/logos/nextcvlogolight.png"
                    alt="NextCV"
                    width={17}
                    height={17}
                    className="object-contain opacity-70"
                  />

                  <span>
                    Professional portfolio powered by{" "}
                    <span className="font-semibold text-[#17201C]">NextCV</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Small supporting text */}
            <p className="mt-6 text-center text-xs text-[#8A918C]">
              Create a professional portfolio from your NextCV resume.
            </p>
          </div>
        </div>
      </main>
    );
  }

  /*
   * Public portfolio
   *
   * The actual portfolio viewer remains responsible
   * for rendering the candidate's portfolio.
   */
  return (
    <main className="min-h-screen bg-[#F8F7F3] text-[#17201C]">
      <PublicPortfolioViewer resume={data.resume} slug={slug} />
    </main>
  );
}
