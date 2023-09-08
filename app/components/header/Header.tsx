import { Link, useNavigate } from '@remix-run/react';
import { useRootLoader } from '~/utils/use-root-loader';
import { LinksFunction } from '@remix-run/server-runtime';
import { useEffect, useState } from 'react';
import { CartTray } from '../cart/CartTray';
import {
  Navbar,
  Collapse,
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
  const cartQuantity = activeOrder?.totalQuantity ?? 0;
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();


  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);

  return (
    <>
      <Navbar className=" sticky top-0 z-10 h-max max-w-full mx-auto max-w-screen-xl lg:pl-1 text-deep-purple-900">
        <div className="relative mx-auto flex items-center">
          <Link to="/" aria-label="Logo">
            <img
              src="/Srishtivitality_Logo.png"
              width={140}
              height={50}
              alt="Srishtivitality logo"
            />
          </Link>
          <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
            <NavList collection={data.collections} />
          </div>
          <div className="ml-auto mr-2">
            <Badge content={cartQuantity} >
              <IconButton
                aria-label="cart"
                size="sm"
                color="deep-purple"
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
                    <IconButton
                      aria-label="profile menu"
                      size="sm"
                      color="deep-purple"
                      variant="text"
                      onClick={()=>{navigate("/sign-in")}}
                    >
                      <UserCircleIcon className="h-6 w-6" />
                    </IconButton>
                  )}
            </div>
            <IconButton
              aria-label="menu"
              size="sm"
              color="deep-purple"
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
