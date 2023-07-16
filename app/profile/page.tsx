'use client';
import { BackButton } from '@/lib/components/telegram';

export default function Profile() {
  return (
    <main className="bg-white dark:bg-slate-500 dark:text-white h-screen flex flex-col pt-4 w-full">
      <div className="flex justify-center">
        <BackButton />
        <h1 className="font-medium">Hitch Rider</h1>
      </div>
      <div className="flex flex-col items-center justify-start  tg-bg gradient-radial h-full gap-8 pt-6 mx-8">
        <div className="flex flex-col items-center w-full gap-16 bg-slate-800 p-8 rounded-xl">
          <h1 className="font-semibold">My Profile</h1>
          <div className="flex flex-row justify-around w-full ">
            <div className="flex flex-col gap-2 items-center">
              <h1 className="font-bold text-sm">Rides</h1>
              <p className="text-sm dark:text-slate-300">200</p>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <h1 className="font-bold text-sm">Announcments</h1>
              <p className="text-sm dark:text-slate-300">50</p>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <h1 className="font-bold text-sm">Requests</h1>
              <p className="text-sm text-slate-300">10</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center w-full gap-8  py-8 rounded-xl">
          <div className="w-full dark:bg-slate-700 rounded-xl p-2 px-4 tg-text  font-bold">
            {'Name'}
          </div>
          <div className="w-full dark:bg-slate-700  rounded-xl p-2 px-4 tg-text font-bold">
            {'Phone Number'}
          </div>
          <div className="w-full dark:bg-slate-700 rounded-xl p-2 px-4 tg-text font-bold">
            {'Gender'}
          </div>
        </div>
      </div>
    </main>
  );
}
