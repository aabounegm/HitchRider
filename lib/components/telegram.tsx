import dynamic from 'next/dynamic';

export const MainButton = dynamic(
  async () => (await import('@twa-dev/sdk/react')).MainButton,
  { ssr: false }
);

export const BackButton = dynamic(
  async () => (await import('@twa-dev/sdk/react')).BackButton,
  { ssr: false }
);

export const TonConnectButton = dynamic(
  async () => (await import('@tonconnect/ui-react')).TonConnectButton,
  { ssr: false }
);
