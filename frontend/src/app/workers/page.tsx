"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import SearchWorker from "@/components/workers/searchWorker";
import WorkerCard from "@/components/workers/WorkerCard";

export default function Workers() {

  
  return (
    <>
      <MaxWidthWrapper>
        <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
          <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
            <div className="flex-1 md:pt-10 pt-6 px-10 padding-x">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Host, Connect, and find your worker to do what you need to do with high quality.
              </h1>
              <p className="p-regular-20 md:p-regular-24 text-muted-foreground">
                helpfully connect and do your work with quality services and
                solve your problems
              </p>
              <Button variant={'default'} className="my-4">
                <Link href="/services" >
                    Explore our Services
                </Link>
              </Button>
       
          </div>
          <Image
              src={"/assets/worker_.jpg"}
              alt="hero"
              width={1600}
              height={1600}
              className="max-h-[75vh object-contain object-center 2xl:max-h-[60vh]"
            />
          </div>
          <div className='flex justify-center items-center'>
   
          <SearchWorker />

        </div>

         
          
        </section>
      </MaxWidthWrapper>
      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-7">
          <div className="flex justify-center items-center">
          <WorkerCard/>
          </div>
        
  
        </MaxWidthWrapper>
      </section>
    </>
  );
}
