'use client';
import useSWR from 'swr';
import type { RideRequest } from '@prisma/client';
import Request from '@/components/RideRequest';

export default function RidesList() {
  const { isLoading, error, data } = useSWR<RideRequest[]>('/api/requests');

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>An error has occurred: {error.message}</p>;
  }
  if (data === undefined) {
    return <p>An unknown error has occurred</p>;
  }
  if (data.length === 0) {
    return <p>No requests found</p>;
  }
  const rides = data.map((ride) => ({
    ...ride,
    time: new Date(ride.time),
  }));

  return (
    <section className="flex flex-col gap-2">
      {rides.map((ride) => (
        <Request key={ride.id} {...ride} />
      ))}
    </section>
  );
}
