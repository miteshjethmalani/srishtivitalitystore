import { RootLoaderData, links } from '~/root';
import { Typography } from '@material-tailwind/react';
import { Form, Link, useActionData, useFetcher } from '@remix-run/react';
import { APP_META_TITLE } from '~/constants';
import { chunk, isArray, map } from 'lodash';
import { DataFunctionArgs } from '@remix-run/server-runtime';
import { useRef } from 'react';


export async function action({ request, params }: DataFunctionArgs) {
  const body = await request.formData();
  const formAction = body.get('action');
  switch (formAction) {
    case "decline":
      console.log("decline")
      break;
    case "accept":
      console.log("accept")
      break;
  }
}

export default function Footer({
  collections,
}: {
  collections: RootLoaderData['collections'];
}) {

  const SITEMAP = [
    {
      title: "Categories",
      links: chunk(map(collections, (collection) => {
        return {
          name: collection.name,
          href: "/collections/" + collection.slug
        }
      }), 2)
    },

    {
      title: "support",
      links: [{ name: 'FAQ', href: '/faq' },
      { name: 'Privacy Policy', href: '/privacypolicy' },
      { name: 'Terms', href: '/termsofuse' }]
    }, {
      title: "company",
      links: [
        { name: 'About', href: '/about' },
        { name: 'Contact Us', href: '/contactus' },
      ]
    },
  ]

  const currentYear = new Date().getFullYear();
  const cookieFetcher = useFetcher();
  const data = useActionData<typeof action>();

  return (
    <footer className="relative w-full">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="mx-auto grid w-full grid-cols-1 gap-8 py-12 grid-cols-2 md:grid-cols-3">
          {SITEMAP.map(({ title, links }, key) => (
            <div key={title} className="w-full border">
              <Typography
                variant="small"
                color="brown"
                className="p-2 font-bold uppercase opacity-90 text-center border-b"
              >
                {title}
              </Typography>
              <ul className="m-4">
                {links.map((link: any, key) => (
                  <Typography key={key} as="li" color="blue-gray" className="font-normal text-deep-purple-900 mx-auto grid grid-cols-1 md:grid-cols-2">
                    {(isArray(link) ? link.map((obj: any) => (
                      <Link
                        key={obj.name}
                        to={obj.href}
                        className="inline-block py-1 pr-2 transition-transform hover:scale-105"
                      >
                        {obj.name}
                      </Link>)
                    ) : (<Link
                      to={link.href}
                      className="inline-block py-1 pr-2 transition-transform hover:scale-105"
                    >
                      {link.name}
                    </Link>))}
                  </Typography>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
          <Typography
            variant="small"
            className="mb-4 text-center font-normal text-deep-purple-900 md:mb-0"
          >
            &copy; {currentYear} {APP_META_TITLE}. All
            Rights Reserved.
          </Typography>
          <div className="flex gap-4 text-deep-purple-900 sm:justify-center">
            <Typography as="a" aria-label="facebookprofile" href="https://www.facebook.com/profile.php?id=100075490405591" target="_blank" className="opacity-80 transition-opacity hover:opacity-100">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </Typography>
            <Typography as="a" aria-label="instagramprofile" href="https://www.instagram.com/srishtivitality/" target="_blank" className="opacity-80 transition-opacity hover:opacity-100">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </Typography>
            <Typography as="a" aria-label="youtubechannel" href="https://www.youtube.com/@srishtivitality" target="_blank" className="opacity-80 transition-opacity hover:opacity-100">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"
                  clipRule="evenodd" />
              </svg>
            </Typography>
          </div>
        </div>
      </div>



     {/*  <div className="text-white py-7">

        <div
          className="max-w-screen-lg mx-auto fixed bg-purple-600 inset-x-5 p-2 bottom-4 rounded-lg drop-shadow-2xl flex gap-4 flex-wrap md:flex-nowrap text-center md:text-left items-center justify-center md:justify-between">
          <div className="w-full">This website uses cookies to ensure you get the best experience on our website.
            <a href="#" className="text-grey-600 whitespace-nowrap  hover:underline">Learn more</a></div>
          <div className="flex gap-4 items-center flex-shrink-0">
            <cookieFetcher.Form method='post' action='enable-analytics'>
              <button type="submit" value={"decline"} className="text-white-600 focus:outline-none hover:underline">Decline</button>
              <button type="submit" value={"accept"} className="bg-indigo-500 px-5 py-2 text-white rounded-md hover:bg-indigo-700 focus:outline-none">Allow Coockies</button>
            </cookieFetcher.Form>

          </div>
        </div>

      </div> */}

    </footer>
  );
}
