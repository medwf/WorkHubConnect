"use client";
import Link from "next/link";
import React from "react";
import { FaDiscord, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="W relative bottom-0">
      <div className="absolute top-0 left-0 w-full  bg-slate-600">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 110 "
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="relative block fill-white py-5"
          ></path>
        </svg>
        {/* <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="relative block fill-white"
          ></path>
        </svg> */}
        <div className=" w-full flex flex-col items-center justify-between px-4 py-9 md:flex-no-wrap bg-slate-600 h-full ">
          <div className="flex   justify-center  md:gap-4 gap-2">
            <Link
              href="/about"
              className="text-white md:text-xl hover:underline font-poppins font-medium text-sm"
            >
              Contact Us
            </Link>
            <Link
              href="/about"
              className="text-white md:text-xl hover:underline font-poppins font-medium text-sm"
            >
              About Us
            </Link>
            <Link
              href="/terms"
              className="text-white md:text-xl hover:underline font-poppins font-medium text-sm"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-white md:text-xl hover:underline font-poppins font-medium text-sm"
            >
              Privacy Policy
            </Link>
          </div>
          <p className="text-white md:text-lg  text-sm font-medium font-poppins mt-2 text-center ">
            Connect with us:
          </p>
          <div className="flex justify-center gap-4 py-4">
            <Link href="https://discord.gg/e7VakdYH">
              <FaDiscord className="w-6 h-6 text-white hover:text-blue-700 hover:shadow-md hover:scale-100" />
            </Link>
            {/* <Link href="https://linkedin.com">
              <FaLinkedin className="w-6 h-6  text-white hover:text-sky-700 hover:shadow-md hover:scale-100" />
            </Link> */}
            <Link href="https://chat.whatsapp.com/FJswzBvu61K81XZTkpDAyH">
              <FaWhatsapp className="w-6 h-6  text-white hover:text-green-700 hover:shadow-md hover:scale-100" />
            </Link>
            {/* <Link href="https://github.com">
              <FaGithub className="w-6 h-6  text-white hover:text-slate-700 hover:shadow-md hover:scale-100" />
            </Link> */}
          </div>
          <p className="text-white w-full text-sm text-center border-t py-2 absolute bottom-0">
            &copy; {new Date().getFullYear()} Alx Students. All rights reserved.
          </p>
        </div>
      </div>

      {/* <div className='flex items-center justify-center md:flex-row flex-col px-4'>
      <h1 className='text-white md:text-md text-sm font-bold font-poppins px-3'>
        WorkHubconnect
    
      </h1>
      <span className='text-muted-foreground text-sm font-poppins text-gray'>© This Project made by alx Students - cohort 16</span>
      </div>
     

      <div className='hidden md:flex gap-3 '>
      <Link href="https://github.com/medwf/WorkHubConnect">  <FaGithub className="w-6 h-6 rounded-full transform hover:text-gray-600" /></Link>
       <Link href={"https://discord.gg/KPkCPRwG"}> <FaDiscord className="w-6 h-6 rounded-full hover:text-sky-500" /></Link>
      </div> */}
    </footer>
  );
}
