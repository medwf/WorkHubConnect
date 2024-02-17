import Link from 'next/link';
import { CreditCard, LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
export function DropdownMenuProfile() {
  // Define an array of menu items with name, link, and icon
  const menuItems = [
    { name: 'Profile', link: '/profile/1/myprofile', icon: <User className="mr-2 h-4 w-4" /> },
    { name: 'Inbox', link: '/profile/1/inbox', icon: <CreditCard className="mr-2 h-4 w-4" /> },
    { name: 'Settings', link: '/profile/1/settings', icon: <Settings className="mr-2 h-4 w-4" /> },
    { name: 'Log out', link: '/', icon: <LogOut className="mr-2 h-4 w-4" /> },
  ];

  return (
    
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className='p-1'>
          <div className='flex gap-2 items-center justify-center '>
          <Avatar className=''>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"  />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className='text-sm'>
            ESSALHI MUSTAPHA
          </p>
          </div>
          </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {menuItems.map((item, index) => (
            <DropdownMenuItem key={index}>
              <Link href={item.link} passHref className=' flex items-center'>
               
                  {item.icon}
                  <span>{item.name}</span>
               
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
