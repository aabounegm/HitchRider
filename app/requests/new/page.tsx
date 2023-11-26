'use client';
import LocationInput from '@/components/LocationInput';
import { createRideRequest } from '@/lib/api/rides';
import { BackButton, MainButton } from '@/lib/components/telegram';
import { tzIsoTimestamp, hourCeil } from '@/lib/date-utils';
import { RideRequestParams } from '@/lib/types/request';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function NewRequestPage() {
  const router = useRouter();
  const { t } = useTranslation('requests', { keyPrefix: 'new' });

  const initialValues: RideRequestParams = {
    from: {
      address: '',
      // TODO: use current location
      coords: [55.751759, 48.746181],
    },
    to: {
      address: '',
      // TODO: use current location
      coords: [55.751759, 48.746181],
    },
    time: tzIsoTimestamp(hourCeil(new Date())),
    passengers: 1,
  };

  function validate(values: RideRequestParams) {
    const errors: Partial<Record<keyof Request, string>> = {};
    // TODO
    return errors;
  }

  async function submit(
    values: RideRequestParams,
    helpers: FormikHelpers<RideRequestParams>
  ) {
    const request = await createRideRequest(values);
    helpers.resetForm();
    router.push(`/requests/${request.id}`);
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
            <MainButton
              text={t('submit button')}
              onClick={submitForm}
              disabled={!isValid || isSubmitting}
              progress={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </main>
  );
}
