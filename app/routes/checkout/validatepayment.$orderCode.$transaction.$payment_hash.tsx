import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import {
  addPaymentToOrder,
  getNextOrderStates,
} from '~/providers/checkout/checkout';
import { getSessionCookieString } from '~/utils/cookie';

export async function loader({ params, request }: DataFunctionArgs) {
  // const formData = await request.formData();
  console.log(params)
  const { orderCode, transaction, payment_hash } = params;
  const { nextOrderStates } = await getNextOrderStates({
    request,
  });
  
  const result = await addPaymentToOrder(
    { method: "payaid", metadata: { cookie: getSessionCookieString(request), transaction, payment_hash } },
    { request },
  );
  if (result.addPaymentToOrder.__typename === 'Order') {
    return redirect(
      `/checkout/confirmation/${result.addPaymentToOrder.code}`,
    );
  } else {
    throw new Response('Not Found', {
      status: 400,
      statusText: result.addPaymentToOrder?.message,
    });
  }
}

export async function action({ request }: DataFunctionArgs) {
  const { nextOrderStates } = await getNextOrderStates({
    request,
  });
  console.log(nextOrderStates);
  return json({});
}

export default function CheckoutPaymentResponse() {

  return (
    <div className="flex flex-col items-center divide-gray-200 divide-y">
      Please wait while we are fetching the data.
    </div>
  );
}
