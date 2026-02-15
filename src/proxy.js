import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req) {
  const token = await getToken({ req });
  const url = req.nextUrl;
  if (url.pathname.startsWith("/api/corn-job")) {
    return NextResponse.next();
  }

  if (req.nextUrl.pathname === "/privacyPolicy") {
    return new NextResponse(null, { status: 410 });
  }

  // Redirect signed-in users away from sign-in/sign-up
  if (
    token &&
    (url.pathname.startsWith("/adminlogin") ||
      url.pathname === "/" ||
      url.pathname === "/about-us" ||
      url.pathname === "/contact" ||
      url.pathname === "/blogs"||
      url.pathname === "/ats-resume-checker"
    )
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If not signed in and trying to access protected route
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next(); // allow request
}

export const config = {
  matcher: ["/", "/sign-in", "/sign-up", "/dashboard/:path*", "/api/:path*"],
};
