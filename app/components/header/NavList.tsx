import { AtSymbolIcon, CodeBracketSquareIcon, CubeTransparentIcon, InformationCircleIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { NavListMenu } from "./NavListMenu";
import {
  MenuItem,
  List,
} from "@material-tailwind/react";
import { createElement } from "react";
import { Link, useNavigate } from "@remix-run/react";
import { SearchBar } from "./SearchBar";
import { map } from "lodash";
import { ASSET_URL } from "~/constants";

interface props {
  collection: Array<any>
  toggleIsNavOpen: Function
  isNavOpen: boolean;
}
export function NavList(props: props) {
  const navigate = useNavigate();

  const navListItems = [
    {
      label: "About",
      icon: InformationCircleIcon,
      url: "/about"
    }, {
      label: "Contact",
      icon: AtSymbolIcon,
      url: "contactUs"
    }
  ];
  const categoriesCollection = map(props.collection, (coll) => {
    const { id, name, slug, featuredAsset } = coll;
    return {
      id,
      name,
      url: '/collections/' + slug,
      asset: featuredAsset.preview + '?preset=thumb',
    }
  });
  const consultationCollection = [{
    id: 'tarotReading',
    name: 'Tarot Reading',
    url: '/consultation/tarotreading',
    asset: ASSET_URL + '/preview/0e/tarot-reading__preview.jpg?preset=thumb'
  }, {
    id: 'crystalConsultation',
    name: "Crystal Consultation",
    url: '/consultation/crystalconsultation',
    asset: ASSET_URL + '/preview/e9/crystals-consultation__preview.png?preset=thumb'
  }, {
    id: 'crystalHealing',
    name: "Crystal Healing",
    url: '/consultation/crystalhealing',
    asset: ASSET_URL + '/preview/55/crystals-healing__preview.png?preset=thumb'
  }]
  return (
    <List className="mb-4 mt-2 flex flex-col text-deep-purple gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <NavListMenu isNavOpen={props.isNavOpen} toggleIsNavOpen={props.toggleIsNavOpen} title={"Categories"} collection={categoriesCollection} />
      <NavListMenu isNavOpen={props.isNavOpen} toggleIsNavOpen={props.toggleIsNavOpen} title={"Consultation"} collection={consultationCollection} />
      {navListItems.map(({ label, icon, url }, key) => (
        <MenuItem key={label} onClick={() => { navigate(url) }} className="flex items-center gap-2 lg:rounded-full">
          {createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
          {label}
        </MenuItem>
      ))}
      <div className="relative flex w-full gap-2 md:w-max">
        <SearchBar />
      </div>
    </List>
  );
}
