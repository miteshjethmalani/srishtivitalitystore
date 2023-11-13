import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import {
  addPaymentToOrder,
  generateBraintreeClientToken,
  createStripePaymentIntent,
  getEligiblePaymentMethods,
  getNextOrderStates,
  transitionOrderToState,
  getPayAidApiToken,
} from '~/providers/checkout/checkout';

export async function loader({ params, request }: DataFunctionArgs) {
  // const formData = await request.formData();
  // console.log("metadata: "+formData.get("udf1"))
  const { nextOrderStates } = await getNextOrderStates({
    request,
  });
  const transitionResult = await transitionOrderToState(
    'PaymentAuthorized',
    { request },
  );
  /* if (transitionResult.transitionOrderToState?.__typename !== 'Order') {
    throw new Response('Not Found', {
      status: 400,
      statusText: transitionResult.transitionOrderToState?.message,
    });
  } */
  const result = await addPaymentToOrder(
    { method: "payaid", metadata: { nonce: "" } },
    { request },
  );
  console.log(result);
  // console.log("activeOrder",await getActiveOrder({ request }))
  // const order = await getOrderByCode(`${params.orderCode}`, { request });
  return json({ abc: true });
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
