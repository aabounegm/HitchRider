'use client';
import { useTranslation } from 'react-i18next';

export default function UserProfile() {
  const { t } = useTranslation(['profile', 'common']);

  const classes = 'w-full border-2 rounded-xl p-2 px-4 font-normal bg-tg-bg';
  if (typeof window === 'undefined') {
    // Useless SSR
    return <p>{t('loading', { ns: 'common' })}</p>;
  }
  // const { userData } = useSWR<User>('/api/user');
  const { user } = window.Telegram.WebApp.initDataUnsafe;

  return (
    // <Link href={`/users/${chatID}/profile`}>
    <div className="flex flex-col items-center gap-8 pt-6 mx-8 ">
      <div className="flex flex-col items-center w-full gap-8 bg-tg-bg p-8 rounded-xl border-2 border-grey-400">
        <h1 className="font-semibold">{t('title')}</h1>
        <img
          src="https://randomuser.me/api/portraits/lego/1.jpg"
          alt="Logo"
          className="rounded-full w-1/2 mx-auto"
        />
        <div className="flex flex-row justify-evenly w-full">
          <div className="flex flex-col gap-2 items-center">
            <h1 className="font-bold text-sm">{t('rides')}</h1>
            <p className="text-sm">200</p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <h1 className="font-bold text-sm">{t('announcements')}</h1>
            <p className="text-sm">50</p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <h1 className="font-bold text-sm">{t('requests')}</h1>
            <p className="text-sm">10</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-full gap-8 py-8 rounded-xl">
        <div className="flex items-center gap-2 w-full font-semibold">
          <div className="w-36">{t('name')}: </div>
          <div className={classes}>
            {(user?.first_name ?? '') + ' ' + (user?.last_name ?? '')}
          </div>
        </div>
        <div className="flex items-center gap-2 w-full font-semibold">
          <div className="w-36">{t('username')}:</div>
          <div className={classes}>@{user?.username ?? ''}</div>
        </div>
        <div className="flex items-center gap-2 w-full font-semibold">
          <div className="w-36">{t('car info')}:</div>
          <div className={classes}>TODO</div>
        </div>
      </div>
    </div>
    // </Link>
  );
}
