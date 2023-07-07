import { Form, Link, useActionData, useSearchParams } from '@remix-run/react';
import { DataFunctionArgs, MetaFunction, json, redirect } from '@remix-run/server-runtime';
import { XCircleIcon } from '@heroicons/react/24/solid';
import {
  extractRegistrationFormValues,
  RegisterValidationErrors,
  validateRegistrationForm,
} from '~/utils/registration-helper';
import { Card, Container, FormGroup } from 'react-bootstrap';
import { ContactUsValidationErrors, extractContactUsFormValues, validateContactUsForm } from '~/utils/contactus-helper';
import { contactUs } from '~/providers/contactus/contactus';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { APP_META_TITLE } from '~/constants';

export async function action({ params, request }: DataFunctionArgs) {
  const body = await request.formData();
  const fieldErrors = validateContactUsForm(body);
  if (Object.keys(fieldErrors).length !== 0) {
    return fieldErrors;
  }
  const variables = extractContactUsFormValues(body);
  const result = await contactUs({ request }, variables);
  if (result.__typename === 'ContactUs') {
    return redirect('/contactus/success');
  } else {
    const formError: RegisterValidationErrors = {
      form: result.errorCode,
    };
    return json(formError, { status: 401 });
  }
}

export const meta: MetaFunction = () => {
  return {
      title: `Contact Us - ${APP_META_TITLE}`
  };
};


export default function ContactUs() {
  const formErrors = useActionData<ContactUsValidationErrors>();

  return (

    <Container className='contact-form-section mt-5 mb-150'>
      <Card style={{maxWidth:'600px'}} className='shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light'>
        <Card.Header className='bg-transparent border-0 text-center text-uppercase'> <h2>Contact Us</h2></Card.Header>
        <Card.Body>
          <div className="form-title">
            <p className='text-center'>
              Let's get this conversation started. Tell us your Email and we'll get in touch as soon as possible.
            </p>
            <Form method="post" action="/contactus">
              <FormGroup>
                <label
                  htmlFor="email"
                  className=""
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="border shadow-sm w-full"
                  />
                  {formErrors?.email && (
                    <div className="text-xs text-red-700">
                      {formErrors.email}
                    </div>
                  )}
                </div>
              </FormGroup>

              <FormGroup className='mt-2'>
                <label
                  htmlFor="message"
                  className=""
                >
                  Message
                </label>
                <div >
                  <textarea
                    id="message"
                    name="message"
                    autoComplete="message"
                    className="border shadow-sm w-full"
                    required
                  />
                  {formErrors?.message && (
                    <div className="text-xs text-red-700">
                      {formErrors.message}
                    </div>
                  )}
                </div>
              </FormGroup>

              {formErrors?.form && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <XCircleIcon
                        className="h-5 w-5 text-red-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        We ran into a problem while creating your account!
                      </h3>
                      <p className="text-sm text-red-700 mt-2">
                        {formErrors.form}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className='mt-4'>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Submit
                </button>
              </div>
            </Form>
          </div>
        </Card.Body>

      </Card>
    </Container>

  );
}
