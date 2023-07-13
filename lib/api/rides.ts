import type { Prisma } from '@prisma/client';

export interface Ride {
  id: number;
  time: Date;
  from: string;
  to: string;
  price: number;
  seats: number;
  recurrence?: {
    type: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: Date;
  };
}

export async function createRideRequest(
  ride: Omit<Prisma.RideRequestCreateInput, 'user'>
) {
  const { from, to, time, passengers } = ride;
  const res = await fetch('/api/requests', {
    method: 'POST',
    body: JSON.stringify({
      initData: window.Telegram.WebApp.initData,
      rideRequest: {
        from,
        to,
        time: new Date(time),
        passengers,
      },
    }),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return {
    ...data,
    time: new Date(data.time),
  };
}
