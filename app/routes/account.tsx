import {
  HashtagIcon,
  MapPinIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import { Form, Outlet, useLoaderData, useMatches } from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { TabProps } from '~/components/tabs/Tab';
import { TabsContainer } from '~/components/tabs/TabsContainer';
import { getActiveCustomerDetails } from '~/providers/customer/customer';
// import { authenticator } from '~/server/auth.server';
import {Typography, Button} from '@material-tailwind/react';

export async function loader({ request }: DataFunctionArgs) {
  const { activeCustomer } = await getActiveCustomerDetails({ request });
  /* if (!activeCustomer) {
    const user: any = await authenticator.isAuthenticated(request, {
      failureRedirect: "/sign-in",
    });
    return json({ activeCustomer: user.authenticate })
  } */
  return json({ activeCustomer });
}

export default function AccountDashboard() {
  const { activeCustomer } = useLoaderData<typeof loader>();
  const { firstName, lastName } = activeCustomer!;

  const tabs: TabProps[] = [
    {
      Icon: UserCircleIcon,
      text: 'Account Details',
      to: '',
      pathName: "/account/",
    },
    {
      Icon: ShoppingBagIcon,
      text: 'Purchase History',
      to: 'history',
      pathName: "/account/history",
    },
    {
      Icon: MapPinIcon,
      text: 'Addresses',
      to: 'addresses',
      pathName: "/account/addresses",
    },
    {
      Icon: HashtagIcon,
      text: 'Password',
      to: 'password',
      pathName: "/account/password",
    },
  ];

  return (
    <div className='mt-4 text-center'>
      <Typography variant="h2"> My Account</Typography>
      <p className="mt-4">
        Welcome, {firstName} {lastName}
      </p>
      <Form method="post" action="/api/logout">
        <Button
          type="submit"
        >
          Sign out
        </Button>
      </Form>
      <TabsContainer tabs={tabs}>
        <Outlet></Outlet>
      </TabsContainer>

    </div>
  );
}
