import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the session token from cookies
  const sessionToken = request.cookies.get("next-auth.session-token") ||
                       request.cookies.get("__Secure-next-auth.session-token");

  // If no session token, redirect to login
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
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
