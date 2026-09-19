import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const authRoutes = ["/", "/adminlogin", "/about-us", "/contact", "/blogs", "/ats-resume-checker"];
const seoDynamicSlugs = new Set([
  "accenture-resume-format-for-freshers",
  "ats-friendly-resume-checklist",
  "ats-friendly-resume-format-india",
  "ats-friendly-resume-meaning",
  "ats-friendly-resume-tips",
  "ats-resume-best-practices",
  "ats-resume-checker",
  "ats-resume-optimization",
  "best-ai-resume-builder-india",
  "best-resume-builder-india-2026",
  "best-resume-format-for-freshers-india-2026",
  "best-resume-format-for-it-jobs-in-india-2026",
  "career-objective-for-resume-for-freshers",
  "cognizant-resume-format-for-freshers",
  "common-ats-resume-mistakes",
  "cv-format-for-ai-screening",
  "free-resume-builder-no-payment",
  "fresher-resume-format",
  "fresher-resume-format-india",
  "hcl-resume-format-for-freshers",
  "how-to-make-resume-ats-friendly-2026",
  "indian-resume-format",
  "infosys-resume-format-for-freshers",
  "latest-resume-format-2026",
  "ltimindtree-resume-format-for-freshers",
  "mnc-resume-format-for-freshers",
  "non-it-resume-for-freshers",
  "resume-builder-price-in-india",
  "resume-builder-price-india",
  "resume-for-mnc-company",
  "resume-format-for-bca-freshers",
  "resume-format-for-mca-freshers",
  "resume-format-india",
  "resume-vs-cv-in-india",
  "resume-vs-cv-india",
  "tcs-resume-format-for-freshers",
  "tech-mahindra-resume-format",
  "tech-mahindra-resume-format-for-freshers",
  "what-is-ats-friendly-resume",
  "wipro-resume-format-for-freshers",
]);

export async function proxy(req) {
  const { pathname } = req.nextUrl;

  const needsAuthCheck = pathname.startsWith("/dashboard") || authRoutes.includes(pathname);
  if (needsAuthCheck) {
    const token = await getToken({ req });

    if (token && authRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (!token && pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
