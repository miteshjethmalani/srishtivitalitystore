import { createElement, useState } from "react";
import {
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    IconButton,
} from "@material-tailwind/react";
import { InboxArrowDownIcon, KeyIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";
import { upperCase } from "lodash";


export function ProfileMenu(props:any) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {activeCustomer} = props;
    const {firstName='', lastName=''} = activeCustomer;
    
    const closeMenu = () => setIsMenuOpen(false);
    const profileMenuItems = [
        {
            label: "My Profile",
            icon: UserCircleIcon,
            url: "/account/",
        },

        {
            label: "Purchase History",
            icon: InboxArrowDownIcon,
            url: "/account/history",
        },{
            label: "Update Password",
            icon: KeyIcon,
            url: "/account/password",
        },
    ];


    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                
                    <IconButton size="sm" className="rounded-full">
                      <span className="bold">{upperCase(firstName.charAt(0)+lastName.charAt(0))}</span>  
                    </IconButton>


            </MenuHandler>
            <MenuList className="p-1">
                {profileMenuItems.map(({ label, icon, url }, key) => {
                    return (
                        <Link to={url} key={key}>
                            <MenuItem
                                key={label}
                                onClick={closeMenu}
                                className={`flex items-center gap-2 rounded`}
                            >
                                {createElement(icon, {
                                    className: `h-4 w-4`,
                                    strokeWidth: 2,
                                })}
                                <Typography
                                    as="span"
                                    variant="small"
                                    className="font-normal"
                                    color={"inherit"}
                                >
                                    {label}
                                </Typography>
                            </MenuItem>
                        </Link>
                    );
                })}
            </MenuList>
        </Menu>
    );
}
