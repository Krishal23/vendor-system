'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Logout, Login, Store } from '@mui/icons-material';

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="glass fixed top-0 left-0 w-full z-50 backdrop-blur-lg border-b border-white/10 dark:border-gray-800 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-foreground tracking-tight">
            Vendor<span className="text-blue-500">X</span>
          </Link>

          {/* Nav Items */}
          <div className="flex items-center gap-4">
            {session && (
              <Link
                href="/vendors"
                className={`flex items-center gap-1 px-4 py-2 text-sm rounded-md transition-all ${
                  pathname.startsWith('/vendors')
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <Store fontSize="small" />
                Vendors
              </Link>
            )}

            {/* Auth Buttons */}
            {status === 'loading' ? (
              <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
            ) : session ? (
              <div className="flex items-center gap-3">
                {session.user?.image && (
                  <img
                    src={session.user.image}
                    alt="User"
                    className="w-8 h-8 rounded-full border border-white/20"
                  />
                )}
                <span className="hidden sm:inline text-sm text-gray-700 dark:text-gray-200">
                  {session.user.name?.split(' ')[0]}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md transition"
                >
                  <Logout fontSize="small" />
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition"
              >
                <Login fontSize="small" />
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
