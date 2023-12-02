'use client';
import useSWR from 'swr';
import type { RideRequestResult } from '@/lib/types/request';
import Request from '@/components/RideRequest';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { getCurrentLocation } from '@/lib/location';
import type { Coords } from './LocationInput';

export default function RidesList() {
  const { t } = useTranslation(['requests', 'common']);
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
  const { isLoading, error, data } = useSWR<RideRequestResult[]>(
    myLocation ? '/api/requests?' + params.toString() : null
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
    return <p>{t('no requests')}</p>;
  }
  const rides = data.map((ride) => ({
    ...ride,
    time: new Date(ride.time),
  }));

  return (
    <>
      <section className="flex flex-col gap-2">
        {rides.map((ride) => (
          <Request key={ride.id} {...ride} />
        ))}
      </section>
      <footer className="text-center mt-6">
        Showing results {(page - 1) * limit + 1}-
        {(page - 1) * limit + data.length} of {data[0].totalCount}
      </footer>
    </>
  );
}
