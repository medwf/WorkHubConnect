import React from 'react'

export default function UserProfile({params}:any) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 absolute left-0 w-1/5 bg-slate-300'>
        <div className='grid grid-rows-3 '>
          <div className=''>

            <h1 className='text-4xl font-bold'>My Profile</h1>
            <hr/>
            <p className='text-4xl'>Profile page {params.id}</p>
          </div>
      
        </div>
      
    </div>
  )
}
