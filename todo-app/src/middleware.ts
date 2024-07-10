import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rahasia = process.env.JWT_SECRET;
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/todo")) {
    const authorization = cookies().get("Authorization");
    if (!authorization) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const tokenParts = authorization?.value.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const token = tokenParts[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(rahasia);
    const jwt = token;

    const { payload } = await jwtVerify<{
      _id: string;
      username: string;
      email: string;
    }>(jwt, secret);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("userId", payload._id);
    requestHeaders.set("email", payload.email);
    requestHeaders.set("username", payload.username);

    const response = NextResponse.next({
      request:{
        headers:requestHeaders
      }
    })

    return response;
  }
}
