import { Link } from '@remix-run/react';
import { SearchBar } from '~/components/header/SearchBar';
import { useRootLoader } from '~/utils/use-root-loader';
import { useScrollingUp } from '~/utils/use-scrolling-up';
import { LinksFunction } from '@remix-run/server-runtime';

import { classNames } from '~/utils/class-names';
import { useEffect, useState } from 'react';
import { CartTray } from '../cart/CartTray';
import { CartLoaderData } from '~/routes/api/active-order';
import {
  Navbar,
  Typography,
  Collapse,
  Input,
  Button,
  Badge,
  IconButton,
} from "@material-tailwind/react";
import { Bars2Icon, ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { NavList } from './NavList';
import { ProfileMenu } from './ProfileMenu';

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
  const [isNavOpen, setIsNavOpen] = useState(false);


  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);

  return (
    <>
      <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
        <div className="relative mx-auto flex items-center text-blue-gray-900">
          <Link to="/" aria-label="Logo">
            <img
              src="/Srishtivitality Logo.png"
              width={140}
              height={50}
              alt="Srishtivitality logo"
            />
          </Link>
          <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
            <NavList collection={data.collections} />
          </div>
          <div className="ml-auto mr-2">
            <Badge overlap="circular" content={cartQuantity} >
              <IconButton
                aria-label="cart"
                size="sm"
                color="blue-gray"
                variant="text"
                onClick={() => {
                  setOpen(!open);
                }}
                className="ml-auto mr-2 "
              >
                <ShoppingCartIcon
                  className="h-4 w-4" />
              </IconButton>
            </Badge>
            <div className='ml-2 inline-flex'>

              {isSignedIn ? (<ProfileMenu activeCustomer={data.activeCustomer.activeCustomer} />) :
                (
                  <Link to="/sign-in" aria-label="Sign In">
                    <IconButton
                      aria-label="profile menu"
                      size="sm"
                      color="blue-gray"
                      variant="text"
                    >
                      <UserCircleIcon className="h-6 w-6" />
                    </IconButton>
                  </Link>)}
            </div>
            <IconButton
              aria-label="menu"
              size="sm"
              color="blue-gray"
              variant="text"
              onClick={toggleIsNavOpen}
              className="ml-auto mr-2 lg:hidden"
            >
              <Bars2Icon className="h-6 w-6" />
            </IconButton>
          </div>
        </div>
        <Collapse open={isNavOpen} className="overflow-scroll">
          <NavList collection={data.collections} />
        </Collapse>
      </Navbar>
      <CartTray
        open={open}
        onClose={() => setOpen(false)}
        activeOrder={activeOrder}
        adjustOrderLine={adjustOrderLine}
        removeItem={removeItem}
      />
    </>
  );
}
