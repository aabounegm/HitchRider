'use client';
import { BackButton } from '@twa-dev/sdk/react';

export default function NewRidePage() {
  return (
    <main className="p-2">
      <BackButton />
      <h1 className="text-xl">Add a new ride</h1>
    </main>
  );
}
