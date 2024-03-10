"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { regions } from "@/helpers/regions";
import { cities } from "@/helpers/cities";
import { Textarea } from "@/components/ui/textarea";
import { useCookies } from "next-client-cookies";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";

const FormSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  description: z.string(),
  service_id: z.string(),
  region: z.string(),
  city: z.string(),
  type: z.string(),
  phone_number:z.string(),
});


export default function EditProfile() {
  const router = useRouter();
  const pathname = usePathname();
  const lastItem = pathname.split("/").pop();
  const handleBack = () => {
    router.back();
  };
  const [selectedImage, setSelectedImage] = useState< File | null >(null);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [RegionName, setRegionName] = useState("");

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [cityName, setCityName] = useState("");

  const handleCityChange = (cityName: string) => {
    setCityName(cityName);
    form.setValue("city", cityName);
  };
  const handleRegionChange = (regionName: string) => {
    const selectedRegion = regions.find(
      (region) => region.region === regionName
    );
    setRegionName(regionName);
    if (selectedRegion) {
      setSelectedRegion(selectedRegion.id.toString());
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: "",
      first_name: "",
      last_name: "",
      service_id: "",
      phone_number:"",
      city: "",
      region: "",
      type: "",
    },
  });


  const [services, setServices] = useState<{ id: string; en_name: string }[]>(
    []
  );
  const cookies = useCookies();
  const token = cookies.get("token");
  const userId = useSelector((state:RootState) => state.user)
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
    // console.log(data);
    data.region = RegionName;
    const selectedCity = cities.find((city) => city.ville === data.city);

    const formDataWithcity_id = {
      ...data,
      city_id: selectedCity?.id,
    };
console.log(formDataWithcity_id);
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
      const res = await axios.put(
        `${domain}/api/v1/updateprofile`,
        formDataWithcity_id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resData = res.data;
      toast.success(res.data.message);
      form.reset();
      setRegionName("");
    } catch (error: any) {
      console.error(error.response);
      toast.error(error.response.data.error);
    }
  }


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get( `${domain}/api/v1/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data;
        console.log(userData);
        form.setValue("first_name", userData.first_name);
        form.setValue("last_name", userData.last_name);
        form.setValue("description", userData.description);
        form.setValue("type", userData.type);
       
        setRegionName(userData.region)
        setCityName(userData.city)

        form.setValue("phone_number",userData.phone_number)
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [token]);




  return (
    <section className="py-3">
      <MaxWidthWrapper>
        <div className="hidden ">
          <div className="flex items-center justify-center relative">
            <ChevronLeft className="absolute left-1" onClick={handleBack} />
            <h4 className="font-poppins font-semibold text-md">Settings</h4>
          </div>
          <div className="grid grid-rows-auto gap-2 my-4">
            <div className="flex items-center justify-center font-semibold font-poppins bg-slate-100 py-4">
              Profile <ChevronRight className="absolute right-4 my-4" />
            </div>
            <div className="flex items-center justify-center font-semibold font-poppins  bg-slate-200 py-4">
              Additional things <ChevronRight className="absolute right-4" />
            </div>
            <div className="flex items-center justify-center font-semibold font-poppins  bg-slate-300 py-4">
              Change password <ChevronRight className="absolute right-4" />
            </div>
            <div className="flex items-center justify-center font-semibold font-poppins  bg-red-400 py-4">
              Delete My Accouny <ChevronRight className="absolute right-4" />
            </div>
          </div>
        </div>
       

        <div className=" md:w-2/3 w-full h-full  flex items-center flex-col  gap-4 mx-auto ">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full flex justify-between md:px-20 mx-auto group">
              Edit Profile <ChevronRight className="group-hover:rotate-90"/>
            </Button>
          </DialogTrigger>
          <DialogContent className="md:max-w-4xl mx-auto">
            <DialogHeader>
              <DialogTitle className="text-center">Edit profile</DialogTitle>
              <DialogDescription className="text-center">
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full   md:px-10  px-3 space-y-1 "
                >
                  <div className="flex items-center justify-center py-8"></div>
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
                                  <SelectItem
                                    key={region.id}
                                    value={region.region}
                                  >
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
                              value={cityName}
                              onValueChange={handleCityChange}
                              // defaultValue={field.value}
                              
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
                                    <SelectItem
                                      key={city.id}
                                      value={city.ville}
                                    >
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="writes some line about your sled :)"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <br />
                  <Button type="submit" variant={"default"} className="w-full ">
                    Update profile
                  </Button>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
     



        </div>
      </MaxWidthWrapper>
    </section>
  );
}
