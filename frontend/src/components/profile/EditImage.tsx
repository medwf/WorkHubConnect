"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Cog } from "lucide-react";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Image from "next/image";
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
import { setUpdateId } from "@/state";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { Input } from "../ui/input";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const FormSchemaTwo = z.object({
  image: z
    .any()
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export default function EditImage() {
  const router = useRouter();
  const pathname = usePathname();
  const UpId = useSelector((state: RootState) => state.updateId);
  const lastItem = pathname.split("/").pop();
  const handleBack = () => {
    router.back();
  };
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No file selected");

  const formTwo = useForm<z.infer<typeof FormSchemaTwo>>({
    resolver: zodResolver(FormSchemaTwo),
    defaultValues: {
      image: undefined,
    },
  });

  const cookies = useCookies();
  const dispatch = useDispatch();
  const token = cookies.get("token");
  const userId = cookies.get("userId");

  async function onSubmitTwo(data: z.infer<typeof FormSchemaTwo>) {
    try {
      console.log(data);
      const formData = new FormData();
      formData.append("files", data.image[0]);

      const response = await axios.post(
        `${domain}/api/v1/uploadprofile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(
        setUpdateId({
          updateId: UpId + 1,
        })
      );
      console.log(response);
      toast.success(response.data.message);
      formTwo.reset();
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
          {/* //images */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full flex justify-between md:px-20  group"
              >
                Edit Image <ChevronRight className="group-hover:rotate-90" />
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
                  className=" w-full h-full flex justify-center items-center flex-col"
                >
                  <FormField
                    control={formTwo.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Avatar</FormLabel> */}
                        <FormControl >
                          <div className=" h-2xl w-2xl border-2 border-dashed border-sky-700   rounded-md">
                            <Input
                            type="file"
                            name={field.name}
                            onChange={(e) => {
                              field.onChange(e.target.files);
                              setSelectedImage(e.target.files![0]);
                              setFileName(e.target.files![0].name);
                            }}
                            ref={field.ref}
                            className=" relative p-24 flex flex-col justify-center items-center cursor-pointer opacity-0 inset-0 z-10"
                            
                            
                            />
                            {/* <div className="absolute left-1/2 top-1/2 transform -translate-x-50 -translate-y-50 mx-auto"> */}
                            {selectedImage ? (
                                <span className="absolute inset-0 flex justify-center items-center">
                                <Image
                                  src={URL.createObjectURL(selectedImage)}
                                  width={100}
                                  height={100}
                              
                                  alt="image"
                                  className="relative object-contain object-center"
                                />
                              </span>
                            ) : (
                              <span className="absolute inset-0 flex justify-center items-center">
                              <MdCloudUpload color="#1475cf" size={60} />
                            </span>
                            )}
                            </div>
                            
                          {/* </div> */}
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <br />
                  {/* <DialogClose asChild> */}
                  <Button type="submit" className="w-full my-4 cursor-pointer z-40">
                    Upload image
                  </Button>
                  {/* </DialogClose> */}
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}



// <input
// type="file"
// hidden
// id="fileInput"
// onBlur={field.onBlur}
// name={field.name}
// onChange={(e) => {
//   field.onChange(e.target.files);
//   setSelectedImage(e.target.files?.[0] || null);
// }}
// ref={field.ref}
// />