"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Check, Shield, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProjectReel from "@/components/projects/ProjectReel";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import domain from "@/helpers/constants";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { workerData } from "worker_threads";


interface PageProps {
  params: {
    id: number;
  };
}
interface Worker {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  is_available?: boolean;
  projects?: Array<any>;
  description?: string;
  price?: number;
  city?: string;
  region?: string;
  service?: string;
  profile_img?: string;
  insta_url?: string;
}

const BREADCRUMBS = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "workers", href: "/workers" },
];

const Page = ({ params }: PageProps) => {
  const { id } = params;
  const [date, setDate] = useState<Date>();
  const [wokerData, setWorkerData] = useState<Worker | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${domain}/api/v1/users/${id}`);
        console.log(res.data);
        setWorkerData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
  const DATE_REQUIRED_ERROR = "Date is required.";
  const formSchema = z.object({
    username: z.string().min(2),
    description: z.string().min(10),
    city: z.string().min(2),
    phone: z.string().min(10).max(14),
    date:  z.object({
      from: z.date().optional(),
      to: z.date().optional(),
  }, {required_error: DATE_REQUIRED_ERROR}).refine((date) => {
      return !!date.from;
  }, DATE_REQUIRED_ERROR),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      description: "",
      city: "",
      phone: "",
      date: {
        from: undefined,
        to: undefined,
    },
  }
    
  });
  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
  }

  return (
    <MaxWidthWrapper className="bg-white ">
      <div className=" mb-2">
        <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-2 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          {/* Product Details */}
          <div className="lg:max-w-lg lg:self-end">
            <ol className="flex items-center space-x-2">
              {BREADCRUMBS.map((breadcrumb, i) => (
                <li key={breadcrumb.href}>
                  <div className="flex items-center text-sm">
                    <Link
                      href={breadcrumb.href}
                      className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                    >
                      {breadcrumb.name}
                    </Link>
                    {i !== BREADCRUMBS.length - 1 ? (
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {wokerData?.first_name} {wokerData?.last_name}
              </h1>
            </div>

            <section className="mt-4">
              <div className="flex items-center">
                <p className="font-medium text-gray-900">
                  {wokerData?.service}
                </p>

                <div className="ml-4 border-l text-muted-foreground border-gray-300 pl-4">
                  {wokerData?.price}$ Per Hour
                </div>
              </div>

              <div className="mt-4 space-y-6">
                <p className="text-base text-muted-foreground">
                  {wokerData?.description}
                </p>
              </div>
              <div>
                <p className="text-base text-muted-foreground">
                  {wokerData?.region} <span aria-hidden='true'>&rarr;</span> {wokerData?.city}
                </p>
              </div>
              <div className="mt-6 flex items-center">
                {wokerData?.is_available ? (
                  <Check
                    aria-hidden="true"
                    className="h-5 w-5 flex-shrink-0 text-green-500"
                  />
                ) : (
                  <X
                    aria-hidden="true"
                    className="h-5 w-5 flex-shrink-0 text-red-500"
                  />
                )}
                <p className="ml-2 text-sm text-muted-foreground">
                  {wokerData?.is_available ? "available" : "not available"}
                </p>
              </div>
            </section>
          </div>

          {/* Product images */}
          <div className="mt-8 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-square rounded-lg">
              {wokerData?.profile_img && (
                <Image
                src={`${domain}/api/v1/get_image/${wokerData.profile_img}`}
                  alt="profile image"
                  width={500}
                  height={500}
                  className="object-contain"
                />
              )}
            </div>
            
          </div>
    

          {/* add to cart part */}
          <div className="mt-8 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <div>
              <div className="mt-10">
                {/* <Button>Contact Me</Button> */}
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline">Contact Me</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                      <DrawerHeader>
                        <DrawerTitle className="text-center">send an email</DrawerTitle>
                        <DrawerDescription className="text-center">
                          describe what you need from our worker
                        </DrawerDescription>
                      </DrawerHeader>
                      <div>
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-2"
                          >
                            <FormField
                              control={form.control}
                              name="username"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Username</FormLabel>
                                  <FormControl>
                                    <Input placeholder="username" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />{" "}
                            <FormField
                              control={form.control}
                              name="city"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>city</FormLabel>
                                  <FormControl>
                                    <Input placeholder="city" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="description"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Description</FormLabel>
                                  <FormControl>
                                  <Textarea placeholder="Type your message here." id="message" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    describe your task
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone</FormLabel>
                                  <FormControl>
                                    <Input placeholder="phone" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="date"
                              render={({ field }) => (
                                <FormItem className="flex flex-col ">
                                  <FormLabel>Date</FormLabel>
                                  <FormControl>
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <Button
                                          variant={"outline"}
                                          className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !field.value.from && "text-muted-foreground"
                                          )}
                                        >
                                          <CalendarIcon className="mr-2 h-4 w-4" />
                                          {field.value.from ? (
                                        field.value.to ? (
                                            <>
                                                {format(field.value.from, "LLL dd, y")} -{" "}
                                                {format(field.value.to, "LLL dd, y")}
                                            </>
                                        ) : (
                                            format(field.value.from, "LLL dd, y")
                                        )
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                      >
                                        <Calendar
                                           initialFocus
                                           mode="range"
                                           defaultMonth={field.value.from}
                                           selected={{from: field.value.from!, to: field.value.to}}
                                           onSelect={field.onChange}
                                           numberOfMonths={1}
                                        />
                                      </PopoverContent>
                                    </Popover>
                                  </FormControl>
                                  
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="w-full flex flex-col gap-2 py-3">
                            <Button type={"submit"}>Submit</Button>
                        <DrawerClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                            </div>
                            
                          </form>
                        </Form>
                      </div>
                      
                        
                     
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>
              <div className="mt-6 text-start">
                <div className="group inline-flex text-sm text-medium">
                  <Shield
                    aria-hidden="true"
                    className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"
                  />
                  <span className="text-muted-foreground hover:text-gray-700 cursor-default">
                    Guarantee
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProjectReel
        href="/products"
        title={`The latest projects`}
        subtitle={`Review me`}
      />
      </div>

      
    </MaxWidthWrapper>
  );
};

export default Page;
