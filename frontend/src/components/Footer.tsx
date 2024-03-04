"use client"
import Link from 'next/link'
import React from 'react'
import { FaDiscord, FaGithub } from 'react-icons/fa'

export default function Footer() {
  return (
    <section className='flex md:justify-between md:px-12 py-6  items-center z-100 relative h-20 bg-white-100 border-t border-gray-300 bg-slate-200 w-full'> 

      <div className='flex items-center justify-center md:flex-row flex-col px-4'>
      <h1 className='text-gray-800 md:text-md text-sm font-bold font-poppins px-3'>
        WorkHubconnect
      {/* WorkHubConnect - Copyright © 2024 */}
      </h1>
      <span className='text-muted-foreground text-sm font-poppins'>© This Project made by alx Students - cohort 16</span>
      </div>
     

      <div className='hidden md:flex gap-3 '>
      <Link href="https://github.com/medwf/WorkHubConnect">  <FaGithub className="w-6 h-6 rounded-full transform hover:text-gray-600" /></Link>
       <Link href={"https://discord.gg/KPkCPRwG"}> <FaDiscord className="w-6 h-6 rounded-full hover:text-sky-500" /></Link>
      </div>
    </section>
  )
}
