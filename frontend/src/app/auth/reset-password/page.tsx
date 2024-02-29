"use client"
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import domain from '@/helpers/constants';
import toast from 'react-hot-toast';
import axios from 'axios';
const FormSchema = z.object({
    password: z.string(),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
  

export default function ResetPassword() {
    const getToken = useSearchParams();
    const router = useRouter();
    const token = getToken.get('token')
    if (!token) { router.push('/')};

    
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          password: "",
          confirmPassword: "",
        },
      });
if (!token) { router.push('/');  };
 

 async function onSubmit(data: z.infer<typeof FormSchema>) {

    try {
      console.log("domain")
      console.log(domain)
        const response = await axios.post(
          `http://127.0.0.1:5000/api/v1/reset-password`,
          {
            new_password: data.password,
            confirm_password: data.confirmPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(response.data.message);
        router.push('/auth/login');
    
      } catch (error:any) {
        //toast.error(error.response.data.error);
        if (error.response.data.error){
          toast.error(error.response.data.error);
        }
        if (error.response.data.msg){
          toast.error("Invalid or expired token");
        }
      }
    
 }


  return (
    <>
    <MaxWidthWrapper>
<section className='md:mx-auto md:w-[30%] mx-2 md:my-10  px-4 h-full md:px-2.5 bg-slate-500 rounded-lg my-12 py-12'>
  <div>
    <h1 className='text-center text-3xl font-bold text-white font-poppins py-3'>Reset Password</h1>
    <br/>
  </div>
<Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full   md:px-10  px-3 space-y-1 "
            >
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirm Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <br/>
              <Button type="submit" className="w-full ">
                Reset password
              </Button>
            
      
            </form>
          </Form>

</section>
    </MaxWidthWrapper>
    </>
  )
}
