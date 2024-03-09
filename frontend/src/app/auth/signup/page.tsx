"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../../globals.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import domain from "@/helpers/constants";
import { useDispatch } from "react-redux";
import {
  Form,
  FormControl,
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
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { regions } from "@/helpers/regions";
import { cities } from "@/helpers/cities";
import { useCookies } from "next-client-cookies";
import { setLogin } from "@/state";

const FormSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string(),
  service_id: z.string(),
  region: z.string(),
  city: z.string(),
  type: z.string(),
  phone_number: z
    .string()
    .min(10, { message: "Must be a valid mobile number" })
    .max(14, { message: "Must be a valid mobile number" }),
});

export default function Signup() {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [RegionName, setRegionName] = useState("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const cookie = useCookies();
  const dispatch = useDispatch();

  const handleRegionChange = (regionName: string) => {
    const selectedRegion = regions.find(
      (region) => region.region === regionName
    );
    setRegionName(regionName);
    if (selectedRegion) {
      setSelectedRegion(selectedRegion.id.toString());
    }
  };

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
    region: "",
    city: "",
    service_id: "",
    city_id: "",
    type: "",
    phone_number: "",
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      service_id: "",
      city: "",
      region: "",
      type: "",
      phone_number: "",
    },
  });

  const [services, setServices] = useState<{ id: string; en_name: string }[]>(
    []
  );
  const watchType = form.watch("type");
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${domain}/api/v1/services`);
        const services = response.data;
        setServices(services);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    if (watchType === "worker") {
      fetchServices();
    }
  }, [watchType, form]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    data.region = RegionName;
    const selectedCity = cities.find((city) => city.ville === data.city);

    const formDataWithcity_id = {
      ...data,
      city_id: selectedCity?.id,
    };

    try {
      if (data.type === "worker") {
        const selectedService = services.find(
          (service) => service.en_name === data.service_id
        );
        if (!selectedService) {
          toast.error("Selected service not found.");
          return;
        }
        formDataWithcity_id.service_id = selectedService.id;
      }
      console.log(formDataWithcity_id);
      const res = await axios.post(
        `${domain}/api/v1/register`,
        formDataWithcity_id
      );

      const resData = res.data;
      dispatch(
        setLogin({
          token: resData.token,
          user: resData.user_id,
        })
      );
      cookie.set("token", resData.token);
      cookie.set("userId", resData.user_id);
      router.push(`/`);
      toast.success(res.data.message);
      form.reset();
      setRegionName("");
    } catch (error: any) {
      if (error.response.data.error) {
        toast.error(error.response.data.error);
      }
    }
  }

  return (
    <>
      <MaxWidthWrapper>
        <div className="md:px-2 py-10 my-4 mb-10 bg-opacity-70 bg-white-50   mx-auto  flex flex-col items-center max-w-xl bg-[#f8f9fa] border-gray-100 border-1  rounded-lg shadow-lg">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full   md:px-10  px-3 space-y-1 "
            >
              <div className="flex items-center justify-center py-8">
                {isLoading ? (
                  <div className="flex justify-center items-center mx-auto">
                    <div className="loader"></div>
                  </div>
                ) : (
                  <div>
                    <p className="md:text-2xl text-xl text-gray-900 font-bold font-poppins ">
                      WorkHubConnect
                    </p>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="first name" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="last name" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Are you a worker or a client?</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);

                          form.setValue("service_id", "");
                        }}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="worker">Worker</SelectItem>
                          <SelectItem value="client">Client</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("type") === "worker" && (
                <FormField
                  control={form.control}
                  name="service_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profession</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a profession" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem
                                key={service.id}
                                value={service.en_name}
                              >
                                {service.en_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {/* state and cities */}
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Region</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={handleRegionChange}
                          value={RegionName}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a region" />
                          </SelectTrigger>
                          <SelectContent>
                            {regions.map((region) => (
                              <SelectItem key={region.id} value={region.region}>
                                {region.region}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a city" />
                          </SelectTrigger>
                          <SelectContent>
                            {cities
                              .filter(
                                (city) =>
                                  city.region.toString() === selectedRegion
                              )
                              .map((city) => (
                                <SelectItem key={city.id} value={city.ville}>
                                  {city.ville}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="phone number"
                        type="tel"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="me@example.com"
                        type="email"
                        {...field}
                      />
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
                Sign up
              </Button>
              <div className=" flex justify-center items-center pt-3">
                <p className="text-md font-medium text-muted-foreground">
                  Do you have an account ?
                  <span className="text-blue-600 hover:underline">
                    <Link href={"/auth/login"}>sign in</Link>
                  </span>{" "}
                </p>
              </div>
              {/* <div
                className="mx-auto my-4 flex w-full items-center justify-evenly  before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 
        after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400  "
              >
                or
              </div>
              <Button variant="outline" type="button" className="w-full mx-auto border-slate-400" disabled={isLoading}>
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <FaGoogle className="mr-2 h-4 w-4" />
                )}{" "}
                Google
              </Button> */}
            </form>
          </Form>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
