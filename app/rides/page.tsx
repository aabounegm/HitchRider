'use client';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { MainButton } from '@/lib/components/telegram';
import AnnouncementsList from '@/components/AnnouncementsList';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation('rides');

  return (
    <>
      <Header backUrl="/" />
      <h1 className="text-center font-medium border-b-2 mx-4">{t('title')}</h1>
      <main className="p-4">
        <AnnouncementsList />
        <MainButton
          text={t('request button')}
          onClick={() => router.push('/requests/new')}
        />
      </main>
    </>
  );
}
