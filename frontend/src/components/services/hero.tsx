
"use client";
import React from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import Type from "@/components/TypeWrite";
const services = ["technicien", "plumber", "elctrical", "constructor"];

export default function ServiceHero() {
  return (
    <>
      <MaxWidthWrapper>
        <section className="h-[60vh]">
          <div className="absolute inset-0 md:top-16 top-16 px-auto h-[60vh] bg-gradient-to-tr from-green-200 to-slate-600 border rounded-lg">
            <div className="flex flex-col md:flex-row  items-center justify-between  h-full">
              <div className="flex flex-col md:p-7 p-4">
                <h1 className="py-3 font-bold text-white font-poppins md:text-5xl text-3xl flex gap-2  ">
                  Find your <Type names={services} />
                </h1>
                <h3 className="text-sm p-2 text-muted-foreground text-zinc-100  font-medium font-poppins text-wrap text-justify max-w-4xl">
                  Welcome to our Service Page, your gateway to a diverse range of high-quality services tailored to meet your needs. Whether you're seeking expert solutions for home improvement, technical assistance, creative endeavors, or professional consultancy, our platform offers a rich array of services delivered by skilled professionals.
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

