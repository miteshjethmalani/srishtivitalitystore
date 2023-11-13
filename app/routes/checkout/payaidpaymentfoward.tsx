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
import { StripePayments } from '~/components/checkout/stripe/StripePayments';
import { DummyPayments } from '~/components/checkout/DummyPayments';
import { BraintreeDropIn } from '~/components/checkout/braintree/BraintreePayments';
import { getActiveOrder } from '~/providers/orders/order';
import { PayAidPayments } from '~/components/checkout/payaid/PayAidPayments';
import { useEffect, useRef } from 'react';

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

    let payAidData: PayAidOrderRequest | undefined;
    let payAidError: string | undefined;
    if (
        eligiblePaymentMethods.find((method: any) => method.code.includes('payaid'))
    ) {
        try {
            const generatePayAidTokenResult = await getPayAidApiToken(
                { metadata: request?.headers.get('Cookie'), method: "payaid" },
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
        payAidData,
        payAidError,
        error,
    };
}



export default function PayAidForwardPayment() {
    const {
        eligiblePaymentMethods,
        payAidData,
        payAidError,
        error,
    } = useLoaderData<typeof loader>();
    const { activeOrderFetcher, activeOrder } = useOutletContext<OutletContext>();
    const payAIdRef = useRef(null);

    const paymentError = getPaymentError(error);
    console.log(activeOrder, error);
    useEffect(() => {
        payAIdRef.current && payAIdRef.current.submit()
    }, []);


    return (
        <div className="flex flex-col items-center divide-gray-200 divide-y">
            {eligiblePaymentMethods.map((paymentMethod: any) =>
                paymentMethod.code.includes('payaid') ? (
                    <div className="py-3 w-full" key={paymentMethod.id}>
                        {payAidError ? (
                            <div>
                                <p className="text-red-700 font-bold">PayAid error:</p>
                                <p className="text-sm">{payAidError}</p>
                            </div>
                        ) : (
                            <form action={"https://api.payaidpayments.com/v2/paymentrequest"} method={"POST"} ref={payAIdRef} onLoad={() => submitForm()}>
                                {Object.keys(payAidData).map((key) => (
                                    <input
                                        type={"hidden"}
                                        name={key}
                                        key={key}
                                        value={
                                            ("string" === typeof payAidData[key])
                                                ? payAidData[key]
                                                : JSON.stringify(payAidData[key])
                                        }
                                    />
                                ))}
                            </form>
                        )}
                    </div>
                ) : null
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
