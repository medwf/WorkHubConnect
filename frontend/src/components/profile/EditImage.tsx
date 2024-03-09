"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Cog } from "lucide-react";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import domain from "@/helpers/constants";
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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useCookies } from "next-client-cookies";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const FormSchemaTwo = z.object({
  image: z
    .any()
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ) 
});


export default function EditImage() {
  const router = useRouter();
  const pathname = usePathname();
  const lastItem = pathname.split("/").pop();
  const handleBack = () => {
    router.back();
  };
  const [selectedImage, setSelectedImage] = useState< File | null >(null);



  const formTwo = useForm<z.infer<typeof FormSchemaTwo>>({
    resolver: zodResolver(FormSchemaTwo),
    defaultValues: {
     image: undefined,
    },
  });

  const cookies = useCookies();
  const token = cookies.get("token");
  const userId =  cookies.get("userId");

  async function onSubmitTwo(data: z.infer<typeof FormSchemaTwo>) {
    try {
      const formData = new FormData();
      formData.append('image', data.image);
  
      const response = await axios.post(
        `${domain}/api/v1/uploadprofile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      toast.success(response.data.message);
      formTwo.reset();
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      }
    }
  }
  
  return (
    <section className="py-3">
      <MaxWidthWrapper>
        
      

        <div className=" md:w-2/3 w-full h-full  flex items-center flex-col  gap-4 mx-auto ">

        {/* //images */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full flex justify-between md:px-20 hover:px-10 group">
              Edit Image <ChevronRight className="group-hover:rotate-90"/>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-center">Edit image</DialogTitle>
              <DialogDescription className="text-center">
                Change your profile image here
              </DialogDescription>
            </DialogHeader>
            <Form {...formTwo}>
              <form
                onSubmit={formTwo.handleSubmit(onSubmitTwo)}
                className="w-full   md:px-10  px-3 space-y-1 "
              >
                <FormField
                  control={formTwo.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Avatar</FormLabel>
                      <FormControl>
                      <input
                          type="file"
                        
                          id="fileInput"
                          onBlur={field.onBlur}
                          name={field.name}
                          onChange={(e) => {
                            field.onChange(e.target.files);
                            setSelectedImage(e.target.files?.[0] || null);
                          }}
                          ref={field.ref}
                        />
                        {/* <Input
                          placeholder="Password"
                          type="file"
                        
                          {...field}
                        /> */}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <br />
                <Button type="submit" className="w-full ">
                  Upload images
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>


        </div>

      </MaxWidthWrapper>
    </section>
  );
}
