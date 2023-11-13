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
import { Form, useLoaderData, useOutletContext } from '@remix-run/react';
import { CreditCardIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { OutletContext } from '~/types';
import { sessionStorage } from '~/sessions';
import { CurrencyCode, ErrorCode, ErrorResult } from '~/generated/graphql';
import { StripePayments } from '~/components/checkout/stripe/StripePayments';
import { DummyPayments } from '~/components/checkout/DummyPayments';
import { BraintreeDropIn } from '~/components/checkout/braintree/BraintreePayments';
import { getActiveOrder, getOrderByCode } from '~/providers/orders/order';
import { PayAidPayments } from '~/components/checkout/payaid/PayAidPayments';

export async function loader({ params, request }: DataFunctionArgs) {
  // const formData = await request.formData();
  console.log("IN--------")
  // console.log("metadata: "+formData.get("udf1"))
  
  
  // const order = await getOrderByCode(`${params.orderCode}`!, { request });
  return json({ abc: true });
}

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();
  const reqData: any = request.body;
  let headers: ResponseInit['headers'] = {};
  console.log("IN11--------")
  if(formData.get("udf1")){

    const session = await sessionStorage.getSession(
      formData.get("udf1"),
    );
    headers = {
      'Set-Cookie': await sessionStorage.commitSession(session),
    };
    return json(
      {  },
      {
        headers,
      },
    );
  }
  return json({});
  var keys = Object.keys(reqData);
  console.log("metadata: "+formData.getAll("udf1"))
  // console.log(keys, formData.get('transaction_id'));
  const _state = formData.get('transaction_id');
  const { nextOrderStates } = await getNextOrderStates({
    request,
  });
  // console.log(nextOrderStates)
  const result = await addPaymentToOrder(
    { method: "payaid", metadata: { nonce: formData.get('transaction_id') } },
    { request },
  );
  console.log(result);
  return json(null, { status: 200 });


}

export default function CheckoutPaymentResponse() {

  return (
    <div className="flex flex-col items-center divide-gray-200 divide-y">
      Please wait while we are fetching the data.
    </div>
  );
}
