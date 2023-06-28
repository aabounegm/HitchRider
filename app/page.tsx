'use client';
import Link from 'next/link';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import UserIcon from '~icons/fa/user.jsx';
import classes from './page.module.css';
import { useEffect, useState } from 'react';
import Ride from '@/components/Ride';
import { sampleRides } from '@/lib/types/ride';

export default function Home() {
  // TODO: use driver's profile mode to set the initial tab index
  const [tabIndex, setTabIndex] = useState(0);

  const updateSelectedTab = (index: number) => {
    const { MainButton } = window.Telegram.WebApp;
    if (index === 0) {
      // List of rides
      MainButton.setText('Add a new ride');
    } else if (index === 1) {
      // List of requests
      MainButton.setText('Request a new ride');
    }
    MainButton.enable();
    MainButton.show();
    setTabIndex(index);
  };
  useEffect(() => updateSelectedTab(tabIndex), []);

  return (
    <Tabs
      selectedTabClassName={classes.active}
      selectedIndex={tabIndex}
      onSelect={updateSelectedTab}
    >
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
            {sampleRides.map((ride) => (
              <Ride key={ride.id} {...ride} />
            ))}
          </section>
        </TabPanel>
        <TabPanel>
          <h2>List of requests</h2>
        </TabPanel>
      </main>
    </Tabs>
  );
}
