import UserIcon from '~icons/fa/user.jsx';
import { BackButton } from '@/lib/components/telegram';
import Link from 'next/link';

export default function Header() {
  return (
    <>
      <BackButton />
      <header className="flex justify-between p-4 font-bold">
        <Link href="/" className="text-tg-text">
          Hitch Rider
        </Link>
        <Link href="/profile" className="text-tg-text">
          <UserIcon />
        </Link>
      </header>
    </>
  );
}
