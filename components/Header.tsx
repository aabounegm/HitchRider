import UserIcon from '~icons/fa/user.jsx';
import { BackButton } from '@/lib/components/telegram';
import { useRouter } from 'next/navigation';
export default function Header() {
  const router = useRouter();
  return (
    <>
      <BackButton />
      <header className="flex justify-between p-4 font-bold">
        <h1
          onClick={() => {
            router.push('/');
          }}
        >
          Hitch Rider
        </h1>
        <UserIcon
          onClick={() => {
            router.push('/profile');
          }}
        />
      </header>
    </>
  );
}
