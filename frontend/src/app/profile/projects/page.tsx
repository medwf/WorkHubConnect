import React from 'react'
import Image from 'next/image'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import SearchProject from '@/components/SearchProject'
import ProjectReel from '@/components/projects/ProjectReel'
const Projects = () => {
  return (
    <>
    <MaxWidthWrapper>
      <div>

      
   <div className='w-full flex justify-center items-center'>
    <Image
    src={'/projects/pro.jpg'}
    width={500}
    height={500}
    alt='project'

    />
    </div>
    <div className='flex justify-center items-center'>
   
        <SearchProject/>
     
    </div>
    </div>
    <ProjectReel
          title='Projects'
          
        />
   
    </MaxWidthWrapper>
    
    </>
   
 
  )
}

export default Projects
