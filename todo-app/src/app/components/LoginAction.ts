"use server";
import { cookies } from "next/headers";
export async function handleLogin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const body = {
    email,
    password,
  };

  const response = await fetch("http://localhost:3000/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Something Went Wrong");
  }
  const data = await response.json();

  // Get the authorization token from the response headers
  const setCookieHeader = response.headers.get("set-cookie") as string;
  // cara untuk mengambil cookie yang udah dikirim dari API

  if (setCookieHeader) {
    const [cookieString] = setCookieHeader.split(";");
    const [cookieName, cookieValue] = cookieString.split("=");
    cookies().set(cookieName, cookieValue, { httpOnly: false, secure: true, maxAge: 3600 });
  }
  console.log('login sucessfully '+data.message)
}
