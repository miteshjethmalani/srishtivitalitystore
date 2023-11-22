import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CartContents } from './CartContents';
import { Link, useLocation } from '@remix-run/react';
import { Price } from '~/components/products/Price';
import { CartLoaderData } from '~/routes/api/active-order';
import { CurrencyCode } from '~/generated/graphql';
import { IconButton, Typography, Drawer, ListItemPrefix, List, ListItem, ListItemSuffix, Chip } from '@material-tailwind/react';

export function CartTray({
  open,
  onClose,
  activeOrder,
  activeOrderError,
  adjustOrderLine,
  removeItem,
}: {
  open: boolean;
  onClose: (closed: boolean) => void;
  activeOrder: CartLoaderData['activeOrder'];
  activeOrderError: CartLoaderData['activeOrderError'];
  adjustOrderLine?: (lineId: string, quantity: number) => void;
  removeItem?: (lineId: string) => void;
}) {
  // console.log("activeOrderError", activeOrderError)
  const currencyCode = activeOrder?.currencyCode || CurrencyCode.Inr;
  const location = useLocation();
  const editable = !location.pathname.startsWith('/checkout');
  if (!open) {
    return <></>;
  }
  return (
    <Drawer className='z-[99999]' open={open} onClose={() => onClose(true)}>
      <div className="mt-2 ml-2 flex items-center justify-between">
        <Typography variant="h5" color="deep-purple">
          Shopping cart
        </Typography>
        <IconButton variant="text" color="deep-purple" onClick={() => onClose(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>
      <div className='text-red-600 ml-2 mr-2'>{activeOrderError? activeOrderError.message:""}</div>
      <List>
        <div className="mt-8 overflow-auto h-80">
          {activeOrder?.totalQuantity ? (
            <CartContents
              orderLines={activeOrder?.lines ?? []}
              currencyCode={currencyCode!}
              editable={editable}
              removeItem={removeItem}
              adjustOrderLine={adjustOrderLine}
              activeOrderError={activeOrderError}
            ></CartContents>
          ) : (
            <div className="flex items-center justify-center h-48 text-xl text-gray-400">
              Your cart is empty
            </div>
          )}
        </div>
        {activeOrder?.totalQuantity && editable && (
          <div className="border-t border-deep-purple-200 py-6 px-4 sm:px-6">
            <div className="flex justify-between text-base font-medium text-deep-purple-900">
              <p>Subtotal</p>
              <p>
                {currencyCode && (
                  <Price
                    priceWithTax={activeOrder?.subTotalWithTax ?? 0}
                    currencyCode={currencyCode}
                  />
                )}
              </p>
            </div>
            <p className="mt-0.5 text-sm text-deep-purple-500">
              Shipping will be calculated at checkout.
            </p>
            <div className="mt-6">
              <Link
                to="/checkout"
                onClick={() => onClose(false)}
                className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
              >
                Checkout
              </Link>
            </div>
          </div>
        ) || ""}
      </List>
    </Drawer>
  );
}
