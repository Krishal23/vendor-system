import './globals.css'
import { Providers } from './providers';

export const metadata = {
  title: 'Vendor Management System',
  description: 'Manage your vendors efficiently',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
