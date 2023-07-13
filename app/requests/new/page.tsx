'use client';
import { createRideRequest } from '@/lib/api/rides';
import { BackButton, MainButton } from '@/lib/components/telegram';
import { tzIsoTimestamp } from '@/lib/date-utils';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';

interface Request {
  from: string;
  to: string;
  time: string;
  passengers: number;
}

export default function NewRequestPage() {
  const router = useRouter();

  const initialValues: Request = {
    from: '',
    to: '',
    // TODO: ceil it to nearest 15 - 30 mins
    time: tzIsoTimestamp(new Date()),
    passengers: 1,
  };

  function validate(values: Request) {
    const errors: Partial<Record<keyof Request, string>> = {};
    // TODO
    return errors;
  }

  async function submit(values: Request, helpers: FormikHelpers<Request>) {
    await createRideRequest(values);
    helpers.resetForm();
    router.back();
  }

  return (
    <main className="p-2">
      <BackButton />
      <h1 className="text-xl">Request a lift</h1>
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
              <span>Passengers:</span>
              <Field type="number" name="passengers" min={1} />
            </label>
            <p>
              Valid: {isValid.toString()} <br></br>
              submitting: {isSubmitting.toString()}
            </p>
            <MainButton
              text="Request"
              onClick={submitForm}
              disabled={!isValid || isSubmitting}
              progress={isSubmitting || isValidating}
            />
          </Form>
        )}
      </Formik>
    </main>
  );
}
