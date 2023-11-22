import { CheckCircleIcon, InformationCircleIcon, StopCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@material-tailwind/react';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { CartContents } from '~/components/cart/CartContents';
import { CartTotals } from '~/components/cart/CartTotals';
import { APP_META_TITLE } from '~/constants';
import { OrderDetailFragment } from '~/generated/graphql';
import { getNextOrderStates, transitionOrderToState } from '~/providers/checkout/checkout';
import { getActiveOrder } from '~/providers/orders/order';
import { sessionStorage } from '~/sessions';

export async function loader({ params, request }: DataFunctionArgs) {
    const {failReason} = params;
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

    return json({
        activeOrder,
        failReason
    });
}

export default function CheckoutPaymentResponse() {
    const {
        activeOrder,
        failReason
    } = useLoaderData<typeof loader>();
    const navigate = useNavigate();

    return (<div>
        <h2 className="text-3xl flex items-center space-x-2 sm:text-5xl font-light tracking-tight text-gray-900 my-8">
            <XCircleIcon className="text-red-600 w-8 h-8 sm:w-12 sm:h-12"></XCircleIcon>
            <span>Payment Failed</span>
        </h2>
        <p className="text-lg text-gray-700">
            Dear {activeOrder?.customer?.firstName?.trim()},
        </p>
        <p className="text-lg text-gray-700 ml-4">
            We hope this message finds you well. We wanted to inform you that the payment for your recent order <span className='font-bold'>{activeOrder.code} could not be processed successfully</span> .
        </p>
        <p className="text-lg text-gray-700 ml-4 mt-4 font-bold">
            {failReason? `Reason: ${failReason}`:""}
        </p>
        <Button type='button' className="mt-5 w-full" onClick={()=>navigate('/checkout/payment')}> Retry</Button>
    </div>
    );
}
