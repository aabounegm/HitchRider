'use client';
import { useParams } from 'next/navigation';
import { MainButton } from '@/lib/components/telegram';
import useSWR from 'swr';
import type { RideAnnouncementResult } from '@/lib/types/ride';
import Header from '@/components/Header';
import LocationDisplay from '@/components/LocationDisplay';
import { useRouter } from 'next/navigation';
// import { useTonConnectUI, useTonAddress } from '@tonconnect/ui-react';
import { useTranslation } from 'react-i18next';

export default function RidePage() {
  const params = useParams();
  const router = useRouter();
  // const [tonUi, setTonUiOptions] = useTonConnectUI();
  // const myAddress = useTonAddress();
  const { t } = useTranslation(['rides', 'common']);

  const { data, isLoading, error } = useSWR<RideAnnouncementResult>(
    '/api/rides/' + params.id
  );
  if (typeof window === 'undefined') {
    // Useless SSR
    return <p>{t('loading', { ns: 'common' })}</p>;
  }
  // const { userData } = useSWR<User>('/api/user');
  const { user } = window.Telegram.WebApp.initDataUnsafe;
  const { initData, showAlert, showConfirm, openTelegramLink } =
    window.Telegram.WebApp;

  if (isLoading) {
    return (
      <>
        <Header />
        <main>
          <p>{t('loading', { ns: 'common' })}</p>
        </main>
      </>
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

  const { id, from, to, time, passengers, price, carInfo, userChatId } = ride;

  async function confirmDeleting(confirmed: boolean) {
    if (!confirmed) return;
    const res = await fetch(
      `/api/rides/${id}?initData=${encodeURIComponent(initData)}`,
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

  async function contactDriver() {
    const res = await fetch('/api/user/' + userChatId);
    const { username } = await res.json();
    openTelegramLink('https://t.me/' + username);
  }

  /* async function payDriver() {
    if (!myAddress) {
      showAlert('You must connect a TON wallet in your profile first!');
      return;
    }
    const res = await fetch('/api/user/' + userChatId);
    const { tonAddress } = await res.json();
    tonUi.sendTransaction({
      messages: [
        {
          address: tonAddress,
          amount: (price * passengers).toString(),
        },
      ],
      // Valid for 5 minutes
      validUntil: new Date().valueOf() + 5 * 60 * 1000,
    });
  } */

  const chatID = user?.id;
  const classes = 'flex justify-between';
  return (
    <>
      <Header />
      <main className="p-4 flex flex-col gap-4">
        <div className="text-center font-medium border-b-4">
          {t('details.title')}
        </div>
        <div className="flex flex-col gap-4 px-4">
          <div className={classes}>
            <h3 className="font-bold">
              {t('from')}: <LocationDisplay coords={from.coords} />
            </h3>
            <p style={{ maxWidth: '75%', wordWrap: 'break-word' }}>
              {from.address}
            </p>
          </div>
          <div className={classes}>
            <h3 className="font-bold">
              {t('to')}: <LocationDisplay coords={to.coords} />
            </h3>
            <p style={{ maxWidth: '75%', wordWrap: 'break-word' }}>
              {to.address}
            </p>
          </div>
          <div className={classes}>
            <h3 className="font-bold">{t('available seats')}:</h3>
            <p>{passengers}</p>
          </div>
          <div className={classes}>
            <h3 className="font-bold">{t('details.price')}:</h3>
            <p>{price || t('details.free')}</p>
          </div>
          <div className={classes}>
            <h3 className="font-bold">{t('day')}:</h3>
            <p>{time.toLocaleDateString()}</p>
          </div>
          <div className={classes}>
            <h3 className="font-bold">{t('time')}:</h3>
            <p>{time.toLocaleTimeString(undefined, { timeStyle: 'short' })}</p>
          </div>
          <div className={classes}>
            <h3 className="font-bold">{t('details.car info')}:</h3>
            <p>{carInfo}</p>
          </div>
        </div>
        {/* {price > 0 && chatID !== userChatId ? (
          <button onClick={payDriver} className="rounded-lg p-2">
            Pay the driver
          </button>
        ) : (
          ''
        )} */}
        {/* recurrence && (
            <>
              <h3 className="font-bold">Recurrence:</h3>
              <p>{recurrence.type}</p>
            </>
          ) */}
        {chatID === userChatId ? (
          <MainButton
            text={t('details.delete button')}
            color="#ff0000"
            onClick={() => {
              showConfirm(t('details.confirm delete'), confirmDeleting);
            }}
          />
        ) : (
          <MainButton
            text={t('details.contact button')}
            onClick={contactDriver}
          />
        )}
      </main>
    </>
  );
}
