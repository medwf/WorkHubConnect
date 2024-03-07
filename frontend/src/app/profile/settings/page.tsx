"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Cog } from "lucide-react";
import "../../globals.css";
import Link from "next/link";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import domain from "@/helpers/constants";
import { LuSettings } from "react-icons/lu";
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
import EditImage from "@/components/profile/EditImage";
import EditPassword from "@/components/profile/EditPassword";
import EditProfile from "@/components/profile/EditProfile";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const FormSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  description: z.string(),
  service_id: z.string(),
  region: z.string(),
  city: z.string(),
  type: z.string(),
});
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

export default function Settings() {
  const router = useRouter();
  const pathname = usePathname();
  const lastItem = pathname.split("/").pop();
  const handleBack = () => {
    router.back();
  };
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [RegionName, setRegionName] = useState("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

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
    description: "",
    username: "",
    region: "",
    city: "",
    service_id: "",
    city_id: "",
    type: "",
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      description: "",
      first_name: "",
      last_name: "",
      service_id: "",
      city: "",
      region: "",
      type: "",
    },
  });
  const formTwo = useForm<z.infer<typeof FormSchemaTwo>>({
    resolver: zodResolver(FormSchemaTwo),
    defaultValues: {
      image: undefined,
    },
  });
  const formThree = useForm<z.infer<typeof FormSchemaThree>>({
    resolver: zodResolver(FormSchemaThree),
    defaultValues: {
      NewPassword: "",
      confirmPassword: "",
      password: "",
    },
  });
  const [services, setServices] = useState<{ id: string; en_name: string }[]>(
    []
  );
  const cookies = useCookies();
  const token = cookies.get("token");
  const userId = cookies.get("userId");
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
        `${domain}/api/v1/users/${userId}`,
        formDataWithcity_id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resData = res.data;
      router.push(`/`);
      toast.success(res.data.message);
      form.reset();
      setRegionName("");
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  }
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
      toast.success(response.data.message);
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Invalid or expired token");
      }
    }
  }
  async function onSubmitTwo(data: z.infer<typeof FormSchemaTwo>) {
    console.log(data);
    try {
      const response = await axios.put(
        `${domain}/api/v1/uploadprofile`,
        {
          image: data.image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
    <section className="w-full h-full">
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
        <div className="grid md:grid-cols-2 grid-cols-1 gap-y-2 my-10 ">
          <div className="flex flex-col my-10 items-center justify-center gap-7">
            <EditImage />
            <EditPassword />
            <EditProfile />
          </div>

          <div className="hidden md:flex justify-center items-center transition relative">
            <Image
              src="/assets/Settings.jpg"
              alt="settings"
              width={600}
              height={600}
              className="object-cover"
            />
            <span className="absolute left-[calc(50%-58px)] top-[calc(50%-120px)] transform -translate-x-1/2 -translate-y-1/2">
              {/* Your icon or content */}
              <LuSettings className="w-4 h-4 spin" />
            </span>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
