"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-hot-toast";
import {useRouter} from 'next/navigation';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/v1/forgot-password', { email });


      toast.success('Password reset email sent. Please check your inbox.');
      router.push('/');
    
    } catch (error:any) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
    <MaxWidthWrapper>
    <section className='flex flex-col gap-5 justify-center items-center  border py-20 md:mx-20 my-20 bg-slate-50 rounded-lg'>
    <h2 className='font-poppins font-bold  text-xl'>Reset Password </h2>
      <div className='flex items-center flex-col md:flex-row gap-3 w-2/3 '>
       
        <Input
          type="email"
          id="email"
          value={email}
          className='w-full'
          placeholder='Type your email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleResetPassword} className='w-full md:w-1/3'>Reset Password</Button>
      </div>
      
    </section>
    
    
      </MaxWidthWrapper>
    </>
  );
}
