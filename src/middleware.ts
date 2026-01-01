import { auth } from "@/lib/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isOnProtectedRoute =
    req.nextUrl.pathname.startsWith("/dashboard") ||
    req.nextUrl.pathname.startsWith("/reviews") ||
    req.nextUrl.pathname.startsWith("/goals") ||
    req.nextUrl.pathname.startsWith("/documents") ||
    req.nextUrl.pathname.startsWith("/interviews") ||
    req.nextUrl.pathname.startsWith("/settings");

  if (isOnProtectedRoute && !isLoggedIn) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }
});

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
