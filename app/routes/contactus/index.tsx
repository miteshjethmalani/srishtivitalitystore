import { Form, Link, useActionData, useSearchParams } from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { registerCustomerAccount } from '~/providers/account/account';
import { XCircleIcon } from '@heroicons/react/24/solid';
import {
  extractRegistrationFormValues,
  RegisterValidationErrors,
  validateRegistrationForm,
} from '~/utils/registration-helper';
import { Container } from 'react-bootstrap';
import { ContactUsValidationErrors, extractContactUsFormValues, validateContactUsForm } from '~/utils/contactus-helper';
import { contactUsQC } from '~/providers/contactus/contactus';

export async function action({ params, request }: DataFunctionArgs) {
  const body = await request.formData();
  const fieldErrors = validateContactUsForm(body);
  if (Object.keys(fieldErrors).length !== 0) {
    return fieldErrors;
  }
  const variables = extractContactUsFormValues(body);
  const result = await contactUsQC({ request }, variables);
  if (result.__typename === 'Success') {
    return redirect('/sign-up/success');
  } else {
    const formError: RegisterValidationErrors = {
      form: result.errorCode,
    };
    return json(formError, { status: 401 });
  }
}

export default function ContactUs() {
  const formErrors = useActionData<ContactUsValidationErrors>();

  return (
    <>
      <div className="contact-from-section mt-5 mb-150">
        <Container>
          <div className="row">
            <div className="col-lg-8 mb-5 mb-lg-0">
              <div className="form-title">
                <h2>Have you any question?</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Pariatur, ratione! Laboriosam est, assumenda. Perferendis, quo
                  alias quaerat aliquid. Corporis ipsum minus voluptate? Dolore,
                  esse natus!
                </p>
                <Form method="post" action="/contactus">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
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
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                      {formErrors?.email && (
                        <div className="text-xs text-red-700">
                          {formErrors.email}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="message"
                        name="message"
                        autoComplete="message"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        required
                      />
                      {formErrors?.message && (
                        <div className="text-xs text-red-700">
                          {formErrors.message}
                        </div>
                      )}
                    </div>
                  </div>

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

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
