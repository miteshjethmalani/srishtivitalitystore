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

    <div className="text-center">
      <Link
        to={'/collections/' + collection.slug}
        prefetch="intent"
        key={collection.id}
        onMouseOver={() => setFocused(true)}
        onMouseLeave={() => setFocused(false)}
        className={classNames(
          'max-w-[300px] position-relative rounded hover-shadow text-center',
          isFocused ? 'opacity-75' : '',
        )}
      >
        <img src={collection.featuredAsset?.preview + '?w=300&h=300'} className="rounded img-fluid border mx-auto"></img>
      </Link>
      <h5 className="text-center mt-3 mb-3">{collection.name}</h5>
      <p className="text-center"> <Link
      className='btn btn-success'
        to={'/collections/' + collection.slug}
      >
        Go Shop
      </Link>
      </p>
    </div>
  );
}
