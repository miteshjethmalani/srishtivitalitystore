import { useEffect, useRef, useState } from 'react';
import dropin, { Dropin } from 'braintree-web-drop-in';
import { classNames } from '~/utils/class-names';
import { useSubmit } from '@remix-run/react';
import { addPaymentToOrder, getNextOrderStates, transitionOrderToState } from '~/providers/checkout/checkout';
import { CurrencyCode, OrderAddress, PayAidOrderRequest } from '~/generated/graphql';

export function PayAidPayments(props: {
  show: boolean;
  authorization: PayAidOrderRequest | any;
  fullAmount: number;
  currencyCode: CurrencyCode;
  payAIdRef: any
  shippingAddress: OrderAddress | null | undefined;
}) {
  const { show, authorization, fullAmount, currencyCode, shippingAddress, payAIdRef } = props;
  const [enablePaymentButton, setEnablePaymentButton] = useState<boolean>();
  const [processing, setProcessing] = useState<boolean>(false);
  const submit = useSubmit();

  const submitPayment = async () => {
    setProcessing(true);
    try {

      const formData = new FormData();
      formData.set('paymentMethodCode', 'payaid');
      formData.set('paymentNonce', authorization);

      let request: Request;
      request = new Request('');
      const { nextOrderStates } = await getNextOrderStates({
        request,
      });
      
      if (nextOrderStates.includes('AddingItems')) {
        const transitionResult = await transitionOrderToState(
          'AddingItems',
          { request },
        );

        if (transitionResult.transitionOrderToState?.__typename !== 'Order') {
          throw new Response('Not Found', {
            status: 400,
            statusText: transitionResult.transitionOrderToState?.message,
          });
        }
      }

      submit(formData, { method: 'post' });
    } catch (e) {
      alert(e);
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (show) {
      setEnablePaymentButton(true);
    }
  }, [show]);
  
  return (
    <div
      style={{ display: `${show ? 'block' : 'none'}` }}
      className={'w-full h-full'}
    >
      <div id={'payaid-drop-in-div'} />

      <input type="hidden" name="paymentMethodCode" value="payaid" />
      {/* {enablePaymentButton?<Form name="paymentForm" config={{ url: "https://api.payaidpayments.com/v2/paymentrequest", method: "POST", data: authorization }} />:<></> } */}
      <div className='text-gray-600'>
        Please do not refresh or press the back button while your transaction is processing to ensure a smooth and successful payment. 
      </div>
      <button
        onClick={submitPayment}
        className={classNames(
          enablePaymentButton && !processing
            ? 'bg-primary-600 hover:bg-primary-700'
            : 'bg-gray-400',
          'flex w-full items-center justify-center space-x-2 mt-24 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
        )}
        disabled={!enablePaymentButton}
      >
        {processing
          ? 'Processing...'
          : 'Pay Securely'}
        {processing ? (
          <svg
            aria-hidden="true"
            className="ml-3 w-4 h-4 text-indigo-100 animate-spin dark:text-gray-100 fill-white"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        ) : (
          ''
        )}
      </button>
    </div>
  );
}
