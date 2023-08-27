import { useLoaderData } from '@remix-run/react';
import { getCollections } from '~/providers/collections/collections';
import { CollectionCard } from '~/components/collections/CollectionCard';
import { BookOpenIcon } from '@heroicons/react/24/solid';
import { LoaderArgs } from '@remix-run/server-runtime';
import { Typography, Carousel, Button } from '@material-tailwind/react';

export async function loader({ request }: LoaderArgs) {
  const collections = await getCollections(request);
  return {
    collections,
  };
}

export default function Index() {
  const { collections } = useLoaderData<typeof loader>();
  const latestCollection = collections[collections.length-1] || {};
  const headerImage = latestCollection?.featuredAsset?.preview;
  return (
    <>
      <Carousel className="rounded-xl h-96">
        <div className="relative h-96 h-96">
          <img
            src={latestCollection?.featuredAsset?.preview}
            alt="image 1"
            className="h-96 w-full object-cover"
          />
          <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
            <div className="w-3/4 text-center md:w-2/4">
              <Typography
                variant="h4"
                color="white"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
              >
                Discover the Best Deals!
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-12 opacity-80"
              >
                Explore our wide range of products and find unbeatable deals on your favorite items.
              </Typography>
              
            </div>
          </div>
        </div>
      </Carousel>

      <section aria-labelledby="category-heading" className="m-10 mx-3 text-center">
        <Typography variant="h1">Shop by Category</Typography>
        <div className="m-5">
          <div className="row">
            {collections.map((collection) => (
              <div key={collection.id}>
                <CollectionCard collection={collection} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
