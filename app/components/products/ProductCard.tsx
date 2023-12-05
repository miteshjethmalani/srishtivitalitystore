import { SearchQuery } from '~/generated/graphql';
import { Link } from '@remix-run/react';
import { Price } from './Price';

export type ProductCardProps = SearchQuery['search']['items'][number];
export function ProductCard({
  productAsset,
  productName,
  slug,
  priceWithTax,
  currencyCode,
}: ProductCardProps) {
  return (
    <Link className="flex flex-col" prefetch="intent" to={`/products/${slug}`}>
      <img
        className="rounded-xl flex-grow object-cover"
        alt={productName}
        src={productAsset?.preview + '?preset=medium'}
      />
      <div className="h-2" />
      <div className="text-md text-deep-purple-500">{productName}</div>
      <div className="text-lg font-medium text-brown-500">
        <Price priceWithTax={priceWithTax} currencyCode={currencyCode} />
      </div>
    </Link>
  );
}
