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
import { FaDiscord, FaGithub  } from "react-icons/fa";


const links = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Workers", path: "/workers" },
  { label: "About", path: "/about" },
];

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("/");
  const [sheetOpen, setSheetOpen] = useState(false);
  // Function to handle closing the sheet
  const closeSheet = () => {
    setSheetOpen(false);
  };



  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-gray">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-bold text-xl">Logo</h1>

              {/* md lg xl devices */}
              <div className="hidden md:flex">
                <div>
                  {links.map((link) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      passHref   
                      className={`text-gray-700 mr-4 font-semibold text-xl mb-2 hover:text-gray-800 hover:border-b-2 hover:border-blue-200 ${
                        link.path === activeLink
                          ? "border-b-2 botder-slate-200 text-gray-900"
                          : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}

                  <Button variant={"outline"}>
                    {" "}
                    <Link href="/signup">Become a worker</Link>{" "}
                  </Button>
                  <Button asChild className="ml-2">
                    <Link href="/login">Login</Link>
                  </Button>
                </div>
              </div>
              {/* small devices as phones */}
             
              <Sheet key={'left'}  open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger className="md:hidden "> <AlignRight/></SheetTrigger>
                <SheetContent side={'left'} >
                  <SheetHeader >
                    <SheetTitle></SheetTitle>
                    <SheetDescription>
                    <div className="flex flex-col gap-2  items-start py-6">
                  {links.map((link) => (
                  

                  <SheetClose  key={link.path} asChild>
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
                  
                  <div className="flex flex-col justify-between items-center mx-auto py-7 gap-5">
                  <Button variant={"outline"} className="" onClick={closeSheet}>
                    {" "}
                    
                    <Link href="/signup">Become a worker</Link>{" "}
                  </Button>
                  <Button className="ml-2" onClick={closeSheet}>
                    
                      <Mail className="mr-2 h-4 w-4" /> 
                      <Link href="/login">Login with Email</Link>{" "}
                    </Button>
                  </div>
             
                {/* Social media */}
                <div className="flex justify-center gap-4 items-center mx-auto py-20">
                <FaGithub className="w-9 h-9 rounded-full hover:shadow-lg hover:shadow-sky-500"/>
                <FaDiscord  className="w-9 h-9 rounded-full hover:shadow-lg hover:shadow-sky-500"/>
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
