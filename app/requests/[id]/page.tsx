'use client';
import { useParams } from 'next/navigation';
import { MainButton } from '@/lib/components/telegram';
import useSWR from 'swr';
import type { RideRequest } from '@prisma/client';
import Header from '@/components/Header';

export default function RideRequestPage() {
  const params = useParams();
  const { data, isLoading, error } = useSWR<RideRequest>(
    '/api/requests/' + params.id
  );

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
        <p>An error occurred: {error.message}</p>
      </main>
    );
  }

  if (data === undefined) {
    return (
      <main>
        <p>An unknown error occurred</p>
      </main>
    );
  }

  const ride = {
    ...data,
    time: new Date(data.time),
    userChatId: Number(data.userChatId),
  };

  const { from, to, time, passengers, userChatId } = ride;
  const { user } = window.Telegram.WebApp.initDataUnsafe;
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
              window.Telegram.WebApp.showConfirm(
                'Are you sure you want to delete this request?'
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
