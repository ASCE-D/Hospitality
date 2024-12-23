import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const language = req.cookies.get("NEXT_LOCALE");
  const origin = req.headers.get("origin");

  console.log("Current URL:", url.pathname);
  console.log("Language cookie:", language);
  console.log("Origin:", origin);

  const allowedOrigins = [
    "https://airparking.tech",
    "http://localhost:3000",
    "http://localhost:3001",
  ];

  // Handle API routes
  if (url.pathname.startsWith("/api/")) {
    // Handle preflight requests
    if (req.method === "OPTIONS") {
      return new NextResponse(null, {
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    // Handle actual API requests
    const response = NextResponse.next();

    // Add CORS headers
    response.headers.set("Access-Control-Allow-Origin", origin || "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );

    return response;
  }

  // Handle non-API routes
  if (!language) {
    console.log("Setting default language to English");
    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", "en");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match API routes
    "/api/:path*",
    // Match all other routes except static files
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
