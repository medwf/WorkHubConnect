"use client";
import * as React from "react";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import SearchWorker from "@/components/workers/SearchWorker";
import { data, testProjects2 } from "../../helpers/test";
import WorkerCard, { workerProp } from "@/components/workers/WorkerCard";
import { SlidersHorizontal } from "lucide-react";
export default function Workers() {
  return (
    <>
      <MaxWidthWrapper>
        <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
          <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
            <div className="flex-1 md:pt-10 pt-6 px-10 padding-x">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Host, Connect, and find your worker to do what you need to do
                with high quality.
              </h1>
              <p className="p-regular-20 md:p-regular-24 text-muted-foreground">
                helpfully connect and do your work with quality services and
                solve your problems
              </p>
              <Button variant={"default"} className="my-4">
                <Link href="/services">Explore our Services</Link>
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
          <div className="flex justify-center items-center">
            <SearchWorker />
          </div>
        </section>
      </MaxWidthWrapper>
      <section className="h-full py-20">
        <MaxWidthWrapper>
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-2xl font-poppins text-gray-900 py-4">
              Workers
            </h1>
      <div className="hidden md:flex gap-2">
      <Select>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="services" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Services</SelectLabel>
               
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="md:w-[100px]">
                <SelectValue placeholder="states" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>states</SelectLabel>
               
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="cities" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Cities</SelectLabel>
               
                </SelectGroup>
              </SelectContent>
            </Select>
      </div>
      <div className="md:hidden">
      
      <DropdownMenu>
      <DropdownMenuTrigger><SlidersHorizontal className=" mr-2"/></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Filter</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
        <Select>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="services" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Services</SelectLabel>
               
                </SelectGroup>
              </SelectContent>
            </Select>
        </DropdownMenuItem>
        <DropdownMenuItem>      <Select>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="services" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Services</SelectLabel>
               
                </SelectGroup>
              </SelectContent>
            </Select></DropdownMenuItem>
        <DropdownMenuItem>      <Select>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="services" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Services</SelectLabel>
               
                </SelectGroup>
              </SelectContent>
            </Select></DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
      </div>
            
          </div>
          <div className="relative">
            <div className="mt-6 flex items-center w-full">
              <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
                {data.map((item: workerProp, index) => (
                  <WorkerCard key={item.id} worker={item} index={index} />
                ))}
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
