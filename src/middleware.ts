import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check for session token (NextAuth sets this cookie)
  const token = request.cookies.get("authjs.session-token") ||
                request.cookies.get("__Secure-authjs.session-token");

  // If no token, redirect to login
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/reviews/:path*",
    "/goals/:path*",
    "/documents/:path*",
    "/interviews/:path*",
    "/settings/:path*",
  ],
};
