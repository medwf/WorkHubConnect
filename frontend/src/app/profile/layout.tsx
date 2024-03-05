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
  const token = useSelector((state: RootState) => state.token);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
    } else if (isTokenExpired(token)) {
      dispatch(removeToken());
      router.push('/auth/login');
    }
  }, [token, dispatch, router]);
  return (
    <>
      <ProfileHeader/>
      <main>{children}</main>
    
    </>
  )
}