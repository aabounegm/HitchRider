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
  price: number;
  passengers?: number;
  carInfo?: string;
}

export default function NewRidePage() {
  const router = useRouter();

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
        errors.price =
          'You must connect a TON wallet in your profile before accepting payment!';
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
              <span>
                Price per seat
                <br />
                (in nanoTONs):
              </span>
              <Field type="number" name="price" min={0} />
            </label>
            <ErrorMessage name="price">
              {(msg: string) => <p className="text-red-500">{msg}</p>}
            </ErrorMessage>
            <label className="flex justify-between items-center w-full">
              <span>Car info:</span>
              <Field type="text" name="carInfo" />
            </label>
            <MainButton
              text="Announce"
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
