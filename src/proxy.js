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
  const { pathname, search } = req.nextUrl;

  const isLoginRoute = pathname === "/login";

  const isGuestAllowedRoute = pathname.startsWith("/dashboard/builder");

  const isDashboardRoute = pathname.startsWith("/dashboard");

  // Keep SEO and public pages accessible.
  const isPublicRoute =
    authRoutes.includes(pathname) ||
    pathname.startsWith("/blogs/") ||
    seoDynamicSlugs.has(pathname.split("/").filter(Boolean).pop());

  const token = await getToken({ req });

  // Authenticated users should not revisit login.
  if (token && isLoginRoute) {
    const callbackUrl = req.nextUrl.searchParams.get("callbackUrl");

    const safeCallback =
      callbackUrl?.startsWith("/") && !callbackUrl.startsWith("//") ? callbackUrl : "/dashboard";

    return NextResponse.redirect(new URL(safeCallback, req.url));
  }

  // Guest users can access the builder.
  if (isDashboardRoute && isGuestAllowedRoute) {
    return NextResponse.next();
  }

  // Protect all other dashboard pages.
  if (isDashboardRoute && !token) {
    const loginUrl = new URL("/login", req.url);

    loginUrl.searchParams.set("callbackUrl", pathname + search);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
