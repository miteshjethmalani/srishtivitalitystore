import { DataFunctionArgs, MetaFunction } from '@remix-run/server-runtime';
import { useLoaderData, useParams } from '@remix-run/react';
import { sdk } from '../../graphqlWrapper';
import { CollectionCard } from '~/components/collections/CollectionCard';
import { ProductCard } from '~/components/products/ProductCard';
import { Breadcrumbs } from '~/components/Breadcrumbs';
import { APP_META_TITLE } from '~/constants';
import { filteredSearchLoader } from '~/utils/filtered-search-loader';
import { useRef, useState } from 'react';
import { FacetFilterTracker } from '~/components/facet-filter/facet-filter-tracker';
import FacetFilterControls from '~/components/facet-filter/FacetFilterControls';
import { FiltersButton } from '~/components/FiltersButton';
import { Container } from 'react-bootstrap';
import Pagination, {
  getCurrentSelectedPage,
} from '~/components/pagination/Pagination';

export const meta: MetaFunction = ({ data }) => {
  const metaTitle = (data?.collection?.customFields?.metaTitle || data?.collection?.name);
  return {
    title:  metaTitle ? `${metaTitle} - ${APP_META_TITLE}` : APP_META_TITLE,
    description: data?.collection?.customFields?.metaDescription,
    keywords: data?.collection?.customFields?.keywords
  };
};


export async function loader({ params, request, context }: DataFunctionArgs) {
  const { result, resultWithoutFacetValueFilters, facetValueIds } =
    await filteredSearchLoader({
      params,
      request,
      context,
    });
  const collection = (await sdk.collection({ slug: params.slug })).collection;
  if (!collection?.id || !collection?.name) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  return {
    collection,
    result,
    resultWithoutFacetValueFilters,
    facetValueIds,
    pageNumber: getCurrentSelectedPage(request.url),
  };
}

export default function CollectionSlug() {
  const {
    collection,
    result,
    resultWithoutFacetValueFilters,
    facetValueIds,
    pageNumber,
  } = useLoaderData<typeof loader>();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const facetValuesTracker = useRef(new FacetFilterTracker());
  facetValuesTracker.current.update(
    result,
    resultWithoutFacetValueFilters,
    facetValueIds,
  );

  return (
    <div className=" m-5 mt-2">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
          {collection.name}
        </h2>

        <FiltersButton
          filterCount={facetValueIds.length}
          onClick={() => setMobileFiltersOpen(true)}
        />
      </div>

      <Breadcrumbs items={collection.breadcrumbs}></Breadcrumbs>

      <div className="mt-2 row">
        <div className="col-lg-3">
          <FacetFilterControls
            facetFilterTracker={facetValuesTracker.current}
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
          />
        </div>
        <Container fluid className="mt-12 col-lg-9">
          <div className="row">
            {result.items.map((item) => (
              <div
                key={item.productId}
                className="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2 p-3 position-relative"
              >
                <ProductCard {...item}></ProductCard>
              </div>
            ))}
          </div>

          <Pagination
            pageNumber={parseInt(pageNumber || '1') || 1}
            totalItems={result.totalItems}
          />
        </Container>
      </div>
    </div>
  );
}

export function CatchBoundary() {
  return (
    <div className="m-5">
      <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
        Collection not found!
      </h2>
      <div className="mt-6 grid sm:grid-cols-5 gap-x-4">
        <div className="space-y-6">
          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
        </div>
        <div className="sm:col-span-5 lg:col-span-4">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <div className="h-64 bg-slate-200 rounded"></div>
            <div className="h-64 bg-slate-200 rounded"></div>
            <div className="h-64 bg-slate-200 rounded"></div>
            <div className="h-64 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
