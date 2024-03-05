"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
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
import { useCookies } from 'next-client-cookies';
import domain from '@/helpers/constants';
export function DropdownMenuProfile() {
  // const dispatch = useDispatch();+
  const cookies = useCookies();
  const router = useRouter();

  const logoutAction = async () => {
    try {
      // dispatch(logout());
      cookies.remove('token');
      cookies.remove('userId');
      const response = await axios.get("/api/users/logout");
      toast.success(response.data.message);
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
  // const userId = useSelector((state: RootState) => state.user); // Access userId from Redux state
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    city: "",
    region: "",
    type: "",
    image: "",
    service: "",
  });
const userId = cookies.get('userId');
console.log(userId);
  useEffect(() => {
    console.log("Inside useEffect"); // Log when useEffect is executed
    const fetchUserInfo = async () => {
      try {
        console.log(`Fetching user info ${userId}`); // Log before making the API call
        const response = await axios.get(
          `${domain}/api/v1/users/${userId}`
        );
        // const response = await axios(`/api/users/profile/${userId}`);
        console.log(`response ${response}`);
        console.log("API response:", response.data); // Log the response data
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    if (userId) {
      fetchUserInfo();
    }
  }, [userId]);


  return (
    
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className='p-1'>
          <div className='flex gap-2 items-center justify-center '>
          <Avatar className=''>
            {userInfo.image ? (
  <AvatarImage src={userInfo.image} alt="@shadcn"  />
            ):(
              <AvatarFallback>{userInfo.first_name[0]}{userInfo.last_name[0]}</AvatarFallback>
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
