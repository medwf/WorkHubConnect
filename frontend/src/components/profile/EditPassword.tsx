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
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useCookies } from "next-client-cookies";
import { logout } from "@/state";
import { useDispatch } from "react-redux";


const FormSchemaThree = z
  .object({
    password: z.string(),
    NewPassword: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.NewPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function EditPassword() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch =  useDispatch();
  const lastItem = pathname.split("/").pop();
  const handleBack = () => {
    router.back();
  };

  const [selectedRegion, setSelectedRegion] = useState("");
  const [RegionName, setRegionName] = useState("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);


  const formThree = useForm<z.infer<typeof FormSchemaThree>>({
    resolver: zodResolver(FormSchemaThree),
    defaultValues: {
      NewPassword: "",
      confirmPassword: "",
      password: "",
    },
  });
 
  const cookies = useCookies();
  const token = cookies.get("token");
  const userId =  cookies.get("userId");

  async function onSubmitThree(data: z.infer<typeof FormSchemaThree>) {
    try {
      const response = await axios.post(
        `${domain}/api/v1/reset-password`,
        {
          password: data.password,
          new_password: data.NewPassword,
          confirm_password: data.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      cookies.remove('token');
      cookies.remove('userId');
      dispatch(logout());
      router.push('/')
      toast.success(response.data.message);
     
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Invalid or expired token");
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
            <Button variant="outline" className="w-full flex justify-between md:px-20 group">
              Change password <ChevronRight className="group-hover:rotate-90"/>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-center">Change password</DialogTitle>
              <DialogDescription className="text-center">
                Change your profile image here
              </DialogDescription>
            </DialogHeader>
            <Form {...formThree}>
              <form
                onSubmit={formThree.handleSubmit(onSubmitThree)}
                className="w-full   md:px-10  px-3 space-y-1 "
              >
                <FormField
                  control={formThree.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Old Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Old Password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formThree.control}
                  name="NewPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
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
                  control={formThree.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
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
                <br />
                <Button type="submit" className="w-full ">
                  Change Password
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

