import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin") &&
    req.nextUrl.pathname !== "/admin";
  const isAdminApiRoute = req.nextUrl.pathname.startsWith("/api/admin");

  if ((isAdminRoute || isAdminApiRoute) && !req.auth) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};