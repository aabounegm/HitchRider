'use client';
import NFT from '@/public/NFT.jpg';
import Image from 'next/image';

export default function UserProfile() {
  const classes = 'w-full border-2 rounded-xl p-2 px-4 font-normal bg-tg-bg';

  const { user } = window?.Telegram.WebApp.initDataUnsafe;

  return (
    // <Link href={`/users/${chatID}/profile`}>
    <div className="flex flex-col items-center gap-8 pt-6 mx-8 ">
      <div className="flex flex-col items-center w-full gap-8 bg-tg-bg p-8 rounded-xl border-2 border-grey-400">
        <h1 className="font-semibold">My Profile</h1>
        <Image src={NFT} alt="Logo" className="rounded-full w-1/2 mx-auto" />
        <div className="flex flex-row justify-evenly w-full ">
          <div className="flex flex-col gap-2 items-center">
            <h1 className="font-bold text-sm">Rides</h1>
            <p className="text-sm ">200</p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <h1 className="font-bold text-sm">Announcments</h1>
            <p className="text-sm ">50</p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <h1 className="font-bold text-sm">Requests</h1>
            <p className="text-sm ">10</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-full gap-8  py-8 rounded-xl">
        <div className="flex items-center gap-2 w-full font-semibold">
          <div className="w-36">Name: </div>
          <div className={classes}>{user?.first_name ?? ''}</div>
        </div>
        <div className="flex items-center gap-2 w-full font-semibold">
          <div className="w-36">Username:</div>
          <div className={classes}>@{user?.username ?? ''}</div>
        </div>
        <div className="flex items-center gap-2 w-full font-semibold">
          <div className="w-36">{'Car Info : '}</div>
          <div className={classes}> {'CarInfo'}</div>
        </div>
      </div>
    </div>
    // </Link>
  );
}
