import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // 1. Bypass for Cron Jobs or internal APIs
  if (pathname.startsWith("/api/cron-job")) {
    return NextResponse.next();
  }

  // 2. Handle Gone/Deprecated routes
  if (pathname === "/privacyPolicy") {
    return new NextResponse(null, { status: 410 });
  }

  // 3. Define Public Routes (Where logged-in users shouldn't hang out)
  const authRoutes = ["/", "/adminlogin", "/about-us", "/contact", "/blogs", "/ats-resume-checker"];

  // Redirect signed-in users away from landing/auth pages to dashboard
  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 4. Protect Dashboard
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // // 5. A/B Testing for Resume Form
  if (pathname === "/dashboard/resumeform" && token?.user?._id) {
    if (process.env.NODE_ENV !== "production") return;
    const userId = token.user._id.toString();

    const hash = parseInt(userId.slice(-2), 16);
    const bucket = hash % 100; // 0–99

    let redirectPath = "/dashboard/resumeform";

    if (bucket < 30) {
      redirectPath = "/dashboard/resumeform";
    } else if (bucket < 60) {
      redirectPath = "/dashboard/resumeform-v3";
    } else {
      redirectPath = "/dashboard/resumeform-v4"; // 40%
    }
    if (pathname !== redirectPath) {
      return NextResponse.redirect(new URL(redirectPath, req.url));
    }
  }

  return NextResponse.next();
}

// Ensure the matcher covers all relevant paths
export const config = {
  matcher: [
    "/",
    "/adminlogin",
    "/dashboard/:path*",
    "/api/:path*",
    "/about-us",
    "/contact",
    "/blogs",
    "/ats-resume-checker",
  ],
};
