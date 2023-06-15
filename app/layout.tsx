'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import WebApp from '@twa-dev/sdk';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'HitchRider',
  description: 'Connecting drivers to hitchhikers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    WebApp.ready();
  }, []);
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
