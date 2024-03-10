"use client";
import React, { useEffect, useState } from "react";
import ServiceHero from "@/components/services/hero";
import { ArrowUpWideNarrow, Globe } from "lucide-react";
import { GrUserExpert } from "react-icons/gr";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ServiceCard, { servicesProps } from "@/components/services/ServiceCard";
import domain from "@/helpers/constants";
import axios from "axios";
import CardServices from "@/components/services/CardServices";


export default function Services() {
  const servicePoints = [
    {
      icon: <ArrowUpWideNarrow />,
      title: "Wide Range of Services",
      description: "Explore our diverse selection of services tailored to meet your needs."
    },
    {
      icon: <GrUserExpert />, 
      title: "Expert Guidance",
      description: "Receive personalized guidance from our experienced team to find the best solution for you."
    },
    {
      icon: <Globe />, 
      title: "Easy Navigation",
      description: "Our user-friendly interface makes it simple to locate the information you need quickly."
    }
  ];
  const [services, setServices] = useState<{ 
    id: number;
    en_name?: string;
    href?: string;
    description?: string;
    image?: string;
    numWorkers?: number;

  }[]>([]);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/v1/services`
        );
        const services = response.data;
        console.log(services)
        setServices(services);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    
      fetchServices();
    
  }, []);
  return (
    <>
      <ServiceHero />
      <div className="h-full mx-4 my-2 py-4">
        <div className="flex justify-center items-center m-4">
          <h4 className="border-t border-gray-200 w-14 font-bold border-2"></h4>
        </div>
        <h1 className="text-center text-4xl">
          Find what you&apos;re looking for 
        </h1>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {servicePoints.map((item, index) => (
            <div className="flex flex-col items-center" key={index}>
              <span className="p-4 border rounded-full shadow-md my-2">{item.icon}</span>
              <div className="text-center">
                <p className="text-gray-800 font-semibold font-poppins py-2">{item.title}</p>
                <p className="text-sm w-64 mx-auto font-medium text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className=" my-16 h-full">
        <MaxWidthWrapper>
        <h1 className="text-4xl font-medium font-poppins border-b border-gray-600">
          Our Services
        </h1>
        <div className="grid mx-auto md:grid-cols-4 grid-cols-2 md:gap-6 gap-3 p-2">

              {services && services.map((item:servicesProps,index) =>
            <CardServices key={item.id} service={item} index={index} />)} 
        </div>
        </MaxWidthWrapper>
       
      </div>
    </>
  );
}
