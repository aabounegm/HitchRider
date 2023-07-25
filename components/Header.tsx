import UserIcon from '~icons/fa/user.jsx';
import { BackButton } from '@/lib/components/telegram';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Props = {
  /** The URL to go to when clicking the back button */
  backUrl?: string;
};

export default function Header({ backUrl }: Props) {
  const router = useRouter();
  return (
    <>
      {backUrl ? (
        <BackButton onClick={() => router.replace(backUrl)} />
      ) : (
        <BackButton />
      )}
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
