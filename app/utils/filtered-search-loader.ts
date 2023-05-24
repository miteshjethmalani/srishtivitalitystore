import { DataFunctionArgs } from '@remix-run/cloudflare';
import { search, searchFacetValues } from '~/providers/products/products';
import { sdk } from '~/graphqlWrapper';
import { APP_NUMBER_OF_PRODUCTS_LISTING } from '~/constants';

/**
 * This loader deals with loading product searches, which is used in both the search page and the
 * category list page.
 */
export async function filteredSearchLoader({
  params,
  request,
}: DataFunctionArgs) {
  const url = new URL(request.url);
  const term = url.searchParams.get('q');
  const facetValueIds = url.searchParams.getAll('fvid');
  const page = url.searchParams.get('p') || `1`;
  const collectionSlug = params.slug;

  let resultPromises: [
    ReturnType<typeof search>,
    ReturnType<typeof searchFacetValues>,
  ];
  const searchResultPromise = search(
    {
      input: {
        groupByProduct: true,
        term,
        facetValueIds,
        collectionSlug: params.slug,
        skip: ((parseInt(page)-1) * APP_NUMBER_OF_PRODUCTS_LISTING),
        take: (parseInt(page) * APP_NUMBER_OF_PRODUCTS_LISTING)
      },
    },
    { request },
  );
  if (facetValueIds.length) {
    resultPromises = [
      searchResultPromise,
      searchFacetValues(
        {
          input: {
            groupByProduct: true,
            term,
            collectionSlug: params.slug
          },
        },
        { request },
      ),
    ];
  } else {
    resultPromises = [searchResultPromise, searchResultPromise];
  }
  const [result, resultWithoutFacetValueFilters] = await Promise.all(
    resultPromises,
  );
  return {
    term,
    facetValueIds,
    result: result.search,
    resultWithoutFacetValueFilters: resultWithoutFacetValueFilters.search,
  };
}
