"use client";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import domain from "@/helpers/constants";

export interface workerProp {
  fullName: string;
  ServiceName: string;
  is_available: boolean;
  user_id: number;
  href: string;
  profile_img: string;
}

interface Prop {
  worker: workerProp;
  index: number;
}

function WorkerCard({ worker, index }: Prop) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!worker || !isVisible) return <ProjectPlaceholder />;

  return (
    <div className="max-w-sm rounded-lg border-none p-1 relative w-full cursor-pointer select-none ">
      <div className="relative w-full md:h-[37vh] h-[30vh] ">
        <Link
          href={`/workers/${worker.user_id}`}
          className={cn("invisible h-full w-full cursor-pointer group/main", {
            "visible animate-in fade-in-5 cursor-pointer": isVisible,
          })}
          passHref
        >
          {worker.profile_img ? (
            <Image
              src={`${domain}/api/v1/get_image/${worker.profile_img}`}
              alt="worker"
              width={1500}
              height={1500}
              loading="lazy"
              className="-z-10 h-full w-full object-cover object-center rounded-lg"
            />
          ) : (
            <Image
              src={"/static/defaultProfile.jpg"}
              alt="worker"
              width={1200}
              height={1200}
              loading="eager"
              className="-z-10 md:p-4 h-full w-full object-contain object-center rounded-lg"
            />
          )}
        </Link>
        {/* <img src={`${domain}/api/v1/get_image/${worker.profile_img}`}/> */}
      </div>
      <div className="flex justify-between">
        <div>
          <h3 className=" font-medium text-sm text-gray-700 pr-1">
            {worker.fullName}
          </h3>
          <p className="text-sm text-gray-500">{worker.ServiceName}</p>
        </div>
        <div className="py-2">
          {worker.is_available && worker.is_available ? (
 <span className="text-green-600"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></span>
          ):(
            <span className="text-red-600 "><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></span>
          )}

       
      </div>
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
export default WorkerCard;
