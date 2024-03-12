"use client"
import { ReactNode } from 'react';
import ProfileHeader from '@/components/profile/ProfileHeader';

export default function ProfileLayout({ children } :{ children:ReactNode}) {

  return (
    <>
      <ProfileHeader/>
      <main>{children}</main>
    
    </>
  )
}