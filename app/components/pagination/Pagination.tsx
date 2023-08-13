import { APP_NUMBER_OF_PRODUCTS_LISTING } from '~/constants';
import { ceil, map, range } from 'lodash';
import { Form, Link, useSearchParams, useSubmit } from '@remix-run/react';
import { classNames } from '~/utils/class-names';
import { useRef } from 'react';

function getTotalNumberOfPages(totalItems: number) {
  return ceil(totalItems / APP_NUMBER_OF_PRODUCTS_LISTING);
}

export function getCurrentSelectedPage(currentUrl: any) {
  const url = new URL(currentUrl);
  return url.searchParams.get('p');
}

export default function Pagination({
  pageNumber,
  totalItems,
}: {
  pageNumber: number;
  totalItems: number;
}) {
  const pageArr = range(1, getTotalNumberOfPages(totalItems) + 1, 1);
  if (pageArr?.length <= 1) {
    return null;
  }
  let [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.getAll('q');
  const p = searchParams.get('p') || '1';
  const facetValueIds = searchParams.getAll('fvid');
  const submit = useSubmit();
  const formRef = useRef<HTMLFormElement>(null);
  const pageRef = useRef<HTMLInputElement>(null);

  const pageList = map(pageArr, (pageNum) => (
    <li
      key={'page' + pageNum}
      className={classNames('page-item', pageNum == pageNumber ? 'active' : '')}
    >
      <a
        className="page-link"
        onClick={(e) => {
          updatePageNumber(e, `${pageNum }`);
        }}
      >
        {pageNum}
      </a>
    </li>
  ));

  const facetValueMap =
    (facetValueIds?.length &&
      map(facetValueIds, (id) => {
        return <input key={id} type="hidden" name="fvid" value={id} />;
      })) ||
    '';

  const updatePageNumber = (e: any, pageNumber: string) => {
    e.preventDefault();
    if (pageRef.current) {
      pageRef.current.value = pageNumber;
    }
    submit(formRef.current, { replace: false });
  };
  return (
    <Form ref={formRef} className="mt-4 border-t border-gray-200" method="get">
      <input type="hidden" name="q" value={q} />
      <input type="hidden" ref={pageRef} name="p" value={p} />
      {facetValueMap}
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li
            className={classNames(
              'page-item',
              pageNumber == 1 ? 'disabled' : '',
            )}
          >
            <a
              className="page-link"
              onClick={(e) => {
                updatePageNumber(e, `${pageNumber - 1 || 1}`);
              }}
              href="#"
            >
              Previous
            </a>
          </li>
          {pageList}
          <li
            className={classNames(
              'page-item',
              pageNumber == pageArr.length ? 'disabled' : '',
            )}
          >
            <a
              className="page-link"
              onClick={(e) => {
                updatePageNumber(e, `${pageNumber + 1}`);
              }}
              href="#"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </Form>
  );
}
