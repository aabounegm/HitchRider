'use client';
import useSWR from 'swr';
import { RideRequest } from '@prisma/client';
import Ride from '@/components/Ride';

export default function RidesList() {
  const { isLoading, error, data: rides } = useSWR<RideRequest[]>('/api/rides');

  console.log(isLoading, error, rides);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>An error has occurred: {error.message}</p>;
  }
  if (rides === undefined) {
    return <p>An unknown error has occurred</p>;
  }
  if (rides.length === 0) {
    return <p>No rides found</p>;
  }

  return (
    <section className="flex flex-col gap-2">
      {rides.map((ride) => (
        <Ride key={ride.id} {...ride} />
      ))}
    </section>
  );
}
