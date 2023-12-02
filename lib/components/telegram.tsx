import dynamic from 'next/dynamic';

export const MainButton = dynamic(
  async () => (await import('@twa-dev/sdk/dist/react')).MainButton,
  { ssr: false }
);

export const BackButton = dynamic(
  async () => (await import('@twa-dev/sdk/dist/react')).BackButton,
  { ssr: false }
);
