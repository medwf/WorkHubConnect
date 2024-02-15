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
import {regions} from "@/helpers/regions";
import { cities } from "@/helpers/cities";
import { useToast } from "@/components/ui/use-toast"
const FormSchema = z.object({
  First_Name: z.string().min(2),
  Last_Name: z.string().min(2),
  Email: z.string().min(2),
  password: z.string().min(2),
  Profession: z.string(),
  Region: z.string(),
  City: z.string(),
});

export default function Signup() {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [RegionName, setRegionName] = useState("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast()
  const handleRegionChange = (regionName: string) => {
    // Find the region object with the matching name
    const selectedRegion = regions.find(region => region.region === regionName);
    setRegionName(regionName);
    console.log(regionName);
    if (selectedRegion) {
      setSelectedRegion(selectedRegion.id);
     
      // console.log(selectedRegion.id);
    } 
  };

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
    Region: "",
    City: "",
    Profession:"",
    CityId: "",
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Email: "",
      password: "",
      First_Name: "",
      Last_Name: "",
      Profession: "",
      City: "",
      Region: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // console.log(data);
    data.Region = RegionName;
    const selectedCity = cities.find(city => city.ville === data.City);

  const formDataWithCityId = {
    ...data,
    CityId: selectedCity,
  };


  console.log(formDataWithCityId);
    // console.log(data);
    axios
    .post("/api/users/signup", formDataWithCityId)
    .then((response) => {
      console.log("Response from server:", response.data);
      Ttoast.success("Form submitted successfully!");
      form.reset();
      setRegionName("");
    })
    .catch((error) => {
      console.error("Error submitting form:", error);
      Ttoast.error("An error occurred while submitting the form.");
    });
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(formDataWithCityId, null, 2)}</code>
        </pre>
      ),
   
     
    });
    form.reset();
    setRegionName('');
  }

  return (
    <>
    <MaxWidthWrapper>

  
    <div className="md:px-2 py-10 mt-10 bg-opacity-70 bg-white-50  mx-auto  flex flex-col items-center max-w-xl bg-zinc-50 border-gray-300 border-2  rounded-lg">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-2 ">
        <div className="grid grid-cols-2 gap-3">
          <FormField
            
            control={form.control}
            name="First_Name"
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
            name="Last_Name"
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
          name="Profession"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profession</FormLabel>
              <FormControl>
              <Select 
                
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}>
                <SelectTrigger >
                  <SelectValue placeholder="Select a profession" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Electricity">Electricity</SelectItem>
                  <SelectItem value="Informaticien">Informaticien</SelectItem>
                  <SelectItem value="Plombie">Plombie</SelectItem>
                </SelectContent>
              </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {/* state and cities */}
        <div className="grid grid-cols-2 gap-2">
        <FormField
          control={form.control}
          name="Region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Region</FormLabel>
              <FormControl>
              <Select   onValueChange={handleRegionChange}  
      
                value={RegionName}>
                <SelectTrigger >
                  <SelectValue placeholder="Select a region" />
                </SelectTrigger>
                <SelectContent>
                      {regions.map((region) => (
                    <SelectItem key={region.id} value={region.region}>{region.region}</SelectItem>
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
          name="City"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
              <Select   value={field.value} onValueChange={field.onChange}
                defaultValue={field.value}
                >
                <SelectTrigger >
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
                <SelectContent>
                {cities
              .filter(city => city.region === selectedRegion)
              .map(city => (
                
                <SelectItem key={city.id} value={city.ville}>{city.ville}</SelectItem>
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
          Sign up
        </Button>
      
      <div
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
      </Button>
      </form>
    </Form>
    </div>
    </MaxWidthWrapper>
    </>
  );
}