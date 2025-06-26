'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import '../app/globals.css';
import { signOut } from 'next-auth/react'
import Navbar from '../components/Navbar';



export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/vendors');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }


  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Vendor Management System
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Streamline your vendor operations with ease
          </p>
          <div className="max-w-md mx-auto">
            {!session ? (
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
                <p className="text-gray-600 mb-6">
                  Sign in with Google to access the vendor management system
                </p>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Welcome back!</h2>
                <p className="text-gray-600">Redirecting to vendors...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
