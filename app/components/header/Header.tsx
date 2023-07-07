import { Link } from '@remix-run/react';
import { SearchBar } from '~/components/header/SearchBar';
import { useRootLoader } from '~/utils/use-root-loader';
import { useScrollingUp } from '~/utils/use-scrolling-up';
import { CartFill, PersonFillGear, PersonCircle } from 'react-bootstrap-icons';
import { LinksFunction } from '@remix-run/server-runtime';
import {
  Container,
  Nav,
  NavDropdown,
  Navbar,
  Offcanvas,
} from 'react-bootstrap';
import { classNames } from '~/utils/class-names';
import { useState } from 'react';
import { CartTray } from '../cart/CartTray';
import { CartLoaderData } from '~/routes/api/active-order';

export const links: LinksFunction = () => {
  return [];
};

export function Header({
  activeOrder,
  adjustOrderLine,
  removeItem,
}: {
  activeOrder: any;
  adjustOrderLine?: (lineId: string, quantity: number) => void;
  removeItem?: (lineId: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const data = useRootLoader();
  const isSignedIn = !!data.activeCustomer.activeCustomer?.id;
  const isScrollingUp = useScrollingUp();
  const expand = 'lg';
  const cartQuantity = activeOrder?.totalQuantity ?? 0;

  const pageUtils = (showForLg: boolean) => {
    return (
      <div
        className={classNames(
          'd-flex align-items-center',
          showForLg
            ? ' d-xs-flex d-sm-flex d-md-flex d-lg-none d-xl-none d-xxl-none'
            : ' d-none d-xs-none d-sm-none d-md-none d-lg-flex d-xl-flex d-xxl-flex',
        )}
      >
        <button
          onClick={() => {
            setOpen(!open);
          }}
          type="button"
          className="btn position-relative me-3"
        >
          <CartFill size={20} className=""></CartFill>
          {cartQuantity ? (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
              {cartQuantity}
            </span>
          ) : (
            ''
          )}
        </button>

        <CartTray
          open={open}
          onClose={() => setOpen(false)}
          activeOrder={activeOrder}
          adjustOrderLine={adjustOrderLine}
          removeItem={removeItem}
        />

        <Link className="text-black" to={isSignedIn ? '/account' : '/sign-in'}>
          {isSignedIn? (<PersonFillGear size={30} className="me-3"></PersonFillGear>):( <PersonCircle size={30} className="me-3"></PersonCircle>) }
          
        </Link>
      </div>
    );
  };
  return (
    <Navbar
      sticky="top"
      key={expand}
      bg="light"
      className="shadow p-2"
      expand={expand}
    >
      <Navbar.Brand>
        <Link to="/" aria-label="Logo">
          <img
            src="/Srishtivitality Logo.png"
            width={140}
            height={50}
            alt="Srishtivitality logo"
          />
        </Link>
      </Navbar.Brand>
      {pageUtils(true)}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="justify-content-center flex-grow-1 pe-3">
          <Link className="nav-link" to="/about" key={'about'}>
            About
          </Link>
          <NavDropdown
            title="Categories"
            id={`offcanvasNavbarDropdown-expand-${expand}`}
          >
            {data.collections?.map((collection) => (
              <NavDropdown.Item
                href={'/collections/' + collection.slug}
                key={collection.id}>
                {collection.name}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
          <NavDropdown
            title="Book Consultation"
            id={`offcanvasNavbarDropdown-expand-${expand}`}
          >
            <NavDropdown.Item  href="/consultation/tarotreading">
              Tarot Reading
            </NavDropdown.Item>
            <NavDropdown.Item href="/consultation/crystalconsultation">
              Crystal Consultation
            </NavDropdown.Item>
            <NavDropdown.Item href="/consultation/crystalhealing">
              Crystal Healing
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/contactus">Contact Us</Nav.Link>
          <SearchBar />
        </Nav>
        {pageUtils(false)}
      </Navbar.Collapse>
    </Navbar>
  );
}
