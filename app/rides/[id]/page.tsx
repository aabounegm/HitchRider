'use client';
import { Ride, getRide } from '@/lib/api/rides';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RidePage() {
  const params = useParams();
  const router = useRouter();

  const [ride, setRide] = useState<Ride | null>(null);

  useEffect(() => {
    const { BackButton, MainButton } = window.Telegram.WebApp;
    BackButton.onClick(router.back);
    BackButton.show();
    // TODO: check if it's my own ride, and if so show "edit" button instead
    MainButton.setText('Contact driver');
    MainButton.hide();
  }, []);

  useEffect(() => {
    getRide(Number(params.id)).then(setRide);
  }, []);

  if (ride == null) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    );
  }

  const { id, from, to, seats, price, time, recurrence } = ride;
  return (
    <main className="p-2">
      <p>Ride #{id}</p>
      <h3 className="font-bold">From:</h3>
      <p>{from}</p>
      <h3 className="font-bold">To:</h3>
      <p>{to}</p>
      <h3 className="font-bold">Available seats:</h3>
      <p>{seats}</p>
      <h3 className="font-bold">Price per seat:</h3>
      <p>{price || 'Free'}</p>
      <h3 className="font-bold">Day:</h3>
      <p>{time.toLocaleDateString()}</p>
      <h3 className="font-bold">Leaves at:</h3>
      <p>{time.toLocaleTimeString()}</p>
      {recurrence && (
        <>
          <h3 className="font-bold">Recurrence:</h3>
          <p>{recurrence.type}</p>
        </>
      )}
    </main>
  );
}
