'use client';

import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function SignInPage() {
  // useEffect(() => {
  //   // Optional: redirect automatically if already signed in
  // }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black">
      <div className="bg-white p-8 rounded shadow-md w-80 text-center">
        <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
        <button
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
