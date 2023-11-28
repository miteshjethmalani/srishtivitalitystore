import { Link, useLoaderData, useNavigate } from '@remix-run/react';
import { getCollections } from '~/providers/collections/collections';
import { CollectionCard } from '~/components/collections/CollectionCard';
import { BookOpenIcon } from '@heroicons/react/24/solid';
import { LoaderArgs, MetaFunction } from '@remix-run/server-runtime';
import { Typography, Carousel, Button, IconButton } from '@material-tailwind/react';
import { APP_META_DESCRIPTION, APP_META_TITLE } from '~/constants';

export const meta: MetaFunction = () => {
  const title = `Discover the Power of Healing Crystal Stones – Shop Online at ${APP_META_TITLE} for an Elevated Well-being Experience in India.`
  return { title 
    , "og:title":title
    , description: APP_META_DESCRIPTION
    , keywords:["crystal", "Healing crystals", "healing stones", "gifts", "positive", "positive energy", "crystals for sale", "Reiki Crystal", "pyrite", "rose quartz", "tiger eye", "black tourmaline", "green aventurine", "citrine", "selenite"] 
    , "og:type": "website"
    , "og:url": "https://srishtivitality.in/"
    , "og:site_name": "Srishtivitality"
    , "twitter:title": title
    , "twitter:description": APP_META_DESCRIPTION
  };
};

export async function loader({ request }: LoaderArgs) {
  const collections = await getCollections(request);
  return {
    collections,
  };
}

export default function Index() {
  const { collections } = useLoaderData<typeof loader>();
  const latestCollection = collections[collections.length - 1] || {};
  const secondLatestCollection = collections[collections.length - 2] || {};
  const navigate = useNavigate();

  return (
    <>
      <Carousel
        prevArrow={({ handlePrev }) => (
          <IconButton
            aria-label='Previous'
            variant="text"
            color="white"
            size="lg"
            onClick={handlePrev}
            className="!absolute top-2/4 left-4 -translate-y-2/4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            aria-label='Next'
            variant="text"
            color="white"
            size="lg"
            onClick={handleNext}
            className="!absolute top-2/4 !right-4 -translate-y-2/4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </IconButton>
        )}
        loop={true} autoplay={true} className="h-96">
        <div className="relative h-96 h-96">
          <img
            src={latestCollection?.featuredAsset?.preview + "?preset=medium"}
            alt="Feature Product 1"
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
        <div className="relative h-96 h-96">
          <img
            src={secondLatestCollection?.featuredAsset?.preview + "?preset=medium"}
            alt="Feature Product 2"
            className="h-96 w-full object-cover"
          />
          <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
            <div className="w-3/4 text-center md:w-2/4">
              <Typography
                variant="h4"
                color="white"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
              >
                Explore our recently added collection!
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-12 opacity-80"
              >
                <Button onClick={() => navigate(`/collections/${secondLatestCollection.slug}`)} variant="gradient" color='deep-purple' className="rounded-full">
                  Shop {secondLatestCollection.name}
                </Button>
              </Typography>

            </div>
          </div>
        </div>
      </Carousel>

      <section className="m-10 mx-3 text-center">
        <Typography variant="h2" color="brown" className="divide-x-2 divide-gray-400">Shop by Category</Typography>
        <div className="m-5 mx-auto w-full max-w-7xl px-8">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {collections.map((collection) => (
              <div key={collection.id} className='mx-auto'>
                <CollectionCard collection={collection} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
