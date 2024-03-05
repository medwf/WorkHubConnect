"use client";
import React,{useState} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLogin } from "@/state";
import { Checkbox } from "@/components/ui/checkbox"

import { Check } from "lucide-react";
import domain from "@/helpers/constants";
const FormSchema = z.object({
  Email: z.string().min(2),
  password: z.string().min(2),

});

export default function Signup() {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [RegionName, setRegionName] = useState("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  
  

  const [user, setUser] = React.useState({
    email: "",
    password: "",

  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Email: "",
      password: "",
      
    },
  });

  async  function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);


      
      const response = await axios.post(`${domain}/api/v1/login`, { 
        email: data.Email,
        password: data.password,
    }, {
        withCredentials: true,
       
        headers: {
          "Content-type": "application/json",
          'Access-Control-Allow-Origin': 'localhost',
        
      },
    });

      const userData = response.data;
      if(userData){
        dispatch(
          setLogin({
            token: userData.token,
            user: userData.user_id,
          })
        )
        
      }
      toast.success(response.data.message);
    
    

      router.push(`/profile`);
      
    } catch (error:any) {
      if (error.response.data.error){
        toast.error(error.response.data.error);
      }
      // toast.error(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  
   
  }

  return (
    <div className="h-screen">
    <MaxWidthWrapper>

  
    <div className="md:px-2 py-10 mt-10 bg-opacity-70 bg-white-50  mx-auto w-screen  flex flex-col items-center max-w-md border-gray-100 border-1 bg-[#f8f9fa] rounded-lg shadow-lg">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-4/5 space-y-2 ">
        <div className="flex items-center justify-center py-8">

           <p className="text-xl text-gray-950 font-bold">WorkHubConnect</p>
        </div>
      {/* <Button variant="outline" type="button" className="w-full mx-auto border-slate-400" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FaGoogle className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button> */}
      {/* <div
        className="mx-auto my-4 flex w-full items-center justify-evenly  before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 
        after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400  "
      >
        or
      </div> */}
        <FormField
          control={form.control}
          name="Email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="me@example.com" type="email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <br/>
        <div>
          <div className="flex gap-2 items-center justify-end">
          
          <h1 className="text-md font-semibold text-sky-500 font-poppins cursor-pointer hover:underline "><Link href="/auth/forgot-password">Forgot password ?</Link></h1>
          </div>
          
        </div>

        <Button type="submit" className="w-full mt-6 ">
          Sign in
        </Button>
      
    
    
      </form>
      <div className=" flex justify-center items-center pt-3">
        <p className="text-md font-medium text-muted-foreground">don&apos;t have an account ?<span className="text-blue-600 hover:underline"><Link href={'/auth/signup'}>sign up</Link></span> </p>
      </div>
    </Form>
    </div>
    </MaxWidthWrapper>
    </div>
  );
}