"use client";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import domain from "@/helpers/constants";
export interface servicesProps {
  id: number;
  en_name?: string;
  href?: string;
  description?: string;
  image?: string;
  nbworkers?: number;
}

interface Prop {
  service: servicesProps;
  index: number;
}

function ServiceCard({ service, index }: Prop) {
  const [isVisible, setIsVisible] = useState<boolean>(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!service || !isVisible) return <ProjectPlaceholder />;
  // console.log(service.image)
  return (
    <div className="max-w-sm rounded-lg border-none  relative w-full  group hover:scale-105 hover:z-30 select-none">
      <div className="relative  h-[30vh]  md:my-10 my-12">
        <Link
          href={"/workers"}
           onClick={() => localStorage.setItem('id',`${service?.id}`)}

          className={cn("invisible h-full w-full cursor-pointer group/main", {
            "visible animate-in fade-in-5 cursor-pointer ": isVisible,
          })}
        >
          {service.image ? (
            <Image
              src={`${domain}/api/v1/get_image/${service.image}`}
              alt="service"
              width={700}
              height={700}
              loading="eager"
              className=" rounded-md w-full h-full object-cover object-center group-hover:blur-sm "
            />
          ) : null}
          <h3 className=" text-start  font-medium text-sm text-gray-700 ">
          {service.en_name}
        </h3>
        <p className="md:text-sm  text-xs max-w-sm text-gray-500 ">{service.description}</p>
        <p className="absolute  left-1/2 top-1/2 transform -translate-x-50 -translate-y-50 z-50 text-sm text-white font-bold font-poppins opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          We have{" "}
          {service.nbworkers ? (
            <span className="font-medium text-blue-900">
              {service.nbworkers}
            </span>
          ) : (
            "0"
          )}{" "}
          workers
        </p>
        </Link>
        
      </div>

      {/* <div>
        <p className="text-sm text-gray-500 px-10">{service.description}</p>
        <p className="text-sm text-gray-500 px-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          We have{" "}
          {service.numWorkers ? (
            <span className="font-medium text-blue-900">
              {service.numWorkers}
            </span>
          ) : (
            "an unspecified number of"
          )}{" "}
          workers
        </p>
      </div> */}
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
