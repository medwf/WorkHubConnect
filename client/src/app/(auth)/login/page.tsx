"use client";
import React,{useState} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast as Ttoast } from "react-hot-toast";
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
import { ToastAction } from "@/components/ui/toast"
import { useForm } from "react-hook-form";
import { Icons } from "@/components/icons";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { FaGoogle } from "react-icons/fa";
import { useToast } from "@/components/ui/use-toast"
const FormSchema = z.object({
  Email: z.string().min(2),
  password: z.string().min(2),

});

export default function Signup() {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [RegionName, setRegionName] = useState("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast()
  

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
      const response = await axios.post("/api/users/login", {  //under construction ghada in cha lah
         email: data.Email,
        password: data.password,
      });
      
      const userData = response.data;
      const userId = userData.id;
      // form.reset();
      // setRegionName('');

      router.push(`/profile/${userId}`);
      
    } catch (error:any) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
    // console.log(data);
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
   
     
    // });
   
  }

  return (
    <>
    <MaxWidthWrapper>

  
    <div className="md:px-2 py-10 mt-10 bg-opacity-70 bg-white-50  mx-auto  flex flex-col items-center max-w-md border-gray-100 border-1 bg-[#f8f9fa] rounded-lg shadow-lg">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-4/5 space-y-2 ">
        <div className="flex items-center justify-center py-8">

           <p className="text-xl text-gray-950 font-bold">WorkHubConnect</p>
        </div>
      <Button variant="outline" type="button" className="w-full mx-auto border-slate-400" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FaGoogle className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
      <div
        className="mx-auto my-4 flex w-full items-center justify-evenly  before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 
        after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400  "
      >
        or
      </div>
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
        <Button type="submit" className="w-full mt-6">
          Sign in
        </Button>
      
    
    
      </form>
      <div className=" flex justify-center items-center pt-3">
        <p className="text-md font-medium text-muted-foreground">don't have an account ?<span className="text-blue-600 hover:underline"><Link href={'/signup'}>sign up</Link></span> </p>
      </div>
    </Form>
    </div>
    </MaxWidthWrapper>
    </>
  );
}