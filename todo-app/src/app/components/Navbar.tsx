"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  // State to manage user's login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
              <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => setIsLoggedIn(false)}>
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
