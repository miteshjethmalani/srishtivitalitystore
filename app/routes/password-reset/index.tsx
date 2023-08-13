import { Form, Link, useActionData, useFetcher, useSearchParams } from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { login, resetPassword } from '~/providers/account/account';
import { ErrorResult } from '~/generated/graphql';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { Button } from '~/components/Button';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { ResetPasswordValidationErrors, extractResetPasswordFormValues, validateResetPasswordForm } from '~/utils/password-reset-helper';

export async function action({ params, request }: DataFunctionArgs) {

  const body = await request.formData();

  const fieldErrors = validateResetPasswordForm(body);
  console.log(fieldErrors)
  if (Object.keys(fieldErrors).length !== 0) {
    return fieldErrors;
  }

  const { password, token } = extractResetPasswordFormValues(body);
  console.log(password,token)
  const result = await resetPassword(password, token, { request });
  console.log(result)
  if (result.__typename === 'CurrentUser') {
    return redirect('/password-reset/success');
  } else {
    return json(result, {
      status: 401,
    });
  }

}

export default function SignInPage() {
  const [searchParams] = useSearchParams();
  const login = useFetcher<ErrorResult>();
  const formErrors = useActionData<ResetPasswordValidationErrors>();
  console.log(formErrors)

  return (
    <>
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl text-gray-900">
            Reset Password
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <login.Form method="post"><fieldset disabled={login.state !== 'idle'} className="space-y-6">
              <input type='hidden' name='token' value={searchParams.get('token') || ''} />
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    required
                    placeholder="New Password"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:text-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
                  />
                  {formErrors?.password && (
                    <div className="text-xs text-red-700">
                      {formErrors.password}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm New Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="password"
                    required
                    placeholder="Confirm New Address"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:text-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
                  />
                  {formErrors?.confirmPassword && (
                    <div className="text-xs text-red-700">
                      {formErrors.confirmPassword}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <span className='flex gap-4 items-center'>
                    {login.state !== 'idle' && <ArrowPathIcon className="animate-spin h-5 w-5 text-gray-500" />}
                    Submit
                  </span>
                </Button>
              </div>
            </fieldset></login.Form>
          </div>
        </div>
      </div>
    </>
  );
}
