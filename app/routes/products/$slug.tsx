import {
  DataFunctionArgs,
  MetaFunction,
  json,
} from '@remix-run/server-runtime';
import { useState, useRef, RefObject, useEffect } from 'react';
import { Price } from '~/components/products/Price';
import { getProductBySlug } from '~/providers/products/products';
import {
  FetcherWithComponents,
  ShouldReloadFunction,
  useCatch,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from '@remix-run/react';
import { CheckIcon, HeartIcon, PhotoIcon } from '@heroicons/react/24/solid';
import { Breadcrumbs } from '~/components/Breadcrumbs';
import { APP_META_TITLE } from '~/constants';
import { CartLoaderData } from '~/routes/api/active-order';
// import { FetcherWithComponents } from '~/types';
import { sessionStorage } from '~/sessions';
import { ErrorCode, ErrorResult } from '~/generated/graphql';
import Alert from '~/components/Alert';
import { StockLevelLabel } from '~/components/products/StockLevelLabel';
// import TopReviews from '~/components/products/TopReviews';
import { ScrollableContainer } from '~/components/products/ScrollableContainer';

export const meta: MetaFunction = ({ data }) => {
  const metaTitle = (data?.product?.customFields?.metaTitle || data?.product?.name);
  return {
    title: metaTitle ? `${metaTitle} - ${APP_META_TITLE}` : APP_META_TITLE,
    description: data?.product?.customFields?.metaDescription,
    keywords: data?.product?.customFields?.keywords,
    "og:image": data?.product?.assets[0]?.preview +
      '?preset=small'
  };
};

export async function loader({ params, request }: DataFunctionArgs) {
  const { product } = await getProductBySlug(params.slug!, { request });
  if (!product) {
    throw new Response('Not Found', {
      status: 404,
    });
  }
  const session = await sessionStorage.getSession(
    request?.headers.get('Cookie'),
  );
  const error = session.get('activeOrderError');
  return json(
    { product: product!, error, slug: params.slug },
    {
      headers: {
        'Set-Cookie': await sessionStorage.commitSession(session),
      },
    },
  );
}

export const unstable_shouldReload: ShouldReloadFunction = () => true;

export default function ProductSlug() {
  const { product, error, slug } = useLoaderData<typeof loader>();
  const caught = useCatch();
  const { activeOrderFetcher } = useOutletContext<{
    activeOrderFetcher: FetcherWithComponents<CartLoaderData>;
  }>();
  const { activeOrder } = activeOrderFetcher.data ?? {};
  const addItemToOrderError = getAddItemToOrderError(error);
  const navigate = useNavigate();

  if (!product) {
    return <div>Product not found!</div>;
  }

  const findVariantById = (id: string) =>
    product.variants.find((v) => v.id === id);

  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0].id,
  );
  const selectedVariant = findVariantById(selectedVariantId);
  if (!selectedVariant) {
    setSelectedVariantId(product.variants[0].id);
  }

  const qtyInCart =
    activeOrder?.lines.find((l) => l.productVariant.id === selectedVariantId)
      ?.quantity ?? 0;

  const asset = product.assets[0];
  const brandName = product.facetValues.find(
    (fv) => fv.facet.code === 'brand',
  )?.name;

  const [featuredAsset, setFeaturedAsset] = useState(
    selectedVariant?.featuredAsset,
  );
  console.log(product?.variants)
  return (
    <div>
      <div className="mx-auto px-4">
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-brown-500 my-8">
          {product.name}
        </h2>
        <Breadcrumbs
          items={
            product.collections[product.collections.length - 1]?.breadcrumbs ??
            []
          }
        ></Breadcrumbs>
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start mt-4 md:mt-12">
          {/* Image gallery */}
          <div className="w-full max-w-2xl mx-auto sm:block lg:max-w-none">
            <span className="rounded-md overflow-hidden">
              <div className="w-full object-center object-cover rounded-lg">
                <img
                  src={
                    (featuredAsset?.preview || product.featuredAsset?.preview) +
                    '?preset=large'
                  }
                  alt={product.name}
                  className="hover:scale-105 transition-all duration-500 cursor-pointer"
                />
              </div>
            </span>

            {product.assets.length > 1 && (
              <ScrollableContainer>
                {product.assets.map((asset) => (
                  <div
                    key={asset.id}
                    className={`basis-1/3 md:basis-1/4 flex-shrink-0 select-none touch-pan-x rounded-lg ${featuredAsset?.id == asset.id
                      ? 'outline outline-2 outline-primary outline-offset-[-2px]'
                      : ''
                      }`}
                    onClick={() => {
                      setFeaturedAsset(asset);
                    }}
                  >
                    <img
                      draggable="false"
                      className="rounded-lg select-none h-24 w-full object-cover"
                      src={
                        asset.preview +
                        '?preset=full' /* not ideal, but technically prevents loading 2 seperate images */
                      }
                    />
                  </div>
                ))}
              </ScrollableContainer>
            )}
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <div className="">
              <h3 className="sr-only">Description</h3>

              <div
                className="text-base text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: product.description,
                }}
              />
            </div>
            <activeOrderFetcher.Form method="post" action="/api/active-order">
              <input type="hidden" name="action" value="addItemToOrder" />
              {1 < product.variants.length ? (
                <div className="mt-4">
                  <label
                    htmlFor="option"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select option
                  </label>
                  <select
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                    id="productVariant"
                    value={selectedVariantId}
                    name="variantId"
                    onChange={(e) => {
                      setSelectedVariantId(e.target.value);

                      const variant = findVariantById(e.target.value);
                      if (variant) {
                        setFeaturedAsset(variant!.featuredAsset);
                      }
                    }}
                  >
                    {product.variants.map((variant) => (
                      <option key={variant.id} value={variant.id}>
                        {variant.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <input
                  type="hidden"
                  name="variantId"
                  value={selectedVariantId}
                ></input>
              )}

              <div className="mt-10 flex flex-col sm:flex-row sm:items-center">
                <p className="text-3xl text-gray-900 mr-4">
                  <Price
                    priceWithTax={selectedVariant?.priceWithTax}
                    currencyCode={selectedVariant?.currencyCode}
                  ></Price>
                </p>
                <div className="flex sm:flex-col1 align-baseline">
                  <button
                    type="submit"
                    className={`max-w-xs flex-1 ${
                      activeOrderFetcher.state !== 'idle'
                      ? 'bg-gray-400'
                      : qtyInCart === 0
                        ? 'bg-primary-600 hover:bg-primary-700'
                        : 'bg-green-600 active:bg-green-700 hover:bg-green-700'
                      }
                                     transition-colors border border-transparent rounded-md py-3 px-8 flex items-center
                                      justify-center text-base font-medium text-white focus:outline-none
                                      focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-primary-500 sm:w-full`}
                    disabled={activeOrderFetcher.state !== 'idle'}
                  >
                    {qtyInCart ? (
                      <span className="flex items-center">
                        <CheckIcon className="w-5 h-5 mr-1" /> {qtyInCart} in
                        cart
                      </span>
                    ) : (
                      `Add to cart`
                    )}
                  </button>
                </div>
              </div>
              <div className="mt-5">
                <a className='inline-flex items-center justify-center p-3 text-base font-medium text-white rounded-lg bg-green-900 '
                  href={`https://wa.me/+918369536738?text=Hi,%0A%20I%20want%20to%20order%20this%20product:${encodeURI(product.name)}${product?.variants?.length?encodeURI(selectedVariant?.name || ""):""}%0Ahttps://srishtivitality.in/products/${slug}`}>
                  <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                    className="fill-current w-8 h-8 mr-2"  viewBox="0 0 30 31"
                    >
                    <g>
                      <path d="M30.667,14.939c0,8.25-6.74,14.938-15.056,14.938c-2.639,0-5.118-0.675-7.276-1.857L0,30.667l2.717-8.017
		c-1.37-2.25-2.159-4.892-2.159-7.712C0.559,6.688,7.297,0,15.613,0C23.928,0.002,30.667,6.689,30.667,14.939z M15.61,2.382
		c-6.979,0-12.656,5.634-12.656,12.56c0,2.748,0.896,5.292,2.411,7.362l-1.58,4.663l4.862-1.545c2,1.312,4.393,2.076,6.963,2.076
		c6.979,0,12.658-5.633,12.658-12.559C28.27,8.016,22.59,2.382,15.61,2.382z M23.214,18.38c-0.094-0.151-0.34-0.243-0.708-0.427
		c-0.367-0.184-2.184-1.069-2.521-1.189c-0.34-0.123-0.586-0.185-0.832,0.182c-0.243,0.367-0.951,1.191-1.168,1.437
		c-0.215,0.245-0.43,0.276-0.799,0.095c-0.369-0.186-1.559-0.57-2.969-1.817c-1.097-0.972-1.838-2.169-2.052-2.536
		c-0.217-0.366-0.022-0.564,0.161-0.746c0.165-0.165,0.369-0.428,0.554-0.643c0.185-0.213,0.246-0.364,0.369-0.609
		c0.121-0.245,0.06-0.458-0.031-0.643c-0.092-0.184-0.829-1.984-1.138-2.717c-0.307-0.732-0.614-0.611-0.83-0.611
		c-0.215,0-0.461-0.03-0.707-0.03S9.897,8.215,9.56,8.582s-1.291,1.252-1.291,3.054c0,1.804,1.321,3.543,1.506,3.787
		c0.186,0.243,2.554,4.062,6.305,5.528c3.753,1.465,3.753,0.976,4.429,0.914c0.678-0.062,2.184-0.885,2.49-1.739
		C23.307,19.268,23.307,18.533,23.214,18.38z"/>
                    </g>
                  </svg>
                  <span>Order on Whatsapp</span>
                </a>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-gray-500">{selectedVariant?.sku}</span>
                <StockLevelLabel stockLevel={selectedVariant?.stockLevel} />
              </div>
              {addItemToOrderError && (
                <div className="mt-4">
                  <Alert message={addItemToOrderError} />
                </div>
              )}

              <section className="mt-12 pt-12 border-t text-xs">
                <h3 className="text-gray-600 font-bold mb-2">
                  Shipping
                </h3>
                <div className="text-gray-500 space-y-1">
                  <p>
                    Standard shipping: 3 - 5 working days.
                  </p>
                  <p>
                    Shipping costs depend on delivery address and will be
                    calculated during checkout.
                  </p>
                </div>
              </section>
            </activeOrderFetcher.Form>
          </div>
        </div>
      </div>
      {/* <div className="mt-24">
        <TopReviews></TopReviews>
      </div> */}
    </div>
  );
}

export function CatchBoundary() {
  return (
    <div className="mx-auto px-4">
      <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-brown-500 my-8">
        Product not found!
      </h2>
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start mt-4 md:mt-12">
        {/* Image gallery */}
        <div className="w-full max-w-2xl mx-auto sm:block lg:max-w-none">
          <span className="rounded-md overflow-hidden">
            <div className="w-full h-96 bg-slate-200 rounded-lg flex content-center justify-center">
              <PhotoIcon className="w-48 text-white"></PhotoIcon>
            </div>
          </span>
        </div>

        {/* Product info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <div className="">We couldn't find any product at that address!</div>
          <div className="flex-1 space-y-3 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getAddItemToOrderError(error?: ErrorResult): string | undefined {
  if (!error || !error.errorCode) {
    return undefined;
  }
  switch (error.errorCode) {
    case ErrorCode.OrderModificationError:
    case ErrorCode.OrderLimitError:
    case ErrorCode.NegativeQuantityError:
    case ErrorCode.InsufficientStockError:
      return error.message;
  }
}
