'use client';
import { useRouter } from 'next/navigation';
import NFT from '../public/NFT.jpg';
import Image from 'next/image';
import 'react-tabs/style/react-tabs.css';

export default function Home() {
  const router = useRouter();

  return (
    <body className="bg-tg-bg text-center pt-4 flex flex-col gap-8 text-tg-text ">
      <header className=" text-center font-bold">
        <h1>Hitch Rider</h1>
      </header>
      <main>
        <div className="flex flex-col mx-auto items-center gap-8 text-tg-text">
          <Image src={NFT} alt="Logo" className="rounded-full w-1/2 " />
          <div className="flex w-full flex-row justify-between px-16 pb-8">
            <button
              className="px-10 py-2 bg-tg-button border-2 rounded-lg"
              onClick={() => {
                router.push('/rides');
              }}
            >
              Rides
            </button>
            <button
              className="px-10 py-2 border-2 bg-tg-button rounded-lg"
              onClick={() => {
                router.push('/requests');
              }}
            >
              Requests
            </button>
          </div>
        </div>
        <div className="flex border-t-4 flex-col items-stretch text-lg h-screen bg-tg-secondary-bg">
          <button
            className=" p-2 px-16 border-b-2 text-left"
            onClick={() => {
              router.push('/profile');
            }}
          >
            My Profile
          </button>
          <button className="border-b-2 p-2 px-16 text-left">My Trips</button>
        </div>
      </main>
    </body>
  );
}
