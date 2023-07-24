import type { Prisma, RideRequest, RideAnnouncement } from '@prisma/client';

export async function createRideRequest(
  ride: Omit<Prisma.RideRequestCreateInput, 'user'>
): Promise<RideRequest> {
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

export async function createRideAnnouncement(
  ride: Omit<Prisma.RideAnnouncementCreateInput, 'user'>
): Promise<RideAnnouncement> {
  const { from, to, time, passengers, carInfo } = ride;
  const res = await fetch('/api/rides', {
    method: 'POST',
    body: JSON.stringify({
      initData: window.Telegram.WebApp.initData,
      rideAnnouncement: {
        from,
        to,
        passengers,
        carInfo,
        time: new Date(time),
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
