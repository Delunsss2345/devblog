import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  LOGIN_REDIRECT,
  publicRoutes,
} from "./routes";

const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(LOGIN_REDIRECT, nextUrl));
    }

    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }
  return;
});

// nextjs tự tìm và đọc không cần import (đọc ở middleware.ts)
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
