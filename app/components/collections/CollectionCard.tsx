import { Link } from '@remix-run/react';
import { useState } from 'react';
import { CollectionsQuery } from '~/generated/graphql';
import { classNames } from '~/utils/class-names';

export function CollectionCard({
  collection,
}: {
  collection: CollectionsQuery['collections']['items'][number];
}) {
  const [isFocused, setFocused] = useState(false);
  return (
    <Link
      to={'/collections/' + collection.slug}
      prefetch="intent"
      key={collection.id}
      onMouseOver={()=> setFocused(true)}
      onMouseLeave={()=> setFocused(false)}
      className={classNames(
        'max-w-[300px] position-relative rounded hover-shadow',
        isFocused ? 'opacity-75' : '',
      )}
    >
      <span aria-hidden="true" className="">
        <div className="w-100 h-100">
          <img className='w-100 h-100' src={collection.featuredAsset?.preview + '?w=300&h=300'} />
        </div>
      </span>
      <span
        aria-hidden="true"
        className="absolute w-full bottom-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
      />
      <span className="absolute w-full bottom-2 mt-auto text-center text-xl font-bold text-white">
        {collection.name}
      </span>
    </Link>
  );
}
