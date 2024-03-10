"use client";
import Image from "next/image";
import Link from "next/link";
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

function CardServices({ service, index }: Prop) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!service || !isVisible) return <ProjectPlaceholder />;

  return (
    <div className="max-w-sm rounded-lg border-none relative w-full group hover:scale-105 hover:z-30 select-none">
      <div className="relative overflow-hidden rounded-lg bg-gray-200 h-[30vh]">
        <Link
          href={"/workers"}
          onClick={() => localStorage.setItem("id", `${service?.id}`)}
          className={cn("invisible h-full w-full cursor-pointer group/main", {
            "visible animate-in fade-in-5 cursor-pointer ": isVisible,
          })}
        >
          <div className="relative w-full h-full aspect-w-16 aspect-h-9">
            <Image
              src={`${domain}/api/v1/get_image/${service.image}`}
              alt="service"
              fill
              loading="eager"
              sizes="(min-width: 808px) 50vw, 100vw"
              className=" group-hover:blur-sm object-cover object-center"
            />
           
          </div>
         
          <div className="absolute inset-0 flex flex-col justify-center items-center px-4 bg-black bg-opacity-40 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            <p className="text-md text-white font-bold mb-2">
              We have{" "}
              <span className="font-medium text-blue-700">
                {service.nbworkers || "0"}
              </span>{" "}
              workers
            </p>
            <h3 className="text-sm text-white  font-semibold mb-1 text-center">
              {service.en_name}
            </h3>
            <p className="text-xs text-white font-medium font-poppins text-center">
              {service.description}
            </p>
          </div>
        </Link>
       
      </div>
      <h1 className=" z-30 text-xs md:text-md text-gray-900 font-bold  text-center">
          {service.en_name}
        </h1>
    </div>
  );
}

const ProjectPlaceholder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-gray-200 aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
        <div className="absolute inset-0 flex flex-col justify-center items-center px-4 bg-black bg-opacity-20">
          <div className="animate-pulse bg-gray-300 h-32 w-full"></div>
        </div>
      </div>
      <div className="animate-pulse bg-gray-300 h-4 mt-4 rounded-lg"></div>
      <div className="animate-pulse bg-gray-300 h-4 mt-2 rounded-lg"></div>
      <div className="animate-pulse bg-gray-300 h-4 mt-2 rounded-lg"></div>
    </div>
  );
};

export default CardServices;
