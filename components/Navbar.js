'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Vendor System
          </Link>
          
          <div className="flex items-center space-x-4">
            {session && (
              <Link
                href="/vendors"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname.startsWith('/vendors')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Vendors
              </Link>
            )}
            
            {status === 'loading' ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
            ) : session ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {session.user.image && (
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span className="text-sm text-gray-700">{session.user.name}</span>
                </div>
                <button
                  onClick={() => signOut({callbackUrl:'/'})}
                  className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition duration-200"
              >
                Login with Google
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
