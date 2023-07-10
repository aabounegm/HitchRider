'use client';
import { BackButton, MainButton } from '@/lib/components/telegram';
import { Formik, Form, Field, ErrorMessage } from 'formik';

interface Request {
  from: string;
  to: string;
  time: string;
  passengers: number;
}

export default function NewRequestPage() {
  const initialValues: Request = {
    from: '',
    to: '',
    // TODO: fix timezone (this uses UTC, not current timezone)
    time: new Date().toISOString().split('.')[0],
    passengers: 1,
  };

  function validate(values: Request) {
    const errors: Partial<Record<keyof Request, string>> = {};
    // TODO
    return errors;
  }

  return (
    <main className="p-2">
      <BackButton />
      <h1 className="text-xl">Request a lift</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
        }}
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
              disabled={true}
              progress={isSubmitting || isValidating}
            />
          </Form>
        )}
      </Formik>
    </main>
  );
}
