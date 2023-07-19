'use client';
import { BackButton } from '@/lib/components/telegram';
import UserProfile from '@/components/Profile';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const router = useRouter();
  return (
    <>
      <BackButton />
      <main className="h-screen flex bg-tg-secondary-bg text-tg-text flex-col pt-4 w-full">
        <div className="flex justify-center">
          <h1
            className="font-bold"
            onClick={() => {
              router.push('/');
            }}
          >
            Hitch Rider
          </h1>
        </div>
        <UserProfile />
      </main>
    </>
  );
}
