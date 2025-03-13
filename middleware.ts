import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token");

  if (pathname === "/" && token) {
    const url = request.nextUrl.clone();
    url.pathname = "/list";
    return NextResponse.redirect(url);
  }
  if (pathname.startsWith("/signin") && token) {
    return NextResponse.redirect(new URL("/list", request.url));
  }
  if (pathname.startsWith("/signup") && token) {
    return NextResponse.redirect(new URL("/list", request.url));
  }

  if (pathname.startsWith("/mypage") && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/mypage/:path*", "/signin/:path*", "/signup/:path*", "/"],
};
