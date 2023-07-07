import {
  HashtagIcon,
  MapPinIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import { Form, Outlet, useLoaderData, useMatches } from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { Container } from 'react-bootstrap';
import { TabProps } from '~/components/tabs/Tab';
import { TabsContainer } from '~/components/tabs/TabsContainer';
import { getActiveCustomerDetails } from '~/providers/customer/customer';
import { authenticator } from '~/server/auth.server';

export async function loader({ request }: DataFunctionArgs) {
  const { activeCustomer } = await getActiveCustomerDetails({ request });
  if (!activeCustomer) {
    const user: any = await authenticator.isAuthenticated(request, {
      failureRedirect: "/sign-in",
    });
    return json({ activeCustomer: user.authenticate })
  }
  return json({ activeCustomer });
}

export default function AccountDashboard() {
  const { activeCustomer } = useLoaderData<typeof loader>();
  const { firstName, lastName } = activeCustomer!;

  const tabs: TabProps[] = [
    {
      Icon: UserCircleIcon,
      text: 'Account Details',
      to: './',
    },
    {
      Icon: ShoppingBagIcon,
      text: 'Purchase History',
      to: './history',
    },
    {
      Icon: MapPinIcon,
      text: 'Addresses',
      to: './addresses',
    },
    {
      Icon: HashtagIcon,
      text: 'Password',
      to: './password',
    },
  ];

  return (
    <Container className='mt-4'>
      <h1 className="">
        My Account
      </h1>
      <p className="mt-4">
        Welcome, {firstName} {lastName}
      </p>
      <Form method="post" action="/api/logout">
        <button
          type="submit"
          className="underline text-primary"
        >
          Sign out
        </button>
      </Form>
      <TabsContainer tabs={tabs}>
        <Outlet></Outlet>
      </TabsContainer>

    </Container>
  );
}
