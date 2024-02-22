import React from 'react'
import Image from 'next/image'
const Projects = () => {
  return (
    <div className='flex justify-center items-center'>
    <Image
    src={'/assets/under_construction.jpg'}
    width={500}
    height={500}
    alt='404'
    />
  </div>
  )
}

export default Projects
