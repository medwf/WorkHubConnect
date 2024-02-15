"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";

export default function Workers() {

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (searchQuery) => {
    console.log(searchQuery);
  }

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
                <Link href="/login" >
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
        </section>
      </MaxWidthWrapper>
      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-7">
          <div className=" ">
          <div className="flex items-center justify-center space-x-2">
            <Input type="text" className="px-3 py-2 w-80 md:w-[40vw] " placeholder="Search..." onChange={handleSearch} value={searchQuery}/>
            <Button className="px-3 py-2 md:px-10 md:py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
      </Button>
    </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
