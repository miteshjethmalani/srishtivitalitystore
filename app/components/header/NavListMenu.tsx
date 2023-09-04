import { ChevronDownIcon, RocketLaunchIcon, Square3Stack3DIcon } from "@heroicons/react/24/outline";
import {
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Collapse,
  ListItem,
} from "@material-tailwind/react";
import { Link } from "@remix-run/react";
import { createElement, useState } from "react";

interface props {
  collection: Array<any>;
  title: string;
}
export function NavListMenu(props: props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderItems = props.collection.map(({ id, name, url, asset }) => (
    <Link to={url} key={id}>
      <MenuItem className="p-0">
        <label
          htmlFor="item-1"
          className="flex cursor-pointer items-center gap-2 p-2"
        >
          <img
            className="h-6 w-6"
            src={asset} />
          {name}
        </label>
      </MenuItem>
    </Link>
  ));

  return (
    <>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-normal">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              <Square3Stack3DIcon className="h-[18px] w-[18px]" />
              {props.title}
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-4 gap-y-2">{renderItems}</ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </>
  );
}