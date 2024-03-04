"use client";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import domain from "@/helpers/constants";
import { setServiceId } from "@/state";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
export interface servicesProps {
  id: number;
  en_name?: string;
  href?: string;
  description?: string;
  image?: string;
  numWorkers?: number;
}

interface Prop {
  service: servicesProps;
  index: number;
}
// src={`${domain}/api/v1/get_image/${service.image}`}
function ServiceCard({ service, index }: Prop) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!service || !isVisible) return <ProjectPlaceholder />;

  return (
    <div className="max-w-sm rounded-lg border-none p-1 relative w-full  group hover:scale-105 hover:z-30 select-none">
    <div className="relative w-full md:h-[35vh] h-[30vh]">
            <Link
            href={'/workers'}
               onClick={() => dispatch(setServiceId(service.id))}
                 
              className={cn(
                "invisible h-full w-full cursor-pointer group/main",
                {
                  "visible animate-in fade-in-5 cursor-pointer": isVisible,
                }
              )}
            
           
            >
              
                <Image
                  src={`${service.image}`}
                  alt="service"
                  width={1500}
                  height={1500}
                  loading="eager"
                  className="-z-10 h-full w-full object-cover object-center rounded-lg"
                />
            </Link>
              </div>
              <h3 className=" font-medium text-sm text-gray-700 pr-1">
              
                {service.en_name}
                </h3>
                <div>
                <p className="text-sm text-gray-500 ">{service.description}</p>
                <p className="text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                We have  {service.numWorkers ? (
            <span className="font-medium text-blue-900">{service.numWorkers}</span>
          ) : (
            "an unspecified number of"
          )} workers
                </p>
                </div>
                
         
            </div>
         
    
  
  );
}
const ProjectPlaceholder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
    </div>
  );
};
export default ServiceCard;
