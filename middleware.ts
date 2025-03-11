import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token");

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/list";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/mypage")) {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/mypage/:path*", "/"],
};
