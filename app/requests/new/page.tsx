'use client';
import MapModal from '@/components/MapModal';
import { createRideRequest } from '@/lib/api/rides';
import { BackButton, MainButton } from '@/lib/components/telegram';
import { tzIsoTimestamp, hourCeil } from '@/lib/date-utils';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import type { NextRequest } from 'next/server';
import type { Coords } from '@/components/Map';

type Geo = NextRequest['geo'];

interface Request {
  from: string;
  to: string;
  time: string;
  passengers: number;
}

export default function NewRequestPage() {
  const router = useRouter();
  const { t } = useTranslation('requests', { keyPrefix: 'new' });

  const [open, setOpen] = React.useState(false);
  const [coords, setCoords] = useState<Coords>({ lat: 10, lng: 106 });
  const handleOpen = () => setOpen(true);
  const handleClose = (coords: Coords) => {
    setCoords(coords);
    setOpen(false);
  };

  const initialValues: Request = {
    from: '',
    to: '',
    time: tzIsoTimestamp(hourCeil(new Date())),
    passengers: 1,
  };

  function validate(values: Request) {
    const errors: Partial<Record<keyof Request, string>> = {};
    // TODO
    return errors;
  }

  async function submit(values: Request, helpers: FormikHelpers<Request>) {
    const request = await createRideRequest(values);
    helpers.resetForm();
    router.push(`/requests/${request.id}`);
  }

  useEffect(() => {}, []);

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
              <div>
                <Button onClick={handleOpen}>From map</Button>
              </div>
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
            <MainButton
              text={t('submit button')}
              onClick={submitForm}
              disabled={!isValid || isSubmitting}
              progress={isSubmitting}
            />
          </Form>
        )}
      </Formik>
      <div className="m-5">
        <MapModal open={open} handleClose={handleClose} />
      </div>
    </main>
  );
}
