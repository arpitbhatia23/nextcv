import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const authRoutes = ["/", "/adminlogin", "/about-us", "/contact", "/blogs", "/ats-resume-checker"];

export async function proxy(req) {
  const { pathname } = req.nextUrl;

  const needsAuthCheck = pathname.startsWith("/dashboard") || authRoutes.includes(pathname);

  if (!needsAuthCheck) {
    return NextResponse.next();
  }

  // 3. Only call getToken when actually needed
  const token = await getToken({ req });

  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/adminlogin", "/dashboard/:path*", "/"],
};
