import { Form, Link, useFetcher, useSearchParams } from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { login, requestForgotPassword } from '~/providers/account/account';
import { ErrorResult } from '~/generated/graphql';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { Button } from '~/components/Button';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { SocialsProvider } from 'remix-auth-socials';

export async function action({ params, request }: DataFunctionArgs) {
  const body = await request.formData();
  const email = body.get('email');
  if (typeof email === 'string') {
    const result = await requestForgotPassword(email, { request });
    console.log("result", result)
    if (result.__typename === 'Success') {
      return redirect('/forgot-password/success');
    } else {
      return json(result, {
        status: 401,
      });
    }
  }
}

export default function SignInPage() {
  const [searchParams] = useSearchParams();
  const login = useFetcher<ErrorResult>();

  interface SocialButtonProps {
    provider: SocialsProvider,
    label: string
  }

  return (
    <>
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl text-gray-900">
            Forgot Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              to="/sign-up"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              register a new account
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <login.Form method="post"><fieldset disabled={login.state !== 'idle'} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Email address"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:text-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
                  />
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
