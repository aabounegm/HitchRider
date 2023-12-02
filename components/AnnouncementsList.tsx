'use client';
import useSWR from 'swr';
import type { RideAnnouncementResult } from '@/lib/types/ride';
import Ride from '@/components/RideAnnouncement';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import type { Coords } from './LocationInput';
import { getCurrentLocation } from '@/lib/location';

export default function RidesList() {
  const { t } = useTranslation(['rides', 'common']);
  const [myLocation, setMyLocation] = useState<Coords>();

  useEffect(() => {
    getCurrentLocation().then(setMyLocation);
  }, []);

  // TODO: make inputs for filtering "from" and "to" locations
  const [lat, lng] = myLocation ?? [0, 0];
  const page = 1;
  const limit = 20;
  const params = new URLSearchParams({
    from_lat: lat.toString(),
    from_lng: lng.toString(),
    page: page.toString(),
    limit: limit.toString(),
  });

  const { isLoading, error, data } = useSWR<RideAnnouncementResult[]>(
    myLocation ? '/api/rides?' + params.toString() : null
  );

  if (isLoading || myLocation === undefined) {
    return <p>{t('loading', { ns: 'common' })}</p>;
  }
  if (error) {
    return (
      <p>
        {t('error', { ns: 'common' })}: {error.message}
      </p>
    );
  }
  if (data === undefined) {
    return <p>{t('unknown error', { ns: 'common' })}</p>;
  }
  if (data.length === 0) {
    return <p>{t('no rides')}</p>;
  }
  const rides = data.map((ride) => ({
    ...ride,
    time: new Date(ride.time),
  }));

  return (
    <>
      <section className="flex flex-col gap-2">
        {rides.map((ride) => (
          <Ride key={ride.id} {...ride} />
        ))}
      </section>
      <footer className="text-center mt-6">
        Showing results {(page - 1) * limit + 1}-
        {(page - 1) * limit + data.length} of {data[0].totalCount}
      </footer>
    </>
  );
}
