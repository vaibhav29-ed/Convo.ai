import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/auth/login", "/auth/signup"];

export default async function middleware(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!session) {
      const loginUrl = new URL("/auth/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
