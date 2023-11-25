'use client';
import useSWR from 'swr';
import type { RideRequestResult } from '@/lib/types/request';
import Request from '@/components/RideRequest';
import { useTranslation } from 'react-i18next';

export default function RidesList() {
  const { isLoading, error, data } =
    useSWR<RideRequestResult[]>('/api/requests');
  const { t } = useTranslation(['requests', 'common']);

  if (isLoading) {
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
    <section className="flex flex-col gap-2">
      {rides.map((ride) => (
        <Request key={ride.id} {...ride} />
      ))}
    </section>
  );
}
