"use client"
import React,{useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import {logout} from "@/state";
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
  LogOut,
  MessageSquare,
  Settings,
  User,
  UserRoundX
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

import Link from 'next/link';
import { Button } from './ui/button';

export default function SideBar({ params }: any) {
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility
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
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const menuList = [
    {
      group: "General",
      items: [
        {
          link: '/profile',
          icon:<User/>,
          text: 'Profile'
        },
        {
          link: '/profile/inbox',
          icon:<Inbox/>,
          text: 'Inbox'
        },
        {
          link: '/profile/projects',
          icon:<AppWindow />,
          text: 'Billing'
        },
       
      ]
    },
    // {
    //   group: "Settings",
    //   items: [
    //     {
    //       link: '/profile/settings',
    //       icon:<Settings/>,
    //       text: 'General Settings'
    //     },
    //     {
    //       link: '',
    //       icon:<LogOut/>,
    //       text: 'Log Out'
    //     },
       
    //   ]
    // }
  ];

  const userId = useSelector((state: RootState) => state.user); // Access userId from Redux state
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

  useEffect(() => {
    console.log("Inside useEffect"); // Log when useEffect is executed
    const fetchUserInfo = async () => {
      try {
        console.log(`Fetching user info ${userId}`); // Log before making the API call
        const response = await axios.get(
          `http://localhost:5000/api/v1/users/${userId}`
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



//min-h-[calc(100vh - 4rem)] 
return (
  <aside className={`hidden md:flex relative left-0  flex-col border-r min-h-screen md:p-5 p-2 gap-4 transition-all`}>

{/* fixed wrapper left-0 flex flex-col border-r h-full p-4 gap-4 */}
  <div className=''>
    <div className='absolute right-0 top-0 -mr-4  mt-1 hover:border-gray-800 hover:rounded-md border-gray-100 border bg-white '>
      {isOpen ? (<ChevronLeft className='w-6 h-6' onClick={toggleSidebar} /> ):(<ChevronRight className='w-6 h-6' onClick={toggleSidebar} /> )}
    </div>
    {isOpen ? (
      <div className='  md:min-w-[200px] min-w-[120px] m-2'>
        <div className='flex items-center justify-center gap-2 border rounded-md p-2 mx-auto'>
        <Avatar className='h-[55px] w-[55px]'>
            {userInfo.image ? (
  <AvatarImage src={userInfo.image} alt="@shadcn"  />
            ):(
              <AvatarFallback>{userInfo.first_name[0]}{userInfo.last_name[0]}</AvatarFallback>
            )}

          </Avatar>
          {/* <div className='avatar rounded-full md:min-h-8 md:min-w-8 min-h-6 min-w-6 bg-gray-400 text-white font-[700] flex items-center justify-center'>
            <span className='text-[8px]'>ME</span>
          </div> */}
          <div>
            <p className='md:text-[12px] text-gray-900  font-bold space-x-3'>{userInfo.first_name} {userInfo.last_name}</p>
            <p className='md:text-[12px] text-[7px] text-natural-500'>{userInfo.email}</p>
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
                  <div className='mb-14'>
                  {/* <CommandItem className=' flex  flex-col border-t justify-center items-center '>
                    <Button  variant={"ghost"} className='mb-2 flex gap-2 '>
                      <Link href='/profile/settings' className='flex gap-2'>
                      
                        <Settings/>
                      Settings
                        
                     
                      </Link>
                    
                    
                    </Button>
                    </CommandItem> */}
                    <CommandItem className='absolute bottom-14 flex flex-col border-t justify-center items-center '>
                    <Button variant={"ghost"} onClick={logoutAction} className='mb-2 flex gap-2'>
                      <LogOut />
                      Log Out
                    </Button>
                  
                  </CommandItem>
                  </div>
                  
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
          <span className='text-[10px] text-muted-foreground font-medium'>{userInfo.service}</span>
        </div>
        <div className='flex justify-between items-center flex-col mx-auto my-auto'>
          <Command style={{ overflow: 'visible' }}>
            <CommandList style={{ overflow: 'visible'} }>
              {menuList.map((menuGroup, key) => (
                <CommandGroup key={key} heading={menuGroup.group} >
                  {menuGroup.items.map((menuItem, itemKey) => (
                    <CommandItem key={itemKey} className='flex gap-2 cursor-pointer mx-auto py-2 justify-center hover:bg-sky-200 rounded-md active:bg-sky-700'>
                   <Link href={menuItem.link}>
                  
                      {menuItem.icon}
                    
                    
                  </Link>
                    </CommandItem>
                  ))}
                  <CommandItem className='absolute bottom-14 flex flex-col border-t '>
                    <Button  variant={"ghost"} className='mb-2'>
                      <link href='/profile/settings'>
                      </link>
                    <Settings/>
                    </Button>
                    <Button variant={"ghost"} onClick={logoutAction} className='mb-2'>
                      <LogOut />
                    </Button>
                  
                  </CommandItem>
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </div>
        <div></div>
      </div>
    )}
  </div>
  </aside>
);

}
