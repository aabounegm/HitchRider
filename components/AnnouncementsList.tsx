'use client';
import useSWR from 'swr';
import type { RideAnnouncementResult } from '@/lib/types/ride';
import Ride from '@/components/RideAnnouncement';
import { useTranslation } from 'react-i18next';

export default function RidesList() {
  const { isLoading, error, data } =
    useSWR<RideAnnouncementResult[]>('/api/rides');
  const { t } = useTranslation(['rides', 'common']);

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
    return <p>{t('no rides')}</p>;
  }
  const rides = data.map((ride) => ({
    ...ride,
    time: new Date(ride.time),
  }));

  return (
    <section className="flex flex-col gap-2">
      {rides.map((ride) => (
        <Ride key={ride.id} {...ride} />
      ))}
    </section>
  );
}
