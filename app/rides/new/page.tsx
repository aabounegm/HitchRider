'use client';
import { BackButton, MainButton } from '@/lib/components/telegram';
import { createRideAnnouncement } from '@/lib/api/rides';
import { hourCeil, tzIsoTimestamp } from '@/lib/date-utils';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';

interface Announcement {
  from: string;
  to: string;
  time: string;
  passengers?: number;
  carInfo?: string;
}

export default function NewRidePage() {
  const router = useRouter();

  const initialValues: Announcement = {
    from: '',
    to: '',
    time: tzIsoTimestamp(hourCeil(new Date())),
    passengers: 1,
    carInfo: '',
  };

  function validate(values: Announcement) {
    const errors: Partial<Record<keyof Announcement, string>> = {};
    // TODO
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
      <h1 className="text-xl">Announce a ride</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={submit}
        validate={validate}
      >
        {({ isSubmitting, isValid, isValidating, submitForm }) => (
          <Form className="flex flex-col gap-3 mt-3">
            <label className="flex justify-between items-center w-full">
              <span>From:</span>
              <Field type="text" name="from" required minLength="3"></Field>
            </label>
            {/* <ErrorMessage name="from" /> */}
            <label className="flex justify-between items-center w-full">
              <span>To:</span>
              <Field type="text" name="to" required></Field>
            </label>
            <label className="flex justify-between items-center w-full">
              <span>Date/time:</span>
              <Field type="datetime-local" name="time"></Field>
            </label>
            <label className="flex justify-between items-center w-full">
              <span>Available seats:</span>
              <Field type="number" name="passengers" min={1} />
            </label>
            <label className="flex justify-between items-center w-full">
              <span>Car info:</span>
              <Field type="text" name="carInfo" />
            </label>
            <MainButton
              text="Announce"
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
