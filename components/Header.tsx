import UserIcon from '~icons/fa/user.jsx';
import { BackButton } from '@/lib/components/telegram';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

type Props = {
  /** The URL to go to when clicking the back button */
  backUrl?: string;
};

export default function Header({ backUrl }: Props) {
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <>
      {backUrl ? (
        <BackButton onClick={() => router.replace(backUrl)} />
      ) : (
        <BackButton />
      )}
      <header className="flex justify-between p-4 font-bold">
        <Link href="/" className="text-tg-text">
          {t('title')}
        </Link>
        <Link href="/profile" className="text-tg-text">
          <UserIcon />
        </Link>
      </header>
    </>
  );
}
