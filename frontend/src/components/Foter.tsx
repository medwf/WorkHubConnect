import React from "react";
import { FaDiscord, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import "../app/globals.css"
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="relative bottom-0 w-full z-50 h-24 mt-10 bg-slate-500 ">
<div className="custom-shape-divider-top-1709987538">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
    </svg>
</div>

    <div className="flex  justify-center  gap-3">
    <Link href="/contact">Contact Us</Link>
          <Link href="/about">About Us</Link>
          <Link href="/terms">Terms of Service</Link>
          <Link href="/privacy">Privacy Policy</Link>
    </div>
         
       
        <p className="text-gray-600 text-sm mt-2 text-center bg-slate-500">Connect with us:</p>
        <div className="flex justify-center gap-4 py-2">
          <Link href="https://discord.com"><FaDiscord className="w-6 h-6 text-gray-700" /></Link>
          <Link href="https://linkedin.com"><FaLinkedin className="w-6 h-6  text-gray-700" /></Link>
          <Link href="https://whatsapp.com"><FaWhatsapp className="w-6 h-6  text-gray-700" /></Link>
          <Link href="https://github.com"><FaGithub className="w-6 h-6  text-gray-700" /></Link>
        </div>
        <p className="text-gray-600 text-sm text-center border-t py-2">&copy; {new Date().getFullYear()} Alx Students. All rights reserved.</p>
  
    </footer>
  );
}
