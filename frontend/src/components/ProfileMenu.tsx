"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CreditCard, LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCookies } from 'next-client-cookies';
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
import { useSelector } from "react-redux"; 
import { RootState } from "@/Redux/store";
import domain from '@/helpers/constants';
export function DropdownMenuProfile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const cookies = useCookies();
  const logoutAction = async () => {
    try {
      dispatch(logout());
    
      cookies.remove('token');
      cookies.remove('userId');
      toast.success('logged out successfully')
      router.push('/')
      
    } catch (error) {
      toast.error("Logout failed");
     
    }
  };

  const menuItems = [
    { name: 'Profile', link: '/profile', icon: <User className="mr-2 h-4 w-4" /> },
    { name: 'Inbox', link: '/profile/inbox', icon: <CreditCard className="mr-2 h-4 w-4" /> },
    { name: 'Settings', link: '/profile/settings', icon: <Settings className="mr-2 h-4 w-4" /> },
    { name: 'Log out', link: '/', icon: <LogOut className="mr-2 h-4 w-4" /> ,onclick: logoutAction},
  ];
  const userId = useSelector((state: RootState) => state.user);
  const UpId = useSelector((state: RootState) => state.updateId);
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    city: "",
    region: "",
    type: "",
    profile_img: "",
    service: "",
  });

  useEffect(() => {

    const fetchUserInfo = async () => {
      try {

        const response = await axios.get(
          `${domain}/api/v1/users/${userId}`
        );
        setUserInfo(response.data);
      } catch (error) {
      }
    };

    
      fetchUserInfo();
    
  }, [userId,UpId]);


  return (
    
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className='p-1'>
          <div className='flex gap-2 items-center justify-center  '>
          <Avatar className=''>
            {userInfo.profile_img ? (
  <AvatarImage src={`${domain}/api/v1/get_image/${userInfo.profile_img}`} alt="profile image"   />
            ):(
              // <AvatarFallback>{userInfo.first_name[0]}{userInfo.last_name[0]}</AvatarFallback>
  <AvatarImage src="https://github.com/shadcn.png" alt="Profile image"  />

            )}

          </Avatar>
          <div>
            {userInfo.first_name || userInfo.last_name ?
            (
              <div>
                 <p className="md:text-[16px] font-semibold">
                  {userInfo.first_name} {userInfo.last_name}
                
                </p>
              </div>
            ):(
             null
            )}
               
               
              </div>
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
               <div
               onClick={() => {
                if (item.onclick) item.onclick();}}
               className='flex'
               
               >
               {item.icon}
                  <span>{item.name}</span>
               </div>
                 
                  
               
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
