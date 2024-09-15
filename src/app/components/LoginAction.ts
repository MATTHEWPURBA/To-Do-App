'use server';
import { cookies } from 'next/headers';
export async function handleLogin(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const body = {
    email,
    password,
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const response = await fetch(`${apiUrl}/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  // Log the response to see what is being returned
  console.log('Response:', response);

  if (!response.ok) {
    const contentType = response.headers.get('content-type');

    // Check if the content type is JSON
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      throw new Error(data.message || 'Something Went Wrong');
    } else {
      // Handle non-JSON responses (e.g., HTML error page)
      const errorText = await response.text();
      throw new Error('Received non-JSON response: ' + errorText);
    }
  }

  const data = await response.json();

  // Get the authorization token from the response headers
  const setCookieHeader = response.headers.get('set-cookie') as string;
  // cara untuk mengambil cookie yang udah dikirim dari API

  if (setCookieHeader) {
    const [cookieString] = setCookieHeader.split(';');
    const [cookieName, cookieValue] = cookieString.split('=');
    cookies().set(cookieName, cookieValue, {
      httpOnly: false,
      secure: true,
      maxAge: 3600,
    });
  }
  console.log('login sucessfully ' + data.message);
}
