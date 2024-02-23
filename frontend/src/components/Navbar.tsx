"use client";
import { useState } from "react";
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
import { DropdownMenuProfile } from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import {logout} from "@/state";
const links = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Workers", path: "/workers" },
  { label: "About", path: "/about" },
];

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("/");
  const [sheetOpen, setSheetOpen] = useState(false);
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
  const menuItems = [
    {
      label: "Profile",
      path: "/profile/1/myprofile",
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
      path:"",
      icon: <LogOut className="mr-2 h-4 w-4" />,
      onclick: logoutAction, 
    },
  ];
  // Function to handle closing the sheet
  const closeSheet = () => {
    setSheetOpen(false);
  };
  
  const isAuth = Boolean(useSelector((state: any) => state.token));

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16 w-full">
      <header className="relative bg-gray">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-bold text-xl">Logo</h1>

              {/* md lg xl devices */}
              <div className="hidden md:flex justify-center items-center gap-4">
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

                  {isAuth ? (
                    
                      <DropdownMenuProfile />
                    
                  ) : (
                    <div>
                      <Button variant={"outline"}>
                        {" "}
                        <Link href="/auth/signup">Become a worker</Link>{" "}
                      </Button>
                      <Button asChild className=" ml-2">
                        <Link href="/auth/login">Login</Link>
                      </Button>
                    </div>
                  )}
                </div>
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
                      <div className="flex flex-col   items-start py-4">
                        {links.map((link) => (
                          <SheetClose key={link.path} asChild>
                            <Link
                              href={link.path}
                              passHref
                              className={`text-black flex flex-col gap-4  font-semibold text-3xl  group  transition duration-300 `}
                            >
                              {/* <ArrowUpRight /> */}
                              {link.label}
                              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black"></span>
                            </Link>
                          </SheetClose>
                        ))}

                        {/* for profile  */}
                        {menuItems.map((item) => (
                          <SheetClose key={item.path} asChild>
                            <Link
                              href={item.path}
                              passHref
                              onClick={() => {
                                if (item.onclick) item.onclick();}}
                              className={`text-black flex flex-col gap-4  font-semibold text-3xl  group  transition duration-300 `}
                            >
                              {/* <ArrowUpRight /> */}
                              {item.label}
                              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black"></span>
                            </Link>
                          </SheetClose>
                        ))}

                        <div className="flex flex-col justify-between items-center mx-auto py-7 gap-5">
                          <Button
                            variant={"outline"}
                            className=""
                            onClick={closeSheet}
                          >
                            {" "}
                            <Link href="/signup">Become a worker</Link>{" "}
                          </Button>
                          <Button className="ml-2" onClick={closeSheet}>
                            <Mail className="mr-2 h-4 w-4" />
                            <Link href="/login">Login with Email</Link>{" "}
                          </Button>
                        </div>

                        {/* Social media */}
                        <div className="flex justify-center gap-4 items-center mx-auto abosolute bottom-0 pb-4">
                          <FaGithub className="w-9 h-9 rounded-full hover:shadow-lg hover:shadow-sky-500" />
                          <FaDiscord className="w-9 h-9 rounded-full hover:shadow-lg hover:shadow-sky-500" />
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
