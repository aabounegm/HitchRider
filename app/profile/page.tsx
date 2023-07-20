'use client';
import { BackButton } from '@/lib/components/telegram';
import UserProfile from '@/components/Profile';
import Link from 'next/link';

export default function Profile() {
  return (
    <>
      <BackButton />
      <main className="h-screen flex bg-tg-secondary-bg text-tg-text flex-col pt-4 w-full">
        <div className="flex justify-center">
          <Link className="text-xl text-tg-text font-bold" href="/">
            Hitch Rider
          </Link>
        </div>
        <UserProfile />
      </main>
    </>
  );
}
