"use client"
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { CgProfile } from "react-icons/cg";
import { HiOutlineInboxArrowDown } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { GrProjects } from "react-icons/gr";
import Link from 'next/link';
import { MdManageAccounts } from "react-icons/md";
import { RiUserSettingsFill } from "react-icons/ri";
export default function ProfileHeader() {
    const path = usePathname();
    const [showDropdown, setShowDropdown] = useState(false);

    const links = [
        { label: "Profile", path: "/profile", icon: <CgProfile /> },
        { label: "Projects", path: "/profile/projects", icon: <GrProjects /> },
        { label: "Inbox", path: "/profile/inbox", icon: <HiOutlineInboxArrowDown /> },
        { label: "Settings", path: "/profile/settings", icon: <IoSettingsOutline /> },
    ];

    const settingsLinks = [
        { label: "Profile Settings", path: "/profile/settings", icon: <RiUserSettingsFill /> },
        { label: "Account", path: "/profile/settings/account", icon: <MdManageAccounts /> },
        { label: "Additional", path: "/profile/settings/additional", icon: <MdManageAccounts /> },
    ];

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };
    const handleSettingsLinkClick = () => {
        setShowDropdown(false);
    };

    return (
        <div className='flex justify-center items-center rounded-bl-md  rounded-br-md'>
            <MaxWidthWrapper>
                <div className='h-12 w-[30vw] mx-auto border rounded-bl-lg rounded-br-lg'>
                    <div className="hidden md:flex justify-center items-center flex-grow gap-4 ">
                        <div className="md:flex justify-center items-center gap-2">
                            {links.map((link) => (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    passHref
                                    className={`flex items-center gap-2 py-2  text-gray-700 mr-4 font-medium font-poppins text-md mb-2 group  transition duration-300 ${
                                        path === link.path ? 'text-blue-500 border-b border-blue-500' : ''
                                    }`}
                                >
                                    <span className='w-4 h-4'>{link.icon}</span> {link.label}
                                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black"></span>
                                </Link>
                            ))}
                            {/* Dropdown for Settings */}
                            {/* <div className="relative inline-block text-left">
                                <button
                                    className={`flex items-center gap-2 py-2 text-gray-700 mr-4 font-medium font-poppins text-md mb-2 group  transition duration-300 ${
                                        path === '/profile/settings' || path ==='/profile/settings/account' || path ==='/profile/settings/additional' ? 'text-blue-500 border-b border-blue-500' : ''
                                    }`}
                                    onClick={handleDropdownToggle}
                                >
                                    <IoSettingsOutline className="w-4 h-4" />
                                    Settings
                                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black"></span>
                                </button>
                                {showDropdown && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                            {settingsLinks.map((settingsLink) => (
                                                <Link
                                                    key={settingsLink.path}
                                                    href={settingsLink.path}
                                                    onClick={handleSettingsLinkClick}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem"
                                                >
                                                   
                                                        {settingsLink.label}
                                                    
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div> */}
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    );
}
