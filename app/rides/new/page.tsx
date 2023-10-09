'use client';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import type { NextRequest } from 'next/server';
import { BackButton, MainButton } from '@/lib/components/telegram';
import { createRideAnnouncement } from '@/lib/api/rides';
import { hourCeil, tzIsoTimestamp } from '@/lib/date-utils';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

interface Announcement {
  from: string;
  to: string;
  time: string;
  price: number;
  passengers?: number;
  carInfo?: string;
}

type Geo = NextRequest['geo'];

export const getServerSideProps = (async ({ query, req }) => {
  return { props: { geo: JSON.parse(query.geo as string) as Geo } };
}) satisfies GetServerSideProps<{
  geo: Geo;
}>;

export default function NewRidePage({
  geo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log('Geo info:', geo);
  const { city, region, country, latitude, longitude } = geo ?? {};
  const name = [city, region, country].filter((s) => !!s).join(', ');
  const router = useRouter();
  const { t } = useTranslation('rides', { keyPrefix: 'new' });

  const initialValues: Announcement = {
    from: '',
    to: '',
    time: tzIsoTimestamp(hourCeil(new Date())),
    price: 0,
    passengers: 1,
    carInfo: '',
  };

  async function validate(values: Announcement) {
    const errors: Partial<Record<keyof Announcement, string>> = {};
    if (values.price) {
      const res = await fetch(
        '/api/user/' + window.Telegram.WebApp.initDataUnsafe.user?.id
      );
      const user = await res.json();
      if (user.tonAddress == null) {
        errors.price = t('wallet disconnected');
      }
    }
    return errors;
  }

  async function submit(
    values: Announcement,
    helpers: FormikHelpers<Announcement>
  ) {
    const ride = await createRideAnnouncement(values);
    helpers.resetForm();
    router.push(`/rides/${ride.id}`);
  }

  return (
    <main className="p-2">
      <BackButton />
      <h1 className="text-xl">{t('title')}</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={submit}
        validate={validate}
      >
        {({ isSubmitting, isValid, isValidating, submitForm }) => (
          <Form className="flex flex-col gap-3 mt-3">
            <label className="flex justify-between items-center w-full">
              <span>{t('from')}:</span>
              <Field type="text" name="from" required minLength="3"></Field>
            </label>
            {/* <ErrorMessage name="from" /> */}
            <label className="flex justify-between items-center w-full">
              <span>{t('to')}:</span>
              <Field type="text" name="to" required></Field>
            </label>
            <label className="flex justify-between items-center w-full">
              <span>{t('day-time')}:</span>
              <Field type="datetime-local" name="time"></Field>
            </label>
            <label className="flex justify-between items-center w-full">
              <span>{t('available seats')}:</span>
              <Field type="number" name="passengers" min={1} />
            </label>
            <label className="flex justify-between items-center w-full">
              <span style={{ whiteSpace: 'pre-line' }}>{t('price')}</span>
              <Field type="number" name="price" min={0} />
            </label>
            <ErrorMessage name="price">
              {(msg: string) => <p className="text-red-500">{msg}</p>}
            </ErrorMessage>
            <label className="flex justify-between items-center w-full">
              <span>{t('car info')}:</span>
              <Field type="text" name="carInfo" />
            </label>
            <MainButton
              text={t('announce button')}
              onClick={submitForm}
              disabled={!isValid || isValidating || isSubmitting}
              progress={isSubmitting || isValidating}
            />
          </Form>
        )}
      </Formik>
    </main>
  );
}
