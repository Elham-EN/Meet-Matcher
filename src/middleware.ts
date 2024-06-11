import { NextResponse } from "next/server";
import { auth as middleware } from "./auth";
import { authRoutes, publicRoutes } from "./routes";

// Incoming request coming from client and this middleware to intercept
// that request and do some check to to protect a set of pages

export default middleware((req) => {
  const { nextUrl } = req;
  // If user is logged in, it will return true otherwise false
  const isLoggedIn = !!req.auth;
  const isPublic = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (isPublic) {
    return NextResponse.next();
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      // redirect authenticated users to protected routes
      return NextResponse.redirect(new URL("/members", nextUrl.origin));
    } else {
      return NextResponse.next();
    }
  }
  // Those who are not logged in, are redirected to login page
  if (!isPublic && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl.origin));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
