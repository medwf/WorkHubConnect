
"use client";
import React, { useEffect, useState } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import Type from "@/components/TypeWrite";
import axios from "axios";
import domain from "@/helpers/constants";
// const services = ["technicien", "plumber", "elctrical", "constructor"];


export default function ServiceHero() {
  const [services, setServices] = useState<{ 
    en_name?: string[]
  }[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/v1/services`
        );
        const services = response.data;
        // console.log(services)
        setServices(services);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    
      fetchServices();
    
  }, []);
  const servicesStrings = services.flatMap((service) => service.en_name || []);
  return (
    <>
      <MaxWidthWrapper>
        <section className="h-[60vh] w-full">
          <div className="absolute inset-0 md:top-16 top-16 px-auto h-[60vh] bg-gradient-to-tr from-green-200 to-slate-600 border rounded-lg">
            <div className="flex flex-col md:flex-row  items-center justify-between  h-full ">
              <div className="flex flex-col md:p-4 p-2  w-full">
                <h1 className="py-3 font-bold text-white font-poppins md:text-4xl text-4xl flex  flex-grow gap-2 w-full ">
                  Find your <Type names={servicesStrings} />
                </h1>
                <h3 className="text-sm p-2 text-muted-foreground text-zinc-100  font-medium font-poppins text-wrap text-justify max-w-4xl">
                  Welcome to our Service Page, your gateway to a diverse range of high-quality services tailored to meet your needs. Whether you&apos;re seeking expert solutions for home improvement, technical assistance, creative endeavors, or professional consultancy, our platform offers a rich array of services delivered by skilled professionals.
                </h3>
              </div>
              <div className="w-full h-full relative md:ml-10">
                <Image
                  src="/assets/service_image.png"
                  fill
                  loading='eager'
                  className='md:h-[70vh] md:w-[70vw] w-full h-full object-contain object-center'
                  alt='Project image'
                />
              </div>
            </div>
          </div>
        </section>
      </MaxWidthWrapper>
      
    </>
  );
}

