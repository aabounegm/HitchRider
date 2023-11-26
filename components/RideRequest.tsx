import { RideRequestResult } from '@/lib/types/request';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function Ride({
  id,
  from,
  to,
  time,
  // price,
  // recurrence,
  passengers,
}: RideRequestResult) {
  const { t } = useTranslation('requests');

  return (
    <Link
      href={`/requests/${id}`}
      className="grid grid-cols-2 p-3 rounded-lg border border-gray-200 shadow bg-tg-bg text-tg-text"
    >
      <h3 className="font-bold">{t('from')}:</h3>
      <p style={{ overflowX: 'hidden', textOverflow: 'ellipsis' }}>
        {from.address}
      </p>
      <h3 className="font-bold">{t('to')}:</h3>
      <p style={{ overflowX: 'hidden', textOverflow: 'ellipsis' }}>
        {to.address}
      </p>
      <h3 className="font-bold">{t('needed seats')}:</h3>
      <p>{passengers}</p>
      {/* <h3 className="font-bold">Price per seat:</h3>
      <p>{price}</p> */}
      <h3 className="font-bold">{t('day')}:</h3>
      <p>{time.toLocaleDateString()}</p>
      <h3 className="font-bold">{t('time')}:</h3>
      <p>{time.toLocaleTimeString(undefined, { timeStyle: 'short' })}</p>
      {/* recurrence && (
        <>
          <h3 className="font-bold">Recurrence:</h3>
          <p>{recurrence.type}</p>
        </>
      ) */}
    </Link>
  );
}
