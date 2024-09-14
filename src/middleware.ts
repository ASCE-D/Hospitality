// // middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// import { match as matchLocale } from "@formatjs/intl-localematcher";
// import Negotiator from "negotiator";

// const locales = ["en", "it"];
// const defaultLocale = "en";

// function getLocale(request: NextRequest): string {
//   const negotiatorHeaders: Record<string, string> = {};
//   request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

//   // @ts-ignore locales are readonly
//   const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
//     locales,
//   );

//   const locale = matchLocale(languages, locales, defaultLocale);

//   return locale;
// }

// export function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;
//   const pathnameIsMissingLocale = locales.every(
//     (locale) =>
//       !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
//   );

//   // Redirect if there is no locale
//   if (pathnameIsMissingLocale) {
//     const locale = getLocale(request);
//     return NextResponse.redirect(
//       new URL(`/${locale}/${pathname}`, request.url),
//     );
//   }
// }

// export const config = {
//   matcher: [
//     // Skip all internal paths (_next)
//     "/((?!_next).*)",
//     // Optional: only run on root (/) URL
//     // '/'
//   ],
// };
import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Check if the 'language' cookie exists
  const language = req.cookies.get("NEXT_LOCALE");

  console.log("Current URL:", url.pathname);
  console.log("Language cookie:", language);

  // If 'language' is not set, redirect to /language
  // if (!language && url.pathname !== "/language") {
  //   console.log("Redirecting to language selector");
  //   return NextResponse.redirect(new URL("/language", req.url));
  // }

  // Allow the request to proceed
  console.log("Proceeding with request");
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
