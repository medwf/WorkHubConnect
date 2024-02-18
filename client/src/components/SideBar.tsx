"use client"
import React,{useState} from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  AppWindow,
  Bell,
  Calculator,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Cookie,
  CreditCard,
  Inbox,
  MessageSquare,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Bilbo } from 'next/font/google';
import Link from 'next/link';

export default function SideBar({ params }: any) {
  const [isOpen, setIsOpen] = useState(true); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const menuList = [
    {
      group: "General",
      items: [
        {
          link: '/',
          icon:<User/>,
          text: 'Profile'
        },
        {
          link: '/',
          icon:<Inbox/>,
          text: 'Inbox'
        },
        {
          link: '/',
          icon:<AppWindow />,
          text: 'Billing'
        },
        {
          link: "/",
          icon:<MessageSquare />,
          text: 'Logs'
        }
      ]
    },
    {
      group: "Settings",
      items: [
        {
          link: '/',
          icon:<Settings/>,
          text: 'General Settings'
        },
        {
          link: '/',
          icon:<Cookie />,
          text: 'Privacy'
        },
        {
          link: '/',
          icon:<Bell/>,
          text: 'Notification'
        }
      ]
    }
  ];
//min-h-[calc(100vh - 4rem)] 
return (
  <div className='fixed left-0 flex flex-col border-r h-full p-4 gap-4'>
    <div className='absolute right-0 top-0 -mr-4  mt-1 hover:border-gray-800 hover:rounded-md border-gray-100 border bg-white '>
      {isOpen ? (<ChevronLeft className='w-6 h-6' onClick={toggleSidebar} /> ):(<ChevronRight className='w-6 h-6' onClick={toggleSidebar} /> )}
    </div>
    {isOpen ? (
      <div className='  min-w-[200px]'>
        <div className='flex items-center justify-center gap-2 border rounded-md p-2 mx-auto'>
          <div className='avatar rounded-full min-h-8 min-w-8 h-10 w-10 bg-gray-400 text-white font-[700] flex items-center justify-center'>
            <span>ME</span>
          </div>
          <div>
            <p className='text-[16px] font-bold'>ESSALHI MUSTAPHA</p>
            <p className='text-[12px] text-natural-500'>essalhimu@gmail.com</p>
          </div>
        </div>
        <div>
          <Command style={{ overflow: 'visible' }}>
            <CommandList style={{ overflow: 'visible' }}>
              {menuList.map((menuGroup, key) => (
                <CommandGroup key={key} heading={menuGroup.group}>
                  {menuGroup.items.map((menuItem, itemKey) => (
                    <CommandItem key={itemKey} className='flex gap-2 cursor-pointer  hover:bg-sky-200 rounded-md active:bg-sky-700'>
                    
                    <Link href={menuItem.link}>
                    <div className="flex gap-2 cursor-pointer">
                      {menuItem.icon}
                      <span>{menuItem.text}</span>
                    </div>
                  </Link>
               
                    
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </div>
        <div></div>
      </div>
    ) : (
      <div>
        {/* <div className='absolute right-0 top-0 -mr-6 p-1 mt-1 hover:border-gray-800 border-gray-100 border '>
          <ChevronRight className='w-6 h-6' onClick={toggleSidebar}/>
        </div> */}
        <div className='flex items-center justify-center flex-col gap-2  rounded-md '>
          <div className='avatar rounded-full md:min-h-10 md:min-w-10 min-h-8 min-w-8  p-2 bg-gray-400 text-white font-[700] flex items-center justify-center'>
            <span className='text-sm'>ME</span>
          </div>
          <span className='text-[10px] text-muted-foreground font-medium'>Informaticien</span>
        </div>
        <div className='flex justify-center items-center flex-col mx-auto'>
          <Command style={{ overflow: 'visible' }}>
            <CommandList style={{ overflow: 'visible'} }>
              {menuList.map((menuGroup, key) => (
                <CommandGroup key={key} heading={menuGroup.group}>
                  {menuGroup.items.map((menuItem, itemKey) => (
                    <CommandItem key={itemKey} className='flex gap-2 cursor-pointer mx-auto justify-center hover:bg-sky-200 rounded-md active:bg-sky-700'>
                   <Link href={menuItem.link}>
                  
                      {menuItem.icon}
                    
                    
                  </Link>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </div>
        <div></div>
      </div>
    )}
  </div>
);

}
