import { AtSymbolIcon, CodeBracketSquareIcon, CubeTransparentIcon, InformationCircleIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { NavListMenu } from "./NavListMenu";
import {
  Typography,
  MenuItem,
  Input,
  Button,
} from "@material-tailwind/react";
import { createElement } from "react";
import { Link } from "@remix-run/react";
import { SearchBar } from "./SearchBar";
import { map } from "lodash";

interface props {
  collection: Array<any>
}
export function NavList(props: props) {
  const navListItems = [
    {
      label: "About",
      icon: InformationCircleIcon,
      url: "/about"
    },{
      label: "Contact",
      icon: AtSymbolIcon,
      url:"contactUs"
    }
  ];
  const categoriesCollection = map(props.collection, (coll) => {
    const { id, name, slug, featuredAsset } = coll;
    return {
      id,
      name,
      url: '/collections/' + slug,
      asset: featuredAsset.preview,
    }
  });
  const consultationCollection = [{
    id: 'tarotReading',
    name: 'Tarot Reading',
    url: '/consultation/tarotreading',
  },{
    id: 'crystalConsultation',
    name: "Crystal Consultation",
    url: '/consultation/crystalconsultation',
  },{
    id: 'crystalHealing',
    name: "Crystal Healing",
    url: '/consultation/crystalhealing',
  }]
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <NavListMenu title={"Categories"} collection={categoriesCollection} />
      <NavListMenu title={"Consultation"} collection={consultationCollection} />
      {navListItems.map(({ label, icon, url }, key) => (
        <Typography
          key={label}
          color="deep-purple-900"
          className="font-normal"
        >
          <Link to={url}>
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              {createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
              {label}
            </MenuItem>
          </Link>
        </Typography>
      ))}
      <div className="relative flex w-full gap-2 md:w-max">
        <SearchBar />
      </div>
    </ul>
  );
}
