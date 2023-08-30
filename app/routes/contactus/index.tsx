import { Form, Link, useActionData, useSearchParams } from '@remix-run/react';
import { DataFunctionArgs, MetaFunction, json, redirect } from '@remix-run/server-runtime';
import { XCircleIcon } from '@heroicons/react/24/solid';
import {
  extractRegistrationFormValues,
  RegisterValidationErrors,
  validateRegistrationForm,
} from '~/utils/registration-helper';
import { Card, Typography, Button, Input, Checkbox, Textarea } from '@material-tailwind/react';
import { ContactUsValidationErrors, extractContactUsFormValues, validateContactUsForm } from '~/utils/contactus-helper';
import { contactUs } from '~/providers/contactus/contactus';
import { APP_META_TITLE } from '~/constants';

export async function action({ params, request }: DataFunctionArgs) {
  const body = await request.formData();
  const fieldErrors = validateContactUsForm(body);
  console.log(fieldErrors)
  if (Object.keys(fieldErrors).length !== 0) {
    return fieldErrors;
  }
  const variables = extractContactUsFormValues(body);
  console.log(variables);
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

    <Card style={{ maxWidth: '600px' }} className='shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light'>
      <Typography variant="h4" color="blue-gray">
        Contact Us
      </Typography>

      <Typography color="gray" className="mt-1 font-normal">
        You may contact us by filling the form below or can directly mail us at support@srishtivitality.in
      </Typography>
      <form method='post' action="/contactus" className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input type='email' required size="lg" name='email' label="Email" />
          {formErrors?.email && (
            <div className="text-xs text-red-700">
              {formErrors.email}
            </div>
          )}
          <Textarea required name='message' size="lg" label="Message" />
          {formErrors?.message && (
            <div className="text-xs text-red-700">
              {formErrors.message}
            </div>
          )}
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

        <Button type='submit' className="mt-6" fullWidth>
          Register
        </Button>

      </form>



    </Card>


  );
}
