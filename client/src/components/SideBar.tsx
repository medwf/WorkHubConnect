import React from 'react';
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

export default function SideBar({ params }: any) {
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

  return (
    <div className='fixed  left-0 flex flex-col  w-[300px] min-w-[300px] border-r min-h-[calc(100vh - 4rem)]  p-4 gap-4 overflow-y-auto bg'>
      <div className='flex items-center justify-center gap-2 border rounded-md p-2'>
        <div className='avatar rounded-full min-h-8 min-w-8 h-12 w-12 bg-gray-400 text-white font-[700] 
          flex items-center justify-center'>
          <span>ME</span>
        </div>
        <div>
          <p className='text-[16px] font-bold'>ESSALHI MUSTAPHA</p>
          <p className='text-[12px] text-natural-500'>essalhimu@gmail.com</p>
        </div>
      </div>
      <div>
        <Command style={{overflow : 'visible'}}>
          <CommandList style={{overflow : 'visible'}}>
            {menuList.map((menuGroup, key) => (
              <CommandGroup key={key} heading={menuGroup.group}>
                {menuGroup.items.map((menuItem, itemKey) => (
                  <CommandItem key={itemKey} className='flex gap-2 cursor-pointer'>
                    <span >{menuItem.icon}</span>
                    <span >{menuItem.text}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </div>
      <div>
      </div>
      
    </div>
  );
}
