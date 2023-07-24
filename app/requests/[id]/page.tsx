'use client';
import { useParams } from 'next/navigation';
import { MainButton } from '@/lib/components/telegram';
import useSWR from 'swr';
import type { RideRequest } from '@prisma/client';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';

export default function RideRequestPage() {
  const params = useParams();
  const router = useRouter();
  const { data, isLoading, error } = useSWR<RideRequest>(
    '/api/requests/' + params.id
  );
  if (typeof window === 'undefined') {
    // Useless SSR
    return <p>Loading...</p>;
  }
  const { user } = window.Telegram.WebApp.initDataUnsafe;
  const { initData, showAlert, showConfirm } = window.Telegram.WebApp;

  if (isLoading) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <Header />
        <p>An error occurred: {error.message}</p>
      </main>
    );
  }

  if (data === undefined) {
    return (
      <main>
        <Header />
        <p>An unknown error occurred</p>
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
      showAlert(`Failed to delete ride: ${err.message}`);
      return;
    }
    router.back();
  }

  const chatID = user?.id;

  const classes = 'flex justify-between';
  return (
    <>
      <Header />
      <main className="p-4 flex flex-col gap-8">
        <div className="text-center font-medium border-b-4">Request Info</div>
        <div className="flex flex-col gap-4 px-4">
          <div className={classes}>
            <h3 className="font-bold">From:</h3>
            <p>{from}</p>
          </div>
          <div className={classes}>
            <h3 className="font-bold">To:</h3>
            <p>{to}</p>
          </div>
          <div className={classes}>
            <h3 className="font-bold">Required Seats:</h3>
            <p>{passengers}</p>
          </div>
          <div className={classes}>
            <h3 className="font-bold">Day:</h3>
            <p>{time.toLocaleDateString()}</p>
          </div>
          <div className={classes}>
            <h3 className="font-bold">Leaves at:</h3>
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
            text="Delete request"
            color="#ff0000"
            onClick={() => {
              showConfirm(
                'Are you sure you want to delete this request?',
                confirmDeleting
              );
            }}
          />
        ) : (
          <MainButton text="Contact the hitchhiker" onClick={() => {}} />
        )}
      </main>
    </>
  );
}
