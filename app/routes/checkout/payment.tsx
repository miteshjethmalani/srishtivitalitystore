import { DataFunctionArgs, redirect } from '@remix-run/server-runtime';
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
import { CurrencyCode, ErrorCode, ErrorResult, PayAidOrderRequest } from '~/generated/graphql';
import { DummyPayments } from '~/components/checkout/DummyPayments';
import { BraintreeDropIn } from '~/components/checkout/braintree/BraintreePayments';
import { getActiveOrder } from '~/providers/orders/order';
import { PayAidPayments } from '~/components/checkout/payaid/PayAidPayments';
import { useRef } from 'react';
import { getCookie, getSessionCookieString } from '~/utils/cookie';

export async function loader({ params, request }: DataFunctionArgs) {
  const session = await sessionStorage.getSession(
    request?.headers.get('Cookie'),
  );
  const activeOrder = await getActiveOrder({ request });

  //check if there is an active order if not redirect to homepage
  if (
    !session ||
    !activeOrder ||
    !activeOrder.active ||
    activeOrder.lines.length === 0
  ) {
    return redirect('/');
  }

  const { eligiblePaymentMethods } = await getEligiblePaymentMethods({
    request,
  });
  const error = session.get('activeOrderError');
  let stripePaymentIntent: string | undefined;
  let stripePublishableKey: string | undefined;
  let stripeError: string | undefined;
  if (eligiblePaymentMethods.find((method) => method.code.includes('stripe'))) {
    try {
      const stripePaymentIntentResult = await createStripePaymentIntent({
        request,
      });
      stripePaymentIntent =
        stripePaymentIntentResult.createStripePaymentIntent ?? undefined;
      stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    } catch (e: any) {
      stripeError = e.message;
    }
  }

  let brainTreeKey: string | undefined;
  let brainTreeError: string | undefined;
  if (
    eligiblePaymentMethods.find((method) => method.code.includes('braintree'))
  ) {
    try {
      const generateBrainTreeTokenResult = await generateBraintreeClientToken({
        request,
      });
      brainTreeKey =
        generateBrainTreeTokenResult.generateBraintreeClientToken ?? '';
    } catch (e: any) {
      brainTreeError = e.message;
    }
  }

  let payAidData: PayAidOrderRequest | undefined;
  let payAidError: string | undefined;
  if (
    eligiblePaymentMethods.find((method: any) => method.code.includes('payaid'))
  ) {
    try {
      const generatePayAidTokenResult = await getPayAidApiToken(
        { metadata: getSessionCookieString(request), method: "payaid" },
        {
          request,
        });
      payAidData =
        generatePayAidTokenResult.generatePayAidClientToken ?? '';
    } catch (e: any) {
      payAidError = e.message;
    }
  }
  return {
    eligiblePaymentMethods,
    stripePaymentIntent,
    stripePublishableKey,
    stripeError,
    brainTreeKey,
    brainTreeError,
    payAidData,
    payAidError,
    error,
  };
}

export async function action({ params, request }: DataFunctionArgs) {
  const body = await request.formData();
  const paymentMethodCode = body.get('paymentMethodCode');
  const paymentNonce = body.get('paymentNonce');
  if (typeof paymentMethodCode === 'string') {
    const { nextOrderStates } = await getNextOrderStates({
      request,
    });

    if (nextOrderStates.includes('ArrangingPayment')) {
      const transitionResult = await transitionOrderToState(
        'ArrangingPayment',
        { request },
      );

      if (transitionResult.transitionOrderToState?.__typename !== 'Order') {
        throw new Response('Not Found', {
          status: 400,
          statusText: transitionResult.transitionOrderToState?.message,
        });
      }
    }

    if (paymentMethodCode !== "payaid") {
      const result = await addPaymentToOrder(
        { method: paymentMethodCode, metadata: { nonce: paymentNonce } },
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
    } else {
      return redirect(
        `/checkout/payaidpaymentfoward`,
      );;
    }
  }
}

export default function CheckoutPayment() {
  const {
    eligiblePaymentMethods,
    stripePaymentIntent,
    stripePublishableKey,
    stripeError,
    brainTreeKey,
    brainTreeError,
    payAidData,
    payAidError,
    error
  } = useLoaderData<typeof loader>();
  const { activeOrderFetcher, activeOrder } = useOutletContext<OutletContext>();
  const payAIdRef = useRef(null);

  const paymentError = getPaymentError(error);
  return (
    <div className="flex flex-col items-center divide-gray-200 divide-y">
      {eligiblePaymentMethods.map((paymentMethod: any) =>
        paymentMethod.code.includes('braintree') ? (
          <div className="py-3 w-full" key={paymentMethod.id}>
            {brainTreeError ? (
              <div>
                <p className="text-red-700 font-bold">Braintree error:</p>
                <p className="text-sm">{brainTreeError}</p>
              </div>
            ) : (
              <BraintreeDropIn
                fullAmount={activeOrder?.totalWithTax ?? 0}
                currencyCode={
                  activeOrder?.currencyCode ?? ('USD' as CurrencyCode)
                }
                show={true}
                authorization={brainTreeKey!}
              />
            )}
          </div>
        ) : paymentMethod.code.includes('stripe') ? (
          <div className="py-12" key={paymentMethod.id}>
            {stripeError ? (
              <div>
                <p className="text-red-700 font-bold">Stripe error:</p>
                <p className="text-sm">{stripeError}</p>
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : paymentMethod.code.includes('payaid') ? (
          <div className="py-3 w-full" key={paymentMethod.id}>
            {payAidError ? (
              <div>
                <p className="text-red-700 font-bold">PayAid error:</p>
                <p className="text-sm">{payAidError}</p>
              </div>
            ) : (
              <PayAidPayments
                payAIdRef={payAIdRef}
                fullAmount={activeOrder?.totalWithTax ?? 0}
                currencyCode={
                  activeOrder?.currencyCode ?? ('USD' as CurrencyCode)
                }
                show={true}
                shippingAddress={activeOrder?.shippingAddress}
                authorization={payAidData}
              />
            )}
          </div>
        ) : (
          <div className="py-12" key={paymentMethod.id}>
            <DummyPayments
              paymentMethod={paymentMethod}
              paymentError={paymentError}
            />
          </div>
        ),
      )}
    </div>
  );
}


function getPaymentError(error?: ErrorResult): string | undefined {
  if (!error || !error.errorCode) {
    return undefined;
  }
  switch (error.errorCode) {
    case ErrorCode.OrderPaymentStateError:
    case ErrorCode.IneligiblePaymentMethodError:
    case ErrorCode.PaymentFailedError:
    case ErrorCode.PaymentDeclinedError:
    case ErrorCode.OrderStateTransitionError:
    case ErrorCode.NoActiveOrderError:
      return error.message;
  }
}
