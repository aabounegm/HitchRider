'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import UserIcon from '~icons/fa/user.jsx';
import { MainButton } from '@/lib/components/telegram';
import AnnouncementsList from '@/components/AnnouncementsList';
import RequestsList from '@/components/RequestsList';

export default function Home() {
  const router = useRouter();

  return (
    <Tabs selectedTabClassName="text-tg-button border-b-2 border-tg-button rounded-sm">
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
          <AnnouncementsList />
          <MainButton
            text="Request a new lift"
            onClick={() => router.push('/requests/new')}
          />
        </TabPanel>
        <TabPanel>
          <RequestsList />
          <MainButton
            text="Add my upcoming ride"
            onClick={() => router.push('/rides/new')}
          />
        </TabPanel>
      </main>
    </Tabs>
  );
}
