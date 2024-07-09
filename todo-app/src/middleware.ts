import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./db/utils/jwt";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/todo")) {
    const token = request.cookies.get("accessToken");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    
    // console.log(verifyToken(token.value),'ini token');

    // try {
    //   const user = verifyToken(token.value);
    //   if (typeof user !== "string" && user._id) {
    //     request.headers.set("userId", user._id);
    //   } else {
    //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    //   }
    // } catch (error) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    return NextResponse.next();
  }
}
