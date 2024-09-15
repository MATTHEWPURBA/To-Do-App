import { NextResponse } from "next/server";

export const POST = async () => {
  const response = NextResponse.json({ message: "Logged out successfully" });

  response.cookies.set("Authorization", "", {
    httpOnly: true,
    maxAge: -1, // Expire immediately
    path: "/",
  });

  return response;
};
