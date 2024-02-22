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
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import {logout} from "@/state";
import { useDispatch } from 'react-redux';
export function DropdownMenuProfile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const logoutAction = async () => {
    try {
      // Make a request to logout endpoint
      console.log("logged out");
      dispatch(logout());
      const response = await axios.get("/api/users/logout");
      console.log(response);
      // Handle response if needed
      toast.success(response.data.message);
      
      router.push('/')
      // Optionally, perform any client-side cleanup (e.g., clearing local storage, resetting state)
    } catch (error) {
      // Handle errors
      toast.error("Logout failed");
      // Optionally, dispatch an action to handle logout failure (e.g., show error message)
    }
  };
  // Define an array of menu items with name, link, and icon
  const menuItems = [
    { name: 'Profile', link: '/profile', icon: <User className="mr-2 h-4 w-4" /> },
    { name: 'Inbox', link: '/profile/inbox', icon: <CreditCard className="mr-2 h-4 w-4" /> },
    { name: 'Settings', link: '/profile/settings', icon: <Settings className="mr-2 h-4 w-4" /> },
    { name: 'Log out', link: '/', icon: <LogOut className="mr-2 h-4 w-4" /> ,onclick: logoutAction},
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
              <Link href={item.link} passHref 
              className=' flex items-center'
              onClick={() => {
                if (item.onclick) item.onclick();}}
              >
               
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
