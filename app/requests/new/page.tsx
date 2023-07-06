'use client';
import { BackButton } from '@twa-dev/sdk/react';

export default function NewRidePage() {
  return (
    <main className="p-2">
      <BackButton />
      <h1 className="text-xl">Request a lift</h1>
      <form className="flex flex-col gap-3 mt-3">
        <label className="flex justify-between items-center w-full">
          <span>From:</span>
          <input type="text" />
        </label>
        <label className="flex justify-between items-center w-full">
          <span>To:</span>
          <input type="text" />
        </label>
        <label className="flex justify-between items-center w-full">
          <span>Date/time:</span>
          <input type="datetime-local" />
        </label>
        <label className="flex justify-between items-center w-full">
          <span>Passengers:</span>
          <input type="number" value={1} />
        </label>
      </form>
    </main>
  );
}
