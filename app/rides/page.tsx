'use client';
import { useRouter } from 'next/navigation';
import UserIcon from '~icons/fa/user.jsx';
import { MainButton, BackButton } from '@/lib/components/telegram';
import AnnouncementsList from '@/components/AnnouncementsList';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <BackButton />
      <header className="flex justify-between p-4 font-bold">
        <h1
          onClick={() => {
            router.push('/');
          }}
        >
          Hitch Rider
        </h1>
        <UserIcon
          onClick={() => {
            router.push('/profile');
          }}
        />
      </header>
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
