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



export default function EditImage() {
   const router = useRouter();
  const UpId = useSelector((state: RootState) => state.updateId)
 

  const cookies = useCookies();
  const dispatch = useDispatch();
  const token = cookies.get("token");
  const userId =  useSelector((state: RootState) => state.user)
  
  async function onSubmit() {
    try {
     
  
      const response = await axios.delete(
        `${domain}/api/v1/users/${userId}`,
    
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      dispatch(
        setUpdateId({
          updateId: UpId + 1,
        }),
        logout(),
      )
      router.push('/')
      toast.success(response.data.message);
  
    } catch (error: any) {
     
     toast.error(error.response.data.error);
      
    }
  }
  
  return (
    <section className="py-3">
      <MaxWidthWrapper>
        
        <div className=" md:w-2/3 w-full h-full  flex items-center flex-col  gap-4 mx-auto ">
        <Button variant="destructive" onClick={onSubmit} className="w-full flex justify-between md:px-20  group">
        Delete an account <ChevronRight className="group-hover:rotate-90"/>
            </Button>

        </div>

      </MaxWidthWrapper>
    </section>
  );
}
