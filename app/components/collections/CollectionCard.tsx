import { Link } from '@remix-run/react';
import { useState } from 'react';
import { CollectionsQuery } from '~/generated/graphql';
import { classNames } from '~/utils/class-names';
import { Button, Card, CardHeader, CardBody, Typography, CardFooter } from '@material-tailwind/react';

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
          'max-w-[300px] position-relative rounded hover-shadow text-center flex',
          isFocused ? 'opacity-75' : '',
        )}
      >
        <Card className="mt-6 w-96">
          <CardHeader color="deep-purple" className="relative ">
            <img src={collection.featuredAsset?.preview + '?w=300&h=300'} className="rounded img-fluid border mx-auto"></img>
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="deep-purple" className="mb-2">
              {collection.name}
            </Typography>
          </CardBody>
        </Card>


      </Link>
    </div>
  );
}
