'use client';
import logo from '@/public/logo.png';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation('home');

  return (
    <>
      <header className="text-2xl text-center font-bold">
        <h1>{t('title')}</h1>
      </header>
      <main>
        <div className="flex flex-col mx-auto items-center gap-8 text-tg-text">
          <Image src={logo} alt="Logo" className="rounded-full w-1/2" />
          <div className="flex w-full flex-row justify-between px-16 pb-8">
            <Link
              className="px-10 py-2 bg-tg-button border-2 rounded-lg text-tg-button-text"
              href="/rides"
            >
              {t('rides')}
            </Link>
            <Link
              className="px-10 py-2 border-2 bg-tg-button rounded-lg text-tg-button-text"
              href="/requests"
            >
              {t('requests')}
            </Link>
          </div>
        </div>
        <div className="flex border-t-4 flex-col items-stretch text-lg h-screen bg-tg-secondary-bg">
          <Link
            className="p-2 px-16 border-b-2 text-left bg-tg-button text-tg-button-text"
            href="/profile"
          >
            {t('profile')}
          </Link>
          <button className="border-b-2 p-2 px-16 text-left">
            {t('trips')}
          </button>
        </div>
      </main>
    </>
  );
}
