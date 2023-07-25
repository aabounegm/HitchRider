'use client';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { MainButton } from '@/lib/components/telegram';
import AnnouncementsList from '@/components/AnnouncementsList';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Header backUrl="/" />
      <h1 className="text-center font-medium border-b-2 mx-4">Rides</h1>
      <main className="p-4">
        <AnnouncementsList />
        <MainButton
          text="Request a new lift"
          onClick={() => router.push('/requests/new')}
        />
      </main>
    </>
  );
}
