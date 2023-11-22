import { Form, Link, useFetcher, useNavigate, useOutletContext } from '@remix-run/react';
import { Price } from '~/components/products/Price';
import { ActiveOrderQuery, CurrencyCode } from '~/generated/graphql';
import { QuantityChange } from './QuantityChange';

export function CartContents({
  orderLines,
  currencyCode,
  editable = true,
  adjustOrderLine,
  removeItem,
  activeOrderError,
}: {
  orderLines: NonNullable<ActiveOrderQuery['activeOrder']>['lines'];
  currencyCode: CurrencyCode;
  editable: boolean;
  adjustOrderLine?: (lineId: string, quantity: number) => void;
  removeItem?: (lineId: string) => void;
  activeOrderError: Error | undefined;
}) {
  const isEditable = editable !== false;
  const navigate = useNavigate();

  return (
    <div className="flow-root">
      <ul role="list" className="-my-6 divide-y divide-gray-200 pr-2">
        {(orderLines ?? []).map((line) => (
          <li key={line.id} className="py-6 flex">
            <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
              <img
                src={line.featuredAsset?.preview + '?preset=thumb'}
                alt={line.productVariant.name}
                className="w-full h-full object-center object-cover"
                onClick={() => navigate(`/products/${line.productVariant.product.slug}`)}
              />
            </div>

            <div className="ml-2 flex-1 flex flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h5>
                    <Link to={`/products/${line.productVariant.product.slug}`}>
                      {line.productVariant.name}
                    </Link>
                  </h5>
                  <p className="ml-4">
                    <Price
                      priceWithTax={line.linePriceWithTax}
                      currencyCode={currencyCode}
                    ></Price>
                  </p>
                </div>
              </div>
              <div className="flex-1 flex items-center text-sm">
                {editable ? (
                  <Form>
                    <label htmlFor={`quantity-${line.id}`} className="mr-2">
                      Quantity
                    </label>
                    <QuantityChange
                      disabled={!isEditable}
                      selectedVariantId={line.productVariant.id}
                      activeOrder={{lines: [line]}}
                      adjustOrderLine={adjustOrderLine} />
                  </Form>
                ) : (
                  <div className="text-gray-800">
                    <span className="mr-1">Quantity</span>
                    <span className="font-medium">{line.quantity}</span>
                  </div>
                )}
                <div className="flex-1"></div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
