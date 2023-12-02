'use client';
import { BackButton, MainButton } from '@/lib/components/telegram';
import LocationInput, { type Coords } from '@/components/LocationInput';
import { createRideAnnouncement } from '@/lib/api/rides';
import { hourCeil, tzIsoTimestamp } from '@/lib/date-utils';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { RideAnnouncementParams } from '@/lib/types/ride';
import { useEffect, useState } from 'react';
import { getCurrentLocation } from '@/lib/location';

export default function NewRidePage() {
  const router = useRouter();
  const { t } = useTranslation('rides', { keyPrefix: 'new' });
  const [currentLocation, setCurrentLocation] = useState<Coords>();

  useEffect(() => {
    getCurrentLocation()
      .then(setCurrentLocation)
      .catch((err: GeolocationPositionError) => {
        console.error(err);
        alert('Could not get your location. Error message: ' + err.message);
        // Just default to Innopolis
        setCurrentLocation([55.751759, 48.746181]);
      });
  }, []);

  if (!currentLocation) {
    return <p>Loading...</p>;
  }

  const initialValues: RideAnnouncementParams = {
    from: {
      coords: currentLocation,
      address: '',
    },
    to: {
      coords: currentLocation,
      address: '',
    },
    time: tzIsoTimestamp(hourCeil(new Date())),
    price: 0,
    passengers: 1,
    carInfo: '',
  };

  async function validate(values: RideAnnouncementParams) {
    const errors: Partial<Record<keyof RideAnnouncementParams, string>> = {};
    /* if (values.price) {
      const res = await fetch(
        '/api/user/' + window.Telegram.WebApp.initDataUnsafe.user?.id
      );
      const user = await res.json();
      if (user.tonAddress == null) {
        errors.price = t('wallet disconnected');
      }
    } */
    return errors;
  }

  async function submit(
    values: RideAnnouncementParams,
    helpers: FormikHelpers<RideAnnouncementParams>
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
              <LocationInput name="from" required />
            </label>
            {/* <ErrorMessage name="from" /> */}
            <label className="flex justify-between items-center w-full">
              <span>{t('to')}:</span>
              <LocationInput name="to" required />
            </label>
            <label className="flex justify-between items-center w-full">
              <span>{t('day-time')}:</span>
              <Field type="datetime-local" name="time"></Field>
            </label>
            <label className="flex justify-between items-center w-full">
              <span>{t('available seats')}:</span>
              <Field type="number" name="passengers" min={1} />
            </label>
            {/* <label className="flex justify-between items-center w-full">
              <span style={{ whiteSpace: 'pre-line' }}>{t('price')}</span>
              <Field type="number" name="price" min={0} />
            </label> */}
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
