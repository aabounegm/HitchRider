'use client';
import { useParams } from 'next/navigation';
import { MainButton } from '@/lib/components/telegram';
import useSWR from 'swr';
import type { RideRequestResult } from '@/lib/types/request';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function RideRequestPage() {
  const params = useParams();
  const router = useRouter();
  const { data, isLoading, error } = useSWR<RideRequestResult>(
    '/api/requests/' + params.id
  );
  const { t } = useTranslation(['requests', 'common']);

  if (typeof window === 'undefined') {
    // Useless SSR
    return <p>{t('loading', { ns: 'common' })}</p>;
  }
  const { user } = window.Telegram.WebApp.initDataUnsafe;
  const { initData, showAlert, showConfirm, openTelegramLink } =
    window.Telegram.WebApp;

  if (isLoading) {
    return (
      <main>
        <p>{t('loading', { ns: 'common' })}</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <Header />
        <p>
          {t('error', { ns: 'common' })}: {error.message}
        </p>
      </main>
    );
  }

  if (data === undefined) {
    return (
      <main>
        <Header />
        <p>{t('unknown error', { ns: 'common' })}</p>
      </main>
    );
  }

  const ride = {
    ...data,
    time: new Date(data.time),
    userChatId: Number(data.userChatId),
  };

  const { id, from, to, time, passengers, userChatId } = ride;
  async function confirmDeleting(confirmed: boolean) {
    if (!confirmed) return;
    const res = await fetch(
      `/api/requests/${id}?initData=${encodeURIComponent(initData)}`,
      {
        method: 'DELETE',
      }
    );
    if (!res.ok) {
      const err = await res.json();
      showAlert(`${t('details.delete failed')}: ${err.message}`);
      return;
    }
    router.back();
  }

  async function contactRider() {
    const res = await fetch('/api/user/' + userChatId);
    const { username } = await res.json();
    openTelegramLink('https://t.me/' + username);
  }

  const chatID = user?.id;

  const classes = 'flex justify-between';
  return (
    <>
      <Header />
      <main className="p-4 flex flex-col gap-8">
        <div className="text-center font-medium border-b-4">
          {t('details.title')}
        </div>
        <div className="flex flex-col gap-4 px-4">
          <div className={classes}>
            <h3 className="font-bold">{t('from')}:</h3>
            <p style={{ maxWidth: '75%', wordWrap: 'break-word' }}>
              {from.address}
            </p>
          </div>
          <div className={classes}>
            <h3 className="font-bold">{t('to')}:</h3>
            <p style={{ maxWidth: '75%', wordWrap: 'break-word' }}>
              {to.address}
            </p>
          </div>
          <div className={classes}>
            <h3 className="font-bold">{t('needed seats')}:</h3>
            <p>{passengers}</p>
          </div>
          <div className={classes}>
            <h3 className="font-bold">{t('day')}:</h3>
            <p>{time.toLocaleDateString()}</p>
          </div>
          <div className={classes}>
            <h3 className="font-bold">{t('time')}:</h3>
            <p>{time.toLocaleTimeString(undefined, { timeStyle: 'short' })}</p>
          </div>
          {/* recurrence && (
            <>
              <h3 className="font-bold">Recurrence:</h3>
              <p>{recurrence.type}</p>
            </>
            ) */}
        </div>
        {chatID === userChatId ? (
          <MainButton
            text={t('details.delete button')}
            color="#ff0000"
            onClick={() => {
              showConfirm(t('details.delete confirmation'), confirmDeleting);
            }}
          />
        ) : (
          <MainButton
            text={t('details.contact button')}
            onClick={contactRider}
          />
        )}
      </main>
    </>
  );
}
