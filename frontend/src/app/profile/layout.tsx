"use client"
import { ReactNode } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/Redux/store';
import { isTokenExpired } from '@/helpers/expireToken';
import { removeToken } from '@/state';
import ProfileHeader from '@/components/profile/ProfileHeader';

export default function ProfileLayout({ children } :{ children:ReactNode}) {

  return (
    <>
      <ProfileHeader/>
      <main>{children}</main>
    
    </>
  )
}