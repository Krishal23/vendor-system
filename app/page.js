'use client';

import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Login, Dashboard, Google } from '@mui/icons-material';
import { Button, CircularProgress } from '@mui/material';
import Navbar from '../components/Navbar';
import '../app/globals.css';

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
      <div className="min-h-screen flex items-center justify-center bg-[url('/bg-light.jpg')] dark:bg-[url('/bg-dark.jpg')] bg-cover bg-center">
        <CircularProgress color="primary" size={60} thickness={5} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black bg-cover bg-center text-foreground transition-colors duration-300">
      <Navbar />
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold mb-4 text-center tracking-tight text-white dark:text-gray-100"
        >
          Vendor Management System
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-xl text-gray-100 dark:text-gray-300 mb-12 text-center max-w-xl"
        >
          Streamline your vendor operations with a single click
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="glass p-8 rounded-2xl shadow-xl backdrop-blur-md border border-white/20 dark:border-white/10 w-full max-w-md"
        >
          {!session ? (
            <>
              <motion.div
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="flex items-center gap-2 mb-3"
              >
                <Login className="text-blue-600" />
                <h2 className="text-2xl font-semibold">Get Started</h2>
              </motion.div>
              <p className="text-gray-800 dark:text-gray-200 mb-6">
                Sign in with Google to begin managing vendors smartly.
              </p>
              <Button
                variant="contained"
                startIcon={<Google />}
                fullWidth
                sx={{ textTransform: 'none', backgroundColor: '#4285F4', ':hover': { backgroundColor: '#357ae8' }, borderRadius: 2, py: 1.5 }}
                onClick={() => signIn('google')}
              >
                Sign in with Google
              </Button>
            </>
          ) : (
            <>
              <motion.div
                initial={{ rotate: 10 }}
                animate={{ rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="flex items-center gap-2 mb-3"
              >
                <Dashboard className="text-green-600" />
                <h2 className="text-2xl font-semibold">Welcome back!</h2>
              </motion.div>
              <p className="text-gray-700 dark:text-gray-300">
                Redirecting to your vendor dashboard...
              </p>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
