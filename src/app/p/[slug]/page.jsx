import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { cache } from "react";
import { notFound } from "next/navigation";
import { getPortfolioBySlug } from "@/modules/portfolio/services/getPortfolio";
import { Sparkles, ArrowLeft } from "lucide-react";
import { createSeoMetadata } from "@/shared/utils/seo";

export const dynamicParams = true;

const getCachedPortfolio = cache(async slug => {
  return getPortfolioBySlug(slug);
});

const PublicPortfolioViewer = dynamic(
  () => import("@/modules/portfolio/components/PublicPortfolioViewer"),
  {
    loading: () => (
      <main className="min-h-screen bg-[#F8F7F3] text-[#17201C] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <Link href="/" className="inline-flex items-center gap-2 mb-12">
            <Image
              src="/logos/nextcvlogolight.png"
              alt="NextCV"
              width={24}
              height={24}
              className="object-contain"
            />
            <span className="text-sm font-semibold tracking-tight">NextCV</span>
          </Link>

          <div className="h-px bg-[#E3E2DC] mb-8" />

          <div className="flex items-center gap-3">
            <div className="h-5 w-5 shrink-0 rounded-full border-2 border-[#465B9E] border-t-transparent animate-spin" />
            <p className="text-sm text-[#66706B]">Preparing portfolio...</p>
          </div>

          <p className="mt-16 text-xs tracking-[0.12em] text-[#8A918C]">
            PROFESSIONAL PORTFOLIOS · NEXTCV
          </p>
        </div>
      </main>
    ),
  }
);

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getCachedPortfolio(slug);

  if (!data?.resume) {
    return {
      title: "Portfolio Unavailable | NextCV",
      description: "This professional portfolio may have been removed or made private.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { resume } = data;
  const candidateName = resume?.name || "Professional";
  const candidateRole = resume?.jobRole || "Professional Portfolio";

  const title = `${candidateName} | ${candidateRole} | NextCV Portfolio`;

  const description =
    `Explore ${candidateName}'s professional portfolio, including ` +
    "work experience, projects, skills, education, certifications, " +
    "and professional background.";

  return createSeoMetadata({
    title,
    description,
    path: `/p/${slug}`,
  });
}

export default async function PublicPortfolioPage({ params }) {
  const { slug } = await params;
  const data = await getCachedPortfolio(slug);

  if (!data?.resume) {
    return (
      <main className="min-h-screen bg-[#F8F7F3] text-[#17201C] flex flex-col">
        <header className="w-full border-b border-[#E3E2DC]">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
            <Link href="/" className="inline-flex items-center gap-2" aria-label="NextCV home">
              <Image
                src="/logos/nextcvlogolight.png"
                alt="NextCV"
                width={24}
                height={24}
                className="object-contain"
              />
              <span className="text-sm font-semibold tracking-tight">NextCV</span>
            </Link>

            <span className="text-xs text-[#66706B]">Professional portfolios</span>
          </div>
        </header>

        <section className="flex flex-1 items-center justify-center px-5 py-16 sm:py-20">
          <div className="w-full max-w-xl">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-[#465B9E]" />
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#465B9E]">
                Portfolio unavailable
              </p>
            </div>

            <h1 className="mt-6 max-w-lg font-serif text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl">
              This portfolio isn&apos;t available.
            </h1>

            <p className="mt-5 max-w-md text-sm leading-7 text-[#66706B] sm:text-base">
              This link may be incorrect, the portfolio may have been removed, or its owner may have
              made it private.
            </p>

            <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center">
              <Link
                href="/templates"
                className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#465B9E] px-5 text-sm font-medium text-white transition-colors hover:bg-[#344B93] focus-visible:outline f focus-visible:outline-offset-2 focus-visible:outline-[#465B9E]"
              >
                Create your portfolio
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                href="/"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#17201C] transition-colors hover:text-[#465B9E] focus-visible:outline  focus-visible:outline-offset-4 focus-visible:outline-[#465B9E]"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to NextCV
              </Link>
            </div>

            <div className="mt-16 border-t border-[#E3E2DC] pt-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-[#66706B]">
                  Build a professional presence with NextCV.
                </p>

                <Link
                  href="/templates"
                  className="text-xs font-semibold text-[#465B9E] transition-colors hover:text-[#344B93]"
                >
                  Explore resume templates →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-[#E3E2DC]">
          <div className="mx-auto flex min-h-14 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
            <span className="text-xs font-semibold text-[#17201C]">NextCV</span>
            <span className="text-right text-xs text-[#8A918C]">
              Resume, writing and portfolio tools
            </span>
          </div>
        </footer>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F7F3] text-[#17201C]">
      <PublicPortfolioViewer resume={data.resume} slug={slug} />
    </main>
  );
}
