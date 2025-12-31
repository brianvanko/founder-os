export { default } from "next-auth/middleware";

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
