"use client"
import React from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
export default function page() {
  const router = useRouter();
  const pathname = usePathname()
  const lastItem = pathname.split('/').pop();
  const handeBack = () => {
    router.back();
  }


  return (
    <>
    <MaxWidthWrapper>
      <div>
        <div className='flex justify-between items-center flex-row'>
          <ChevronLeft className='m-1' onClick={handeBack}/>
          <h4 className='font-poppins font-semibold text-md'>
                        /{lastItem}
          </h4>
        </div>
      </div>
    </MaxWidthWrapper>
  </>
  )
}
