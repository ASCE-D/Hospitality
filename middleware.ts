import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Check if the 'language' cookie exists
  const language = req.cookies.get("language");

  // If 'language' is not set, redirect to /language
  if (!language) {
    url.pathname = "/language";
    return NextResponse.redirect(url);
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: "/", // Apply this middleware to the homepage
};
