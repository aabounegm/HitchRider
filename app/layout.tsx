'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import { SWRConfig } from 'swr';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) =>
    fetch(input, init).then(async (res) => {
      if (!res.ok) throw await res.json();
      return await res.json();
    });

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
      </head>
      <body className={inter.className}>
        <SWRConfig
          value={{
            fetcher,
          }}
        >
          {children}
        </SWRConfig>
      </body>
    </html>
  );
}
