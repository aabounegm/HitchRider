'use client';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { ensureUserExists } from '@/lib/api/user';
import './globals.css';
import { Inter } from 'next/font/google';
import { useEffect } from 'react';
import { SWRConfig } from 'swr';
import { useTranslation } from 'react-i18next';
import '@/i18n';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { i18n } = useTranslation();

  const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) =>
    fetch(input, init).then(async (res) => {
      if (!res.ok) throw await res.json();
      return await res.json();
    });

  useEffect(() => {
    // TODO: move this to the backend to be done before any API request
    ensureUserExists();
    i18n.changeLanguage(
      window.Telegram.WebApp.initDataUnsafe.user?.language_code
    );
  }, []);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <SWRConfig
          value={{
            fetcher,
          }}
        >
          <TonConnectUIProvider manifestUrl="https://hitch-rider.vercel.app/tonconnect-manifest.json">
            {children}
          </TonConnectUIProvider>
        </SWRConfig>
      </body>
    </html>
  );
}
