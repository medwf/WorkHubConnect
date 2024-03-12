"use client";
import { useEffect, useState } from "react";
import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { Button } from "./ui/button";

import { AlignRight, ArrowUpRight, Mail } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CreditCard, LogOut, Settings, User } from "lucide-react";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { RiDiscordFill,RiWhatsappFill } from "react-icons/ri";
import { DropdownMenuProfile } from "./ProfileMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import domain from "@/helpers/constants";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/state";
const links = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Workers", path: "/workers" },
  { label: "About", path: "/about" },
];

const Navbar = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const cookies = useCookies();
  const router = useRouter();
  const token = cookies.get("token");
  const dispatch = useDispatch();
 
  const logoutAction = async () => {
    try {
      
      const response = await axios.delete(`${domain}/api/v1/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
   
      if (response.status === 200) {
      dispatch(logout());
      cookies.remove('token');
      cookies.remove('userId');
      toast.success('logged out successfully')
      router.push('/')
      } else {

        toast.error('Logout failed');
      }
     
      
    } catch (error) {
     
     
    }
  };
  const menuItems = [
    {
      label: "Profile",
      path: "/profile",
      icon: <User className="mr-2 h-4 w-4" />,
    },
    {
      label: "Inbox",
      path: "/profile/inbox",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
    },
    {
      label: "Settings",
      path: "/profile/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
    {
      label: "Log out",
      path: "",
      icon: <LogOut className="mr-2 h-4 w-4" />,
      onclick: logoutAction,
    },
  ];
  const menuItems2 = [
    {
      label: "Profile",
      path: "/profile",
      icon: <User className="mr-2 h-4 w-4" />,
    },

    {
      label: "Log out",
      path: "",
      icon: <LogOut className="mr-2 h-4 w-4" />,
      onclick: logoutAction,
    },
  ];
  const closeSheet = () => {
    setSheetOpen(false);
  };

  const isAuth = Boolean(useSelector((state: any) => state.token));
  // console.log("isAuth" + isAuth);

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16 w-full">
      <header className="relative bg-gray">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-bold text-xl font-poppins font-semibold italic">
                <Link href={"/"}>
                  Work
                  <span
                    className="text-blue-600 font-poppins font-semibold hover:underline hover:text-
              -500"
                  >
                    Hub
                  </span>
                  Connect{" "}
                </Link>
              </h1>

              {/* md lg xl devices */}
              <div className="hidden md:flex justify-center items-center flex-grow gap-4">
                <div className="md:flex justify-center items-center gap-2">
                  {links.map((link) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      passHref
                      className={`text-gray-700 mr-4 font-semibold text-xl mb-2 group  transition duration-300 
                        
                      }`}
                    >
                      {link.label}
                      <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black"></span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden md:flex ">
                {isAuth ? (
                  <DropdownMenuProfile />
                ) : (
                  <div className="flex">
                    {/* <Button variant={"outline"}>
                      {" "}
                      <Link href="/auth/signup">Become a worker</Link>{" "}
                    </Button> */}
                    <Button
                      asChild
                      variant={"default"}
                      className=" ml-2 rounded-lg bg-gray-900"
                    >
                      <Link href="/auth/login" className="flex gap-1">
                        {" "}
                        <User className="w-5 h-5 text-white" />{" "}
                        <h1 className="text-white">Login</h1>
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
              {/* small devices as phones */}

              <Sheet key={"left"} open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger className="md:hidden ">
                  {" "}
                  <AlignRight />
                </SheetTrigger>
                <SheetContent side={"left"}>
                  <SheetHeader>
                    <SheetTitle></SheetTitle>
                    <SheetDescription>
                      <div className="flex flex-col  justify-between  py-4">
                        <div className="flex justify-center items-center py-6"><h1 className="font-bold font-poppins text-2xl text-gray-900 ">WorkHubConnect</h1></div>
                        {links.map((link) => (
                          <SheetClose key={link.path} asChild>
                            <Link
                              href={link.path}
                              passHref
                              className={`text-black flex flex-col gap-4  font-meduim font-poppins text-2xl  group  transition duration-300 `}
                            >
                              {/* <ArrowUpRight /> */}
                              {link.label}
                              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black"></span>
                            </Link>
                          </SheetClose>
                        ))}

                        {/* for profile  */}
                        {isAuth ? (
                          <div>
                            {menuItems2.map((item) => (
                              <SheetClose key={item.path} asChild>
                                <Link
                                  href={item.path}
                                  passHref
                                  className={`text-black flex flex-col gap-4  font-meduim font-poppins text-2xl  group  transition duration-300 `}
                                >
                                  {/* <ArrowUpRight /> */}
                                  <div
                                    onClick={() => {
                                      if (item.onclick) item.onclick();
                                    }}
                                  >
                                    {item.label}
                                  </div>

                                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.2 bg-black"></span>
                                </Link>
                              </SheetClose>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col justify-between items-center mx-auto py-7 gap-5">
                            {/* <Button
                            variant={"outline"}
                            className=""
                            onClick={closeSheet}
                          >
                            {" "}
                            <Link href="/signup">Become a worker</Link>{" "}
                          </Button> */}
                            <Button
                              className=" w-4/5 px-10 flex"
                              onClick={closeSheet}
                            >
                              <Link href="/auth/login" className="flex gap-1">
                                {" "}
                                <User className="h-4 w-4 text-white" />
                                <h1>Login</h1>
                              </Link>{" "}
                            </Button>
                          </div>
                        )}

                        {/* Social media */}
                        <div className="absolute bottom-0 w-full py-5 ">
                          <div className="flex justify-center items-center gap-3">
                            <Link href="https://chat.whatsapp.com/FJswzBvu61K81XZTkpDAyH">
                              {" "}
                              <RiWhatsappFill className="text-4xl" />
                            </Link>
                            <Link href={"https://discord.gg/KPkCPRwG"}>
                              <RiDiscordFill className="text-4xl " />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
