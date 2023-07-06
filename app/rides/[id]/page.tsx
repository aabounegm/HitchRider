'use client';
import { Ride, getRide } from '@/lib/api/rides';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BackButton } from '@twa-dev/sdk/react';

export default function RidePage() {
  const params = useParams();
  const [ride, setRide] = useState<Ride | null>(null);

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
      <BackButton />
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
