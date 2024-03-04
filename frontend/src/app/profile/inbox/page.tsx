import React from 'react'
import Image from 'next/image'
export default function page() {
  return (
    <section className='h-screen flex justify-center items-center'>

   
    <div className='flex justify-center items-center'>
      <Image
      src={'/assets/under_construction.jpg'}
      width={500}
      height={500}
      alt='404'
      />
    </div>
    </section>
  )
}
