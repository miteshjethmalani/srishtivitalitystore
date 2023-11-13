import { DataFunctionArgs } from '@remix-run/server-runtime';
import { getActiveOrder, getOrderByCode } from '~/providers/orders/order';
import { useLoaderData } from '@remix-run/react';
import { CartContents } from '~/components/cart/CartContents';
import { CartTotals } from '~/components/cart/CartTotals';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { useRevalidator } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { OrderDetailFragment } from '~/generated/graphql';

export async function loader({ params, request }: DataFunctionArgs) {
  try {
    
    const order = await getActiveOrder({request});
    return {
      order,
      error: false,
    };
  } catch (ex) {
    return {
      order: null,
      error: true,
    };
  }
}

export default function CheckoutConfirmation() {
  const { order, error } = useLoaderData<typeof loader>();
  const revalidator = useRevalidator();
  const [retries, setRetries] = useState(1);
  console.log(order, error);
  const orderNotFound = !order && !error;
  const orderErrored = !order && error;
  const maxRetries = 5;
  const retriesExhausted = retries >= maxRetries;
  const retryTimeout = 2500;

  const retry = () => {
    if (!window) return;
    setRetries(retries + 1);
    window.setTimeout(() => {
      if (retries > maxRetries) return;
      revalidator.revalidate();
    }, retryTimeout);
  };

  useEffect(() => {
    if (orderErrored) {
      retry();
    }
  }, [order]);

  useEffect(() => {
    if (
      revalidator.state === 'idle' &&
      orderErrored &&
      retries <= maxRetries &&
      retries > 1
    ) {
      retry();
    }
  }, [revalidator.state]);

  if (orderNotFound) {
    return (
      <div>
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-brown-500 my-8">
          No matching order found!
        </h2>
      </div>
    );
  }

  if (orderErrored && retriesExhausted) {
    return (
      <div>
        <h2 className="text-3xl flex items-center space-x-2 sm:text-5xl font-light tracking-tight text-gray-900 my-8">
          <XCircleIcon className="text-red-600 w-8 h-8 sm:w-12 sm:h-12"></XCircleIcon>
          <span>An error occured!</span>
        </h2>
        <p className="text-lg text-gray-700">
          Unfortunately your payment could not be processed or this confirmation
          link has expired.
        </p>
      </div>
    );
  }

  if (orderErrored) {
    return (
      <div>
        <h2 className="text-3xl flex items-center space-x-2 sm:text-5xl font-light tracking-tight text-gray-900 my-8">
          Please wait while we process your order...
        </h2>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl flex items-center space-x-2 sm:text-5xl font-light tracking-tight text-gray-900 my-8">
        <CheckCircleIcon className="text-green-600 w-8 h-8 sm:w-12 sm:h-12"></CheckCircleIcon>
        <span>Order Summary</span>
      </h2>
      <p className="text-lg text-gray-700">
        Your order <span className="font-bold">{order!.code}</span> has been
        received!
      </p>
      <p className="text-lg text-gray-700 mt-5">
        Please make the payment through UPI on the below mentioned mobile number 
        <a href={`https://wa.me/+918369536738?text=Please%20send%20me%20the%20order%20of%20${order!.code}!`}>Please connect on WhatsApp on +918369536738</a>
      </p>
      {order!.active && (
        <div className="rounded-md bg-blue-50 p-4 my-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <InformationCircleIcon
                className="h-5 w-5 text-blue-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-blue-700">
                {' '}
                Note: your payment is still being processed. You will receive an
                email confirmation once the payment has completed.
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="mt-12">
        <div className="mb-6">
          <CartContents
            orderLines={order!.lines}
            currencyCode={order!.currencyCode}
            editable={false}
          />
        </div>
        <CartTotals order={order as OrderDetailFragment}></CartTotals>
      </div>
    </div>
  );
}
