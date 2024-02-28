"use client";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface workerProp {
  name: string;
  service: string;
  id: number;
  href: string;
  image: string;
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
    <div className="max-w-sm rounded-lg border-none p-1 relative w-full cursor-pointer ">
    <div className="relative w-full h-[37vh]">
            <Link
                href={`/workers/${worker.id}`}
              className={cn(
                "invisible h-full w-full cursor-pointer group/main",
                {
                  "visible animate-in fade-in-5 cursor-pointer": isVisible,
                }
              )}
            
              passHref
            >
              
                <Image
                  src={worker.image}
                  alt="worker"
                  width={1500}
                  height={1500}
                  loading="eager"
                  className="-z-10 h-full w-full object-cover object-center rounded-lg"
                />
            </Link>
              </div>
              <h3 className=" font-medium text-sm text-gray-700 pr-1">
              
                {worker.name}
                </h3>
                <p className="text-sm text-gray-500">{worker.service}</p>
         
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
