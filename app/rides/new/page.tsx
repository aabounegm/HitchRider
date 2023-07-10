'use client';
import { BackButton } from '@/lib/components/telegram';

export default function NewRidePage() {
  return (
    <main className="p-2">
      <BackButton />
      <h1 className="text-xl">Add a new ride</h1>
    </main>
  );
}
