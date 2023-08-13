import { RootLoaderData } from '~/root';
import { Link } from '@remix-run/react';
import { APP_META_TITLE } from '~/constants';
import { Col, Container, Row } from 'react-bootstrap';

const navigation = {
  support: [
    { name: 'FAQ', href: '/faq' },
    { name: 'Privacy Policy', href: '/privacypolicy' },
    { name: 'Terms', href: '/termsofuse' }
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Contact Us', href: '/contactus' },
  ],
};

export default function Footer({
  collections,
}: {
  collections: RootLoaderData['collections'];
}) {
  return (
    <footer
      className="mt-4 border-t bg-gray-50"
      aria-labelledby="footer-heading"
    >
      <Container className='mt-4'>
        <Row>
          <Col>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
              Shop
            </h3>
            <ul role="list" className="mt-4 space-y-4">
              {collections.map((collection) => (
                <li key={collection.id}>
                  <Link
                    className="text-base text-gray-500 hover:text-gray-600"
                    to={'/collections/' + collection.slug}
                    prefetch="intent"
                    key={collection.id}
                  >
                    {collection.name}
                  </Link>
                </li>
              ))}
            </ul>

          </Col>
          <Col>
            <div >
              <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
                Support
              </h3>
              <ul role="list" className="mt-4 space-y-4">
                {navigation.support.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-base text-gray-500 hover:text-gray-600"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
                Company
              </h3>
              <ul role="list" className="mt-4 space-y-4">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-base text-gray-500 hover:text-gray-600"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>

        <div
          className="text-center p-4"
        >
          © 2023 Copyright:
          <a className="text-reset fw-bold" href="#">
            {APP_META_TITLE}
          </a>
        </div>
      </Container>
    </footer>
  );
}
