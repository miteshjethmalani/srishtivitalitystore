import { useLoaderData } from '@remix-run/react';
import { getCollections } from '~/providers/collections/collections';
import { CollectionCard } from '~/components/collections/CollectionCard';
import { BookOpenIcon } from '@heroicons/react/24/solid';
import { LoaderArgs } from '@remix-run/server-runtime';
import { Container } from 'react-bootstrap';

export async function loader({ request }: LoaderArgs) {
  const collections = await getCollections(request);
  return {
    collections,
  };
}

export default function Index() {
  const { collections } = useLoaderData<typeof loader>();
  const headerImage = collections[0]?.featuredAsset?.preview;
  return (
    <>
      <div className="relative">
        {/* Decorative image and overlay */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
         {/*  {headerImage && (
            <img
              className="absolute inset-0 w-full"
              src={headerImage + '?w=800'}
              alt="header"
            />
          )} */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-400 to-black mix-blend-darken" />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gray-900 opacity-50"
        />
        <div className="relative max-w-3xl mx-auto py-32 px-6 flex flex-col items-center text-center sm:py-64 lg:px-0">
          <div className="relative bg-zinc-800 bg-opacity-0 rounded-lg p-0">
            <h1 className="text-6xl text-transparent bg-clip-text font-extrabold tracking-normal lg:text-6xl bg-gradient-to-r from-yellow-600 via-red-500 to-blue-600">
              Srishtivitality
            </h1>
          </div>
        </div>
      </div>

      <section aria-labelledby="category-heading" className="m-10 mx-3">
        <h2 className="display-6  ">Shop by Category</h2>
        <Container fluid className="mt-12">
          <div className="row">
            {collections.map((collection) => (
              <div key={collection.id} className="col-xs-12 col-lg-4 col-sm-12 col-md-6 position-relative">
                <CollectionCard  collection={collection} />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
