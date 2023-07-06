'use client';
import Link from 'next/link';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import UserIcon from '~icons/fa/user.jsx';
import classes from './page.module.css';
import { useEffect, useState } from 'react';
import Ride from '@/components/Ride';
import { listRides } from '@/lib/api/rides';
import type { Ride as RideType } from '@/lib/api/rides';
import { MainButton } from '@twa-dev/sdk/react';

export default function Home() {
  const [rides, setRides] = useState<RideType[]>([]);

  useEffect(() => {
    listRides().then(setRides);
  }, []);

  return (
    <Tabs selectedTabClassName={classes.active}>
      <header>
        <div className="flex justify-between p-2">
          <h1>HitchRider</h1>
          <Link href="/profile">
            <UserIcon />
          </Link>
        </div>
        <nav>
          <TabList className="flex">
            <Tab className="flex-grow text-center p-2">Rides</Tab>
            <Tab className="flex-grow text-center p-2">Requests</Tab>
          </TabList>
        </nav>
      </header>

      <main className="p-2">
        <TabPanel>
          <section className="flex flex-col gap-2">
            {rides.map((ride) => (
              <Ride key={ride.id} {...ride} />
            ))}
          </section>
          <MainButton
            text="Add a new ride"
            onClick={() => alert('submitted')}
          />
        </TabPanel>
        <TabPanel>
          <h2>List of requests</h2>
          <MainButton
            text="Add a new request"
            onClick={() => alert('submitted')}
          />
        </TabPanel>
      </main>
    </Tabs>
  );
}
