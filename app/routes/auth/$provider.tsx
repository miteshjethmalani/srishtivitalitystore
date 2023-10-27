import { ActionArgs, redirect } from "@remix-run/node"
// import { authenticator } from '~/server/auth.server';

export let loader = () => redirect('/sign-in');

export let action = async ({ request, params }: ActionArgs) => {
  // return await authenticator.authenticate(params.provider + "", request);
};