// app/layout.js or app/layout.tsx


import { Toaster } from 'react-hot-toast';
import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Vendor Management System',
  description: 'Manage your vendors efficiently',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='dark'>
      <body className="min-h-screen bg-zinc-950">
        <Providers>
          {children}
          <Toaster position='top-center' reverseOrder={false}/>
           </Providers>
      </body>
    </html>
  );
}
