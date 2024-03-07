"use client"
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { CgProfile } from "react-icons/cg";
import { HiOutlineInboxArrowDown } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { GrProjects } from "react-icons/gr";
import Link from 'next/link';
import { MdManageAccounts } from "react-icons/md";
import { RiUserSettingsFill } from "react-icons/ri";
import { useCookies } from 'next-client-cookies';
import domain from '@/helpers/constants';
import axios from 'axios';
export default function ProfileHeader() {
    const path = usePathname();
    const cookies = useCookies();
    const userId = cookies.get("userId") || "";
    const [isWorker, setIsWorker] = useState<boolean | null>(null);
    const links = [
        { label: "Profile", path: "/profile", icon: <CgProfile className='w-4 h-4'/> },
        { label: "Projects", path: "/profile/projects", icon: <GrProjects className='w-4 h-4' /> },
        { label: "Inbox", path: "/profile/inbox", icon: <HiOutlineInboxArrowDown className='w-4 h-4' /> },
        { label: "Settings", path: "/profile/settings", icon: <IoSettingsOutline className='w-4 h-4'/> },
    ];

    
    useEffect(() => {
        const fetchUserStatus = async () => {
          try {
            const response = await axios.get(`${domain}/api/v1/users/${userId}`);
            setIsWorker(response.data.type === 'worker');
          } catch (error) {
    
          }
        };
    
        fetchUserStatus();
      }, [userId]);
    
   

    return (
        <>
            <MaxWidthWrapper className='h-12 rounded-br-md rounded-bl-md border shadow-md mb-2 md:max-w-sm'>
                
                        <div className="flex justify-center items-center gap-2 ">
                            {links.map((link) => (
                            // Conditionally render the "Projects" link only if the user is a worker
                            !(link.label === "Projects" && !isWorker) &&
                            <Link
                                key={link.path}
                                href={link.path}
                                passHref
                                className={`flex items-center gap-2 py-2  text-gray-700 font-medium font-poppins md:text-md text-sm  group  transition duration-300 ${
                                    path === link.path ? 'text-blue-500 border-b border-blue-500' : ''
                                }`}
                            >
                                <span className='flex items-center gap-1'>{link.icon} {link.label}</span> 
                                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black"></span>
                            </Link>
                        ))}
                          
                        </div>
                   
                
            </MaxWidthWrapper>
        </>
    );
}
