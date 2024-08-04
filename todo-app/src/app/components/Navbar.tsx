"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by looking for the Authorization cookie
    const token = Cookies.get("Authorization");
    if (token) {
      // console.log(token,'ini token');
    }
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/users/logout", { method: "POST" });
    Cookies.remove("Authorization");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <Link href="/">
            <p className="text-white text-lg font-semibold mr-8">Home</p>
          </Link>
        </div>
        <div className="flex items-center gap-x-4">
          {isLoggedIn ? (
            <>
              <Link href="/create-activity">
                <p className="text-white mx-2">Create Activity</p>
              </Link>
              <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleLogout}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <p className="text-white mx-2">Login</p>
              </Link>
              <Link href="/signup">
                <p className="text-white mx-2">Sign Up</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
