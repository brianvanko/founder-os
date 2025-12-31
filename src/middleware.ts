import { auth } from "@/lib/auth";

export default auth((req) => {
  // req.auth contains the session
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
