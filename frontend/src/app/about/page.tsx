import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import Image from 'next/image'

export default function About() {
  return (
    <>
      <MaxWidthWrapper>
        <div className='relative w-full h-full'>
          {/* <h1 className='text-4xl font-bold font-poppins text-center'>Team</h1> */}
          <div className='absolute my-6  border rounded-md shadow-md w-[90vw] h-[80vh]'>
              <div className='grid md:grid-cols-2 grid-cols-1 '>
                  <div className='h-full w-full relative'>
                            <div className='w-18 h-18 rounded-full p-2 border absolute top-4 left-4 shadow-lg'>
                                <Image src='https://avatars.githubusercontent.com/u/98237827?s=400&u=c7da025694959b078c6b3e2e37a5a220dc33aea9&v=4'
                                width={200}
                                height={200}
                                alt='github image' 
                                className='object-contain rounded-full'
                                />
                            </div>
                  </div>
              </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  )
}
