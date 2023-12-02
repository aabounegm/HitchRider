import type { RideAnnouncementParams } from '../types/ride';
import type { RideRequestParams } from '../types/request';

export async function createRideRequest(
  ride: Omit<RideRequestParams, 'user'>
): Promise<{ id: number }> {
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
  return data;
}

export async function createRideAnnouncement(
  ride: Omit<RideAnnouncementParams, 'user'>
): Promise<{ id: number }> {
  const { from, to, time, passengers, carInfo, price } = ride;
  const res = await fetch('/api/rides', {
    method: 'POST',
    body: JSON.stringify({
      initData: window.Telegram.WebApp.initData,
      rideAnnouncement: {
        from,
        to,
        passengers,
        carInfo,
        price,
        time: new Date(time),
      },
    }),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}
