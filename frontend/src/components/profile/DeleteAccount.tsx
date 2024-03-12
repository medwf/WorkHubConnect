"use client";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import axios from "axios";


import { Button } from "@/components/ui/button";
import domain from "@/helpers/constants";

import { toast } from "react-hot-toast";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useCookies } from "next-client-cookies";
import { logout, setUpdateId } from "@/state";
import {  useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
const FormSchema = z
  .object({
    password: z.string(),
  })
  


export default function EditImage() {
   const router = useRouter();
  const UpId = useSelector((state: RootState) => state.updateId)
  const cookies = useCookies();
  const dispatch = useDispatch();
  const token = cookies.get("token");
  const userId =  useSelector((state: RootState) => state.user)
  const formThree = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password:"",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema> ) {
    try {
     
  
      const response = await axios.delete(
        `${domain}/api/v1/users/${userId}`,
        {
          data: {
            password: data.password
          },
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      cookies.remove('token');
      cookies.remove('userId');
      dispatch(setUpdateId({ updateId: UpId + 1 }));

      dispatch(logout());
      
      router.push('/')
      toast.success(response.data.message);
  
    } catch (error: any) {
     
      if (error.response.data.error){
        toast.error(error.response.data.error);
      }else{
        console.clear();
      }
      
    }
  }
  
  return (
    <section className="py-3">
      <MaxWidthWrapper>
      <div className=" md:w-2/3 w-full h-full  flex items-center flex-col  gap-4 mx-auto ">
       
       {/* password */}
       <Dialog>
         <DialogTrigger asChild>
           <Button variant="destructive" className="w-full flex justify-between md:px-20 group">
             Delete My Account <ChevronRight className="group-hover:rotate-90"/>
           </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-4xl">
           <DialogHeader>
             <DialogTitle className="text-center">
              Delete My account </DialogTitle>
             <DialogDescription className="text-center">
               Delete an account
             </DialogDescription>
           </DialogHeader>
           <Form {...formThree}>
             <form
               onSubmit={formThree.handleSubmit(onSubmit)}
               className="w-full   md:px-10  px-3 space-y-1 "
             >
               <FormField
                 control={formThree.control}
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
              
              
               <br />
               <Button type="submit" className="w-full ">
                 Delete My Account
               </Button>
             </form>
           </Form>
         </DialogContent>
       </Dialog>

       </div>
        
        {/* <div className=" md:w-2/3 w-full h-full  flex items-center flex-col  gap-4 mx-auto ">
        <Button variant="destructive" onClick={onSubmit} className="w-full flex justify-between md:px-20  group">
        Delete an account <ChevronRight className="group-hover:rotate-90"/>
            </Button>

        </div> */}

      </MaxWidthWrapper>
    </section>
  );
}
