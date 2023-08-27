import { ChevronDownIcon, RocketLaunchIcon, Square3Stack3DIcon } from "@heroicons/react/24/outline";
import {
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Card,
} from "@material-tailwind/react";
import { Link } from "@remix-run/react";
import { createElement, useState } from "react";

interface props {
  collection: Array<any>;
  title: string;
}
export function NavListMenu(props: props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography className="font-normal">
            <MenuItem className="hidden items-center gap-2 text-blue-gray-900 lg:flex lg:rounded-full">
              <Square3Stack3DIcon className="h-[18px] w-[18px]" /> {props.title}{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden gap-3 overflow-visible lg:grid">
          <ul className="col-span-4 flex w-full flex-col gap-1">
            {renderItems}
          </ul>
        </MenuList>
        <MenuItem className="flex items-center gap-2 text-blue-gray-900 lg:hidden">
          <Square3Stack3DIcon className="h-[18px] w-[18px]" /> {props.title}{" "}
        </MenuItem>
        <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
          {renderItems}
        </ul>
      </Menu>
    </>
  );
}