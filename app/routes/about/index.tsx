import { APP_META_TITLE } from '~/constants';
import { LinksFunction, MetaFunction } from '@remix-run/server-runtime';
import { Typography, Card, CardHeader, CardBody } from '@material-tailwind/react';

export const meta: MetaFunction = ({ data }) => {
  return {
    title: `About Us - ${APP_META_TITLE}`

  };
};

export default function About() {
  return (
    <div className="block w-full text-white mx-auto max-w-screen-xl p-2 lg:pl-6 text-gray-900 mt-4">
      <Card className="mt-6 w-full">
        <CardBody>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">About Us</h2>
            <p className="text-gray-600">Welcome to {APP_META_TITLE}! We are dedicated to providing you with top-quality products and exceptional service. Our journey began with a passion for delivering excellence to our customers.</p>
            <p className="text-gray-600">At {APP_META_TITLE}, we curate a selection of products that align with your lifestyle and needs. Our commitment to innovation and customer satisfaction drives everything we do.</p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Our Vision</h3>
            <p className="text-gray-600">Our vision is to become a recognized leader in our industry, known for our integrity, product quality, and customer-centric approach. We aim to inspire positive change through our offerings.</p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-600">Our mission is to provide you with an unparalleled shopping experience. We are dedicated to sourcing products that enhance your well-being and cater to your unique preferences. Your satisfaction is our success.</p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Why Choose Us?</h2>
            <p className="text-gray-600">Discover the reasons why our e-commerce store stands out from the rest:</p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Wide Range of Products</h3>
            <p className="text-gray-600">Explore a vast selection of products that cater to your various needs, from fashion and electronics to home essentials.</p>
          </section>
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Quality and Authenticity</h3>
            <p className="text-gray-600">We are committed to providing you with genuine, top-notch products sourced from trusted suppliers. Your satisfaction is our priority.</p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Best Price</h3>
            <p className="text-gray-600">We strive to offer you unbeatable deals and
              competitive prices on a wide range of products. From
              Crystals to services, find incredible value without compromising
              on quality. Shop smart and save big with our best
              price guarantee. Experience the joy of getting the
              most bang for your buck with our platform.</p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Fast and Reliable Shipping</h3>
            <p className="text-gray-600">Experience hassle-free and prompt delivery with our efficient shipping services, ensuring your orders reach your doorstep on time.</p>
          </section>
        </CardBody>
      </Card>

    </div>
  );
}
