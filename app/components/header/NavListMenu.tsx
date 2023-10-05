import { ChevronDownIcon, RocketLaunchIcon, Square3Stack3DIcon } from "@heroicons/react/24/outline";
import {
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Collapse,
  ListItem,
  ListItemSuffix,
  List,
} from "@material-tailwind/react";
import { useNavigate } from "@remix-run/react";
import { createElement, useState } from "react";

interface props {
  collection: Array<any>;
  title: string;
  toggleIsNavOpen: Function;
}
export function NavListMenu(props: props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const renderItems = props.collection.map(({ id, name, url, asset }) => (
    <MenuItem onClick={() => {navigate(url); props.toggleIsNavOpen()} } key={id} className="flex items-center gap-3 rounded-lg">
      <img
        alt={`Category ${name}`}
        className="h-14 w-14"
        src={asset} />

      <span
        className="flex text-deep-purple items-center text-lg"
      >
        {name}
      </span>

    </MenuItem>
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
          <Typography as="div">
            <ListItem
              className="flex items-center gap-1 py-1 pr-2"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              <Square3Stack3DIcon className="h-[18px] w-[18px]" />
              {props.title}
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <div className="grid grid-cols-4 gap-y-2">{renderItems}</div>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </>
  );
}