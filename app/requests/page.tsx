'use client';
import { useRouter } from 'next/navigation';
import { MainButton } from '@/lib/components/telegram';
import RequestsList from '@/components/RequestsList';
import Header from '@/components/Header';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation('requests');

  return (
    <>
      <Header backUrl="/" />
      <h1 className="text-center font-medium border-b-2 mx-4">{t('title')}</h1>
      <main className="p-4">
        <RequestsList />
        <MainButton
          text={t('add button')}
          onClick={() => router.push('/rides/new')}
        />
      </main>
    </>
  );
}
