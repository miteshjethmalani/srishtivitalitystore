import { Facebook, Instagram, Twitter, Youtube } from 'react-bootstrap-icons';
import { APP_META_TITLE } from '~/constants';
import { LinksFunction } from '@remix-run/server-runtime';

export default function About() {
  return (
    <div className="m-5">
      <div className="breadcrumb-section breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <h1>About Us</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="feature-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="featured-text">
                <h2 className="pb-3">
                  Why <span className="orange-text">{APP_META_TITLE}</span>
                </h2>
                <div className="row">
                  <div className="col-lg-6 col-md-6 mb-4 mb-md-5">
                    <div className="list-box d-flex">
                      <div className="list-icon">
                        <i className="fas fa-shipping-fast"></i>
                      </div>
                      <div className="content">
                        <h3>Home Delivery</h3>
                        <p>
                          Get the ultimate convenience of home delivery with our
                          e-commerce platform. Shop from a wide range of
                          products online and have them delivered straight to
                          your doorstep. Enjoy a hassle-free shopping experience
                          and save time. Browse, select, and order with ease,
                          and let us take care of the rest. Experience the
                          convenience of home delivery with just a few clicks.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 mb-5 mb-md-5">
                    <div className="list-box d-flex">
                      <div className="list-icon">
                        <i className="fas fa-money-bill-alt"></i>
                      </div>
                      <div className="content">
                        <h3>Best Price</h3>
                        <p>
                          We strive to offer you unbeatable deals and
                          competitive prices on a wide range of products. From
                          electronics to fashion, home essentials to beauty
                          products, find incredible value without compromising
                          on quality. Shop smart and save big with our best
                          price guarantee. Experience the joy of getting the
                          most bang for your buck with our platform.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="section-title">
                <h3>About Me</h3>
              </div>
            </div>
          </div>
          {/* <div className="row">
            <figure className="figure">
              <img
                src="/Mitesh_Jethmalani.jpg"
                width={340}
                height={331}
                alt="Srishtivitality logo"
              />
              <figcaption className="figure-caption text-end">
              <h4>
                  Mitesh <span>Jethmalani</span>
                </h4>
              </figcaption>
            </figure>
            
          </div> */}
          <section className="team1 cid-rSW0omfh2R" id="team1-3f">
            <div className="container">
              <div className="row">
                <div className="card col-12 img-col align-center col-md-12 col-lg-6 border-0">
                  <img
                    src="/Mitesh_Jethmalani.jpg"
                    alt="Srishti"
                    className="rounded-circle"
                  />
                </div>

                <div className="card col-12 m-auto col-md-12 col-lg-6 border-0">
                  <div className="wrapper align-left">
                    <h5 className="card-title mbr-semibold mbr-white mbr-fonts-style display-5">
                      <strong>Er. Srishti Jethmalani</strong>
                    </h5>

                    <p className="mbr-text pb-2 mbr-white mbr-regular mbr-fonts-style display-7">
                      At {APP_META_TITLE}, we are a dynamic and dedicated group
                      of individuals working together to bring you the best
                      products and services. Our team is driven by a shared
                      passion for delivering exceptional customer experiences
                      and exceeding expectations.
                    </p>

                    <h6 className="card-phone mbr-semibold mbr-white mbr-fonts-style display-5">
                      <strong>+(91) 836 953 6738</strong>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
