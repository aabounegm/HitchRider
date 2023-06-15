'use client';
import Link from 'next/link';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import UserIcon from '~icons/fa/user.jsx';
import classes from './page.module.css';

export default function Home() {
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

      <main className="p-3">
        <TabPanel>
          <h2>List of rides</h2>
        </TabPanel>
        <TabPanel>
          <h2>List of requests</h2>
        </TabPanel>
      </main>
    </Tabs>
  );
}
