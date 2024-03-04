import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import Image from 'next/image'
import Slider from '@/components/about/Slider'
import CircularSlider from '@/components/about/Circular'

export default function About() {
  return (
    <>
      <MaxWidthWrapper>
        <div className='relative w-full h-full'>
          {/* <h1 className='text-4xl font-bold font-poppins text-center'>Team</h1> */}
          <div className=' my-6  border rounded-md shadow-md w-[90vw] h-[80vh] relative overflow-hidden'>
              <div className='flex '>
                  <div className='h-full w-full   overflow-hidden'>
                    <div className='absolute -left-32 '>
                    <CircularSlider/>

                    </div>
                  </div>
              </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  )
}
