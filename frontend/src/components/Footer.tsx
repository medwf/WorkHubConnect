"use client"
import Link from 'next/link'
import React from 'react'
import { FaDiscord, FaGithub } from 'react-icons/fa'

export default function Footer() {
  return (
    <div className='flex md:justify-around items-center z-100 absolute bottom-0 h-12 mt-2 bg-white-100 border-t border-gray-300 bg-slate-200 w-full'> 
      <h1 className='text-gray-800 md:text-md text-sm font-bold font-poppins px-3'>
      WorkHubConnect - Copyright © 2024
      </h1>
      <div className='hidden md:flex gap-3 '>
      <Link href="https://github.com/medwf/WorkHubConnect">  <FaGithub className="w-6 h-6 rounded-full transform hover:text-gray-600" /></Link>
       <Link href={"https://discord.gg/KPkCPRwG"}><FaDiscord className="w-6 h-6 rounded-full hover:text-sky-500" /></Link>
      </div>
    </div>
  )
}
