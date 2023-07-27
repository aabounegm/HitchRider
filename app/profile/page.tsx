'use client';
import { useTonAddress, TonConnectButton } from '@tonconnect/ui-react';
import { BackButton } from '@/lib/components/telegram';
import UserProfile from '@/components/Profile';
import Link from 'next/link';
import { useEffect } from 'react';
import { updateTonAddress } from '@/lib/api/user';

export default function Profile() {
  const address = useTonAddress();

  useEffect(() => {
    if (address) updateTonAddress(address);
    else updateTonAddress(null);
  }, [address]);

  return (
    <>
      <BackButton />
      <main className="h-screen flex bg-tg-secondary-bg text-tg-text flex-col pt-4 w-full items-center">
        <div className="flex justify-center">
          <Link className="text-xl text-tg-text font-bold" href="/">
            Hitch Rider
          </Link>
        </div>
        <TonConnectButton className="mt-3" />
        <UserProfile />
      </main>
    </>
  );
}
