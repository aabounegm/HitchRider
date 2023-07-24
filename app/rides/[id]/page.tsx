'use client';
import { useParams } from 'next/navigation';
import { MainButton } from '@/lib/components/telegram';
import useSWR from 'swr';
import type { RideAnnouncement } from '@prisma/client';
import Header from '@/components/Header';

export default function RidePage() {
  const params = useParams();
  const { data, isLoading, error } = useSWR<RideAnnouncement>(
    '/api/rides/' + params.id
  );
  if (typeof window === 'undefined') {
    return <p>Useless server render</p>;
  }
  // const { userData } = useSWR<User>('/api/user');
  const { user } = window.Telegram.WebApp.initDataUnsafe;

  if (isLoading) {
    return (
      <>
        <Header />
        <main>
          <p>Loading...</p>
        </main>
      </>
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

  const { from, to, time, passengers, carInfo, userChatId } = ride;
  const chatID = user?.id;
  const classes = 'flex justify-between';
  return (
    <>
      <Header />
      <main className="p-4 flex flex-col gap-8">
        <div className="text-center font-medium border-b-4">Ride Info</div>
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
            <h3 className="font-bold">Available Seats:</h3>
            <p>{passengers}</p>
          </div>
          {/* <h3 className="font-bold">Price per seat:</h3>
              <p>{price || 'Free'}</p> */}
          <div className={classes}>
            <h3 className="font-bold">Day:</h3>
            <p>{time.toLocaleDateString()}</p>
          </div>
          <div className={classes}>
            <h3 className="font-bold">Leaves at:</h3>
            <p>{time.toLocaleTimeString(undefined, { timeStyle: 'short' })}</p>
          </div>
          <div className={classes}>
            <h3 className="font-bold">Car Info:</h3>
            <p>{carInfo}</p>
          </div>
        </div>
        {/* recurrence && (
            <>
              <h3 className="font-bold">Recurrence:</h3>
              <p>{recurrence.type}</p>
            </>
          ) */}
        {chatID === userChatId ? (
          <MainButton
            text="Delete ride"
            color="#ff0000"
            onClick={() => {
              window.Telegram.WebApp.showConfirm(
                'Are you sure you want to delete this ride?'
              );
            }}
          />
        ) : (
          <MainButton text="Contact the driver" onClick={() => {}} />
        )}
      </main>
    </>
  );
}
