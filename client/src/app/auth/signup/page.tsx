"use client";
import React, { useState } from "react";
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
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useForm } from "react-hook-form";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { FaGoogle } from "react-icons/fa";
import { regions } from "@/helpers/regions";
import { cities } from "@/helpers/cities";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import { setLogin } from "@/state";

const FormSchema = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  email: z.string().min(2),
  password: z.string().min(2),
  service: z.string(),
  region: z.string(),
  city: z.string(),
  type: z.string(),
});

export default function Signup() {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [RegionName, setRegionName] = useState("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();
  const handleRegionChange = (regionName: string) => {
    const selectedRegion = regions.find(
      (region) => region.region === regionName
    );
    setRegionName(regionName);
    if (selectedRegion) {
      setSelectedRegion(selectedRegion.id);
    }
  };

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
    region: "",
    city: "",
    service: "",
    city_id: "",
    type: "",
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      service: "",
      city: "",
      region: "",
      type: "",
    },
  });
  const [pageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // console.log(data);
    data.region = RegionName;
    const selectedCity = cities.find((city) => city.ville === data.city);

    const formDataWithcity_id = {
      ...data,
      city_id: selectedCity?.id,
    };

    try {
      // const res = await axios.post("/api/users/signup", formDataWithcity_id)
      const res = await axios.post(
        "http://127.0.0.1:5000/api/v1/register",
        formDataWithcity_id
      );

      const resData = res.data;
      if (resData) {
        dispatch(
          setLogin({
            token: resData.token,
            user: resData.user._id,
          })
        );
      }
      console.log(resData);
      console.log(resData.token);
      console.log(resData.user._id);
      const id = resData.user._id;

      // router.push(`/profile/${res.user.id}/myprofile`)
      router.push(`/`);
      Ttoast.success("Form submitted successfully!");
      form.reset();
      setRegionName("");
    } catch (error: any) {
      console.error("Essalhi", error);
      Ttoast.error(error.message);

      // form.reset();
      // setRegionName("");
    }
  }

  return (
    <>
      <MaxWidthWrapper>
        <div className="md:px-2 py-10 my-4 mb-10 bg-opacity-70 bg-white-50  mx-auto  flex flex-col items-center max-w-xl bg-[#f8f9fa] border-gray-100 border-1  rounded-lg shadow-lg">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-1 "
            >
              <div className="flex items-center justify-center py-8">
                <p className="text-xl text-gray-950 font-bold">
                  WorkHubConnect
                </p>
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

                          form.setValue("service", "");
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
              {form.watch("type") === "worker" && ( // Conditionally render based on the selected type
                <FormField
                  control={form.control}
                  name="service"
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
                            <SelectItem value="Electricity">
                              Electricity
                            </SelectItem>
                            <SelectItem value="Informaticien">
                              Informaticien
                            </SelectItem>
                            <SelectItem value="Plombie">Plombie</SelectItem>
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
                              .filter((city) => city.region === selectedRegion)
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
              <Button type="submit" className="w-full mt-10 py-2">
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
