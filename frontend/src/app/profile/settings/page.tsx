"use client"
import React from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

export default function Settings() {
  const router = useRouter();
  const pathname = usePathname()
  const lastItem = pathname.split('/').pop();
  const handleBack = () => {
    router.back();
  }

  return (
    <section className='md:hidden'>
    <MaxWidthWrapper>
      <div className='flex items-center justify-center relative'>
        <ChevronLeft className='absolute left-1' onClick={handleBack}/>
        <h4 className='font-poppins font-semibold text-md'>
          Settings
        </h4>
      </div>
      <div className='grid grid-rows-auto gap-2 my-4'>
  <div className="flex items-center justify-center font-semibold font-poppins bg-slate-100 py-4">Profile <ChevronRight className='absolute right-4 my-4'/></div>
  <div className="flex items-center justify-center font-semibold font-poppins  bg-slate-200 py-4">Additional things <ChevronRight className='absolute right-4'/></div>
  <div className="flex items-center justify-center font-semibold font-poppins  bg-slate-300 py-4">Change password <ChevronRight className='absolute right-4'/></div>
  <div className="flex items-center justify-center font-semibold font-poppins  bg-red-400 py-4">Delete My Accouny <ChevronRight className='absolute right-4'/></div>
</div>

    </MaxWidthWrapper>
    </section>
  )
}

