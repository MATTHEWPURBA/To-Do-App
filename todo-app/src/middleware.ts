import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

const rahasia = process.env.JWT_SECRET;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public paths from authentication
  const publicPaths = ["/login", "/register", "/_next", "/favicon.ico", "/api/users"];
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Handle API route authentication
  if (pathname.startsWith("/api/todo")) {
    const cookieStore = cookies();
    let authorization = cookieStore.get("Authorization")?.value as string | null;

    if (!authorization) {
      // If not found in cookies, try to get it from headers
      authorization = request.headers.get("authorization");
      // console.log(authorization, "authorization from header");
    } else {
      // console.log(authorization, "authorization from cookies");
      authorization = decodeURIComponent(authorization);
    }

    if (!authorization) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tokenParts = authorization.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = tokenParts[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
      const secret = new TextEncoder().encode(rahasia);
      const { payload } = await jwtVerify<{ _id: string; username: string; email: string }>(token, secret);

      // Set headers with user information for API request
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("userId", payload._id);
      requestHeaders.set("email", payload.email);
      requestHeaders.set("username", payload.username);

      return NextResponse.next({ request: { headers: requestHeaders } });
    } catch (error) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // // Redirect to login if not authenticated for other paths
  const authorization = cookies().get("Authorization");
  if (!authorization) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  const tokenParts = decodeURIComponent(authorization?.value).split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const token = tokenParts[1];
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(rahasia);
    const { payload } = await jwtVerify<{ _id: string; username: string; email: string }>(token, secret);

    // Set headers with user information for client-side requests
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("userId", payload._id);
    requestHeaders.set("email", payload.email);
    requestHeaders.set("username", payload.username);

    return NextResponse.next({ request: { headers: requestHeaders } });
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
