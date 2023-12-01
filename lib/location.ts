import type { Coords } from '@/components/LocationInput';

export function getCurrentLocation() {
  return new Promise<Coords>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve([coords.latitude, coords.longitude]);
      },
      reject,
      {
        maximumAge: 0,
        timeout: 5000,
        enableHighAccuracy: true,
      }
    );
  });
}
