'use client';
import { useRouter } from 'next/navigation';
import { MainButton, BackButton } from '@/lib/components/telegram';
import RequestsList from '@/components/RequestsList';
import Header from '@/components/Header';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Header />
      <h1 className="text-center font-medium border-b-2 mx-4">Requests</h1>
      <main className="p-4">
        <RequestsList />
        <MainButton
          text="Add a new ride"
          onClick={() => router.push('/rides/new')}
        />
      </main>
    </>
  );
}
